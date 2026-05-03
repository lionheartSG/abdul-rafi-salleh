"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { BackgroundAudio } from "./BackgroundAudio";
import { CustomCursor } from "./CustomCursor";
import { DetailPanel } from "./DetailPanel";
import { LoadingScreen } from "./LoadingScreen";
import { NodePopup } from "./NodePopup";
import {
  PortfolioHoverProvider,
  usePortfolioHover,
} from "./portfolio-hover-context";
import { RippleTrail } from "./RippleTrail";
import { SpaceBackground } from "./SpaceBackground";

const NodeScene = dynamic(() => import("./NodeScene"), {
  ssr: false,
  loading: () => <LoadingScreen />,
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
      <RippleTrail />
      <div className="relative z-10 h-full w-full">
        <NodeScene />
      </div>
      <NodePopup />
      <DetailPanel />
      <CustomCursor />
      <BackgroundAudio />

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
