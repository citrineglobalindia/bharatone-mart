import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, MapPin, Store, LayoutGrid, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../lib/store.jsx";
import { categories } from "../data/categories.js";

export default function Navbar() {
  const cart = useCart();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    nav(`/category/electronics${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="h-1 w-full bg-gradient-to-r from-saffron-500 via-white to-india-green" />
      <div className="container-x flex items-center gap-3 py-3">
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron-500 text-white">
            <Store size={18} />
          </div>
          <div className="leading-tight">
            <div className="text-base font-extrabold text-gray-900">BharatOne <span className="text-saffron-600">Mart</span></div>
            <div className="hidden text-[10px] text-gray-500 sm:block">For Serving Indian Citizens</div>
          </div>
        </Link>

        <form onSubmit={submit} className="mx-2 hidden flex-1 items-center rounded-lg border border-gray-300 focus-within:border-saffron-500 md:flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, brands and categories…"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none"
          />
          <button className="px-3 text-gray-500" aria-label="Search"><Search size={18} /></button>
        </form>

        <div className="ml-auto flex items-center gap-1">
          <NavLink to="/b2b" className="btn-ghost hidden text-sm sm:inline-flex">
            <LayoutGrid size={16} /> B2B / Bulk
          </NavLink>
          <NavLink to="/seller" className="btn-ghost hidden text-sm lg:inline-flex">Sell</NavLink>
          <NavLink to="/account" className="btn-ghost text-sm"><User size={16} /><span className="hidden sm:inline">Account</span></NavLink>
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

      <nav className="hidden border-t border-gray-100 bg-white md:block">
        <div className="container-x flex items-center gap-1 overflow-x-auto py-2 text-sm">
          <span className="flex items-center gap-1 pr-2 text-xs text-gray-400"><MapPin size={13} /> Deliver to 500001</span>
          {categories.map((c) => (
            <NavLink key={c.slug} to={`/category/${c.slug}`} className={({ isActive }) => `whitespace-nowrap rounded-md px-2.5 py-1 ${isActive ? "bg-saffron-50 text-saffron-700" : "text-gray-600 hover:bg-gray-100"}`}>
              {c.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <form onSubmit={submit} className="container-x flex items-center gap-2 py-3">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="input" />
            <button className="btn-primary"><Search size={16} /></button>
          </form>
          <div className="container-x grid grid-cols-2 gap-1 pb-3">
            {categories.map((c) => (
              <NavLink key={c.slug} to={`/category/${c.slug}`} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">{c.emoji} {c.name}</NavLink>
            ))}
            <NavLink to="/b2b" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm font-semibold text-india-navy">B2B / Bulk</NavLink>
            <NavLink to="/seller" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm font-semibold text-india-green">Sell on BharatOne</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
