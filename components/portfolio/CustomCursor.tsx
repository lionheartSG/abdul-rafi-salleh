"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePortfolioHover } from "./portfolio-hover-context";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isDOMPointer, setIsDOMPointer] = useState(false);
  const { hoveredNodeId } = usePortfolioHover();
  const isPointer = hoveredNodeId !== null || isDOMPointer;

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);
    if (hasTouch) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const target = e.target as HTMLElement;
      setIsDOMPointer(
        target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.getAttribute("role") === "button",
      );
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] flex items-center justify-center"
      animate={{
        left: pos.x,
        top: pos.y,
        width: isPointer ? 36 : 20,
        height: isPointer ? 36 : 20,
        opacity: visible ? 0.7 : 0,
      }}
      transition={{
        left: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 },
        top: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 },
        width: { type: "spring", stiffness: 400, damping: 25 },
        height: { type: "spring", stiffness: 400, damping: 25 },
      }}
      style={{ translateX: "-50%", translateY: "-50%" }}
    >
      <div
        className={`h-full w-full rounded-full border transition-colors duration-200 ${
          isPointer
            ? "border-[var(--color-accent-cyan)] bg-[color-mix(in_srgb,var(--color-accent-cyan)_10%,transparent)]"
            : "border-[color-mix(in_srgb,var(--color-accent-cyan)_55%,transparent)]"
        }`}
      />
    </motion.div>
  );
}
