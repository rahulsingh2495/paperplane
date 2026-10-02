<p align="center">
  <img src="/img/brand/paperplane-logo.png" alt="Paperplane" height="60" />
</p>

<h3 align="center">Paperplane — Website</h3>

<p align="center">
  Hand-painted murals, sculptures, AR and CGI for brands, cities and public spaces.
  <br />
  Production: <a href="https://paperplane-psi.vercel.app">https://paperplane-psi.vercel.app</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/bun-runtime-f9f1e1?logo=bun&logoColor=black" alt="bun" />
</p>

---

### Tech Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Framework  | Next.js 16 (App Router, static export)            |
| Styling    | Tailwind CSS v4 + shadcn/ui                       |
| Language   | TypeScript 5                                      |
| Runtime    | bun                                               |
| Hosting    | Cloudflare Pages (auto-deploy from `main`)        |
| Forms      | Pixelotech central forms API                      |

### Quick Start

```bash
bun install
bun run dev
```

Open **[localhost:3000](http://localhost:3000)** to view the site.

### Project Structure

```
src/app/           Pages (one folder per route), sitemap, robots, 404
src/components/    ui/ (shadcn) · layout/ (header, footer) · sections/ (page blocks)
src/lib/           site.ts (all business facts) · forms.ts (form submission — do not modify)
public/            Static assets: images, favicon, og-image, _headers
```

Business facts (name, domain, contact, nav) live **only** in `src/lib/site.ts` — edit them there, never inline in components.

### Scripts

```bash
bun run dev       # Start dev server
bun run build     # Static production build → out/
bun run lint      # Run ESLint
```

### Deploying

Push to `main` → Cloudflare Pages builds and deploys automatically. Any other branch gets a preview URL — use previews for client review. **Before merging anything to `main`**, run the production build and the Pixelotech readiness check against `out/`; failures block launch.

### Making Changes

This project follows the **Pixelotech Website Standard** (v1.0.0) — see `CLAUDE.md` / `AGENTS.md` in this repo for the rules that must hold (static export only, forms through the central API, shadcn/ui only). Content-change requests from the client go through the Pixelotech team; there is no CMS by design.

---

<p align="center">
  <sub>Built with care by <a href="https://pixelotech.com">Pixelotech</a> · logic@pixelotech.com</sub>
</p>
