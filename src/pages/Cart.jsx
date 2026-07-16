import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../lib/store.jsx";
import { inr } from "../lib/format.js";
import ProductThumb from "../components/ProductThumb.jsx";

export default function Cart() {
  const cart = useCart();
  const nav = useNavigate();
  const shipping = cart.subtotal > 500 || cart.subtotal === 0 ? 0 : 49;
  const gst = Math.round(cart.subtotal * 0.05);
  const total = cart.subtotal + shipping + gst;

  if (!cart.items.length)
    return (
      <div className="container-x py-20 text-center">
        <ShoppingBag className="mx-auto text-gray-300" size={56} />
        <h2 className="mt-4 text-xl font-bold">Your cart is empty</h2>
        <p className="mt-1 text-gray-500">Add products to get started.</p>
        <Link to="/" className="btn-primary mx-auto mt-5">Continue shopping</Link>
      </div>
    );

  return (
    <div className="container-x py-6">
      <h1 className="mb-5 text-xl font-bold">Cart ({cart.count} items)</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {cart.items.map((i) => (
            <div key={i.id} className="card flex gap-3 p-3">
              <Link to={`/product/${i.id}`}><ProductThumb product={i} className="h-24 w-24 shrink-0 rounded-lg" size="text-4xl" /></Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <Link to={`/product/${i.id}`} className="text-sm font-semibold hover:text-saffron-600">{i.name}</Link>
                  <button onClick={() => cart.remove(i.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
                <span className="text-xs text-gray-400">{i.brand} · {i.categoryName}</span>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button onClick={() => cart.setQty(i.id, i.qty - 1)} className="px-2.5 py-1.5 text-gray-500"><Minus size={14} /></button>
                    <span className="w-9 text-center text-sm font-semibold">{i.qty}</span>
                    <button onClick={() => cart.setQty(i.id, i.qty + 1)} className="px-2.5 py-1.5 text-gray-500"><Plus size={14} /></button>
                  </div>
                  <span className="font-bold">{inr(i.price * i.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="card h-fit p-5">
          <h3 className="mb-3 font-semibold">Order summary</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Subtotal</dt><dd>{inr(cart.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">GST (5%)</dt><dd>{inr(gst)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Shipping</dt><dd>{shipping ? inr(shipping) : <span className="text-india-green">FREE</span>}</dd></div>
            <div className="my-2 border-t border-gray-100" />
            <div className="flex justify-between text-base font-bold"><dt>Total</dt><dd>{inr(total)}</dd></div>
          </dl>
          <button onClick={() => nav("/checkout")} className="btn-primary mt-4 w-full">Proceed to checkout</button>
          <Link to="/" className="btn-ghost mt-2 w-full">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
