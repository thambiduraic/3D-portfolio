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
- Tailwind CSS 4 via `@tailwindcss/vite` plugin — imported with `@import "tailwindcss"` in `src/styles/globals.css`. There is no `tailwind.config.js`. Arbitrary values like `bg-[#07090e]` are used throughout.
- Framer Motion (animation), lucide-react (icons)
- npm + `package-lock.json`; `"type": "module"`
- Dark theme: `#07090e` background, sky `#38bdf8` accent (CSS variables in `globals.css`)

## Entrypoints & architecture (actual layout)

- `index.html` → `/src/main.tsx` → `src/App.tsx` (strict mode, mounts at `#root`)
- `src/components/layout/` — SiteHeader, SiteFooter, Container
- `src/components/ui/` — Button, Icons, SectionHeading
- `src/components/three/` — **empty** (no Three.js installed; don't add 3D without checking deps)
- `src/sections/` — Hero, Projects, Experience, Skills, About, Contact
- `src/data/portfolioData.ts` — single source of truth for all content (personal info, nav, projects, experience, skills, social links)
- `src/types/portfolio.ts` — TS interfaces
- `src/lib/utils.ts` — `cn()` helper
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