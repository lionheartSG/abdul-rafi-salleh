"use client";

import { Billboard, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type CSSProperties, useRef } from "react";
import type { Group } from "three";
import type { PortfolioNode } from "@/lib/portfolioData";
import { usePortfolioHover } from "../portfolio-hover-context";
import { accentSphereStyle } from "./nodeTokens";

type SatelliteNodeProps = {
  node: PortfolioNode;
  hitRadius?: number;
  distanceFactor?: number;
};

export function SatelliteNode({
  node,
  hitRadius = 0.45,
  distanceFactor = 6,
}: SatelliteNodeProps) {
  const groupRef = useRef<Group>(null);
  const floatRef = useRef<Group>(null);
  const {
    hoveredNodeId,
    setHoveredNodeId,
    setSelectedNodeId,
    setFocusedNodeId,
  } = usePortfolioHover();
  const accent = node.accent ?? "cyan";
  const borderColor = accentSphereStyle[accent].ring;
  const isHovered = hoveredNodeId === node.id;
  const caption =
    node.caption ?? "Replace with your own summary for this capability area.";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const floatG = floatRef.current;
    if (floatG) {
      floatG.position.y = Math.sin(t * 0.8 + node.position[0]) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={node.position}>
      <group ref={floatRef}>
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
          <sphereGeometry args={[hitRadius, 28, 28]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        <Billboard follow lockZ={false}>
          <Html
            center
            distanceFactor={distanceFactor}
            style={{ pointerEvents: "none" }}
            zIndexRange={[100, 100]}
          >
            <div className="satellite-stack">
              <div
                className="satellite-disc"
                style={
                  {
                    "--satellite-border": isHovered
                      ? accentSphereStyle[accent].iconColor
                      : borderColor,
                    transform: isHovered ? "scale(1.12)" : "scale(1)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: isHovered
                      ? `0 0 18px ${accentSphereStyle[accent].ring}, 0 0 36px ${accentSphereStyle[accent].ring}44`
                      : "none",
                  } as CSSProperties
                }
              />
              <p className="satellite-label">{node.shortLabel}</p>
              <p className="satellite-caption">{caption}</p>
            </div>
          </Html>
        </Billboard>
      </group>
    </group>
  );
}
