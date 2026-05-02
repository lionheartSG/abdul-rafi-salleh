"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { NodePopup } from "./NodePopup";
import {
  PortfolioHoverProvider,
  usePortfolioHover,
} from "./portfolio-hover-context";
import { SpaceBackground } from "./SpaceBackground";

const NodeScene = dynamic(() => import("./NodeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg-deep)] font-[family-name:var(--font-body)] text-sm text-[var(--color-on-surface-muted)]">
      Initializing nexus…
    </div>
  ),
});

function ExperienceInner() {
  const { setPointerFromClient } = usePortfolioHover();

  useEffect(() => {
    setPointerFromClient(window.innerWidth / 2, window.innerHeight / 2);
  }, [setPointerFromClient]);

  return (
    <div
      role="application"
      aria-label="Interactive portfolio node network"
      className="relative h-dvh min-h-[32rem] w-full overflow-hidden bg-[var(--color-bg-deep)]"
      onMouseMove={(e) => {
        setPointerFromClient(e.clientX, e.clientY);
      }}
      onMouseLeave={() => {
        setPointerFromClient(
          typeof window !== "undefined" ? window.innerWidth / 2 : 0,
          typeof window !== "undefined" ? window.innerHeight / 2 : 0,
        );
      }}
    >
      <SpaceBackground />
      <div className="relative z-10 h-full w-full">
        <NodeScene />
      </div>
      <NodePopup />
      <header className="pointer-events-none absolute left-0 top-0 z-20 flex w-full items-start justify-between p-6 md:p-8">
        <div className="pointer-events-auto max-w-md rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-glass)_75%,transparent)] px-4 py-3 backdrop-blur-md">
          <p className="font-[family-name:var(--font-label)] text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--color-accent-cyan)]">
            Architect OS
          </p>
          <h1 className="mt-0.5 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-on-surface)] md:text-xl">
            Technical Lead · Node network
          </h1>
          <p className="mt-1 font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)]">
            Hover nodes for intel · Drag to orbit · Scroll to zoom
          </p>
        </div>
      </header>
      <footer className="pointer-events-none absolute bottom-0 left-0 z-20 w-full p-4 text-center font-[family-name:var(--font-body)] text-[0.65rem] text-[var(--color-on-surface-muted)]">
        Nexus build · 27/04/2026 SGT
      </footer>
    </div>
  );
}

export function PortfolioExperience() {
  return (
    <PortfolioHoverProvider>
      <ExperienceInner />
    </PortfolioHoverProvider>
  );
}
