# FreshMart — React Rebuild

A modern React rewrite of your original Flask + PostgreSQL FreshMart grocery
site. Every original page and flow (browse, add to cart, cart management,
checkout, login, register) has been preserved and rebuilt, plus everything
listed in the brief: product details, categories, wishlist, filters/sorting,
coupons, dark mode, and more.

## What's here vs. the original

Your original project was a Flask app with 5 templates and one JSON endpoint
(`GET /api/products`). The brief asked for 12 pages and features (wishlist,
coupons, ratings/price filters, categories, contact form, etc.) that endpoint
never supported. Rather than block on a bigger backend rewrite, this app runs
**entirely on realistic mock data** (`src/data/products.js` — 32 products
across 8 categories, reviews, brands, coupons) so it works immediately with
`npm run dev`, no database required. `src/services/api.js` is written so
swapping in your real Flask API later is a small, contained change — see
"Connecting the Flask backend" below.

Auth (login/register) is a client-side stub backed by `localStorage`
(`src/context/AuthContext.jsx`) for the same reason — it lets the checkout
flow work end-to-end today. Swap it for real calls to your Flask
`/login`/`/register` routes when you're ready.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint       # oxlint
```

## Project structure

```
src/
 ├── assets/            static images
 ├── components/
 │    ├── layout/        Navbar, Footer, BackToTop
 │    ├── ui/             Button, Badge, PriceTag, Rating, Skeleton, EmptyState, QuantityStepper
 │    ├── product/        ProductCard, ProductGrid
 │    ├── home/            Hero, CategoryRail, ProductSection, DiscountBanner, BrandStrip, Reviews, Newsletter
 │    └── filters/         FilterSidebar, SortDropdown
 ├── layouts/            MainLayout (navbar+footer), AuthLayout (login/register split screen)
 ├── pages/               Home, Products, ProductDetails, Categories, Cart, Wishlist,
 │                        Checkout, Login, Register, About, Contact, NotFound
 ├── context/             ThemeContext, CartContext, WishlistContext, AuthContext
 ├── hooks/               useLocalStorage, useDebounce
 ├── services/            api.js — axios client + documented backend contract
 ├── utils/               formatCurrency, filterSort
 ├── data/                products.js — mock catalog, categories, brands, reviews, coupons
 ├── App.jsx              routes are defined here with React Router + lazy loading
 └── main.jsx
```

## Features implemented

- Search, category filters, brand filter, price range, rating filter, sorting
- Cart with quantity controls, coupon codes (`FRESH50`, `WELCOME10`, `BIGBASKET20`), free-delivery threshold
- Wishlist, persisted per-browser
- Checkout with form validation (React Hook Form) and an order confirmation screen
- Toast notifications for every cart/wishlist/auth action (React Hot Toast)
- Loading skeletons, empty states, back-to-top button
- Dark mode via Context API, persisted to `localStorage`, respects system preference on first load
- Responsive down to mobile, with a slide-in mobile menu and filter drawer
- Code-splitting per route (`React.lazy`) and `memo`/`useMemo`/`useCallback` where it matters (product cards, cart totals, filtering)

## Design

Palette is a custom "meadow green" + "citrus coral" system (see the `@theme`
block in `src/index.css`) rather than a default template palette — deliberately
avoiding the generic cream/terracotta and neon-on-black looks AI-generated UIs
tend to default to. Typography pairs **Fraunces** (display/headlines) with
**Plus Jakarta Sans** (UI/body) for a premium-but-modern feel appropriate for
a quick-commerce grocery brand. All colors are theme tokens so dark mode stays
consistent throughout.

## Connecting the Flask backend

When you're ready to move off mock data, point `VITE_API_BASE_URL` (see
`.env.example`) at your Flask server and update the functions in
`src/services/api.js`. Your existing `app.py` already has `GET /api/products`,
`/login`, `/register`, and `/place_order`. To power every feature in the UI,
extend it with:

| Method | Endpoint | Used by | Notes |
|---|---|---|---|
| GET | `/api/products` | Products, Home, ProductDetails | already exists — add `category`, `brand`, `rating`, `stock` columns to match the UI |
| GET | `/api/products/<id>` | ProductDetails | single product lookup |
| GET | `/api/categories` | Categories, CategoryRail | id, name, emoji/icon |
| GET | `/api/reviews?product_id=` | ProductDetails reviews | |
| POST | `/login` | Login | already exists — return a session/JWT instead of a redirect so the SPA can store it |
| POST | `/register` | Register | already exists — same session/JWT note |
| POST | `/place_order` | Checkout | already exists — return JSON (`order_id`, `total`) instead of an HTML string so the React confirmation screen can render it |
| GET/POST | `/api/wishlist` | Wishlist | needs a `wishlist` table keyed by user |
| GET/POST/DELETE | `/api/coupons` | Cart coupon apply | validate code + minimum order server-side |

Everything else (dark mode, cart persistence, filtering/sorting, toasts) is
pure frontend state and needs no backend changes.
