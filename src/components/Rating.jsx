import { Star } from "lucide-react";
export default function Rating({ value, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1 text-xs text-gray-600">
      <span className="flex items-center gap-0.5 rounded bg-india-green px-1.5 py-0.5 font-semibold text-white">
        {value} <Star size={size - 3} fill="white" strokeWidth={0} />
      </span>
      {reviews != null && <span className="text-gray-400">({new Intl.NumberFormat("en-IN").format(reviews)})</span>}
    </div>
  );
}
