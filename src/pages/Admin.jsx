import { useState } from "react";
import { ShieldCheck, Users, ShoppingBag, LayoutDashboard, BadgeCheck, AlertTriangle, ArrowUpRight, Check, X } from "lucide-react";
import { adminKpis, pendingSellers, adminOrders } from "../data/mock.js";
import { categories } from "../data/categories.js";
import { inr } from "../lib/format.js";

export default function Admin() {
  const [tab, setTab] = useState("overview");
  const nav = [["overview", "Overview", LayoutDashboard], ["sellers", "Seller KYC", Users], ["orders", "Orders", ShoppingBag], ["catalog", "Catalog", ShieldCheck]];

  return (
    <div className="container-x py-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gray-900 text-white"><ShieldCheck size={20} /></div>
        <div><h1 className="text-xl font-bold">Admin Console</h1><p className="text-sm text-gray-500">BharatOne Mart · platform operations</p></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="card h-fit p-3">
          {nav.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${tab === id ? "bg-gray-900 font-semibold text-white" : "text-gray-600 hover:bg-gray-100"}`}><Icon size={16} /> {label}</button>
          ))}
        </aside>

        <div>
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {adminKpis.map((k) => (
                  <div key={k.label} className="card p-4"><div className="text-xs text-gray-500">{k.label}</div><div className="mt-1 text-2xl font-bold">{k.value}</div><div className={`mt-1 flex items-center gap-1 text-xs font-semibold ${k.up ? "text-india-green" : "text-saffron-600"}`}>{k.up && <ArrowUpRight size={13} />}{k.delta}</div></div>
                ))}
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="card p-5">
                  <h3 className="mb-3 font-semibold">GMV by category (30d)</h3>
                  <div className="space-y-2">
                    {categories.slice(0, 6).map((c, i) => {
                      const w = [92, 74, 63, 48, 40, 28][i];
                      return (<div key={c.slug}><div className="mb-1 flex justify-between text-xs"><span>{c.emoji} {c.name}</span><span className="text-gray-400">{w}%</span></div><div className="h-2 rounded-full bg-gray-100"><div className="h-2 rounded-full" style={{ width: `${w}%`, background: c.tone }} /></div></div>);
                    })}
                  </div>
                </div>
                <div className="card p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold"><AlertTriangle size={16} className="text-saffron-600" /> Needs attention</h3>
                  <ul className="space-y-2 text-sm">
                    {[["38 sellers awaiting KYC", "Review GST & PAN"], ["1 high-value order flagged", "₹1.74L — manual review"], ["12 SKUs pending moderation", "New listings"], ["4 return disputes open", "Buyer escalations"]].map(([t, s]) => (
                      <li key={t} className="flex items-center justify-between rounded-lg bg-gray-50 p-2.5"><div><div className="font-medium">{t}</div><div className="text-xs text-gray-500">{s}</div></div><button className="btn-outline px-2.5 py-1 text-xs">Open</button></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "sellers" && (
            <div>
              <h3 className="mb-3 font-semibold">Seller onboarding — pending KYC</h3>
              <div className="space-y-3">
                {pendingSellers.map((s) => (
                  <div key={s.gstin} className="card flex flex-wrap items-center gap-4 p-4">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gray-100"><Users size={18} className="text-gray-400" /></div>
                    <div className="flex-1"><div className="font-semibold">{s.name}</div><div className="text-xs text-gray-500">{s.city} · {s.cat} · <span className="font-mono">{s.gstin}</span></div></div>
                    <span className={`chip ${s.kyc.includes("verified") ? "bg-india-greenLight text-india-greenDark" : "bg-saffron-50 text-saffron-700"}`}>{s.kyc.includes("verified") && <BadgeCheck size={13} />} {s.kyc}</span>
                    <div className="flex gap-2"><button className="btn-green px-3 py-1.5 text-xs"><Check size={14} /> Approve</button><button className="btn-outline px-3 py-1.5 text-xs"><X size={14} /> Reject</button></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <h3 className="mb-3 font-semibold">Platform orders</h3>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500"><tr><th className="p-3">Order</th><th className="p-3">Seller</th><th className="p-3">Value</th><th className="p-3">Flag</th><th className="p-3">Status</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {adminOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50"><td className="p-3 font-medium">{o.id}</td><td className="p-3">{o.seller}</td><td className="p-3 font-semibold">{inr(o.value)}</td><td className="p-3">{o.flag === "—" ? <span className="text-gray-300">—</span> : <span className="chip bg-red-50 text-red-600">{o.flag}</span>}</td><td className="p-3"><span className={`chip ${o.status === "Fulfilled" ? "bg-india-greenLight text-india-greenDark" : "bg-saffron-50 text-saffron-700"}`}>{o.status}</span></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "catalog" && (
            <div>
              <h3 className="mb-3 font-semibold">Catalog health by category</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((c, i) => (
                  <div key={c.slug} className="card p-4"><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-lg text-lg" style={{ background: `${c.tone}1a` }}>{c.emoji}</span><span className="text-sm font-semibold">{c.name}</span></div><div className="mt-3 text-2xl font-bold">{[420, 310, 680, 240, 890, 150, 360, 520][i]}</div><div className="text-xs text-gray-500">live SKUs</div></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
