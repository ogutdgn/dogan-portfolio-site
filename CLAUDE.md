# CLAUDE.md — ogutdgn Workspace

This file is the source of truth for all development on this workspace.
Read this fully before touching any code.

---

## 1. Workspace Overview

Two independent Next.js 14 (App Router) sites deployed on Vercel, both backed by the same Sanity instance.

| Site | Domain | Purpose |
|---|---|---|
| `dogan-portfolio-site` | ogutdgn.com | Personal portfolio — projects, blogs, contact |
| `tools-site` | tools.ogutdgn.com | Tool showcase — embedded interactive tools |

**Sanity Studio**: ogutdgn.sanity.studio (external, not the `/studio` route in the codebase)
**Sanity Project**: `ru03qs5h` / Dataset: `portfolio`

The portfolio site's embedded `/studio` route is unused. Do not touch or expand it.

---

## 2. Tech Stack

### dogan-portfolio-site

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2.35, App Router, TypeScript |
| Styling | Tailwind CSS 3, CSS variables (HSL), dark/light mode via `ThemeProvider` |
| Components | shadcn/ui (Radix UI primitives) — copy-paste into `/components/ui/` |
| Icons | lucide-react |
| Fonts | Geist |
| CMS | Sanity v4 via next-sanity v10 |
| Email | Resend + react-email (contact form at `/api/contact`) |
| Analytics | Google Analytics via GTM (`G-J88MJY25NL`) in root layout |
| Forms | react-hook-form + zod + @hookform/resolvers |
| Rich Text | react-syntax-highlighter (Prism) for code blocks |

### tools-site

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2.16, App Router, TypeScript |
| Styling | Tailwind CSS 3, custom neon/cyberpunk theme (defined in `tailwind.config.ts`) |
| Components | No component library — custom Tailwind components only |
| Icons | lucide-react |
| Fonts | Geist Sans + Geist Mono |
| CMS | Sanity v4 via next-sanity v10 |
| Rich Text | @portabletext/react |
| Embedded Tools | Registry pattern at `app/[slug]/tools/index.ts` |

**Note**: `styled-components` is installed in tools-site but never used. Remove it next cleanup.

---

## 3. Sanity CMS

### Studio
Access at **ogutdgn.sanity.studio** — not through the website. Content is managed there directly.

### Schemas (all defined in `dogan-portfolio-site/sanity/schemas/`)

| Schema | Used by | Key fields |
|---|---|---|
| `project` | portfolio | title, slug, overview, image, technologies, mainCategory, tags, githubLink, liveLink, content |
| `blog` | portfolio | title, slug, publishedAt, description, readingTime, mainImage, mainCategory, tags, content |
| `tool` | both | title, slug, tagline, icon, category, hostType, toolType, status, technologies, tags, content |
| `toolCategory` | tools-site | title, slug (orderable) |

### Known Schema Inconsistency
`tags` in `blog.ts` and `project.ts` is missing `options: { layout: 'tags' }`.
The tool schema has it correctly. This should be fixed — it affects the Studio editing experience.

**Fix**: Add `options: { layout: 'tags' }` to the tags field in both `blog.ts` and `project.ts`.

### GROQ Queries
- Portfolio queries: `dogan-portfolio-site/sanity/sanity.queries.ts`
- Tools queries: `tools-site/lib/queries.ts`
- Test queries in Sanity Vision tool at the studio

### Image URLs
- Portfolio: `sanity/sanity.image.ts` exports `urlForImage()`
- Tools: `lib/sanity.ts` exports `urlFor()`

---

## 4. Data Fetching & Caching

### Current State (as of April 2026)

| Page | Strategy | Problem |
|---|---|---|
| Portfolio all pages | `revalidate = 0` (force-dynamic) | Every visit hits Sanity API directly. Slow. |
| Tools home + detail | `revalidate = 30` | Polls Sanity every 30s regardless of changes. Wasteful. |
| Portfolio API routes | `cache: 'no-store'` | Same issue — no caching at all. |

**Root cause**: No Sanity webhook setup. Revalidation timers are a workaround, not a solution.

### Target State: On-Demand Revalidation

The correct architecture:
1. Pages use `revalidate = false` (cached indefinitely, or a long fallback like 3600s)
2. Sanity Studio has a webhook configured → on publish, it calls a Next.js API route
3. That route calls `revalidateTag()` or `revalidatePath()` to bust only the affected pages
4. Result: instant updates on publish, fast cached pages at all other times

**To implement**:
- Create `app/api/revalidate/route.ts` in each site
- Add `SANITY_REVALIDATE_SECRET` env var (a random string you set in both Vercel and Sanity webhook config)
- Configure webhook in Sanity Studio dashboard pointing to `https://ogutdgn.com/api/revalidate`
- Use `next-sanity`'s built-in webhook helpers — they handle GROQ projection and tag-based invalidation

