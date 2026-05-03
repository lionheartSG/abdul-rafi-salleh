"use client";

export function LoadingScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[var(--color-bg-deep)]">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-accent-cyan)] opacity-40" />
        <div className="absolute h-14 w-14 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-accent-purple)] opacity-30 [animation-direction:reverse] [animation-duration:3s]" />
        <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--color-accent-cyan)]">
          ARS
        </span>
      </div>
      <p className="font-[family-name:var(--font-body)] text-sm tracking-wide text-[var(--color-on-surface-muted)]">
        Loading
        <span className="inline-block animate-pulse">...</span>
      </p>
    </div>
  );
}
