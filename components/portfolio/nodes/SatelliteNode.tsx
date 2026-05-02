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
  hitRadius = 0.26,
  distanceFactor = 6,
}: SatelliteNodeProps) {
  const groupRef = useRef<Group>(null);
  const floatRef = useRef<Group>(null);
  const { setHoveredNodeId, setSelectedNodeId, setFocusedNodeId } =
    usePortfolioHover();
  const accent = node.accent ?? "cyan";
  const borderColor = accentSphereStyle[accent].ring;
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
            document.body.style.cursor = "pointer";
            setHoveredNodeId(node.id);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "auto";
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
                    "--satellite-border": borderColor,
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
