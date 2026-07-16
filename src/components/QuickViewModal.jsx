import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart, Zap, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { inr, num } from "../lib/format.js";
import Rating from "./Rating.jsx";

const CDN = "https://cdn.dummyjson.com/product-images";

export default function QuickViewModal({ product, onClose, onAdd }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full max-w-3xl overflow-hidden rounded-t-2xl bg-white shadow-pop sm:rounded-2xl">
            <div className="grid sm:grid-cols-2">
              <div className="relative flex items-center justify-center bg-gray-50 p-6">
                <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-white p-1.5 shadow hover:bg-gray-100 sm:hidden"><X size={18} /></button>
                <img src={`${CDN}/${product.img}/1.webp`} alt={product.name} className="h-56 w-full object-contain" />
              </div>
              <div className="relative p-6">
                <button onClick={onClose} className="absolute right-3 top-3 hidden rounded-full p-1.5 text-gray-400 hover:bg-gray-100 sm:block"><X size={18} /></button>
                <span className="text-xs font-semibold uppercase tracking-wide text-saffron-600">{product.brand}</span>
                <h3 className="mt-1 text-lg font-bold">{product.name}</h3>
                <div className="mt-2"><Rating value={product.rating} reviews={product.reviews} /></div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold">{inr(product.price)}</span>
                  <span className="text-sm text-gray-400 line-through">{inr(product.mrp)}</span>
                  <span className="chip bg-india-greenLight text-india-greenDark">{product.discount}% off</span>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-india-navyLight/50 p-2 text-xs text-india-navy">
                  <Store size={14} /> B2B from {inr(product.b2bFrom)} · MOQ {num(product.moq)}
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => onAdd(product)} className="btn-outline flex-1"><ShoppingCart size={16} /> Add</button>
                  <Link to={`/product/${product.id}`} onClick={onClose} className="btn-primary flex-1"><Zap size={16} /> View details</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
