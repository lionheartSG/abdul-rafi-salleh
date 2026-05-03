"use client";

import { Billboard, Html } from "@react-three/drei";
import Image from "next/image";
import { useState } from "react";
import type { PortfolioNode } from "@/lib/portfolioData";
import { usePortfolioHover } from "../portfolio-hover-context";

type MainHubNodeProps = {
  node: PortfolioNode;
  hitRadius?: number;
  distanceFactor?: number;
};

export function MainHubNode({
  node,
  hitRadius = 0.52,
  distanceFactor = 7.2,
}: MainHubNodeProps) {
  const {
    hoveredNodeId,
    setHoveredNodeId,
    setSelectedNodeId,
    setFocusedNodeId,
  } = usePortfolioHover();
  const [imgFailed, setImgFailed] = useState(false);
  const avatarSrc = node.avatarSrc ?? "/main-hub-avatar.png";
  const isHovered = hoveredNodeId === node.id;

  return (
    <group position={node.position}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: R3F mesh, not a DOM element */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredNodeId(node.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredNodeId(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedNodeId(node.id);
          setFocusedNodeId(node.id);
        }}
      >
        <sphereGeometry args={[hitRadius, 40, 40]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Billboard follow lockZ={false}>
        <Html
          center
          distanceFactor={distanceFactor}
          style={{ pointerEvents: "none" }}
          zIndexRange={[100, 100]}
        >
          <div className="flex w-max flex-col items-center">
            <div
              className="main-hub-disc relative"
              style={{
                transform: isHovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: isHovered
                  ? "0 0 0 1px color-mix(in srgb, #00f0ff 80%, transparent), 0 0 48px color-mix(in srgb, #00f0ff 60%, transparent), 0 0 72px color-mix(in srgb, #5eead4 30%, transparent)"
                  : undefined,
              }}
            >
              {!imgFailed ? (
                <Image
                  src={avatarSrc}
                  alt={`${node.label} — ${node.shortLabel}`}
                  fill
                  sizes="128px"
                  className="main-hub-photo object-cover"
                  unoptimized
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div
                  className="main-hub-photo flex items-center justify-center bg-[#0a1219] font-[family-name:var(--font-display)] text-2xl font-bold text-[#5eead4]/80"
                  aria-hidden
                >
                  {node.label
                    .split(/\s+/)
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="main-hub-title">{node.label}</h2>
            <p className="main-hub-subtitle">{node.shortLabel}</p>
          </div>
        </Html>
      </Billboard>
    </group>
  );
}
