# Portfolio Landing

Responsive portfolio landing page built with Next.js, React, TypeScript, and Tailwind CSS.

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
npm run start
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
