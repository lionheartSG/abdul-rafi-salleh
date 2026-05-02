"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import { portfolioEdges, portfolioNodes } from "@/lib/portfolioData";

const EDGE_LINE_WIDTH = 1.2;

/** Stitch-style data traces: cyan → purple gradient feel via dashed cyan line. */
export function ConnectionLines() {
  const byId = useMemo(
    () => Object.fromEntries(portfolioNodes.map((n) => [n.id, n.position])),
    [],
  );

  return (
    <>
      {portfolioEdges.map(({ from, to }) => {
        const a = byId[from];
        const b = byId[to];
        if (!a || !b) return null;
        return (
          <Line
            key={`${from}-${to}`}
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
