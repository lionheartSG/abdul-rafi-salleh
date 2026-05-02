"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type ReactNode, useEffect, useRef } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { getNodeById, portfolioNodes } from "@/lib/portfolioData";
import { ConnectionLines, MainHubNode, SatelliteNode } from "./nodes";
import { usePortfolioHover } from "./portfolio-hover-context";

const DEFAULT_TARGET = new Vector3(0, 0, 0);

function ParallaxRoot({ children }: { children: ReactNode }) {
  const { pointerNorm, focusedNodeId } = usePortfolioHover();
  const factor = focusedNodeId ? 0.02 : 0.09;
  return (
    <group
      rotation={[
        pointerNorm.y * factor,
        pointerNorm.x * (focusedNodeId ? 0.025 : 0.11),
        pointerNorm.x * -0.02,
      ]}
    >
      {children}
    </group>
  );
}

function CameraController() {
  const { focusedNodeId, setFocusedNodeId, setSelectedNodeId } =
    usePortfolioHover();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const targetPos = useRef(new Vector3());
  const { camera } = useThree();
  const prevFocusedRef = useRef<string | null>(null);
  const zoomOutRef = useRef<{ from: number; start: number } | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocusedNodeId(null);
        setSelectedNodeId(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setFocusedNodeId, setSelectedNodeId]);

  useEffect(() => {
    if (!controlsRef.current) return;

    if (focusedNodeId) {
      const node = getNodeById(focusedNodeId);
      if (node) {
        targetPos.current.set(...node.position);
        controlsRef.current.autoRotate = false;
      }
    } else {
      targetPos.current.copy(DEFAULT_TARGET);
      controlsRef.current.autoRotate = true;
    }
  }, [focusedNodeId]);

  useFrame(() => {
    if (!controlsRef.current) return;
    const c = controlsRef.current;

    c.target.lerp(targetPos.current, 0.05);
    c.update();

    const prevFocused = prevFocusedRef.current;
    prevFocusedRef.current = focusedNodeId;

    if (prevFocused && !focusedNodeId) {
      zoomOutRef.current = {
        from: camera.position.distanceTo(c.target),
        start: performance.now(),
      };
    }

    if (focusedNodeId) {
      const dist = camera.position.distanceTo(c.target);
      const targetDist = 4;
      if (dist > targetDist + 0.05) {
        const dir = camera.position.clone().sub(c.target).normalize();
        camera.position.lerp(
          c.target.clone().add(dir.multiplyScalar(targetDist)),
          0.04,
        );
      }
    } else if (zoomOutRef.current) {
      const { from, start } = zoomOutRef.current;
      const elapsed = (performance.now() - start) / 1000;
      const t = Math.min(elapsed / 1.0, 1);
      const ease = 1 - (1 - t) ** 3;
      const dist = camera.position.distanceTo(c.target);

      if (dist < 7.8) {
        const dir = camera.position.clone().sub(c.target).normalize();
        const desired = from + (8 - from) * ease;
        camera.position.lerp(
          c.target.clone().add(dir.multiplyScalar(desired)),
          0.06,
        );
      }

      if (t >= 1) {
        zoomOutRef.current = null;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom
      minDistance={2.5}
      maxDistance={14}
      autoRotate
      autoRotateSpeed={0.35}
      maxPolarAngle={Math.PI / 2 + 0.35}
      minPolarAngle={Math.PI / 4}
    />
  );
}

function SceneContent() {
  const { setSelectedNodeId, setFocusedNodeId } = usePortfolioHover();
  const center = portfolioNodes.find((n) => n.isCenter);
  const satellites = portfolioNodes.filter((n) => !n.isCenter);

  return (
    <>
      <color attach="background" args={["#050b18"]} />
      <fog attach="fog" args={["#0d1321", 12, 28]} />

      <ambientLight intensity={0.25} />
      <pointLight position={[8, 6, 8]} intensity={1.2} color="#dce2f5" />
      <pointLight position={[-6, -4, 4]} intensity={0.6} color="#bc13fe" />
      <pointLight position={[0, 0, 6]} intensity={0.45} color="#00f0ff" />

      {/* Invisible bg plane for deselection click */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: R3F mesh, not a DOM element */}
      <mesh
        position={[0, 0, -8]}
        onClick={() => {
          setSelectedNodeId(null);
          setFocusedNodeId(null);
        }}
      >
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <ParallaxRoot>
        <Stars
          radius={80}
          depth={40}
          count={5000}
          factor={3.5}
          saturation={0.2}
          fade
          speed={0.35}
        />

        <ConnectionLines />

        {center ? <MainHubNode node={center} /> : null}
        {satellites.map((n) => (
          <SatelliteNode key={n.id} node={n} />
        ))}
      </ParallaxRoot>

      <CameraController />
    </>
  );
}

export default function NodeScene() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{
        position: [0, 0.35, 8.2],
        fov: 42,
        near: 0.1,
        far: 100,
      }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0);
      }}
    >
      <SceneContent />
    </Canvas>
  );
}
