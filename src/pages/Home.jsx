import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Package, Users, ShieldCheck, Truck, Percent } from "lucide-react";
import { categories } from "../data/categories.js";
import { featured, deals, products } from "../data/products.js";
import { useCart } from "../lib/store.jsx";
import { useToast } from "../lib/toast.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import QuickViewModal from "../components/QuickViewModal.jsx";
import Reveal from "../components/Reveal.jsx";
import FlashSale from "../components/FlashSale.jsx";

const brands = ["Realme", "boAt", "Dell", "Samsung", "Prestige", "Puma", "Dabur", "Nykaa", "Milton", "Philips", "MuscleBlaze", "Fortune"];

export default function Home() {
  const [qv, setQv] = useState(null);
  const cart = useCart();
  const { toast } = useToast();
  const addQ = (p) => { cart.add(p, 1); toast("Added to cart", { type: "cart", sub: p.name }); };

  return (
    <div className="pb-10">
      <div className="container-x pt-5">
        <HeroCarousel />

        {/* trust strip */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[[Package, "1.9L+", "Products"], [Users, "2,400+", "Verified sellers"], [Truck, "27k+", "Pincodes"], [ShieldCheck, "GST", "Invoicing & KYC"]].map(([Icon, n, l], idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
              className="card flex items-center gap-3 p-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-saffron-50 text-saffron-600"><Icon size={18} /></span>
              <div><div className="text-base font-bold leading-none">{n}</div><div className="text-xs text-gray-500">{l}</div></div>
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-5"><FlashSale /></div>

        <section className="py-8">
          <Reveal><SectionHeader title="Shop by category" sub="Browse across retail and wholesale" /></Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.04}>
                <Link to={`/category/${c.slug}`} className="card flex h-full flex-col items-center gap-2 p-4 text-center transition-all hover:-translate-y-1 hover:shadow-pop">
                  <span className="grid h-14 w-14 place-items-center rounded-full text-2xl" style={{ background: `${c.tone}1a` }}>{c.emoji}</span>
                  <span className="text-xs font-semibold text-gray-700">{c.name}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Promo banners */}
        <section className="grid gap-4 py-2 md:grid-cols-2">
          {[
            { t: "Festive Fashion Fiesta", s: "Ethnic & casual wear from ₹499", to: "/category/fashion", img: "womens-dresses/dress-pea", grad: "linear-gradient(120deg,#fce7f3,#fbcfe8)" },
            { t: "Kitchen & Appliances", s: "Upgrade your home, up to 35% off", to: "/category/appliances", img: "kitchen-accessories/microwave-oven", grad: "linear-gradient(120deg,#e0f2fe,#bae6fd)" },
          ].map((b) => (
            <Reveal key={b.t}>
              <Link to={b.to} className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl p-6 shadow-card" style={{ backgroundImage: b.grad }}>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">{b.t}</h3>
                  <p className="mt-1 text-sm text-gray-600">{b.s}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-saffron-700">Shop now <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                </div>
                <img src={`https://cdn.dummyjson.com/product-images/${b.img}/1.webp`} alt="" className="h-24 w-24 shrink-0 rounded-xl bg-white/50 object-contain p-2 transition-transform duration-500 group-hover:scale-110 sm:h-28 sm:w-28" />
              </Link>
            </Reveal>
          ))}
        </section>

        {/* Deals */}
        <section className="py-8">
          <Reveal><SectionHeader title="⚡ Top deals today" sub="Biggest discounts across BharatOne" to="/category/electronics" /></Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {deals.map((p) => (<ProductCard key={p.id} product={p} onQuickView={setQv} />))}
          </div>
        </section>

        {/* B2B banner */}
        <Reveal>
          <section className="py-2">
            <div className="relative overflow-hidden rounded-2xl bg-india-navy px-6 py-8 text-white sm:px-10">
              <Percent className="absolute -right-6 -top-6 h-40 w-40 text-white/5" />
              <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <span className="chip bg-white/15 text-white">For businesses</span>
                  <h3 className="mt-2 text-2xl font-bold">Buying in bulk? Get the best supplier price.</h3>
                  <p className="mt-1 max-w-xl text-sm text-white/70">Post a requirement and receive competitive quotes from GST-verified suppliers across India — with MOQ, lead time and tiered pricing.</p>
                </div>
                <Link to="/b2b" className="btn bg-saffron-500 text-white hover:bg-saffron-600">Get best price <ArrowRight size={16} /></Link>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Featured */}
        <section className="py-8">
          <Reveal><SectionHeader title="✨ Featured for you" sub="Popular picks this week" /></Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (<ProductCard key={p.id} product={p} onQuickView={setQv} />))}
          </div>
        </section>
      </div>

      {/* Brand marquee */}
      <section className="mt-4 overflow-hidden border-y border-gray-100 bg-white py-6">
        <div className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">Trusted brands on BharatOne</div>
        <div className="flex overflow-hidden">
          <div className="marquee flex shrink-0 items-center gap-12 pr-12">
            {[...brands, ...brands].map((b, i) => (<span key={i} className="text-lg font-extrabold text-gray-300">{b}</span>))}
          </div>
        </div>
      </section>

      <QuickViewModal product={qv} onClose={() => setQv(null)} onAdd={(p) => { addQ(p); setQv(null); }} />
    </div>
  );
}
