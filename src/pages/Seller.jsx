import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, Boxes, Wallet, Plus, ArrowUpRight, ArrowDownRight, Store } from "lucide-react";
import { sellerKpis, sellerOrders, sellerInventory } from "../data/mock.js";
import { products } from "../data/products.js";
import { inr } from "../lib/format.js";

const invTone = { Healthy: "bg-india-greenLight text-india-greenDark", Low: "bg-saffron-50 text-saffron-700", Out: "bg-red-50 text-red-600" };
const ordTone = { Delivered: "text-india-green", Shipped: "text-blue-600", Packed: "text-saffron-600", Processing: "text-gray-500" };

export default function Seller() {
  const [tab, setTab] = useState("overview");
  const nav = [["overview", "Overview", LayoutDashboard], ["products", "Products", Package], ["orders", "Orders", ClipboardList], ["inventory", "Inventory", Boxes], ["payouts", "Payouts", Wallet]];

  return (
    <div className="container-x py-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-india-navy text-white"><Store size={20} /></div>
          <div><h1 className="text-xl font-bold">Seller Dashboard</h1><p className="text-sm text-gray-500">Nova Electronics · GST verified ✓</p></div>
        </div>
        <button className="btn-primary"><Plus size={16} /> Add product</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="card h-fit p-3">
          {nav.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${tab === id ? "bg-india-navy font-semibold text-white" : "text-gray-600 hover:bg-gray-100"}`}><Icon size={16} /> {label}</button>
          ))}
        </aside>

        <div>
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {sellerKpis.map((k) => (
                  <div key={k.label} className="card p-4">
                    <div className="text-xs text-gray-500">{k.label}</div>
                    <div className="mt-1 text-2xl font-bold">{k.value}</div>
                    <div className={`mt-1 flex items-center gap-1 text-xs font-semibold ${k.up ? "text-india-green" : "text-red-500"}`}>{k.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{k.delta}</div>
                  </div>
                ))}
              </div>
              <div className="card p-5">
                <h3 className="mb-4 font-semibold">Sales (last 7 days)</h3>
                <div className="flex h-40 items-end gap-3">
                  {[42, 58, 35, 70, 62, 88, 76].map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <div className="w-full rounded-t bg-saffron-400" style={{ height: `${h}%` }} />
                      <span className="text-[10px] text-gray-400">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-semibold">Recent orders</h3>
                <OrdersTable rows={sellerOrders} />
              </div>
            </div>
          )}

          {tab === "products" && (
            <div>
              <h3 className="mb-3 font-semibold">Your listings ({products.slice(0, 8).length})</h3>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500"><tr><th className="p-3">Product</th><th className="p-3">Retail</th><th className="p-3">B2B from</th><th className="p-3">Rating</th><th className="p-3">Status</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.slice(0, 8).map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="p-3"><Link to={`/product/${p.id}`} className="flex items-center gap-2 font-medium hover:text-saffron-600"><span className="text-lg">{p.emoji}</span> {p.name}</Link></td>
                        <td className="p-3">{inr(p.price)}</td><td className="p-3 text-india-navy">{inr(p.b2bFrom)}</td><td className="p-3">{p.rating} ★</td>
                        <td className="p-3"><span className={`chip ${p.inStock ? "bg-india-greenLight text-india-greenDark" : "bg-gray-100 text-gray-500"}`}>{p.inStock ? "Live" : "Draft"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "orders" && (<div><h3 className="mb-3 font-semibold">All orders</h3><OrdersTable rows={sellerOrders} /></div>)}

          {tab === "inventory" && (
            <div>
              <h3 className="mb-3 font-semibold">Inventory</h3>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500"><tr><th className="p-3">SKU</th><th className="p-3">Product</th><th className="p-3">In stock</th><th className="p-3">Reserved</th><th className="p-3">Status</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {sellerInventory.map((r) => (
                      <tr key={r.sku} className="hover:bg-gray-50"><td className="p-3 font-mono text-xs">{r.sku}</td><td className="p-3 font-medium">{r.name}</td><td className="p-3">{r.stock}</td><td className="p-3 text-gray-500">{r.reserved}</td><td className="p-3"><span className={`chip ${invTone[r.status]}`}>{r.status}</span></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "payouts" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[["Available", "₹2,84,120"], ["In process", "₹96,400"], ["This month", "₹8,41,290"]].map(([l, v]) => (<div key={l} className="card p-4"><div className="text-xs text-gray-500">{l}</div><div className="mt-1 text-xl font-bold">{v}</div></div>))}
              </div>
              <div className="card p-5">
                <div className="flex items-center justify-between"><h3 className="font-semibold">Next payout</h3><button className="btn-green px-3 py-1.5 text-xs">Withdraw</button></div>
                <p className="mt-1 text-sm text-gray-500">₹2,84,120 will be settled to HDFC ••4521 on 20 Jul 2026 (T+2).</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrdersTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500"><tr><th className="p-3">Order</th><th className="p-3">Buyer</th><th className="p-3">Type</th><th className="p-3">Items</th><th className="p-3">Value</th><th className="p-3">Status</th></tr></thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((o) => (
            <tr key={o.id} className="hover:bg-gray-50">
              <td className="p-3 font-medium">{o.id}</td><td className="p-3">{o.buyer}</td>
              <td className="p-3"><span className={`chip ${o.type === "B2B" ? "bg-india-navyLight text-india-navy" : "bg-saffron-50 text-saffron-700"}`}>{o.type}</span></td>
              <td className="p-3">{o.items}</td><td className="p-3 font-semibold">{inr(o.total)}</td>
              <td className={`p-3 font-semibold ${ordTone[o.status]}`}>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
