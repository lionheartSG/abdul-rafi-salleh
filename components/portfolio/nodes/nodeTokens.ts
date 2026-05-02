/**
 * Stitch / CODE.md Ethereal Nexus tokens for 3D nodes (hex for Three.js).
 * @see CODE.md — central hub uses primary-container; satellites use secondary / accents.
 */

export const stitchColors = {
  /** surface-container-lowest */
  surfaceLowest: "#070e1b",
  /** surface-container-low */
  surfaceLow: "#151c29",
  /** primary-container — ring / hub accent */
  primaryContainer: "#00f0ff",
  /** primary-fixed — headline glow */
  primaryFixed: "#7df4ff",
  /** primary-fixed-dim — emissive core */
  primaryFixedDim: "#00dbe9",
  /** primary on dark */
  primary: "#dbfcff",
  /** secondary — satellite ring (purple family) */
  secondary: "#ebb2ff",
  secondaryFixed: "#f8d8ff",
  /** tertiary / success green */
  tertiaryContainer: "#33fb0a",
  tertiary: "#e1ffd1",
} as const;

export type AccentKey = "cyan" | "purple" | "green";

/** Emissive + base body for sphere “disc” fill (Stitch glass-on-dark). */
export const accentSphereStyle: Record<
  AccentKey,
  { base: string; emissive: string; ring: string; iconColor: string }
> = {
  cyan: {
    base: "#0a1a22",
    emissive: stitchColors.primaryFixedDim,
    ring: stitchColors.primaryContainer,
    iconColor: stitchColors.primaryFixed,
  },
  purple: {
    base: "#1a0f24",
    emissive: "#c084fc",
    ring: stitchColors.secondary,
    iconColor: stitchColors.secondaryFixed,
  },
  green: {
    base: "#0f1a0f",
    emissive: "#4ade80",
    ring: stitchColors.tertiaryContainer,
    iconColor: stitchColors.tertiary,
  },
};
