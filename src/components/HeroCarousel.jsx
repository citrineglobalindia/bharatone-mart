import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CDN = "https://cdn.dummyjson.com/product-images";

const slides = [
  {
    tag: "Mega Electronics Days",
    title: "Up to 40% off top brands",
    sub: "Phones, laptops & audio from verified sellers.",
    cta: "Shop Electronics", to: "/category/electronics",
    img: "laptops/new-dell-xps-13-9300-laptop",
    grad: "linear-gradient(120deg,#fff3e0,#ffe1bd)", dark: false,
    btn: "bg-saffron-500 hover:bg-saffron-600",
  },
  {
    tag: "BharatOne Business",
    title: "Bulk pricing & best supplier quotes",
    sub: "GST-verified suppliers · MOQ · tiered wholesale rates.",
    cta: "Get Best Price", to: "/b2b",
    img: "kitchen-accessories/carbon-steel-wok",
    grad: "linear-gradient(120deg,#101043,#000080)", dark: true,
    btn: "bg-saffron-500 hover:bg-saffron-600",
  },
  {
    tag: "Daily Essentials",
    title: "Grocery & staples, delivered",
    sub: "Rice, oil, honey & more at everyday low prices.",
    cta: "Shop Grocery", to: "/category/grocery",
    img: "groceries/rice",
    grad: "linear-gradient(120deg,#e7f5e5,#bfe6ba)", dark: false,
    btn: "bg-india-green hover:bg-india-greenDark",
  },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = (d) => setI((p) => (p + d + n) % n);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 4500);
    return () => clearInterval(t);
  }, [n]);

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-card">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, idx) => (
          <div key={idx} className="min-w-full">
            <div className="flex items-center justify-between gap-4 px-6 py-9 sm:px-12 sm:py-14" style={{ backgroundImage: s.grad }}>
              <div className={s.dark ? "text-white" : "text-gray-900"}>
                <span className={`chip ${s.dark ? "bg-white/15 text-white" : "bg-white/70 text-gray-800"}`}>{s.tag}</span>
                <h2 className="mt-3 max-w-md text-2xl font-extrabold leading-tight sm:text-4xl">{s.title}</h2>
                <p className={`mt-2 max-w-sm text-sm ${s.dark ? "text-white/80" : "text-gray-600"}`}>{s.sub}</p>
                <Link to={s.to} className={`btn mt-5 text-white ${s.btn}`}>{s.cta} <ArrowRight size={16} /></Link>
              </div>
              <img src={`${CDN}/${s.img}/thumbnail.webp`} alt="" loading="lazy"
                className="hidden h-40 w-40 rounded-2xl bg-white/60 object-contain p-3 shadow-pop sm:block sm:h-56 sm:w-56" />
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => go(-1)} aria-label="Previous"
        className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-gray-700 shadow opacity-0 transition-opacity hover:bg-white group-hover:opacity-100">
        <ChevronLeft size={18} />
      </button>
      <button onClick={() => go(1)} aria-label="Next"
        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-gray-700 shadow opacity-0 transition-opacity hover:bg-white group-hover:opacity-100">
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gray-800" : "w-2 bg-gray-500/50"}`} />
        ))}
      </div>
    </div>
  );
}
