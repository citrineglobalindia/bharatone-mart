import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CDN = "https://cdn.dummyjson.com/product-images";

const slides = [
  { tag: "Mega Electronics Days", title: "Up to 40% off top brands", sub: "Phones, laptops & audio from verified sellers.", cta: "Shop Electronics", to: "/category/electronics", img: "laptops/new-dell-xps-13-9300-laptop", grad: "linear-gradient(120deg,#fff3e0,#ffd9a8)", dark: false, btn: "bg-saffron-500 hover:bg-saffron-600" },
  { tag: "BharatOne Business", title: "Bulk pricing & best supplier quotes", sub: "GST-verified suppliers · MOQ · tiered wholesale rates.", cta: "Get Best Price", to: "/b2b", img: "kitchen-accessories/carbon-steel-wok", grad: "linear-gradient(120deg,#0d0d3a,#000080)", dark: true, btn: "bg-saffron-500 hover:bg-saffron-600" },
  { tag: "Daily Essentials", title: "Grocery & staples, delivered", sub: "Rice, oil, honey & more at everyday low prices.", cta: "Shop Grocery", to: "/category/grocery", img: "groceries/rice", grad: "linear-gradient(120deg,#e7f5e5,#a9dea3)", dark: false, btn: "bg-india-green hover:bg-india-greenDark" },
];

export default function HeroCarousel() {
  const [[i, dir], setI] = useState([0, 0]);
  const n = slides.length;
  const go = (d) => setI(([p]) => [(p + d + n) % n, d]);
  useEffect(() => { const t = setInterval(() => setI(([p]) => [(p + 1) % n, 1]), 5000); return () => clearInterval(t); }, [n]);
  const s = slides[i];

  return (
    <div className="group relative h-64 overflow-hidden rounded-2xl shadow-card sm:h-80">
      <AnimatePresence custom={dir} mode="popLayout">
        <motion.div key={i} custom={dir}
          initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-between gap-4 px-6 sm:px-14" style={{ backgroundImage: s.grad }}>
          <div className={s.dark ? "text-white" : "text-gray-900"}>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className={`chip ${s.dark ? "bg-white/15 text-white" : "bg-white/70 text-gray-800"}`}>{s.tag}</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="mt-3 max-w-md text-2xl font-extrabold leading-tight sm:text-4xl">{s.title}</motion.h2>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              className={`mt-2 max-w-sm text-sm ${s.dark ? "text-white/80" : "text-gray-600"}`}>{s.sub}</motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
              <Link to={s.to} className={`btn mt-5 text-white ${s.btn}`}>{s.cta} <ArrowRight size={16} /></Link>
            </motion.div>
          </div>
          <motion.img src={`${CDN}/${s.img}/1.webp`} alt="" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
            className="hidden h-44 w-44 animate-float rounded-2xl bg-white/60 object-contain p-3 shadow-pop sm:block sm:h-60 sm:w-60" />
        </motion.div>
      </AnimatePresence>

      <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-gray-700 shadow opacity-0 transition hover:bg-white group-hover:opacity-100"><ChevronLeft size={18} /></button>
      <button onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-gray-700 shadow opacity-0 transition hover:bg-white group-hover:opacity-100"><ChevronRight size={18} /></button>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setI([idx, idx > i ? 1 : -1])} aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gray-800" : "w-2 bg-gray-500/50"}`} />
        ))}
      </div>
    </div>
  );
}
