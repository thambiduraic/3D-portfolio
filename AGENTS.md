# AGENTS.md — 3D Portfolio

Personal portfolio site (React 19 + TypeScript + Vite 8). Compact guidance for agents.

## Commands (exact, from package.json)

| Command | Effect |
|---|---|
| `npm run dev` | Start Vite dev server (`vite`) |
| `npm run build` | `tsc -b && vite build` — typecheck via project references, then build to `dist/` |
| `npm run lint` | `eslint .` (flat config in `eslint.config.js`, ignores `dist`) |
| `npm run preview` | Preview production build (`vite preview`) |

No `test` or `typecheck` script exists. Typechecking runs inside `build` via `tsc -b`. Do not run `npm test`.

## Stack (verified in package.json)

- React 19, TypeScript ~6.0.2, Vite 8, ESLint flat config
- Tailwind CSS 4 via `@tailwindcss/vite` plugin — imported with `@import "tailwindcss"` in `src/styles/globals.css`. There is no `tailwind.config.js`. UI colors use CSS variables mapped through `@theme inline`; avoid hardcoding theme colors in components.
- Framer Motion + GSAP/ScrollTrigger (UI transitions and scroll reveals), lucide-react (icons)
- Three.js + `@react-three/fiber` + `@react-three/drei` (full-screen immersive scene, lazy-loaded)
- npm + `package-lock.json`; `"type": "module"`
- Dark/light theme via `data-theme` on `<html>`: dark defaults `#07090e`/`#38bdf8`, light uses `#f4f7fb`/`#0369a1`; choice persists under `portfolio:color-theme`

## Entrypoints & architecture (actual layout)

- `index.html` → `/src/main.tsx` → `src/App.tsx` (strict mode, mounts at `#root`; inline theme pre-paint script)
- `src/App.tsx` — theme + portfolio mode shell: lazy immersive mode or classic DOM mode + persistent `ModeToggle` with theme switch
- `src/context/` — `ThemeProvider`/`useTheme` (dark/light persistence) and `PortfolioModeProvider`/`usePortfolioMode` (mode, active immersive section, localStorage persistence)
- `src/components/layout/` — SiteHeader, SiteFooter, Container
- `src/components/ui/` — Button, Icons, SectionHeading, ModeToggle, ProfileCard (static classic hero)
- `src/components/immersive/` — ImmersivePortfolio, ImmersiveHeader, ImmersivePanel
- `src/components/three/` — ImmersiveVisual, lazy-loaded ImmersiveScene, CameraRig, FramePacer, ImmersiveNode, NodeConnection, ScenePipeline, AmbientShards, ParticleField, SceneFallback, sceneTheme; `HeroVisual`/`ResumeScene`/`TechCore` remain from the earlier hero scene but are no longer mounted
- `src/components/animation/` — GSAP `Reveal` wrapper
- `src/hooks/` — `usePrefersReducedMotion`, `useSceneActive` (pauses rendering off-screen), `useImmersiveLayout` (safe-area measurement + side-panel layout)
- `src/sections/` — classic Hero, Projects, Experience, Skills, About, Contact
- `src/data/portfolioData.ts` — single source of truth for all content (personal info, immersive nav, projects, experience, skills, social links)
- `src/types/portfolio.ts` — TS types (`PortfolioMode`, `ColorTheme`, `ImmersiveSectionId`, `ImmersiveSafeArea`)
- Default display mode: immersive on desktop and tall landscape, classic on phones, short landscape, or when reduced motion is set; user choice persists in `localStorage` under `portfolio:display-mode`.
- Default theme is dark; the `ModeToggle` sun/moon control switches themes and the choice persists under `portfolio:color-theme`.
- Immersive mode is a fixed full-screen R3F canvas with a DOM overlay; active section drives `CameraRig` damping and clickable 3D nodes. The scene palette follows the active theme. Desktop and landscape use a left panel; portrait uses a bottom sheet capped at `52dvh`. `useImmersiveLayout` feeds measured header/panel safe areas to compact camera framing so labels stay clear of the header and controls.
- `src/lib/utils.ts` — `cn()` helper; `src/lib/gsap.ts` — ScrollTrigger registration
- `src/styles/globals.css` — Tailwind import + design tokens
- `src/assets/` — hero.png, react.svg, vite.svg

## TypeScript / build quirks (agents commonly miss these)

- `tsconfig.json` uses project references: `tsconfig.app.json` (`src/`) and `tsconfig.node.json` (`vite.config.ts`). Build runs `tsc -b`, which typechecks both.
- `verbatimModuleSyntax: true` — type-only imports must use `import type`.
- `noUnusedLocals` / `noUnusedParameters: true` — unused imports or variables fail the build.
- `noEmit: true`, `skipLibCheck: true`, `moduleResolution: "bundler"`.
- `eslint.config.js` is a flat config; `dist` is ignored.

## Content rules (from guide.md, enforced in this repo)

- `src/data/portfolioData.ts` is the content source of truth. Edit it for project/experience/skill changes; do not hard-code content in sections.
- **Never invent** employers, projects, metrics, URLs, testimonials, or contact details. Use only verified info (resume/guide.md is the source of truth).
- `guide.md` requires: inspect before modifying, present an implementation plan and wait for approval before coding, never delete/overwrite unrelated work.

## What does not exist here

- No test framework, no `tests/` directory, no test script
- No `.env.example`, no env vars required (if added, prefix `VITE_` for client exposure)
- No `src/app/` folder (README's target architecture doesn't match reality; entrypoints are `src/main.tsx` and `src/App.tsx`)
- `dist/` is gitignored but a pre-built copy exists locally

## Workflow

1. Inspect repo + `guide.md` before changing files.
2. Plan → wait for approval → code.
3. `npm run lint` → `npm run build` (lint first; build includes typecheck).
4. Verify content against `src/data/portfolioData.ts`.

Related instruction file: `guide.md` (full engineering/design standards).