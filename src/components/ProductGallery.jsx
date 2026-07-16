import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CDN = "https://cdn.dummyjson.com/product-images";

export default function ProductGallery({ product }) {
  const variants = ["1", "2", "3", "thumbnail"];
  const [active, setActive] = useState(0);
  const [hidden, setHidden] = useState({});
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const shown = variants.filter((_, i) => !hidden[i]);
  const activeVar = variants[active];

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div>
      <div className="card relative aspect-square overflow-hidden"
        onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)} onMouseMove={move}>
        <AnimatePresence mode="wait">
          <motion.img key={activeVar} src={`${CDN}/${product.img}/${activeVar}.webp`} alt={product.name}
            initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            onError={() => setHidden((h) => ({ ...h, [active]: true }))}
            className="h-full w-full object-contain p-6 transition-transform duration-200"
            style={zoom ? { transform: "scale(1.8)", transformOrigin: `${pos.x}% ${pos.y}%` } : {}} />
        </AnimatePresence>
        {product.discount >= 10 && (
          <span className="absolute left-4 top-4 chip bg-india-green text-white shadow">{product.discount}% OFF</span>
        )}
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity md:opacity-100">Hover to zoom</span>
      </div>
      <div className="mt-3 flex gap-3">
        {variants.map((v, i) => hidden[i] ? null : (
          <button key={v} onClick={() => setActive(i)}
            className={`card h-16 w-16 shrink-0 overflow-hidden p-1 transition ${active === i ? "ring-2 ring-saffron-500" : "opacity-70 hover:opacity-100"}`}>
            <img src={`${CDN}/${product.img}/${v}.webp`} alt="" onError={() => setHidden((h) => ({ ...h, [i]: true }))} className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
