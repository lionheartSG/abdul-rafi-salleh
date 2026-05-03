"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type ReactNode, useEffect, useRef } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { portfolioNodes } from "@/lib/portfolioData";
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
  const { selectedNodeId, setFocusedNodeId, setSelectedNodeId } =
    usePortfolioHover();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const targetPos = useRef(new Vector3());
  const { camera } = useThree();
  const prevSelectedRef = useRef<string | null>(null);
  const zoomOutRef = useRef<{ from: number; start: number } | null>(null);
  const frameHubRef = useRef<{ start: number } | null>(null);

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

    const prev = prevSelectedRef.current;
    prevSelectedRef.current = selectedNodeId;

    if (selectedNodeId && !prev) {
      // Detail panel opened — frame the main hub above the panel
      targetPos.current.set(0, 0, 0);
      controlsRef.current.autoRotate = false;
      frameHubRef.current = { start: performance.now() };
    } else if (!selectedNodeId && prev) {
      // Detail panel closed — zoom back out
      zoomOutRef.current = {
        from: camera.position.distanceTo(controlsRef.current.target),
        start: performance.now(),
      };
      controlsRef.current.autoRotate = true;
      targetPos.current.copy(DEFAULT_TARGET);
    }
  }, [selectedNodeId, camera]);

  useFrame(() => {
    if (!controlsRef.current) return;
    const c = controlsRef.current;

    c.update();

    if (selectedNodeId) {
      if (frameHubRef.current) {
        const elapsed = (performance.now() - frameHubRef.current.start) / 1000;
        const t = Math.min(elapsed / 0.8, 1);
        const hubTarget = new Vector3(0, -2, 0);
        const camTarget = new Vector3(0, -5, 6);
        c.target.lerp(hubTarget, 0.05);
        camera.position.lerp(camTarget, 0.06);

        if (t >= 1) {
          frameHubRef.current = null;
        }
      }
    } else if (zoomOutRef.current) {
      c.target.lerp(targetPos.current, 0.05);
      const { from, start } = zoomOutRef.current;
      const elapsed = (performance.now() - start) / 1000;
      const t = Math.min(elapsed / 1.0, 1);
      const ease = 1 - (1 - t) ** 3;
      const dist = camera.position.distanceTo(c.target);

      if (dist < 13.8) {
        const dir = camera.position.clone().sub(c.target).normalize();
        const desired = from + (14 - from) * ease;
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
      autoRotateSpeed={0.15}
      maxPolarAngle={Math.PI / 2 + 0.35}
      minPolarAngle={Math.PI / 4}
    />
  );
}

function SceneContent() {
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
      </ParallaxRoot>

      <ConnectionLines />

      {center ? <MainHubNode node={center} /> : null}
      {satellites.map((n) => (
        <SatelliteNode key={n.id} node={n} />
      ))}

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
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 768;
        camera.position.set(0, 0.35, isMobile ? 14 : 8.2);
        camera.lookAt(0, 0, 0);
      }}
    >
      <SceneContent />
    </Canvas>
  );
}
