"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { CustomCursor } from "./CustomCursor";
import { DetailPanel } from "./DetailPanel";
import { NavBar } from "./NavBar";
import { NodePopup } from "./NodePopup";
import {
  PortfolioHoverProvider,
  usePortfolioHover,
} from "./portfolio-hover-context";
import { SpaceBackground } from "./SpaceBackground";

const NodeScene = dynamic(() => import("./NodeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[var(--color-bg-deep)]">
      <div className="h-3 w-3 animate-pulse rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_20px_var(--color-accent-cyan)]" />
      <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-on-surface-muted)]">
        Initializing nexus
        <span className="animate-pulse">...</span>
      </p>
    </div>
  ),
});

function ExperienceInner() {
  const { setPointerFromClient, setSelectedNodeId, setFocusedNodeId } =
    usePortfolioHover();

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
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedNodeId(null);
          setFocusedNodeId(null);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setSelectedNodeId(null);
          setFocusedNodeId(null);
        }
      }}
    >
      <SpaceBackground />
      <div className="relative z-10 h-full w-full">
        <NodeScene />
      </div>
      <NodePopup />
      <DetailPanel />
      <NavBar />
      <CustomCursor />

      <header className="pointer-events-none absolute left-0 top-0 z-20 flex w-full items-start justify-between p-6 pt-20 md:p-8 md:pt-20">
        <div className="pointer-events-auto max-w-md rounded-lg border border-[color-mix(in_srgb,var(--color-accent-cyan)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-glass)_75%,transparent)] px-4 py-3 backdrop-blur-md">
          <p className="font-[family-name:var(--font-label)] text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--color-accent-cyan)]">
            Portfolio
          </p>
          <h1 className="mt-0.5 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-on-surface)] md:text-xl">
            Operations × Technology
          </h1>
          <p className="mt-1 font-[family-name:var(--font-body)] text-xs text-[var(--color-on-surface-muted)]">
            Click nodes to explore · Drag to orbit · Scroll to zoom
          </p>
        </div>
      </header>

      <footer className="pointer-events-none absolute bottom-0 left-0 z-20 flex w-full items-center justify-between p-4">
        <div className="pointer-events-auto flex items-center gap-4">
          <a
            href="https://github.com/lionheartSG"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-body)] text-[0.65rem] text-[var(--color-on-surface-muted)] transition-colors hover:text-[var(--color-accent-cyan)]"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/arbms/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-body)] text-[0.65rem] text-[var(--color-on-surface-muted)] transition-colors hover:text-[var(--color-accent-cyan)]"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="mailto:abdul.rafi.mdsalleh@hotmail.com"
            className="font-[family-name:var(--font-body)] text-[0.65rem] text-[var(--color-on-surface-muted)] transition-colors hover:text-[var(--color-accent-cyan)]"
            aria-label="Email"
          >
            Email
          </a>
        </div>
        <div className="font-[family-name:var(--font-body)] text-[0.65rem] text-[var(--color-on-surface-muted)]">
          Created by @Abdul Rafi{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
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
