export const categories = [
  { slug: "electronics", name: "Electronics", emoji: "📱", tone: "#2563eb", blurb: "Phones, laptops, audio" },
  { slug: "appliances", name: "Home Appliances", emoji: "🏠", tone: "#0891b2", blurb: "Kitchen & large appliances" },
  { slug: "fashion", name: "Fashion", emoji: "👗", tone: "#db2777", blurb: "Men, women & kids wear" },
  { slug: "wellness", name: "Health & Wellness", emoji: "🧘", tone: "#16a34a", blurb: "Ayurveda, fitness, care" },
  { slug: "grocery", name: "Grocery & Staples", emoji: "🛒", tone: "#ca8a04", blurb: "Daily essentials & food" },
  { slug: "industrial", name: "Industrial & B2B", emoji: "🏭", tone: "#4b5563", blurb: "Bulk supplies & machinery" },
  { slug: "beauty", name: "Beauty & Personal", emoji: "💄", tone: "#e11d48", blurb: "Skincare & cosmetics" },
  { slug: "home", name: "Home & Kitchen", emoji: "🍽️", tone: "#7c3aed", blurb: "Cookware & decor" },
];

export const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
