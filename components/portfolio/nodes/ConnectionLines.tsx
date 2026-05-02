"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { portfolioEdges, portfolioNodes } from "@/lib/portfolioData";

const EDGE_LINE_WIDTH = 1.2;

export function ConnectionLines() {
  const byId = useMemo(
    () => Object.fromEntries(portfolioNodes.map((n) => [n.id, n.position])),
    [],
  );

  const refs = useRef<Map<string, { material: { dashOffset: number } }>>(
    new Map(),
  );

  useFrame((_, delta) => {
    for (const [, line] of refs.current) {
      line.material.dashOffset -= delta * 0.25;
    }
  });

  return (
    <>
      {portfolioEdges.map(({ from, to }) => {
        const a = byId[from];
        const b = byId[to];
        if (!a || !b) return null;
        return (
          <Line
            key={`${from}-${to}`}
            ref={(el: { material: { dashOffset: number } } | null) => {
              if (el) refs.current.set(`${from}-${to}`, el);
              else refs.current.delete(`${from}-${to}`);
            }}
            points={[a, b]}
            color="#00f0ff"
            lineWidth={EDGE_LINE_WIDTH}
            transparent
            opacity={0.35}
            dashed
            dashSize={0.15}
            gapSize={0.08}
          />
        );
      })}
    </>
  );
}
