import { catBySlug } from "./categories.js";

// [name, cat, emoji(fallback), price, mrp, rating, reviews, brand, inStock, moq, img]
// img = path under https://cdn.dummyjson.com/product-images/<img>/thumbnail.webp
const rows = [
  ["Realme Narzo 60 5G (8GB/128GB)", "electronics", "📱", 17999, 21999, 4.4, 1820, "Realme", true, 5, "smartphones/realme-xt"],
  ["boAt Rockerz Wireless Headphones", "electronics", "🎧", 1499, 4990, 4.3, 9120, "boAt", true, 10, "mobile-accessories/apple-airpods-max-silver"],
  ["Dell XPS 13 Laptop (i5/16GB)", "electronics", "💻", 46990, 54999, 4.5, 640, "Dell", false, 2, "laptops/new-dell-xps-13-9300-laptop"],
  ["Samsung Microwave Oven 28L", "appliances", "🔌", 12490, 15900, 4.6, 410, "Samsung", true, 2, "kitchen-accessories/microwave-oven"],
  ["Prestige Induction Cooktop 2000W", "appliances", "🔥", 2199, 3495, 4.2, 3240, "Prestige", true, 8, "kitchen-accessories/electric-stove"],
  ["Bajaj Boxed Blender 750W", "appliances", "🌀", 2799, 3999, 4.3, 1290, "Bajaj", true, 4, "kitchen-accessories/boxed-blender"],
  ["Men's Check Cotton Shirt", "fashion", "👔", 899, 1799, 4.1, 2110, "BharatWear", true, 12, "mens-shirts/man-plaid-shirt"],
  ["Women's Designer Gown", "fashion", "👗", 2499, 4999, 4.7, 1560, "Karagiri", true, 6, "womens-dresses/dress-pea"],
  ["Puma Future Rider Trainers", "fashion", "👟", 1299, 2999, 4.0, 4300, "Puma", true, 10, "mens-shoes/puma-future-rider-trainers"],
  ["Whey Protein 1kg Chocolate", "wellness", "💪", 1899, 2999, 4.4, 3120, "MuscleBlaze", true, 6, "groceries/protein-powder"],
  ["Vaseline Body & Face Lotion 400ml", "wellness", "🧴", 349, 460, 4.5, 8800, "Vaseline", true, 12, "skin-care/vaseline-men-body-and-face-lotion"],
  ["Olay Shea Butter Body Wash", "wellness", "🧼", 499, 699, 4.4, 8900, "Olay", true, 8, "skin-care/olay-ultra-moisture-shea-butter-body-wash"],
  ["Fortune Sunflower Oil 5L", "grocery", "🌻", 999, 1150, 4.3, 5400, "Fortune", true, 8, "groceries/cooking-oil"],
  ["India Gate Basmati Rice 5kg", "grocery", "🌾", 465, 520, 4.6, 12400, "India Gate", true, 10, "groceries/rice"],
  ["Dabur Pure Honey 1kg", "grocery", "🍯", 349, 460, 4.5, 8800, "Dabur", true, 12, "groceries/honey-jar"],
  ["Safety Helmet ISI (Bulk)", "industrial", "⛑️", 179, 320, 4.2, 740, "Karam", true, 50, "sports-accessories/cricket-helmet"],
  ["Carbon Steel Wok (Bulk 50pc)", "industrial", "🍳", 549, 899, 4.0, 320, "Prestige", true, 10, "kitchen-accessories/carbon-steel-wok"],
  ["Cricket Balls Leather (Bulk 100)", "industrial", "🏏", 129, 220, 4.3, 540, "SG", true, 100, "sports-accessories/cricket-ball"],
  ["Nykaa Matte Lipstick", "beauty", "💄", 399, 599, 4.3, 6100, "Nykaa", true, 12, "beauty/red-lipstick"],
  ["Eyeshadow Palette with Mirror", "beauty", "🎨", 699, 999, 4.4, 4200, "Nykaa", true, 8, "beauty/eyeshadow-palette-with-mirror"],
  ["Prestige Non-Stick Frying Pan", "home", "🍳", 799, 1299, 4.5, 2200, "Prestige", true, 4, "kitchen-accessories/pan"],
  ["Milton Steel Pot with Glass Lid", "home", "🍲", 749, 1099, 4.6, 5600, "Milton", true, 10, "kitchen-accessories/silver-pot-with-glass-cap"],
  ["Wooden Chopping Board", "home", "🔪", 349, 560, 4.4, 3400, "Cello", true, 12, "kitchen-accessories/chopping-board"],
  ["Philips Modern Table Lamp", "home", "💡", 899, 1499, 4.4, 7800, "Philips", true, 12, "home-decoration/table-lamp"],
];

export const products = rows.map((r, i) => {
  const [name, cat, emoji, price, mrp, rating, reviews, brand, inStock, moq, img] = r;
  const tiers = [
    [moq, Math.round(price * 0.9)],
    [moq * 5, Math.round(price * 0.82)],
    [moq * 20, Math.round(price * 0.74)],
  ];
  return {
    id: "p" + (i + 1),
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name, category: cat, categoryName: catBySlug[cat]?.name, emoji,
    tone: catBySlug[cat]?.tone, price, mrp, rating, reviews, brand, inStock,
    tiers, moq, img,
    discount: Math.round(((mrp - price) / mrp) * 100),
    b2bFrom: tiers[tiers.length - 1][1],
  };
});

export const byId = Object.fromEntries(products.map((p) => [p.id, p]));
export const featured = products.filter((_, i) => [0, 4, 7, 9, 13, 20].includes(i));
export const deals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 6);
export const forCategory = (slug) => products.filter((p) => p.category === slug);
