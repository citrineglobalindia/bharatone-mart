import { catBySlug } from "./categories.js";

// [name, cat, emoji(fallback), price, mrp, rating, reviews, brand, inStock, moq, img]
// img -> https://cdn.dummyjson.com/product-images/<img>/thumbnail.webp
const rows = [
  // Electronics
  ["Realme Narzo 60 5G (8GB/128GB)", "electronics", "📱", 17999, 21999, 4.4, 1820, "Realme", true, 5, "smartphones/realme-xt"],
  ["Samsung Galaxy S10 (128GB)", "electronics", "📱", 28999, 34999, 4.5, 2610, "Samsung", true, 4, "smartphones/samsung-galaxy-s10"],
  ["Vivo V9 Pro (6GB/128GB)", "electronics", "📱", 15999, 18999, 4.1, 1340, "Vivo", true, 6, "smartphones/vivo-v9"],
  ["Oppo F19 Pro+ 5G", "electronics", "📱", 22999, 25999, 4.3, 980, "Oppo", true, 5, "smartphones/oppo-f19-pro-plus"],
  ["boAt Rockerz Wireless Headphones", "electronics", "🎧", 1499, 4990, 4.3, 9120, "boAt", true, 10, "mobile-accessories/apple-airpods-max-silver"],
  ["Beats Flex Wireless Earphones", "electronics", "🎧", 3999, 5990, 4.4, 4200, "Beats", true, 8, "mobile-accessories/beats-flex-wireless-earphones"],
  ["Dell XPS 13 Laptop (i5/16GB)", "electronics", "💻", 46990, 54999, 4.5, 640, "Dell", false, 2, "laptops/new-dell-xps-13-9300-laptop"],
  ["Lenovo Yoga 920 2-in-1 Laptop", "electronics", "💻", 58990, 69999, 4.4, 410, "Lenovo", true, 2, "laptops/lenovo-yoga-920"],
  ["Samsung Galaxy Tab S8+", "electronics", "📱", 41999, 49999, 4.6, 720, "Samsung", true, 3, "tablets/samsung-galaxy-tab-s8-plus-grey"],
  // Appliances
  ["Samsung Microwave Oven 28L", "appliances", "🔌", 12490, 15900, 4.6, 410, "Samsung", true, 2, "kitchen-accessories/microwave-oven"],
  ["Prestige Induction Cooktop 2000W", "appliances", "🔥", 2199, 3495, 4.2, 3240, "Prestige", true, 8, "kitchen-accessories/electric-stove"],
  ["Bajaj Boxed Blender 750W", "appliances", "🌀", 2799, 3999, 4.3, 1290, "Bajaj", true, 4, "kitchen-accessories/boxed-blender"],
  ["Philips Hand Blender 700W", "appliances", "🥄", 1799, 2499, 4.4, 2100, "Philips", true, 6, "kitchen-accessories/hand-blender"],
  ["Prestige Citrus Juicer", "appliances", "🍊", 899, 1299, 4.1, 1560, "Prestige", true, 8, "kitchen-accessories/citrus-squeezer-yellow"],
  ["Hawkins Carbon Steel Wok", "appliances", "🍳", 999, 1499, 4.3, 880, "Hawkins", true, 6, "kitchen-accessories/carbon-steel-wok"],
  // Fashion
  ["Men's Plaid Cotton Shirt", "fashion", "👔", 899, 1799, 4.1, 2110, "BharatWear", true, 12, "mens-shirts/man-plaid-shirt"],
  ["Men's Check Formal Shirt", "fashion", "👔", 1099, 1999, 4.2, 1780, "Peter England", true, 10, "mens-shirts/men-check-shirt"],
  ["Men's Short Sleeve Shirt", "fashion", "👕", 699, 1299, 4.0, 3120, "BharatWear", true, 12, "mens-shirts/man-short-sleeve-shirt"],
  ["Puma Future Rider Trainers", "fashion", "👟", 1299, 2999, 4.0, 4300, "Puma", true, 10, "mens-shoes/puma-future-rider-trainers"],
  ["Nike Air Jordan 1 (Red/Black)", "fashion", "👟", 8999, 12995, 4.7, 2200, "Nike", true, 4, "mens-shoes/nike-air-jordan-1-red-and-black"],
  ["Women's Designer Gown", "fashion", "👗", 2499, 4999, 4.7, 1560, "Karagiri", true, 6, "womens-dresses/dress-pea"],
  ["Classic Sunglasses UV400", "fashion", "🕶️", 699, 1499, 4.2, 3400, "Fastrack", true, 12, "sunglasses/classic-sun-glasses"],
  ["Brown Leather Strap Watch", "fashion", "⌚", 1499, 2999, 4.3, 2650, "Fastrack", true, 8, "mens-watches/brown-leather-belt-watch"],
  // Wellness
  ["Whey Protein 1kg Chocolate", "wellness", "💪", 1899, 2999, 4.4, 3120, "MuscleBlaze", true, 6, "groceries/protein-powder"],
  ["Vaseline Body & Face Lotion 400ml", "wellness", "🧴", 349, 460, 4.5, 8800, "Vaseline", true, 12, "skin-care/vaseline-men-body-and-face-lotion"],
  ["Olay Shea Butter Body Wash", "wellness", "🧼", 499, 699, 4.4, 8900, "Olay", true, 8, "skin-care/olay-ultra-moisture-shea-butter-body-wash"],
  ["Attitude Super Leaves Hand Soap", "wellness", "🧴", 399, 549, 4.3, 2100, "Attitude", true, 10, "skin-care/attitude-super-leaves-hand-soap"],
  ["Cosco Tennis Racket Pro", "wellness", "🎾", 1299, 1999, 4.2, 760, "Cosco", true, 8, "sports-accessories/tennis-racket"],
  ["Nivia Basketball Size 7", "wellness", "🏀", 899, 1399, 4.3, 1240, "Nivia", true, 10, "sports-accessories/basketball"],
  // Grocery
  ["India Gate Basmati Rice 5kg", "grocery", "🌾", 465, 520, 4.6, 12400, "India Gate", true, 10, "groceries/rice"],
  ["Fortune Sunflower Oil 5L", "grocery", "🌻", 999, 1150, 4.3, 5400, "Fortune", true, 8, "groceries/cooking-oil"],
  ["Dabur Pure Honey 1kg", "grocery", "🍯", 349, 460, 4.5, 8800, "Dabur", true, 12, "groceries/honey-jar"],
  ["Nescafe Classic Coffee 200g", "grocery", "☕", 545, 650, 4.5, 7600, "Nescafe", true, 12, "groceries/nescafe-coffee"],
  ["Amul Fresh Toned Milk 1L", "grocery", "🥛", 66, 72, 4.6, 15400, "Amul", true, 24, "groceries/milk"],
  ["Real Mixed Fruit Juice 1L", "grocery", "🧃", 99, 120, 4.2, 4300, "Real", true, 24, "groceries/juice"],
  ["Farm Fresh Eggs (Tray of 30)", "grocery", "🥚", 210, 240, 4.4, 3600, "Farm Fresh", true, 20, "groceries/eggs"],
  ["Fresh Potatoes 5kg", "grocery", "🥔", 120, 160, 4.1, 5200, "Local Farm", true, 20, "groceries/potatoes"],
  ["Fresh Shimla Apples 1kg", "grocery", "🍎", 180, 240, 4.3, 4100, "Local Farm", true, 20, "groceries/apple"],
  // Industrial / B2B
  ["Safety Helmet ISI (Bulk)", "industrial", "⛑️", 179, 320, 4.2, 740, "Karam", true, 50, "sports-accessories/cricket-helmet"],
  ["Leather Cricket Balls (Bulk 100)", "industrial", "🏏", 129, 220, 4.3, 540, "SG", true, 100, "sports-accessories/cricket-ball"],
  ["English Willow Bats (Bulk 25)", "industrial", "🏏", 1499, 2200, 4.4, 220, "SS", true, 25, "sports-accessories/cricket-bat"],
  ["Match Footballs (Bulk 50)", "industrial", "⚽", 399, 650, 4.2, 410, "Nivia", true, 50, "sports-accessories/football"],
  ["Basketballs (Bulk 40)", "industrial", "🏀", 699, 999, 4.1, 300, "Cosco", true, 40, "sports-accessories/basketball"],
  ["Steel Lunch Boxes (Bulk 200)", "industrial", "🍱", 149, 260, 4.0, 680, "Milton", true, 200, "kitchen-accessories/lunch-box"],
  ["Facial Tissue Boxes (Bulk 100)", "industrial", "🧻", 39, 60, 4.2, 900, "Origami", true, 100, "groceries/tissue-paper-box"],
  // Beauty
  ["Nykaa Matte Lipstick", "beauty", "💄", 399, 599, 4.3, 6100, "Nykaa", true, 12, "beauty/red-lipstick"],
  ["Eyeshadow Palette with Mirror", "beauty", "🎨", 699, 999, 4.4, 4200, "Nykaa", true, 8, "beauty/eyeshadow-palette-with-mirror"],
  ["Essence Lash Princess Mascara", "beauty", "👁️", 299, 449, 4.4, 9800, "Essence", true, 12, "beauty/essence-mascara-lash-princess"],
  ["Lakme Red Nail Polish", "beauty", "💅", 149, 220, 4.2, 5400, "Lakme", true, 16, "beauty/red-nail-polish"],
  ["Face Powder Compact", "beauty", "🧫", 399, 560, 4.1, 2600, "Maybelline", true, 12, "beauty/powder-canister"],
  ["Calvin Klein CK One EDT 100ml", "beauty", "🌸", 3499, 4999, 4.5, 1800, "Calvin Klein", true, 4, "fragrances/calvin-klein-ck-one"],
  ["Gucci Bloom Eau de Parfum", "beauty", "🌸", 6999, 8999, 4.6, 960, "Gucci", true, 3, "fragrances/gucci-bloom-eau-de"],
  // Home & Kitchen
  ["Prestige Non-Stick Frying Pan", "home", "🍳", 799, 1299, 4.5, 2200, "Prestige", true, 4, "kitchen-accessories/pan"],
  ["Milton Steel Pot with Glass Lid", "home", "🍲", 749, 1099, 4.6, 5600, "Milton", true, 10, "kitchen-accessories/silver-pot-with-glass-cap"],
  ["Wooden Chopping Board", "home", "🔪", 349, 560, 4.4, 3400, "Cello", true, 12, "kitchen-accessories/chopping-board"],
  ["Philips Modern Table Lamp", "home", "💡", 899, 1499, 4.4, 7800, "Philips", true, 12, "home-decoration/table-lamp"],
  ["Ceramic Plant Pot (Set of 2)", "home", "🪴", 599, 899, 4.3, 1900, "Ugaoo", true, 10, "home-decoration/plant-pot"],
  ["Family Tree Photo Frame", "home", "🖼️", 699, 1099, 4.2, 1400, "Art Street", true, 8, "home-decoration/family-tree-photo-frame"],
  ["Bedside Table (African Cherry)", "home", "🛏️", 4999, 7499, 4.5, 320, "Nilkamal", true, 2, "furniture/bedside-table-african-cherry"],
  ["Executive Office Chair", "home", "💺", 8999, 12999, 4.4, 540, "Green Soul", true, 2, "furniture/knoll-saarinen-executive-conference-chair"],
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
export const featured = products.filter((_, i) => [1, 4, 19, 23, 30, 51].includes(i));
export const deals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 8);
export const forCategory = (slug) => products.filter((p) => p.category === slug);
