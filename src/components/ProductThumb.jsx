import { useState } from "react";

export default function ProductThumb({ product, className = "", size = "text-5xl" }) {
  const tone = product.tone || "#ff9933";
  const [err, setErr] = useState(false);
  const lock = product.id ? product.id.replace(/\D/g, "") : "1";
  const src = product.img
    ? `https://loremflickr.com/600/600/${product.img}?lock=${lock}`
    : null;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${tone}14, ${tone}2e)` }}
    >
      {src && !err ? (
        <img
          src={src}
          alt={product.name}
          loading="lazy"
          onError={() => setErr(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className={size} role="img" aria-label={product.name}>
          {product.emoji}
        </span>
      )}
      {product.discount >= 10 && (
        <span className="absolute left-2 top-2 chip bg-india-green text-white">
          {product.discount}% OFF
        </span>
      )}
    </div>
  );
}
