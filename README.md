# موبایل پیشرو | Mobile Pishro

A modern, luxury-styled e-commerce storefront for a digital & electronics retailer (mobiles, laptops, tablets, gaming gear, and accessories), built with the Next.js App Router. Fully RTL, Persian-first, and designed to feel like a premium international storefront rather than a typical template.

> **Status:** Phase 1 — customer-facing frontend complete, running entirely on realistic mock data. No backend, database, or payment credentials are required to run the project. See [Roadmap](#roadmap--future-work) for what's next.

## Live preview

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. *(Add a deployed URL here once hosted, e.g. on Vercel.)*

## Screenshots

<p align="center">
  <img src="docs/screenshots/home-hero.png" alt="Home page hero section" width="100%" />
</p>
<p align="center">
  <img src="docs/screenshots/home-featured.png" alt="Featured products carousel" width="100%" />
</p>
<p align="center">
  <img src="docs/screenshots/home-deals.png" alt="Deal of the day with countdown" width="100%" />
</p>
<p align="center">
  <img src="docs/screenshots/home-testimonials.png" alt="Customer testimonials" width="100%" />
</p>

> More screenshots welcome — the product detail page, cart/checkout flow, and account dashboard are good candidates to add next.

## Overview

Mobile Pishro is a fictional Kerman-based electronics retailer. The project implements the full customer journey of a real online store — browsing, filtering, searching, cart, checkout, authentication, and a customer account dashboard — with an emphasis on smooth motion design, a cohesive dark/light theme, and mobile-first responsive layout.

All product, order, and account data is generated from a typed mock data layer (`src/lib/mock`), designed so it mirrors what a real database schema would look like — making it straightforward to swap in a real backend later without redesigning the UI.

## Key features

- **Home page** — animated hero slider, category grid, featured/best-seller/new-arrival carousels, a "deal of the day" section with a live countdown, brand strip, customer testimonials, blog preview, and an FAQ accordion.
- **Product catalog** — category & brand filters, price range, in-stock filter, sorting, and an instant-suggestion search bar.
- **Product page** — image gallery with a hover-zoom effect, color variant picker, specs table, reviews, and a Q&A section, plus related products.
- **Cart & checkout** — quantity controls, discount code support (`WELCOME10`, `PISHRO20`), automatic free-shipping threshold and tax calculation, address selection, shipping method, and a payment gateway picker (Zarinpal / Zibal placeholders — see [Roadmap](#roadmap--future-work)).
- **Authentication (mocked)** — password or OTP login, registration, and a forgot-password flow with a 5-digit code screen.
- **Customer account dashboard** — profile, order history with a status timeline, wishlist, saved addresses, wallet with transaction history, notifications, and support tickets.
- **Contact page** — embedded map, working hours, and a contact form.
- **Design system** — light/dark theme toggle, glassmorphism accents, gold/navy luxury palette, Framer Motion scroll/hover/page-transition animations, and skeleton loading states.
- **Fully responsive** — mobile-first with a bottom tab bar on small screens and a full desktop navigation on larger ones.

## Tech stack

| Category | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first theme) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| State management | [Zustand](https://github.com/pmndrs/zustand) (cart, wishlist, auth, UI state) |
| Icons | [lucide-react](https://lucide.dev/) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com/) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Font | [Vazirmatn](https://github.com/rastikerdar/vazirmatn) via `next/font/google` |

## Getting started

### Prerequisites

- Node.js 20+
- npm (or pnpm/yarn — adjust commands accordingly)

### Installation

```bash
git clone <your-repo-url>
cd mobile-pishro
npm install
npm run dev
```

The app will be available at `http://localhost:3000`. No environment variables or external services are needed for this phase.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production server (after `build`) |
| `npm run lint` | Run ESLint |

## Environment variables

None are required to run the current phase. `.env.example` documents the variables that will be needed once the database, authentication, and payment-gateway phases are implemented (copy it to `.env.local` when that work begins).

## Project structure

```
src/
├── app/                  # Routes (App Router)
│   ├── account/          # Customer dashboard (profile, orders, wishlist, addresses, wallet, tickets…)
│   ├── blog/             # Blog listing & post pages
│   ├── cart/, checkout/  # Cart and checkout flow
│   ├── login/, register/, otp/, forgot-password/
│   ├── products/         # Catalog listing + [slug] product detail
│   └── contact/, faq/
├── components/
│   ├── account/          # Order status badge, invoice button, sidebar
│   ├── auth/             # Shared auth shell, OTP view
│   ├── checkout/         # Address & payment method pickers
│   ├── home/             # Hero, category grid, product sections, FAQ, newsletter…
│   ├── layout/           # Header, footer, cart drawer, mobile nav, search bar
│   ├── product/          # Product card, grid, carousel, gallery, filters
│   ├── providers/        # Theme provider, toast provider
│   └── ui/               # Design-system primitives (Button, Badge, PriceTag, Rating…)
├── hooks/                # Small reusable hooks (e.g. click-outside)
├── lib/
│   ├── mock/             # Typed mock data: products, categories, brands, blog, FAQ, orders…
│   ├── cart-helpers.ts   # Cart totals, discount codes, tax/shipping logic
│   ├── site-config.ts    # Store info, contact details, payment gateway list — single source of truth
│   ├── types.ts          # Shared domain types (mirrors a future DB schema)
│   └── utils.ts          # Formatting helpers (currency, Persian digits, etc.)
└── store/                # Zustand stores: cart, wishlist, auth, UI state
```

## Design notes

- Product imagery uses gradient + icon "renders" (`ProductRender`) instead of stock photos — a deliberate choice to keep the visual language consistent and avoid licensing/hotlinking concerns for a demo project.
- All prices are in Toman, formatted with Persian digits via `faDigits`/`formatToman` in `src/lib/utils.ts`.
- Store-wide settings (contact info, working hours, payment gateway list, shipping thresholds) live in `src/lib/site-config.ts` so they map cleanly onto an admin-editable settings table later.

## Roadmap / future work

This repository represents Phase 1 of a larger plan:

- [ ] **Phase 2 — Data layer:** PostgreSQL + Prisma, real NextAuth-based authentication, replacing the mock data and Zustand-persisted auth with real persistence.
- [ ] **Phase 3 — Payments:** real Zarinpal / Zibal integration behind the existing gateway-picker UI.
- [ ] **Phase 4 — Admin panel:** product/order/category/discount management, dashboard analytics.
- [ ] **Phase 5 — SEO & PWA:** sitemap.xml, robots.txt, structured data (Schema.org), installable PWA manifest, and performance/image optimization.

## License

Licensed under the [MIT License](LICENSE). This is a portfolio/demo project — all store branding, product listings, and contact details are fictional placeholder data.
