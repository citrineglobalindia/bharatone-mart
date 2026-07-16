import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { inr } from "../lib/format.js";
import { useCart } from "../lib/store.jsx";
import ProductThumb from "./ProductThumb.jsx";
import Rating from "./Rating.jsx";

export default function ProductCard({ product }) {
  const cart = useCart();
  return (
    <div className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-pop">
      <Link to={`/product/${product.id}`} className="block">
        <ProductThumb product={product} className="h-40 w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-saffron-600">
          {product.name}
        </Link>
        <div className="mt-1"><Rating value={product.rating} reviews={product.reviews} /></div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">{inr(product.price)}</span>
          <span className="text-xs text-gray-400 line-through">{inr(product.mrp)}</span>
        </div>
        <div className="mt-1 text-[11px] font-medium text-india-navy">
          B2B from {inr(product.b2bFrom)} · MOQ {product.moq}
        </div>
        <button
          onClick={() => cart.add(product, 1)}
          className="btn-outline mt-3 w-full py-2 text-xs"
        >
          <ShoppingCart size={14} /> Add to cart
        </button>
      </div>
    </div>
  );
}
