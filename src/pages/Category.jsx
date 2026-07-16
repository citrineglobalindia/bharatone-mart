import { useParams, useSearchParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { catBySlug } from "../data/categories.js";
import { forCategory, products } from "../data/products.js";
import { useCart } from "../lib/store.jsx";
import { useToast } from "../lib/toast.jsx";
import ProductCard from "../components/ProductCard.jsx";
import QuickViewModal from "../components/QuickViewModal.jsx";

const sorts = { relevance: "Relevance", "price-asc": "Price: Low to High", "price-desc": "Price: High to Low", rating: "Top rated", discount: "Discount" };

function Filters({ maxPrice, setMaxPrice, onlyStock, setOnlyStock }) {
  return (
    <>
      <div className="mb-3 flex items-center gap-2 font-semibold text-gray-800"><SlidersHorizontal size={16} /> Filters</div>
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-sm"><span>Max price</span><span className="font-semibold">₹{new Intl.NumberFormat("en-IN").format(maxPrice)}</span></div>
        <input type="range" min="200" max="60000" step="200" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-saffron-500" />
      </div>
      <label className="mb-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} className="accent-india-green" /> In stock only</label>
      <div className="rounded-lg bg-india-greenLight p-2 text-xs text-india-greenDark">B2B tiered pricing available on all items — see product page.</div>
    </>
  );
}

export default function Category() {
  const { slug } = useParams();
  const [sp] = useSearchParams();
  const q = sp.get("q");
  const cat = catBySlug[slug];
  const [sort, setSort] = useState("relevance");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [onlyStock, setOnlyStock] = useState(false);
  const [qv, setQv] = useState(null);
  const [sheet, setSheet] = useState(false);
  const cart = useCart();
  const { toast } = useToast();

  const base = q ? products : forCategory(slug);
  const list = useMemo(() => {
    let l = base.filter((p) => p.price <= maxPrice && (!onlyStock || p.inStock));
    if (q) l = l.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    const s = { "price-asc": (a, b) => a.price - b.price, "price-desc": (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, discount: (a, b) => b.discount - a.discount }[sort];
    return s ? [...l].sort(s) : l;
  }, [base, sort, maxPrice, onlyStock, q]);

  return (
    <div className="container-x py-6">
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-saffron-600">Home</Link> / <span className="text-gray-700">{q ? `Search "${q}"` : cat?.name || "Category"}</span>
      </div>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl text-2xl" style={{ background: `${cat?.tone || "#ff9933"}1a` }}>{cat?.emoji || "🔎"}</span>
        <div>
          <h1 className="text-xl font-bold">{q ? `Results for "${q}"` : cat?.name}</h1>
          <p className="text-sm text-gray-500">{list.length} products {cat && `· ${cat.blurb}`}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="card hidden h-fit p-4 lg:block"><Filters {...{ maxPrice, setMaxPrice, onlyStock, setOnlyStock }} /></aside>

        <div>
          <div className="mb-4 flex items-center justify-between gap-2">
            <button onClick={() => setSheet(true)} className="btn-outline py-2 lg:hidden"><SlidersHorizontal size={15} /> Filters</button>
            <span className="hidden text-sm text-gray-500 lg:inline">Showing {list.length} items</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-saffron-500">
              {Object.entries(sorts).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
            </select>
          </div>
          {list.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">{list.map((p) => (<ProductCard key={p.id} product={p} onQuickView={setQv} />))}</div>
          ) : (
            <div className="card p-10 text-center text-gray-500">No products match these filters.</div>
          )}
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div className="fixed inset-0 z-50 flex items-end bg-black/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="pb-safe w-full rounded-t-2xl bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold">Filters</h3>
                <button onClick={() => setSheet(false)} className="text-gray-400"><X size={20} /></button>
              </div>
              <Filters {...{ maxPrice, setMaxPrice, onlyStock, setOnlyStock }} />
              <button onClick={() => setSheet(false)} className="btn-primary mt-4 w-full">Show {list.length} results</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickViewModal product={qv} onClose={() => setQv(null)} onAdd={(pr) => { cart.add(pr, 1); toast("Added to cart", { type: "cart", sub: pr.name }); setQv(null); }} />
    </div>
  );
}
