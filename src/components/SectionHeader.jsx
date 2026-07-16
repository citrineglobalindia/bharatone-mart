import { Link } from "react-router-dom";
export default function SectionHeader({ title, sub, to, cta = "View all" }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h2>
        {sub && <p className="text-sm text-gray-500">{sub}</p>}
      </div>
      {to && <Link to={to} className="text-sm font-semibold text-saffron-600 hover:underline">{cta} →</Link>}
    </div>
  );
}
