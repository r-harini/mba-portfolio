# Harini Ramesh Chandran — Portfolio

Personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Lenis.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Hosting | Vercel |
| Content | Google Sheets + Docs + Drive (Phase 2) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/app
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Homepage (composes all sections)
  globals.css         # Design tokens, Tailwind base

/components
  /home
    Navbar.tsx        # Sticky nav, active section tracking
    Hero.tsx          # 60/40 split hero, staggered entrance
    MetricsStrip.tsx  # Dark impact metrics band
  /ui
    SmoothScroll.tsx  # Lenis wrapper
    PortraitPlaceholder.tsx  # Swap for Next/Image when photo is ready
```

## Design Tokens

| Token | Value |
|---|---|
| Background | `#F8F7F4` |
| Primary text | `#111111` |
| Secondary text | `#555550` |
| Muted text | `#999994` |
| Accent (Forest Green) | `#1F4D3A` |
| Green light (bg tint) | `#E8F0EC` |
| Heading font | Instrument Serif |
| Body font | Inter |

## Swapping the Portrait

In `components/ui/PortraitPlaceholder.tsx`, replace the component contents with:

```tsx
import Image from "next/image";

export function PortraitPlaceholder() {
  return (
    <Image
      src="https://lh3.googleusercontent.com/d/{YOUR_DRIVE_FILE_ID}"
      fill
      alt="Harini Ramesh Chandran"
      className="object-cover object-top"
      priority
    />
  );
}
```

Also add the Drive hostname to `next.config.ts` (already included).

## Deployment

Push to GitHub → import repo in [Vercel](https://vercel.com) → deploy. Zero config needed.

## Pages Roadmap

- [x] Homepage (Hero + Metrics)
- [ ] Selected Work grid
- [ ] Project detail pages
- [ ] Experience
- [ ] About
- [ ] Beyond Work
- [ ] Contact
