<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This is Next.js **16.2.4** — breaking changes, new APIs, and different conventions from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Biome check (lint + format validation)
npm run format   # Biome format --write
```

There is **no typecheck script**. Biome handles lint + format only. TypeScript is validated at build time (next build).

## Tech Stack

- **Next.js 16.2.4** (App Router, React 19.2.4, Server Components by default)
- **Tailwind CSS 4** — uses `@import "tailwindcss"` in CSS, configured via `@tailwindcss/postcss` in PostCSS. No `tailwind.config.ts`.
- **Three.js + @react-three/fiber + @react-three/drei** for the 3D node scene
- **motion** (animation library, formerly framer-motion)
- **Biome 2.2.0** for linting and formatting (no ESLint, no Prettier)

## Architecture

Single-page portfolio app with a 3D interactive node network:

```
app/
  layout.tsx          # Root layout: fonts (Space Grotesk, Geist Mono), metadata, <html>/<body>
  page.tsx            # Home page — renders <PortfolioExperience />
  globals.css         # Tailwind 4 import + CSS custom properties + utility classes

components/portfolio/
  PortfolioExperience.tsx   # "use client" — entry point, hover context provider, event handlers
  NodeScene.tsx             # Three.js canvas (R3F), dynamic import with ssr:false
  portfolio-hover-context.tsx  # React context for hover/focus/selection state
  CustomCursor.tsx          # Custom cursor (hidden via body { cursor: none })
  DetailPanel.tsx           # Side panel shown when a node is selected
  NodePopup.tsx             # Hover popup on satellite nodes
  NavBar.tsx                # Top navigation
  RippleTrail.tsx           # Visual effect
  SpaceBackground.tsx       # Background particles/stars
  nodes/                    # 3D node components (MainHubNode, SatelliteNode, ConnectionLines)

lib/
  portfolioData.ts          # All portfolio content, typed with TypeScript
```

Only one route (`/`). No API routes, no page-based routing complexity.

## Conventions

- **All interactive React components** must have `"use client"` at the top — Next.js 16 defaults to Server Components.
- **Dynamic imports with `ssr: false`** for Three.js code (`NodeScene`). R3F canvas crashes when SSR'd.
- **CSS variables for theming**: custom `--color-*` and `--font-*` tokens in `globals.css` used alongside Tailwind. Do NOT use `var()` inside Tailwind `className` — use it in `<style>` or CSS files only.
- **Biome organizes imports** automatically on save (`"organizeImports": "on"`).
- **`@/*`** path alias maps to the project root.
- **No tests** configured. Build is the primary verification step.
- **DESIGN.md** defines the visual language ("Ethereal Nexus" — cyber-minimalism, cyan/obsidian palette, glassmorphism, node-link graph). Consult it for styling decisions.
