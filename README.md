# Balaji Manokaran — Portfolio (Next.js + shadcn + Aceternity-style 3D)

Real 3D, real shadcn conventions, still deployed free on GitHub Pages via a
Next.js **static export** + GitHub Actions.

## What's in here

- **Next.js 14** (App Router, TypeScript), static-exported (`output: "export"`) —
  builds to plain HTML/CSS/JS, same as any GitHub Pages site.
- **Tailwind CSS**, configured with `components.json` in the standard shadcn
  layout (`lib/utils.ts` → `cn()`, path aliases, etc.) so any future
  `npx shadcn add <component>` drops straight in.
- **Aceternity-pattern 3D Card** (`components/ui/3d-card.tsx`) — the same
  `CardContainer` / `CardBody` / `CardItem` API as Aceternity's `3d-card`
  registry component (mouse-driven perspective tilt via `rotateX/rotateY`
  and layered `translateZ`). Used on: the hero mascot, your photo in About,
  and every project card.
- **Scroll-reactive 3D background** (`components/scroll-3d-background.tsx`) —
  a raw `three.js` wireframe globe + particle field, styled to match the
  site's blueprint theme, that rotates continuously and tilts/dollies as you
  scroll the page.
- **Original mascot avatar** (`components/mascot-avatar.tsx`) — an SVG
  creature whose eyes track your cursor anywhere on the page, sitting at the
  hub of the hero's circuit diagram.
- Your real photo (`public/avatar-photo.jpg`, resized/compressed from the
  upload) as the About-section avatar, inside a tilting 3D card.

### Why hand-written instead of `npx shadcn add @aceternity/...`

My build sandbox can't reach `ui.aceternity.com` (it's not on the allowed
network list), so I wrote the same open, MIT-licensed component pattern
Aceternity's docs ship (Aceternity is explicitly a copy-paste component
library — this is the intended usage). Functionally identical, and it meant
I could actually run `npm run build` here and confirm it compiles before
handing it to you, rather than giving you untested code. If you want to pull
newer Aceternity components later, `components.json` is already set up for
the shadcn CLI — just run it from a machine with normal internet access.

## Local development

```bash
npm install
npm run dev
```
Visit `http://localhost:3000`.

## Deploying (GitHub Actions → GitHub Pages, fully automatic)

1. Push this project to your `praveshbalaji/praveshbalaji` repo (root of the repo, not a subfolder):
   ```bash
   git clone https://github.com/praveshbalaji/praveshbalaji.git
   cd praveshbalaji
   # copy all files from this project in, including the hidden .github/ folder
   git add .
   git commit -m "Rebuild portfolio with Next.js + 3D components"
   git push origin main
   ```

2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**
   (not "Deploy from a branch" — the workflow handles the build itself).

3. Push triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build`
   and publishes the `out/` folder. First deploy takes ~1-2 minutes; check the
   **Actions** tab for progress.

4. Site goes live at: **https://praveshbalaji.github.io/praveshbalaji/**

## If you ever rename the repo to `praveshbalaji.github.io` (root user page)

Edit `.github/workflows/deploy.yml` and change:
```yaml
env:
  BASE_PATH: /praveshbalaji
```
to
```yaml
env:
  BASE_PATH: ""
```

## Before you push — same 2 things as last time

`components/contact.tsx` has placeholder links:
1. **LinkedIn URL** — confirm/replace `linkedin.com/in/praveshbalaji`
2. **GitHub URL** — confirm `github.com/praveshbalaji` is correct

## Performance note

The 3D background and tilt cards are GPU-light (a few hundred points, no
textures) and respect `prefers-reduced-motion`. If you add heavier 3D later,
consider lazy-mounting `Scroll3DBackground` below the fold.
