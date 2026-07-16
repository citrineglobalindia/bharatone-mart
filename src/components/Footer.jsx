import { Link } from "react-router-dom";
import { Store, ShieldCheck, Truck, BadgeIndianRupee, Headphones } from "lucide-react";

const cols = [
  { h: "Shop", links: [["Electronics", "/category/electronics"], ["Fashion", "/category/fashion"], ["Grocery", "/category/grocery"], ["All deals", "/category/electronics"]] },
  { h: "Business", links: [["B2B / Bulk buying", "/b2b"], ["Request a quote", "/b2b"], ["Become a seller", "/seller"], ["Seller dashboard", "/seller"]] },
  { h: "Account", links: [["My orders", "/account"], ["My RFQs", "/account"], ["Sign in", "/login"], ["Register", "/register"]] },
  { h: "Company", links: [["About us", "/"], ["Admin console", "/admin"], ["Privacy", "/"], ["Contact", "/"]] },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container-x grid grid-cols-2 gap-6 border-b border-gray-100 py-8 sm:grid-cols-4">
        {[[ShieldCheck, "Verified sellers", "GST & PAN checked"], [Truck, "Pan-India delivery", "27,000+ pincodes"], [BadgeIndianRupee, "Secure payments", "UPI · Cards · COD"], [Headphones, "Support", "Hindi & regional"]].map(([Icon, t, s], i) => (
          <div key={i} className="flex items-start gap-3">
            <Icon className="mt-0.5 shrink-0 text-saffron-600" size={22} />
            <div><div className="text-sm font-semibold text-gray-800">{t}</div><div className="text-xs text-gray-500">{s}</div></div>
          </div>
        ))}
      </div>
      <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-6">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron-500 text-white"><Store size={18} /></div>
            <div className="text-lg font-extrabold">BharatOne <span className="text-saffron-600">Mart</span></div>
          </div>
          <p className="mt-3 max-w-xs text-sm text-gray-500">India's trusted B2B + B2C marketplace — connecting citizens, retailers and suppliers across Bharat.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div className="mb-3 text-sm font-semibold text-gray-800">{c.h}</div>
            <ul className="space-y-2 text-sm text-gray-500">
              {c.links.map(([l, to]) => (<li key={l}><Link to={to} className="hover:text-saffron-600">{l}</Link></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 py-4">
        <div className="container-x flex flex-col items-center justify-between gap-2 text-xs text-gray-400 sm:flex-row">
          <span>© 2026 BharatOne Mart. Made in India 🇮🇳</span>
          <span>Prototype UI · demo data only</span>
        </div>
      </div>
    </footer>
  );
}
