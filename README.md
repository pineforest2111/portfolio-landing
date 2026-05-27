# Portfolio Landing

Responsive portfolio landing page built with Next.js, React, TypeScript, and Tailwind CSS.

## Current Project Notes

This project is a personal portfolio landing page for Roma Osipov. The current implementation includes:

- `about` - first screen with hero title, Telegram contact button, expandable "I'm Roma Osipov" widget, CV and showreel links.
- `works` - projects screen with the `ProjectWidget` UI kit component and project list.
- `myskazka` - case page opened from the `MySkazka` case item.
- `concepts` - concepts wall with lazy-loaded video/image cards and slider behavior.

The main page implementation lives in:

- `components/landing/PortfolioPage.tsx`
- `app/page.tsx`
- `app/globals.css`

Reusable UI kit-derived components live in:

- `components/ui/ContactButton/`
- `components/ui/InfoWidget/`
- `components/ui/NavigationHub/`
- `components/ui/NavigationBar/`
- `components/ui/ProjectWidget/`
- `components/ui/CaseItem/`

Important current assets:

- `public/logo.png` - logo badge used in the expanded About widget.
- `public/images/erbghj 1.png` - desktop hero background.
- `public/images/Mobile BG.png` - mobile hero background.
- `public/images/profile.png` and `public/info-widget-avatar.jpg` - profile/avatar imagery.
- `public/videos/` and `webm videos/` - media used by Concepts and MySkazka case sections.

If local preview ever starts hanging again, first check generated/dependency state rather than redesign code:

```bash
ps -axo pid,ppid,stat,etime,command | rg 'npm|next|http.server|python'
rm -rf .next out
npm install
npm run build
```

For static preview after `npm run build`:

```bash
python3 -m http.server 3000 -d out
```

Open:

```text
http://127.0.0.1:3000/
```

The project was recovered once from a corrupted local working folder. The broken backup was saved outside the active project as:

```text
/Users/romanosipov/Documents/portfolio-landing-broken-20260527-232035
```

The active project path is:

```text
/Users/romanosipov/Documents/portfolio-landing
```

## Requirements

- Node.js 20.9 or newer
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Production Build

```bash
npm run build
```

This project uses static export through `next.config.ts`, so `npm run build` generates the static site in `out/`.

To preview the exported build locally:

```bash
python3 -m http.server 3000 -d out
```

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

- `app/` - Next.js App Router pages, layout, and global styles.
- `components/` - reusable React components used by the landing page.
- `components/ui/` - UI kit components copied into the project.
- `lib/` - small shared utilities.
- `public/` - static images, icons, and SVG assets used by the site.

## Assets

All assets referenced by the landing page are stored inside `public/` so they are included when publishing the repository.

Do not commit generated folders such as `node_modules/`, `.next/`, `.vercel/`, local `.env*` files, or system files. They are ignored by `.gitignore`.