Until webhooks are implemented, use these interim values:
- Portfolio: `revalidate = 60` (not 0 — there is no reason to be fully dynamic)
- Tools: `revalidate = 120` (content changes ~1x/week, 30s is excessive)

### Sanity Client Settings

**tools-site** has `useCdn: false` — this bypasses Sanity's edge CDN and hits the origin API directly.
Change to `useCdn: true` for read queries (fetches on published content). Only use `useCdn: false` for draft previews.

---

## 5. SEO — Not Yet Implemented

This is the highest-impact missing feature. With 3 blog posts/week on technical topics, there is real organic search opportunity being left unused.

### What is missing
- Per-page `<title>` and `<meta description>` (only global defaults exist)
- Open Graph tags (`og:title`, `og:description`, `og:image`) — links shared on LinkedIn/Twitter show no preview
- `<link rel="canonical">` — critical for when cross-posting to Medium so Google knows ogutdgn.com is the original
- `sitemap.xml` — Google cannot efficiently crawl the site without it
- `robots.txt` — not configured
- JSON-LD structured data — for blog posts, this can get rich snippets in Google results

### Implementation Plan (when working on SEO)

**Step 1 — Per-page metadata** (do this first, highest impact)
Use Next.js `generateMetadata()` in each dynamic route page. Pull title/description from Sanity data.

```ts
// Pattern for blog/[slug]/page.tsx and project/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug)
  return {
    title: `${post.title} | Dogan Ogut`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: urlForImage(post.mainImage).url() }],
      type: 'article',
    },
    alternates: {
      canonical: `https://ogutdgn.com/blog/${params.slug}`,
    },
  }
}
```

**Step 2 — Sitemap**
Create `app/sitemap.ts` in portfolio — Next.js generates `/sitemap.xml` automatically.
Fetch all published blog slugs + project slugs from Sanity and return them.

**Step 3 — robots.txt**
Create `app/robots.ts` — simple, allow all, point to sitemap.

**Step 4 — JSON-LD for blog posts**
Add a `<script type="application/ld+json">` block to blog detail pages with `Article` schema.
This enables rich results (author, date, headline) in Google Search.

**Step 5 — tools-site SEO**
Same pattern — per-page metadata for each tool detail page.
The tools site already has basic OG tags in the root layout but nothing per-page.

### Canonical URLs (for Medium cross-posting)
When you later publish blogs on Medium, Medium allows setting a canonical URL.
Set it to `https://ogutdgn.com/blog/[slug]` so Google treats your site as the original.
This requires the canonical tag to already be in place on your site first.

---

## 6. Routing Structure

### dogan-portfolio-site

```
/                        → Home (sections: hero, projects, blogs, contact)
/projects                → All projects list
/project/[slug]          → Project detail
/blogs                   → All blogs list
/blog/[slug]             → Blog detail
/api/projects            → GET all projects
/api/projects/[slug]     → GET single project
/api/blogs               → GET all blogs
/api/blogs/[slug]        → GET single blog
/api/contact             → POST contact form (Resend)
/studio                  → Unused — Sanity Studio is at ogutdgn.sanity.studio
```

### tools-site

```
/                        → Home (tool grid with category filter)
/[slug]                  → Tool detail (ISR + generateStaticParams for internal tools)
/api/tools               → GET all tools
/api/tools/[slug]        → GET single tool
/api/categories          → GET all categories
```

### Embedded Tools (tools-site)
Internal tools render a React component inside the tool detail page.
Registry: `app/[slug]/tools/index.ts`
Add new tools: create `app/[slug]/tools/[tool-name].tsx` and register in `TOOL_COMPONENTS`.
Only tools with `hostType: "internal"` use this system.

**How to add a new embedded tool — step by step:**

1. **Build the tool as a self-contained React component** at:
   `tools-site/app/[slug]/tools/[your-tool-slug].tsx`
   - Must be a default export
   - No props — the component manages its own state
   - Use Tailwind classes + the existing neon color palette (no new libraries)
   - The component renders inside the tool detail page under a "Try it" heading

2. **Register it in the registry** at `tools-site/app/[slug]/tools/index.ts`:
   ```ts
   import YourTool from './your-tool-slug'
   export const TOOL_COMPONENTS: Record<string, ComponentType<any>> = {
     'inter-arrival-sampler': InterArrivalSampler,
     'your-tool-slug': YourTool,  // add here
   }
   ```
   The key **must exactly match** the tool's `slug.current` value in Sanity.

3. **Set up the Sanity record** at ogutdgn.sanity.studio:
   - Set `hostType` to `internal`
   - Set the `slug` to match the registry key exactly
   - Fill in title, tagline, overview, toolType, status, technologies, tags
   - No `liveLink` needed — the "Open Tool" button is hidden for internal tools automatically

4. **That's it.** `generateStaticParams` picks up internal tools automatically. No other files to touch.

---

## 7. Styling & Components

