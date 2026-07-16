import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LayoutGrid, Store, ShoppingCart, User } from "lucide-react";
import { useCart } from "../lib/store.jsx";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/category/electronics", icon: LayoutGrid, label: "Shop", match: "/category" },
  { to: "/b2b", icon: Store, label: "B2B" },
  { to: "/cart", icon: ShoppingCart, label: "Cart", badge: true },
  { to: "/account", icon: User, label: "Account" },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const cart = useCart();
  if (pathname.startsWith("/product/")) return null;

  return (
    <nav className="glass pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5">
        {tabs.map((t) => {
          const active = t.match ? pathname.startsWith(t.match) : pathname === t.to;
          const Icon = t.icon;
          return (
            <Link key={t.label} to={t.to} className="relative flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium">
              {active && <motion.span layoutId="navpill" className="absolute -top-px h-0.5 w-8 rounded-full bg-saffron-500" />}
              <span className="relative">
                <Icon size={21} className={active ? "text-saffron-600" : "text-gray-400"} />
                {t.badge && cart.count > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-india-green px-1 text-[9px] font-bold text-white">{cart.count}</span>
                )}
              </span>
              <span className={active ? "text-saffron-600" : "text-gray-500"}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
