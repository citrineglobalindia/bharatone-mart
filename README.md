# BharatOne Mart — UI

India's B2B + B2C marketplace UI. Built with Vite + React + Tailwind. Demo/mock data only (no backend yet).

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## What's included
- **B2C storefront**: Home, category/listing with filters & sort, product detail, cart, checkout, order confirmation
- **B2B / RFQ**: bulk sourcing landing, tiered pricing on product pages, "Get Best Price" RFQ modal, live supplier quotes
- **Seller dashboard**: overview KPIs, products, orders (B2B/B2C), inventory, payouts
- **Buyer account**: orders, RFQs, addresses, profile
- **Admin console**: platform KPIs, seller KYC approval, orders, catalog health
- **Auth**: login (OTP style) + register (buyer/seller)

## Structure
- `src/pages/` — route screens
- `src/components/` — Navbar, Footer, ProductCard, RfqModal, etc.
- `src/data/` — mock products, categories, orders, RFQs
- `src/lib/store.jsx` — in-memory cart (React context)

## Theme
Indian tricolour: saffron `#ff9933`, green `#138808`, navy `#000080` (see `tailwind.config.js`).

## Next steps (backend)
Wire Supabase for auth, products, orders, RFQs; Razorpay for payments; a shipping API (Shiprocket/Delhivery); and GST/KYC verification. Replace files in `src/data/` with live queries.
