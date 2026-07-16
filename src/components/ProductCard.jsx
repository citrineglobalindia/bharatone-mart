import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { inr } from "../lib/format.js";
import { useCart } from "../lib/store.jsx";
import { useToast } from "../lib/toast.jsx";
import ProductThumb from "./ProductThumb.jsx";
import Rating from "./Rating.jsx";

export default function ProductCard({ product, onQuickView }) {
  const cart = useCart();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);

  const add = () => {
    cart.add(product, 1);
    toast(`Added to cart`, { type: "cart", sub: product.name });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="card group relative flex flex-col overflow-hidden hover:border-saffron-200 hover:shadow-pop">
      <button onClick={() => setLiked((v) => !v)} aria-label="Wishlist"
        className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-gray-400 shadow-sm transition hover:text-red-500">
        <Heart size={16} className={liked ? "fill-red-500 text-red-500" : ""} />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <ProductThumb product={product} className="h-44 w-full xs:h-52 sm:h-56" zoom />
      </Link>

      {onQuickView && (
        <button onClick={() => onQuickView(product)}
          className="absolute inset-x-3 top-40 z-10 flex translate-y-2 items-center justify-center gap-1.5 rounded-lg bg-gray-900/90 py-2 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:top-44 group-hover:translate-y-0 group-hover:opacity-100 sm:top-44 sm:group-hover:top-48">
          <Eye size={14} /> Quick view
        </button>
      )}

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold text-gray-800 transition-colors group-hover:text-saffron-600">
          {product.name}
        </Link>
        <div className="mt-1.5"><Rating value={product.rating} reviews={product.reviews} /></div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">{inr(product.price)}</span>
          <span className="text-xs text-gray-400 line-through">{inr(product.mrp)}</span>
        </div>
        <div className="mt-1 text-[11px] font-medium text-india-navy">B2B from {inr(product.b2bFrom)} · MOQ {product.moq}</div>
        <button onClick={add} className="btn-primary mt-3 w-full py-2 text-xs">
          <ShoppingCart size={14} /> Add to cart
        </button>
      </div>
    </motion.div>
  );
}
