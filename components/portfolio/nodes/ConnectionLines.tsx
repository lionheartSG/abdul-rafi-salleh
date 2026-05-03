"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import type { Vector3Tuple } from "three";
import { portfolioEdges, portfolioNodes } from "@/lib/portfolioData";
import { usePortfolioHover } from "../portfolio-hover-context";

const EdgeLine = memo(function EdgeLine({
  from,
  to,
  isActive,
}: {
  from: Vector3Tuple;
  to: Vector3Tuple;
  isActive: boolean;
}) {
  // biome-ignore lint/suspicious/noExplicitAny: drei Line ref types are complex
  const baseRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (baseRef.current) {
      baseRef.current.material.dashOffset -= delta * 0.25;
    }
  });

  return (
    <>
      <Line
        ref={baseRef}
        points={[from, to]}
        color="#00f0ff"
        lineWidth={1.2}
        transparent
        opacity={0.25}
        dashed
        dashSize={0.15}
        gapSize={0.08}
      />
      <Line
        points={[from, to]}
        color="#7df4ff"
        lineWidth={2.4}
        transparent
        opacity={isActive ? 0.65 : 0}
        dashed
        dashSize={99}
        gapSize={0}
      />
    </>
  );
});

export function ConnectionLines() {
  const { hoveredNodeId, selectedNodeId } = usePortfolioHover();

  const byId = useMemo(
    () => Object.fromEntries(portfolioNodes.map((n) => [n.id, n.position])),
    [],
  );

  const edges = useMemo(
    () =>
      portfolioEdges
        .map(({ from, to }) => {
          const a = byId[from];
          const b = byId[to];
          if (!a || !b) return null;
          return { key: `${from}-${to}`, from: a, to: b, nodeId: to };
        })
        .filter(Boolean) as {
        key: string;
        from: Vector3Tuple;
        to: Vector3Tuple;
        nodeId: string;
      }[],
    [byId],
  );

  return (
    <>
      {edges.map(({ key, from, to, nodeId }) => {
        const isHovered = hoveredNodeId === nodeId;
        const isActive = isHovered || selectedNodeId === nodeId;
        return <EdgeLine key={key} from={from} to={to} isActive={isActive} />;
      })}
    </>
  );
}
