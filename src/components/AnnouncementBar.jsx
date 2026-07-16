import { Sparkles } from "lucide-react";

const items = [
  "🎉 Independence Sale — up to 60% off across categories",
  "🚚 Free delivery on orders above ₹500",
  "🧾 GST invoicing on every B2B order",
  "💳 Extra 10% off on UPI payments",
  "🏭 Bulk buyers: get instant supplier quotes",
];

export default function AnnouncementBar() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden bg-india-navy text-white">
      <div className="flex whitespace-nowrap py-1.5 text-xs font-medium">
        <div className="marquee flex shrink-0 items-center gap-8 pr-8">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-2"><Sparkles size={12} className="text-saffron-400" /> {t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
