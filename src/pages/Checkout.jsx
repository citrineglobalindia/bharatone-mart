import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { CreditCard, Smartphone, Banknote, Lock } from "lucide-react";
import { useCart } from "../lib/store.jsx";
import { inr } from "../lib/format.js";

export default function Checkout() {
  const cart = useCart();
  const nav = useNavigate();
  const [pay, setPay] = useState("upi");
  const gst = Math.round(cart.subtotal * 0.05);
  const shipping = cart.subtotal > 500 ? 0 : 49;
  const total = cart.subtotal + gst + shipping;

  const place = (e) => { e.preventDefault(); cart.clear(); nav("/order-confirmation"); };

  if (!cart.items.length)
    return <div className="container-x py-20 text-center text-gray-500">Your cart is empty. <Link to="/" className="text-saffron-600">Shop now</Link></div>;

  return (
    <form onSubmit={place} className="container-x py-6">
      <h1 className="mb-5 text-xl font-bold">Checkout</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <section className="card p-5">
            <h3 className="mb-3 font-semibold">Delivery address</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Full name</label><input required className="input" placeholder="Ravi Kumar" /></div>
              <div><label className="label">Mobile</label><input required className="input" placeholder="+91 98765 43210" /></div>
              <div className="col-span-2"><label className="label">Address</label><input required className="input" placeholder="Flat, street, area" /></div>
              <div><label className="label">City</label><input required className="input" placeholder="Hyderabad" /></div>
              <div><label className="label">Pincode</label><input required className="input" placeholder="500001" /></div>
            </div>
          </section>

          <section className="card p-5">
            <h3 className="mb-3 font-semibold">Payment method</h3>
            <div className="space-y-2">
              {[["upi", Smartphone, "UPI", "GPay, PhonePe, Paytm"], ["card", CreditCard, "Credit / Debit card", "Visa, Mastercard, RuPay"], ["cod", Banknote, "Cash on delivery", "Pay when it arrives"]].map(([id, Icon, t, s]) => (
                <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${pay === id ? "border-saffron-500 bg-saffron-50" : "border-gray-200"}`}>
                  <input type="radio" name="pay" checked={pay === id} onChange={() => setPay(id)} className="accent-saffron-500" />
                  <Icon size={20} className="text-gray-500" />
                  <div><div className="text-sm font-semibold">{t}</div><div className="text-xs text-gray-500">{s}</div></div>
                </label>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1 text-xs text-gray-400"><Lock size={12} /> Payments secured via Razorpay (demo)</p>
          </section>
        </div>

        <aside className="card h-fit p-5">
          <h3 className="mb-3 font-semibold">Your order</h3>
          <div className="max-h-52 space-y-2 overflow-auto pr-1 text-sm">
            {cart.items.map((i) => (<div key={i.id} className="flex justify-between gap-2"><span className="text-gray-600">{i.emoji} {i.name} ×{i.qty}</span><span className="shrink-0 font-medium">{inr(i.price * i.qty)}</span></div>))}
          </div>
          <div className="my-3 border-t border-gray-100" />
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Subtotal</dt><dd>{inr(cart.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">GST</dt><dd>{inr(gst)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Shipping</dt><dd>{shipping ? inr(shipping) : "FREE"}</dd></div>
            <div className="flex justify-between pt-1 text-base font-bold"><dt>Total</dt><dd>{inr(total)}</dd></div>
          </dl>
          <button className="btn-green mt-4 w-full">Place order · {inr(total)}</button>
        </aside>
      </div>
    </form>
  );
}
