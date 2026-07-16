import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Zap, Truck, ShieldCheck, RotateCcw, Store, Minus, Plus } from "lucide-react";
import { byId, forCategory } from "../data/products.js";
import { inr, num } from "../lib/format.js";
import { useCart } from "../lib/store.jsx";
import Rating from "../components/Rating.jsx";
import ProductThumb from "../components/ProductThumb.jsx";
import ProductCard from "../components/ProductCard.jsx";
import RfqModal from "../components/RfqModal.jsx";

export default function Product() {
  const { id } = useParams();
  const p = byId[id];
  const cart = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  const [rfq, setRfq] = useState(false);

  if (!p) return <div className="container-x py-20 text-center text-gray-500">Product not found. <Link to="/" className="text-saffron-600">Go home</Link></div>;

  const related = forCategory(p.category).filter((x) => x.id !== p.id).slice(0, 5);

  return (
    <div className="container-x py-6">
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-saffron-600">Home</Link> / <Link to={`/category/${p.category}`} className="hover:text-saffron-600">{p.categoryName}</Link> / <span className="text-gray-700">{p.brand}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="card overflow-hidden"><ProductThumb product={p} className="h-80 w-full" size="text-8xl" /></div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[p, p, p, p].map((_, i) => (<div key={i} className="card overflow-hidden opacity-80"><ProductThumb product={p} className="h-16 w-full" size="text-2xl" /></div>))}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-saffron-600">{p.brand}</span>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{p.name}</h1>
          <div className="mt-2 flex items-center gap-3"><Rating value={p.rating} reviews={p.reviews} /><span className="text-xs text-gray-400">·</span><span className={`text-xs font-semibold ${p.inStock ? "text-india-green" : "text-red-500"}`}>{p.inStock ? "In stock" : "Made to order"}</span></div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold">{inr(p.price)}</span>
            <span className="text-gray-400 line-through">{inr(p.mrp)}</span>
            <span className="chip bg-india-greenLight text-india-greenDark">{p.discount}% off</span>
          </div>
          <p className="text-xs text-gray-500">Inclusive of all taxes</p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-gray-300">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-gray-500"><Minus size={16} /></button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-gray-500"><Plus size={16} /></button>
            </div>
            <button onClick={() => cart.add(p, qty)} className="btn-outline flex-1"><ShoppingCart size={16} /> Add to cart</button>
            <button onClick={() => { cart.add(p, qty); nav("/checkout"); }} className="btn-primary flex-1"><Zap size={16} /> Buy now</button>
          </div>

          {/* B2B tiered pricing */}
          <div className="mt-6 rounded-xl border border-india-navy/20 bg-india-navyLight/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-india-navy"><Store size={16} /> Wholesale / B2B pricing</div>
              <span className="text-xs text-gray-500">MOQ {p.moq} units</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              {p.tiers.map(([m, price], i) => (
                <div key={i} className="rounded-lg bg-white p-2 shadow-card">
                  <div className="text-xs text-gray-500">{num(m)}+ units</div>
                  <div className="font-bold text-gray-900">{inr(price)}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setRfq(true)} className="btn-green mt-3 w-full">Get best price (Request quote)</button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
            {[[Truck, "Fast delivery"], [ShieldCheck, "Verified seller"], [RotateCcw, "7-day returns"]].map(([Icon, t], i) => (
              <div key={i} className="flex flex-col items-center gap-1 rounded-lg bg-gray-50 py-3"><Icon size={18} className="text-saffron-600" /> {t}</div>
            ))}
          </div>

          <div className="mt-5 text-sm text-gray-600">
            <h3 className="mb-1 font-semibold text-gray-800">About this item</h3>
            <p>{p.name} by {p.brand}. Genuine product with manufacturer warranty, sold by GST-verified sellers on BharatOne Mart. Suitable for both retail buyers and bulk/wholesale orders with tiered pricing.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-bold">More in {p.categoryName}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{related.map((r) => (<ProductCard key={r.id} product={r} />))}</div>
        </section>
      )}

      {rfq && <RfqModal product={p} onClose={() => setRfq(false)} />}
    </div>
  );
}
