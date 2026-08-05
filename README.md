# Portfolio — Adil Mahroof

Personal portfolio site for Adil Mahroof, aerospace engineer (rocket propulsion, UAVs, satellite AIT).

**Live:** https://adilmrf.github.io/myPortfolio/

## Stack

- [Next.js 16](https://nextjs.org) (App Router) with `output: "export"` — fully static, no server
- React 19, TypeScript (strict)
- Tailwind CSS v4 (CSS-first config; there is no `tailwind.config` file — theme tokens live in `src/app/globals.css`)
- No other runtime dependencies

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export into ./out
```

To reproduce the production build exactly, with the GitHub Pages base path applied:

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=adilmrf/myPortfolio npm run build
```

## Editing content

All site copy lives in plain TypeScript files under `src/content/` — no CMS, no markdown.

| File | Contains |
| --- | --- |
| `profile.ts` | Name, headline, summary, skills, hobbies, languages, links, homepage highlights |
| `experience.ts` | Roles, with organisation, logo, dates, bullets and tags |
| `education.ts` | Degrees and programmes |
| `projects.ts` | Projects, with responsibilities, results, presentations, tags and links |
| `recommendations.ts` | Referees. **Never put email addresses here** — this file is bundled into the public JS payload and the repository is public. |
| `tags.ts` | Re-exports the canonical tag list from `src/lib/types.ts` |

Tag names are typed. To add a tag, add it to `TAGS` in `src/lib/types.ts` first, or the build will fail.

## Images

`output: "export"` requires `images.unoptimized: true`, so **`next/image` performs no resizing or format conversion** — every byte committed is a byte shipped to visitors. Resize before committing:

```bash
# Photos
magick input.jpg -resize 1600x -quality 80 -strip public/media/projects/<id>/hero.jpg

# Logos
magick input.png -resize 128x -strip public/media/logos/<name>.png

# Video (keep under ~8 MB; anything larger belongs on YouTube)
ffmpeg -i input.mov -vf scale=1280:-2 -c:v libx264 -crf 24 -preset slow -an output.mp4
ffmpeg -i output.mp4 -vframes 1 -q:v 3 poster.jpg
```

Rough budgets: project hero ≤ 250 KB, gallery image ≤ 150 KB, card thumbnail ≤ 60 KB, logo ≤ 20 KB.

## Social share card

`src/app/opengraph-image.png` and `src/app/twitter-image.png` are committed static files, picked up automatically by Next.js's metadata file convention.

They are deliberately *not* generated at build time: under `output: "export"` Next.js's `ImageResponse` route emits an **extensionless** file, which static hosts serve as `application/octet-stream` and social scrapers reject. The source that produced the card is kept at `scripts/og-image.source.tsx`, with regeneration instructions in its header comment.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which lints, builds the static export, and publishes it with the official GitHub Pages actions.

`next.config.ts` reads `GITHUB_REPOSITORY` in CI to set `basePath` and `assetPrefix` to `/myPortfolio`. Anything referencing a file in `public/` must go through `withBasePath()` from `src/lib/assetPath.ts`, or it will 404 in production while working fine locally.