### dogan-portfolio-site
- Theme: dark/light mode, HSL CSS variables defined in `app/globals.css`
- New shadcn components: run `npx shadcn@latest add [component]` — installs to `/components/ui/`
- Custom components: `/components/` (not in `/ui/`)
- Tailwind config: dark mode is class-based, extended with CSS variable color names

### tools-site
- Theme: fixed dark neon/cyberpunk — no light mode
- Color palette defined in `tailwind.config.ts`: `void`, `surface`, neon accents (purple, cyan, green, orange, yellow, pink, red)
- No component library — build with Tailwind classes directly
- Custom animations in `tailwind.config.ts`: `pulse_dot`, `flicker`, `scan`, `glow-pulse`, `float`, `slide-up`
- Do not introduce a component library to tools-site — the aesthetic is intentional and custom

### General Rules
- All new components go in `/components/`
- No inline styles — use Tailwind classes
- No new CSS files unless absolutely necessary — use Tailwind or extend `globals.css`

---

## 8. Known Issues & Tech Debt

These are real problems, not hypothetical. Address them when relevant, not all at once.

| Issue | Site | Priority | Fix |
|---|---|---|---|
| `revalidate = 0` on all pages | portfolio | High | Implement webhooks or set `revalidate = 60` as interim |
| No SEO metadata | both | High | Implement `generateMetadata()` per page |
| No sitemap | both | High | Add `app/sitemap.ts` |
| `useCdn: false` | tools | Medium | Change to `true` for published content reads |
| `typescript: ignoreBuildErrors: true` | portfolio | Medium | Remove — fix the underlying TS errors |
| `eslint: ignoreDuringBuilds: true` | portfolio | Medium | Remove after fixing lint errors |
| `images: { unoptimized: true }` | portfolio | Medium | Remove — use `remotePatterns` for `cdn.sanity.io` instead |
| `styled-components` unused | tools | Low | Remove from `package.json` |
| `/studio` route unused | portfolio | Low | Remove `sanity.config.ts` and studio route |
| Blog/project tag field UI | portfolio | Low | Add `options: { layout: 'tags' }` to `blog.ts` and `project.ts` |
| No shared Sanity client | both | Low | Not urgent — only matters if a third site is added |

---

## 9. Environment Variables

### dogan-portfolio-site
```
SANITY_API_TOKEN          # Sanity read token
RESEND_API_KEY            # Resend email API key
CONTACT_EMAIL             # Destination email (defaults to doganogut0@gmail.com)
```

### tools-site
```
SANITY_API_TOKEN          # Sanity read token
SANITY_PROJECT_ID         # ru03qs5h
SANITY_DATASET            # portfolio
```

### To add (when implementing webhooks)
```
SANITY_REVALIDATE_SECRET  # Random secret string, set in both Vercel and Sanity webhook config
```

All `.env` files are gitignored. Never commit tokens.

---

## 10. Content Cadence

| Content Type | Frequency | Notes |
|---|---|---|
| Blog posts | ~3/week | Primary SEO opportunity |
| Projects | Occasional | When a project is finished |
| Tools | ~1/week | Both external showcases and embedded internal tools |

Content is added entirely through Sanity Studio — no code changes needed for new content.
The only exception is embedded tools, which require a new React component.

---

## 11. Future Plans (Out of Current Scope)

**Portfolio Management Platform**: A separate project that will centralize portfolio management — projects, blogs, tools, education — with an API and multi-platform publishing (Medium, etc.). When scoping features for the current sites, do not build toward this prematurely. Keep the current sites simple.

**Medium Cross-posting**: Will be part of the platform project. When implemented, canonical URLs must already be in place on ogutdgn.com.

---

## 12. How to Work With Me (Claude Instructions)

**Before writing any code:**
1. Read the relevant files first — do not assume structure
2. Present a clear plan: what files will be touched, what libraries (if any) will be used, what the approach is
3. Wait for approval before implementing

**Code style:**
- No over-engineering — solve the exact problem, nothing more
- No speculative abstractions — do not build helpers "for future use"
- No comments unless the logic is genuinely non-obvious
- No extra error handling for cases that cannot happen
- Do not refactor surrounding code that wasn't asked about
- Do not add features that weren't asked for

**Be realistic:**
- If something has a real tradeoff, say it
- If a quick fix is technically wrong, say so and explain the correct approach
- Do not sugarcoat problems in the codebase

**Component preference:**
- Portfolio: use shadcn/ui components where possible (`npx shadcn@latest add`)
- Tools: build with Tailwind directly, no new libraries

**When adding a new page or feature:**
- Check if a similar pattern already exists in the codebase and follow it
- Match the existing naming conventions, folder structure, and import style
- Do not introduce new state management, new styling approaches, or new libraries without discussion

**Git commits:**
- Never include "Co-Authored-By: Claude", "Generated by Claude", or any AI attribution in commit messages
- Write commit messages as if the developer wrote the code themselves
- Keep commit messages short and descriptive: what changed and why, nothing about tooling
