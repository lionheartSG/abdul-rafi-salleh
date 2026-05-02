"use client";

import { usePortfolioHover } from "./portfolio-hover-context";

/**
 * Mouse-reactive “space-time” layer: parallax gradients + subtle grid warp (CSS).
 */
export function SpaceBackground() {
  const { pointerNorm } = usePortfolioHover();
  const dx = pointerNorm.x * 18;
  const dy = pointerNorm.y * 14;
  const rot = pointerNorm.x * 4 + pointerNorm.y * 2;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-[-12%] opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at ${50 + pointerNorm.x * 8}% ${45 + pointerNorm.y * 6}%,
              color-mix(in srgb, var(--color-accent-cyan) 22%, transparent) 0%,
              transparent 55%),
            radial-gradient(ellipse 70% 50% at ${30 - pointerNorm.x * 10}% ${70 - pointerNorm.y * 8}%,
              color-mix(in srgb, var(--color-accent-purple) 18%, transparent) 0%,
              transparent 50%),
            radial-gradient(circle at 50% 100%,
              color-mix(in srgb, var(--color-accent-green) 8%, transparent),
              transparent 45%),
            var(--color-bg-deep)
          `,
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(1.04)`,
          transition: "transform 80ms ease-out",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--color-accent-cyan) 40%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 40%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: `perspective(900px) rotateX(${2 + pointerNorm.y * 3}deg) rotateY(${-3 + pointerNorm.x * 4}deg) translateZ(0)`,
          transformOrigin: "50% 50%",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-screen opacity-[0.12]"
        style={{
          background: `conic-gradient(from ${rot}deg at 50% 50%,
            transparent 0deg,
            color-mix(in srgb, var(--color-accent-cyan) 35%, transparent) 60deg,
            transparent 120deg,
            color-mix(in srgb, var(--color-accent-purple) 30%, transparent) 200deg,
            transparent 360deg)`,
        }}
      />
    </div>
  );
}
