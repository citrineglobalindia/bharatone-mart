export default function ProductThumb({ product, className = "", size = "text-5xl" }) {
  const tone = product.tone || "#ff9933";
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${tone}14, ${tone}2e)` }}
    >
      <span className={size} role="img" aria-label={product.name}>
        {product.emoji}
      </span>
      {product.discount >= 10 && (
        <span className="absolute left-2 top-2 chip bg-india-green text-white">
          {product.discount}% OFF
        </span>
      )}
    </div>
  );
}
