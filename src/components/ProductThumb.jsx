import { useState } from "react";

const CDN = "https://cdn.dummyjson.com/product-images";

export default function ProductThumb({ product, className = "", size = "text-5xl", zoom = false, variant = "thumbnail" }) {
  const tone = product.tone || "#ff9933";
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = product.img ? `${CDN}/${product.img}/${variant}.webp` : null;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-white ${className}`}>
      {!loaded && !err && <div className="absolute inset-0 shimmer" />}
      {src && !err ? (
        <img
          src={src}
          alt={product.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErr(true)}
          className={`h-full w-full object-contain p-3 transition-transform duration-500 ${zoom ? "group-hover:scale-110" : ""} ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <span className={`flex h-full w-full items-center justify-center ${size}`}
          style={{ background: `linear-gradient(135deg, ${tone}14, ${tone}2e)` }} role="img" aria-label={product.name}>
          {product.emoji}
        </span>
      )}
      {product.discount >= 10 && (
        <span className="absolute left-2 top-2 chip bg-india-green text-white shadow-sm">{product.discount}% OFF</span>
      )}
    </div>
  );
}
