import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, FileText, MapPin, User, Heart, LogOut, ChevronRight } from "lucide-react";
import { buyerOrders, buyerRfqs } from "../data/mock.js";
import { inr, num } from "../lib/format.js";

const statusTone = { Delivered: "bg-india-greenLight text-india-greenDark", "In Transit": "bg-saffron-50 text-saffron-700", Cancelled: "bg-red-50 text-red-600", Quoted: "bg-india-greenLight text-india-greenDark", Open: "bg-saffron-50 text-saffron-700", Closed: "bg-gray-100 text-gray-500" };

export default function Account() {
  const [tab, setTab] = useState("orders");
  const tabs = [["orders", "My Orders", Package], ["rfqs", "My RFQs", FileText], ["addresses", "Addresses", MapPin], ["profile", "Profile", User]];

  return (
    <div className="container-x py-6">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="card h-fit p-4">
          <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-saffron-500 font-bold text-white">RK</div>
            <div><div className="font-semibold">Ravi Kumar</div><div className="text-xs text-gray-500">+91 98765 43210</div></div>
          </div>
          <nav className="space-y-1">
            {tabs.map(([id, label, Icon]) => (
              <button key={id} onClick={() => setTab(id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${tab === id ? "bg-saffron-50 font-semibold text-saffron-700" : "text-gray-600 hover:bg-gray-100"}`}>
                <Icon size={16} /> {label}
              </button>
            ))}
            <Link to="/login" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"><LogOut size={16} /> Sign out</Link>
          </nav>
        </aside>

        <div>
          {tab === "orders" && (
            <div>
              <h1 className="mb-4 text-xl font-bold">My Orders</h1>
              <div className="space-y-3">
                {buyerOrders.map((o) => (
                  <div key={o.id} className="card flex flex-wrap items-center gap-4 p-4">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-gray-50"><Package size={20} className="text-gray-400" /></div>
                    <div className="flex-1"><div className="font-semibold">{o.id}</div><div className="text-xs text-gray-500">{o.date} · {o.items} item(s)</div></div>
                    <div className="text-right"><div className="font-bold">{inr(o.total)}</div><div className="text-xs text-gray-500">{o.eta}</div></div>
                    <span className={`chip ${statusTone[o.status]}`}>{o.status}</span>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "rfqs" && (
            <div>
              <h1 className="mb-4 text-xl font-bold">My RFQs (Bulk requests)</h1>
              <div className="space-y-3">
                {buyerRfqs.map((r) => (
                  <div key={r.id} className="card flex flex-wrap items-center gap-4 p-4">
                    <div className="flex-1"><div className="font-semibold">{r.product}</div><div className="text-xs text-gray-500">{r.id} · {num(r.qty)} units · {r.quotes} quote(s)</div></div>
                    {r.best && <div className="text-right"><div className="text-xs text-gray-400">Best quote</div><div className="font-bold text-india-navy">{inr(r.best)}/unit</div></div>}
                    <span className={`chip ${statusTone[r.status]}`}>{r.status}</span>
                    <Link to="/b2b" className="btn-outline px-3 py-1.5 text-xs">View</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "addresses" && (
            <div>
              <h1 className="mb-4 text-xl font-bold">Saved Addresses</h1>
              <div className="grid gap-3 sm:grid-cols-2">
                {[["Home", "Ravi Kumar", "12-3-456, Banjara Hills, Hyderabad, Telangana 500034"], ["Office", "Ravi Kumar", "5th Floor, HITEC City, Madhapur, Hyderabad 500081"]].map(([t, n, a]) => (
                  <div key={t} className="card p-4"><span className="chip bg-gray-100 text-gray-600">{t}</span><div className="mt-2 font-semibold">{n}</div><p className="text-sm text-gray-500">{a}</p></div>
                ))}
                <button className="card flex items-center justify-center border-dashed p-4 text-sm font-semibold text-saffron-600">+ Add new address</button>
              </div>
            </div>
          )}

          {tab === "profile" && (
            <div>
              <h1 className="mb-4 text-xl font-bold">Profile</h1>
              <div className="card max-w-lg space-y-3 p-5">
                <div><label className="label">Full name</label><input className="input" defaultValue="Ravi Kumar" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="label">Mobile</label><input className="input" defaultValue="+91 98765 43210" /></div>
                  <div><label className="label">Email</label><input className="input" defaultValue="ravi@example.com" /></div>
                </div>
                <div><label className="label">GSTIN (for B2B invoices)</label><input className="input" placeholder="Optional" /></div>
                <button className="btn-primary">Save changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
