import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, MapPin, Store, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../lib/store.jsx";
import { categories } from "../data/categories.js";

export default function Navbar() {
  const cart = useCart();
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    nav(`/category/electronics${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  return (
    <header className="glass sticky top-0 z-40 shadow-sm">
      <div className="h-1 w-full bg-gradient-to-r from-saffron-500 via-white to-india-green" />
      <div className="container-x flex items-center gap-3 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron-500 text-white shadow-sm">
            <Store size={18} />
          </div>
          <div className="leading-tight">
            <div className="text-base font-extrabold text-gray-900">BharatOne <span className="text-saffron-600">Mart</span></div>
            <div className="hidden text-[10px] text-gray-500 sm:block">For Serving Indian Citizens</div>
          </div>
        </Link>

        <form onSubmit={submit} className="mx-2 hidden flex-1 items-center rounded-lg border border-gray-300 bg-white focus-within:border-saffron-500 md:flex">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands and categories…" className="w-full rounded-lg bg-transparent px-3 py-2 text-sm outline-none" />
          <button className="px-3 text-gray-500" aria-label="Search"><Search size={18} /></button>
        </form>

        <div className="ml-auto flex items-center gap-1">
          <NavLink to="/b2b" className="btn-ghost hidden text-sm sm:inline-flex"><LayoutGrid size={16} /> B2B / Bulk</NavLink>
          <NavLink to="/seller" className="btn-ghost hidden text-sm lg:inline-flex">Sell</NavLink>
          <NavLink to="/account" className="btn-ghost hidden text-sm md:inline-flex"><User size={16} /><span>Account</span></NavLink>
          <Link to="/cart" className="btn-ghost relative text-sm">
            <ShoppingCart size={18} />
            <AnimatePresence>
              {cart.count > 0 && (
                <motion.span key={cart.count} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -right-0 -top-0 grid h-4 w-4 place-items-center rounded-full bg-india-green text-[10px] font-bold text-white">{cart.count}</motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={submit} className="container-x flex items-center gap-2 pb-3 md:hidden">
        <div className="flex flex-1 items-center rounded-lg border border-gray-300 bg-white focus-within:border-saffron-500">
          <Search size={16} className="ml-3 text-gray-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search BharatOne Mart…" className="w-full bg-transparent px-2 py-2 text-sm outline-none" />
        </div>
      </form>

      <nav className="hidden border-t border-gray-100 bg-white/60 md:block">
        <div className="container-x flex items-center gap-1 overflow-x-auto py-2 text-sm">
          <span className="flex items-center gap-1 pr-2 text-xs text-gray-400"><MapPin size={13} /> Deliver to 500001</span>
          {categories.map((c) => (
            <NavLink key={c.slug} to={`/category/${c.slug}`} className={({ isActive }) => `whitespace-nowrap rounded-md px-2.5 py-1 ${isActive ? "bg-saffron-50 text-saffron-700" : "text-gray-600 hover:bg-gray-100"}`}>{c.name}</NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile category chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-gray-100 px-4 py-2 md:hidden">
        {categories.map((c) => (
          <NavLink key={c.slug} to={`/category/${c.slug}`} className={({ isActive }) => `flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${isActive ? "bg-saffron-500 text-white" : "bg-gray-100 text-gray-600"}`}>
            <span>{c.emoji}</span> {c.name}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
