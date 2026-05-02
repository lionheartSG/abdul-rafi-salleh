"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import { portfolioNodes } from "@/lib/portfolioData";
import { ConnectionLines, MainHubNode, SatelliteNode } from "./nodes";
import { usePortfolioHover } from "./portfolio-hover-context";

function ParallaxRoot({ children }: { children: ReactNode }) {
  const { pointerNorm } = usePortfolioHover();
  return (
    <group
      rotation={[
        pointerNorm.y * 0.09,
        pointerNorm.x * 0.11,
        pointerNorm.x * -0.02,
      ]}
    >
      {children}
    </group>
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

        <ConnectionLines />

        {center ? <MainHubNode node={center} /> : null}
        {satellites.map((n) => (
          <SatelliteNode key={n.id} node={n} />
        ))}
      </ParallaxRoot>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={5}
        maxDistance={14}
        autoRotate
        autoRotateSpeed={0.35}
        maxPolarAngle={Math.PI / 2 + 0.35}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

export default function NodeScene() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 0.35, 8.2], fov: 42, near: 0.1, far: 100 }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0);
      }}
    >
      <SceneContent />
    </Canvas>
  );
}
