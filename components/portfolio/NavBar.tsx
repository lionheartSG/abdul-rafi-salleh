"use client";

import { motion } from "motion/react";
import { CENTER_NODE_ID, portfolioNodes } from "@/lib/portfolioData";
import { usePortfolioHover } from "./portfolio-hover-context";

const navLinks = [
  { label: "About", nodeId: CENTER_NODE_ID },
  { label: "Skills", nodeId: "fullstack" },
  { label: "Projects", nodeId: "projects" },
  { label: "Contact", nodeId: "contact" },
];

export function NavBar() {
  const { setSelectedNodeId, setFocusedNodeId } = usePortfolioHover();

  const handleNavClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setFocusedNodeId(nodeId);
  };

  const handleReset = () => {
    setSelectedNodeId(null);
    setFocusedNodeId(null);
  };

  const centerNode = portfolioNodes.find((n) => n.isCenter);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      className="fixed left-1/2 top-0 z-50 flex w-full max-w-2xl -translate-x-1/2 items-center justify-between rounded-b-xl border border-[color-mix(in_srgb,var(--color-accent-cyan)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-glass)_82%,transparent)] px-6 py-3 backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={handleReset}
        className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-[var(--color-on-surface)] transition-colors hover:text-[var(--color-accent-cyan)]"
      >
        {centerNode?.shortLabel ?? "Home"}
      </button>

      <ul className="flex items-center gap-6">
        {navLinks.map(({ label, nodeId }) => (
          <li key={nodeId}>
            <button
              type="button"
              onClick={() => handleNavClick(nodeId)}
              className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-on-surface-muted)] transition-colors hover:text-[var(--color-accent-cyan)]"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
