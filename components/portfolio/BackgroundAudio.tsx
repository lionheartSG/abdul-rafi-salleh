"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || started) return;
    audio.volume = 0.12;
    audio.loop = true;
    audio
      .play()
      .then(() => {
        setStarted(true);
        setMuted(false);
      })
      .catch(() => {
        // Browser blocked autoplay, will retry on next interaction
      });
  }, [started]);

  useEffect(() => {
    const onInteract = () => tryPlay();
    document.addEventListener("click", onInteract, { once: false });
    document.addEventListener("touchstart", onInteract, { once: false });
    return () => {
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
    };
  }, [tryPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !started) return;
    audio.muted = muted;
  }, [muted, started]);

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: ambient background audio */}
      <audio ref={audioRef} src="/space.mp3" preload="auto" />
      {started ? (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="fixed bottom-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-accent-cyan)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-glass)_85%,transparent)] text-[0.65rem] text-[var(--color-on-surface-muted)] backdrop-blur-md transition-all hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]"
          aria-label={
            muted ? "Unmute background music" : "Mute background music"
          }
        >
          {muted ? "♪" : "♫"}
        </button>
      ) : null}
    </>
  );
}
