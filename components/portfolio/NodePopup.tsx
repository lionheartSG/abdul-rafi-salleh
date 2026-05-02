"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { getNodeById } from "@/lib/portfolioData";
import { usePortfolioHover } from "./portfolio-hover-context";

const POPUP_WIDTH = 320;
const PAD = 16;

export function NodePopup() {
  const { hoveredNodeId, pointerClient } = usePortfolioHover();
  const node = getNodeById(hoveredNodeId);

  const { left, top } = useMemo(() => {
    if (typeof window === "undefined") {
      return { left: PAD, top: PAD };
    }
    const maxLeft = window.innerWidth - POPUP_WIDTH - PAD;
    const maxTop = window.innerHeight - 260;
    return {
      left: Math.min(Math.max(PAD, pointerClient.x + PAD), maxLeft),
      top: Math.min(Math.max(PAD, pointerClient.y + PAD), maxTop),
    };
  }, [pointerClient.x, pointerClient.y]);

  return (
    <AnimatePresence>
      {node ? (
        <motion.aside
          key={node.id}
          role="tooltip"
          aria-live="polite"
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 6 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="pointer-events-none fixed z-30 w-[min(320px,calc(100vw-2rem))] rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-glass)_88%,transparent)] p-4 text-[var(--color-on-surface)] shadow-[0_0_40px_-8px_var(--color-accent-cyan)] backdrop-blur-xl"
          style={{ left, top, width: POPUP_WIDTH }}
        >
          <p className="font-[family-name:var(--font-label)] text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[var(--color-accent-cyan)]">
            {node.shortLabel}
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
            {node.label}
          </h2>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-on-surface-muted)]">
            {node.description}
          </p>
          {node.chips && node.chips.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {node.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded border border-[color-mix(in_srgb,var(--color-accent-cyan)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-cyan)_12%,transparent)] px-2 py-0.5 font-[family-name:var(--font-label)] text-[0.65rem] font-medium uppercase tracking-wider text-[var(--color-on-surface)]"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
