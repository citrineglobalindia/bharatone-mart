import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, BadgeCheck, Clock, MapPin, Star, TrendingDown, FileText, Building2 } from "lucide-react";
import { products } from "../data/products.js";
import { supplierQuotes } from "../data/mock.js";
import { inr, num } from "../lib/format.js";
import RfqModal from "../components/RfqModal.jsx";

export default function B2B() {
  const [rfqProduct, setRfqProduct] = useState(null);
  const [q, setQ] = useState("");
  const list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 8);

  return (
    <div>
      <section className="bg-india-navy text-white">
        <div className="container-x py-10">
          <span className="chip bg-white/15">BharatOne Business</span>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">Source in bulk from verified Indian suppliers</h1>
          <p className="mt-2 max-w-2xl text-white/70">Post a requirement, compare quotes on price, MOQ and lead time, and order with GST invoicing — all in one place.</p>
          <div className="mt-6 flex max-w-xl items-center rounded-xl bg-white p-1.5">
            <Search className="ml-2 text-gray-400" size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="What do you want to source? e.g. safety helmet, atta, LED" className="w-full bg-transparent px-2 py-2 text-sm text-gray-800 outline-none" />
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
            {[[BadgeCheck, "GST-verified suppliers"], [TrendingDown, "Tiered bulk pricing"], [FileText, "GST e-invoicing"]].map(([Icon, t], i) => (<span key={i} className="flex items-center gap-1.5"><Icon size={16} /> {t}</span>))}
          </div>
        </div>
      </section>

      <div className="container-x py-8">
        {/* How it works */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[["1", "Post your requirement", "Product, quantity, target price, pincode."], ["2", "Get supplier quotes", "3–6 verified suppliers respond within 24h."], ["3", "Compare & order", "Pick best price + lead time, order with GST invoice."]].map(([n, t, s]) => (
            <div key={n} className="card p-5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-saffron-500 font-bold text-white">{n}</div>
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-gray-500">{s}</p>
            </div>
          ))}
        </div>

        {/* Requirement list */}
        <h2 className="mb-4 text-lg font-bold">Popular products to source in bulk</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr><th className="p-3">Product</th><th className="p-3">Category</th><th className="hidden p-3 sm:table-cell">MOQ</th><th className="p-3">Best B2B price</th><th className="p-3"></th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3"><Link to={`/product/${p.id}`} className="flex items-center gap-2 font-medium hover:text-saffron-600"><span className="text-xl">{p.emoji}</span> {p.name}</Link></td>
                  <td className="p-3 text-gray-500">{p.categoryName}</td>
                  <td className="hidden p-3 sm:table-cell">{num(p.moq)} units</td>
                  <td className="p-3 font-semibold text-india-navy">{inr(p.b2bFrom)}</td>
                  <td className="p-3 text-right"><button onClick={() => setRfqProduct(p)} className="btn-green px-3 py-1.5 text-xs">Get best price</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sample quotes */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="mb-1 text-lg font-bold">Live supplier quotes</h2>
            <p className="mb-4 text-sm text-gray-500">Example: RFQ-5521 · Safety Helmet ISI · 1,500 units</p>
            <div className="space-y-3">
              {supplierQuotes.map((s, i) => (
                <div key={i} className="card flex items-center gap-4 p-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-india-navyLight text-india-navy"><Building2 size={20} /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-semibold">{s.supplier} {s.verified && <BadgeCheck size={15} className="text-india-green" />}</div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {s.city}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {s.lead}</span>
                      <span className="flex items-center gap-1"><Star size={12} className="text-saffron-500" /> {s.rating}</span>
                      <span>MOQ {num(s.moq)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-india-navy">{inr(s.price)}<span className="text-xs font-normal text-gray-400">/unit</span></div>
                    <button className="btn-outline mt-1 px-3 py-1 text-xs">Accept</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="card h-fit bg-india-greenLight p-5">
            <h3 className="font-bold text-india-greenDark">New to bulk buying?</h3>
            <p className="mt-1 text-sm text-gray-600">Post your first requirement free. No obligation to buy — just compare the best supplier offers across India.</p>
            <button onClick={() => setRfqProduct(products[17])} className="btn-green mt-4 w-full">Post a requirement</button>
            <Link to="/seller" className="btn-outline mt-2 w-full">I'm a supplier →</Link>
          </aside>
        </div>
      </div>

      {rfqProduct && <RfqModal product={rfqProduct} onClose={() => setRfqProduct(null)} />}
    </div>
  );
}
