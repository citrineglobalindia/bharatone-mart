import { catBySlug } from "./categories.js";

// Tiered B2B pricing: [minQty, unitPrice]
const rows = [
  ["Redmi Note 14 Pro 5G (8GB/256GB)", "electronics", "📱", 24999, 28999, 4.4, 1820, "Xiaomi", true,
    [[10, 23500], [50, 22400], [200, 21200]], 5],
  ["boAt Rockerz 550 Headphones", "electronics", "🎧", 1499, 4990, 4.3, 9120, "boAt", true,
    [[25, 1350], [100, 1240], [500, 1120]], 10],
  ["HP 15s Ryzen 5 Laptop", "electronics", "💻", 46990, 54999, 4.5, 640, "HP", false,
    [[5, 45200], [20, 43800], [50, 42000]], 2],
  ["Samsung 8kg Front Load Washer", "appliances", "🌀", 32490, 39900, 4.6, 410, "Samsung", true,
    [[5, 31200], [20, 29900], [50, 28600]], 2],
  ["LG 1.5 Ton 5-Star Inverter AC", "appliances", "❄️", 41990, 52990, 4.5, 980, "LG", true,
    [[5, 40200], [15, 38800], [40, 37200]], 2],
  ["Prestige Induction Cooktop 2000W", "appliances", "🔥", 2199, 3495, 4.2, 3240, "Prestige", true,
    [[20, 1990], [100, 1850], [400, 1690]], 8],
  ["Men's Cotton Kurta (Festive)", "fashion", "👘", 899, 1799, 4.1, 2110, "BharatWear", true,
    [[30, 780], [120, 690], [500, 590]], 12],
  ["Women's Banarasi Silk Saree", "fashion", "🥻", 2499, 4999, 4.7, 1560, "Karagiri", true,
    [[12, 2250], [50, 2050], [200, 1850]], 6],
  ["Unisex Running Shoes", "fashion", "👟", 1299, 2999, 4.0, 4300, "Sparx", true,
    [[24, 1150], [100, 1040], [400, 920]], 10],
  ["Dabur Chyawanprash 1kg", "wellness", "🍯", 349, 460, 4.5, 8800, "Dabur", true,
    [[48, 315], [200, 292], [1000, 268]], 12],
  ["Yoga Mat 6mm Anti-Slip", "wellness", "🧘", 599, 1299, 4.2, 5210, "Boldfit", true,
    [[30, 520], [150, 470], [600, 410]], 10],
  ["Whey Protein 1kg Chocolate", "wellness", "💪", 1899, 2999, 4.4, 3120, "MuscleBlaze", true,
    [[12, 1750], [60, 1620], [240, 1480]], 6],
  ["Aashirvaad Atta 10kg", "grocery", "🌾", 465, 520, 4.6, 12400, "Aashirvaad", true,
    [[50, 440], [200, 418], [1000, 392]], 10],
  ["Tata Salt 1kg (Pack of 10)", "grocery", "🥄", 220, 260, 4.5, 6700, "Tata", true,
    [[40, 205], [200, 192], [800, 178]], 10],
  ["Fortune Sunflower Oil 5L", "grocery", "🌻", 999, 1150, 4.3, 5400, "Fortune", true,
    [[24, 940], [100, 895], [400, 845]], 8],
  ["Industrial LED Highbay 150W", "industrial", "💡", 1890, 2800, 4.1, 320, "Wipro", false,
    [[20, 1720], [100, 1580], [500, 1420]], 20],
  ["Stainless Steel Sheet 304 (4x8ft)", "industrial", "🔩", 6800, 7900, 4.0, 90, "Jindal", false,
    [[10, 6500], [50, 6200], [200, 5900]], 5],
  ["Safety Helmet ISI (Bulk)", "industrial", "⛑️", 179, 320, 4.2, 740, "Karam", true,
    [[100, 155], [500, 138], [2000, 122]], 50],
  ["Nykaa Matte Lipstick", "beauty", "💄", 399, 599, 4.3, 6100, "Nykaa", true,
    [[36, 360], [144, 330], [576, 298]], 12],
  ["Mamaearth Vitamin C Serum", "beauty", "🧴", 499, 699, 4.4, 8900, "Mamaearth", true,
    [[24, 455], [120, 420], [480, 380]], 8],
  ["Prestige Cookware Set 5pc", "home", "🍳", 2799, 4499, 4.5, 2200, "Prestige", true,
    [[10, 2580], [40, 2390], [160, 2190]], 4],
  ["Milton Thermosteel Flask 1L", "home", "🧴", 749, 1099, 4.6, 5600, "Milton", true,
    [[30, 680], [150, 620], [600, 560]], 10],
  ["Cello Water Bottle Set (6)", "home", "💧", 549, 899, 4.1, 3400, "Cello", true,
    [[40, 495], [200, 450], [800, 405]], 12],
  ["Philips LED Bulb 9W (Pack 4)", "home", "💡", 349, 560, 4.4, 7800, "Philips", true,
    [[50, 315], [250, 288], [1000, 262]], 12],
];

export const products = rows.map((r, i) => {
  const [name, cat, emoji, price, mrp, rating, reviews, brand, inStock, tiers, moq] = r;
  return {
    id: "p" + (i + 1),
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name, category: cat, categoryName: catBySlug[cat]?.name, emoji,
    tone: catBySlug[cat]?.tone, price, mrp, rating, reviews, brand, inStock,
    tiers, moq,
    discount: Math.round(((mrp - price) / mrp) * 100),
    b2bFrom: tiers[tiers.length - 1][1],
  };
});

export const byId = Object.fromEntries(products.map((p) => [p.id, p]));
export const featured = products.filter((_, i) => [0, 4, 7, 9, 12, 20].includes(i));
export const deals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 6);
export const forCategory = (slug) => products.filter((p) => p.category === slug);
