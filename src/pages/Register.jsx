import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Store, ShoppingBag, Building2 } from "lucide-react";

export default function Register() {
  const nav = useNavigate();
  const [type, setType] = useState("buyer");
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <form onSubmit={(e) => { e.preventDefault(); nav(type === "seller" ? "/seller" : "/account"); }} className="w-full max-w-md card p-6">
        <Link to="/" className="mb-5 flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron-500 text-white"><Store size={18} /></div><span className="text-lg font-extrabold">BharatOne Mart</span></Link>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-gray-500">Join as a buyer or start selling</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[["buyer", ShoppingBag, "I'm a Buyer", "Shop retail & bulk"], ["seller", Building2, "I'm a Seller", "Sell / supply goods"]].map(([id, Icon, t, s]) => (
            <button type="button" key={id} onClick={() => setType(id)} className={`rounded-xl border p-4 text-left ${type === id ? "border-saffron-500 bg-saffron-50" : "border-gray-200"}`}><Icon size={20} className={type === id ? "text-saffron-600" : "text-gray-400"} /><div className="mt-2 text-sm font-semibold">{t}</div><div className="text-xs text-gray-500">{s}</div></button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          <div><label className="label">{type === "seller" ? "Business name" : "Full name"}</label><input required className="input" placeholder={type === "seller" ? "Nova Electronics" : "Ravi Kumar"} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Mobile</label><input required className="input" placeholder="98765 43210" /></div>
            <div><label className="label">Email</label><input className="input" placeholder="you@example.com" /></div>
          </div>
          {type === "seller" && <div><label className="label">GSTIN</label><input className="input" placeholder="36ABCDE1234F1Z5" /></div>}
          <button className="btn-green w-full">Create account</button>
        </div>
        <p className="mt-5 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="font-semibold text-saffron-600">Sign in</Link></p>
      </form>
    </div>
  );
}
