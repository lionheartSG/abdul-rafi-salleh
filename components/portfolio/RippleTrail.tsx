"use client";

import { useEffect, useRef } from "react";

const MAX_RIPPLES = 30;
const RIPPLE_INTERVAL = 50;
const TOUCH_BURST = 6;
const MAX_RADIUS = 140;
const LINE_WIDTH = 1.6;

type Ripple = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

export function RippleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const isTouchRef = useRef(false);
  const touchSpawnedRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouchStart = (e: TouchEvent) => {
      isTouchRef.current = true;
      touchSpawnedRef.current = false;
      const t = e.touches[0];
      mouseRef.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = () => {
      isTouchRef.current = false;
      mouseRef.current = { x: -100, y: -100 };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ripples: Ripple[] = [];
    let lastSpawn = 0;
    let frame = 0;

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);

      const { x, y } = mouseRef.current;

      if (x > 0 && y > 0) {
        if (isTouchRef.current) {
          if (!touchSpawnedRef.current) {
            for (let i = 0; i < TOUCH_BURST; i++) {
              ripples.push({ x, y, radius: i * 4, alpha: 0.4 });
            }
            touchSpawnedRef.current = true;
          }
        } else if (time - lastSpawn >= RIPPLE_INTERVAL) {
          ripples.push({ x, y, radius: 0, alpha: 0.4 });
          lastSpawn = time;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.5;
        r.alpha -= 0.0035;

        if (r.alpha <= 0 || r.radius > MAX_RADIUS) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.alpha})`;
        ctx.lineWidth = LINE_WIDTH;
        ctx.stroke();
      }

      if (ripples.length > MAX_RIPPLES) {
        ripples.splice(0, ripples.length - MAX_RIPPLES);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden
    />
  );
}
