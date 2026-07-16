import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

function useCountdown() {
  const [t, setT] = useState(() => {
    const end = new Date(); end.setHours(23, 59, 59, 999);
    return Math.max(0, end - new Date());
  });
  useEffect(() => {
    const id = setInterval(() => {
      const end = new Date(); end.setHours(23, 59, 59, 999);
      setT(Math.max(0, end - new Date()));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(t / 3.6e6), m = Math.floor((t % 3.6e6) / 6e4), s = Math.floor((t % 6e4) / 1000);
  return [h, m, s].map((x) => String(x).padStart(2, "0"));
}

export default function FlashSale() {
  const [h, m, s] = useCountdown();
  const Box = ({ v }) => <span className="grid h-7 w-7 place-items-center rounded-md bg-gray-900 text-xs font-bold text-white tabular-nums">{v}</span>;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-saffron-500 to-orange-500 px-5 py-4 text-white shadow-card">
      <div className="flex items-center gap-2">
        <Zap size={20} className="fill-white" />
        <div>
          <div className="text-sm font-extrabold uppercase tracking-wide">Flash Sale</div>
          <div className="text-xs text-white/80">Ends today at midnight</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Box v={h} /><span className="font-bold">:</span><Box v={m} /><span className="font-bold">:</span><Box v={s} />
      </div>
      <Link to="/category/electronics" className="btn bg-white text-saffron-600 hover:bg-white/90">Shop deals</Link>
    </div>
  );
}
