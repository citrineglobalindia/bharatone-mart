import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, Truck, ShieldCheck, RotateCcw, Store, Minus, Plus, Heart, Share2, Star } from "lucide-react";
import { byId, forCategory } from "../data/products.js";
import { inr, num } from "../lib/format.js";
import { useCart } from "../lib/store.jsx";
import { useToast } from "../lib/toast.jsx";
import Rating from "../components/Rating.jsx";
import ProductGallery from "../components/ProductGallery.jsx";
import ProductCard from "../components/ProductCard.jsx";
import QuickViewModal from "../components/QuickViewModal.jsx";
import RfqModal from "../components/RfqModal.jsx";

const reviews = [
  { n: "Amit S.", r: 5, t: "Exactly as described, fast delivery. Great value!", d: "2 days ago" },
  { n: "Priya K.", r: 4, t: "Good quality product. Packaging could be better.", d: "1 week ago" },
  { n: "Rahul M.", r: 5, t: "Ordered in bulk for my shop — best B2B price I found.", d: "2 weeks ago" },
];

export default function Product() {
  const { id } = useParams();
  const p = byId[id];
  const cart = useCart();
  const { toast } = useToast();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);
  const [rfq, setRfq] = useState(false);
  const [tab, setTab] = useState("desc");
  const [liked, setLiked] = useState(false);
  const [qv, setQv] = useState(null);

  if (!p) return <div className="container-x py-20 text-center text-gray-500">Product not found. <Link to="/" className="text-saffron-600">Go home</Link></div>;

  const related = forCategory(p.category).filter((x) => x.id !== p.id).slice(0, 4);
  const add = () => { cart.add(p, qty); toast("Added to cart", { type: "cart", sub: `${qty} × ${p.name}` }); };
  const buy = () => { cart.add(p, qty); nav("/checkout"); };

  return (
    <div className="container-x py-6">
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-saffron-600">Home</Link> / <Link to={`/category/${p.category}`} className="hover:text-saffron-600">{p.categoryName}</Link> / <span className="text-gray-700">{p.brand}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <ProductGallery product={p} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-saffron-600">{p.brand}</span>
            <div className="flex gap-1">
              <button onClick={() => setLiked((v) => !v)} className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-500 hover:text-red-500"><Heart size={16} className={liked ? "fill-red-500 text-red-500" : ""} /></button>
              <button onClick={() => toast("Link copied", { type: "info" })} className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-500 hover:text-india-navy"><Share2 size={16} /></button>
            </div>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{p.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Rating value={p.rating} reviews={p.reviews} />
            <span className={`text-xs font-semibold ${p.inStock ? "text-india-green" : "text-red-500"}`}>{p.inStock ? "● In stock" : "Made to order"}</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold">{inr(p.price)}</span>
            <span className="text-gray-400 line-through">{inr(p.mrp)}</span>
            <span className="chip bg-india-greenLight text-india-greenDark">{p.discount}% off</span>
          </div>
          <p className="text-xs text-gray-500">Inclusive of all taxes · Free delivery above ₹500</p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-gray-300">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2.5 text-gray-500 hover:text-gray-900"><Minus size={16} /></button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2.5 text-gray-500 hover:text-gray-900"><Plus size={16} /></button>
            </div>
            <motion.button whileTap={{ scale: 0.94 }} onClick={add} className="btn-outline flex-1"><ShoppingCart size={16} /> Add to cart</motion.button>
            <motion.button whileTap={{ scale: 0.94 }} onClick={buy} className="btn-primary flex-1"><Zap size={16} /> Buy now</motion.button>
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
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-1 border-b border-gray-200">
          {[["desc", "Description"], ["specs", "Specifications"], ["reviews", `Reviews (${p.reviews})`]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`relative px-4 py-3 text-sm font-semibold transition ${tab === k ? "text-saffron-600" : "text-gray-500 hover:text-gray-800"}`}>
              {l}
              {tab === k && <motion.div layoutId="tabline" className="absolute inset-x-0 -bottom-px h-0.5 bg-saffron-500" />}
            </button>
          ))}
        </div>
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="py-5 text-sm text-gray-600">
          {tab === "desc" && (
            <p className="max-w-3xl leading-relaxed">{p.name} by {p.brand} is a genuine product sold by GST-verified sellers on BharatOne Mart, backed by manufacturer warranty. Built for both everyday retail buyers and bulk/wholesale orders, it offers tiered pricing that gets better as your quantity grows. Enjoy secure payments, fast pan-India delivery across 27,000+ pincodes, and easy 7-day returns.</p>
          )}
          {tab === "specs" && (
            <table className="w-full max-w-lg text-sm">
              <tbody className="divide-y divide-gray-100">
                {[["Brand", p.brand], ["Category", p.categoryName], ["MRP", inr(p.mrp)], ["Selling price", inr(p.price)], ["B2B price from", inr(p.b2bFrom)], ["Min. order qty (B2B)", `${num(p.moq)} units`], ["Rating", `${p.rating} / 5`], ["Availability", p.inStock ? "In stock" : "Made to order"]].map(([k, v]) => (
                  <tr key={k}><td className="py-2 pr-4 font-medium text-gray-500">{k}</td><td className="py-2 font-semibold text-gray-800">{v}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="card p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-full bg-saffron-500 text-xs font-bold text-white">{r.n[0]}</div><span className="text-sm font-semibold text-gray-800">{r.n}</span></div>
                    <div className="flex">{Array.from({ length: 5 }).map((_, s) => (<Star key={s} size={13} className={s < r.r ? "fill-saffron-500 text-saffron-500" : "text-gray-300"} />))}</div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{r.t}</p>
                  <span className="text-xs text-gray-400">{r.d}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold">More in {p.categoryName}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{related.map((r) => (<ProductCard key={r.id} product={r} onQuickView={setQv} />))}</div>
        </section>
      )}

      {rfq && <RfqModal product={p} onClose={() => setRfq(false)} />}
      <QuickViewModal product={qv} onClose={() => setQv(null)} onAdd={(pr) => { cart.add(pr, 1); toast("Added to cart", { type: "cart", sub: pr.name }); setQv(null); }} />
    </div>
  );
}
