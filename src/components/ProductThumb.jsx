import { useState } from "react";

const CDN = "https://cdn.dummyjson.com/product-images";

export default function ProductThumb({ product, className = "", size = "text-5xl" }) {
  const tone = product.tone || "#ff9933";
  const [err, setErr] = useState(false);
  const src = product.img ? `${CDN}/${product.img}/thumbnail.webp` : null;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-white ${className}`}
    >
      {src && !err ? (
        <img
          src={src}
          alt={product.name}
          loading="lazy"
          onError={() => setErr(true)}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center ${size}`}
          style={{ background: `linear-gradient(135deg, ${tone}14, ${tone}2e)` }}
          role="img"
          aria-label={product.name}
        >
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
