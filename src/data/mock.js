export const buyerOrders = [
  { id: "BOM-10241", date: "12 Jul 2026", items: 3, total: 34987, status: "Delivered", eta: "Delivered 15 Jul" },
  { id: "BOM-10233", date: "08 Jul 2026", items: 1, total: 1499, status: "In Transit", eta: "Arriving 17 Jul" },
  { id: "BOM-10218", date: "01 Jul 2026", items: 5, total: 8920, status: "Delivered", eta: "Delivered 04 Jul" },
  { id: "BOM-10199", date: "24 Jun 2026", items: 2, total: 46990, status: "Cancelled", eta: "Refunded" },
];

export const buyerRfqs = [
  { id: "RFQ-5521", product: "Safety Helmet ISI (Bulk)", qty: 1500, status: "Quoted", quotes: 4, best: 116 },
  { id: "RFQ-5510", product: "Aashirvaad Atta 10kg", qty: 800, status: "Open", quotes: 2, best: null },
  { id: "RFQ-5498", product: "Men's Cotton Kurta (Festive)", qty: 400, status: "Closed", quotes: 6, best: 560 },
];

export const supplierQuotes = [
  { supplier: "Shakti Traders", city: "Surat", price: 118, moq: 500, lead: "7 days", rating: 4.6, verified: true },
  { supplier: "National Safety Co.", city: "Delhi", price: 116, moq: 1000, lead: "10 days", rating: 4.8, verified: true },
  { supplier: "Karam Direct", city: "Kanpur", price: 122, moq: 250, lead: "5 days", rating: 4.4, verified: true },
  { supplier: "Gujarat Industrial", city: "Ahmedabad", price: 120, moq: 750, lead: "8 days", rating: 4.2, verified: false },
];

export const sellerKpis = [
  { label: "Revenue (30d)", value: "₹8.4L", delta: "+12.4%", up: true },
  { label: "Orders (30d)", value: "1,284", delta: "+6.1%", up: true },
  { label: "Open RFQs", value: "37", delta: "+9", up: true },
  { label: "Return rate", value: "2.1%", delta: "-0.4%", up: false },
];

export const sellerOrders = [
  { id: "SO-88213", buyer: "Ravi Kumar", type: "B2C", items: 2, total: 3998, status: "Packed" },
  { id: "SO-88207", buyer: "Meena Stores", type: "B2B", items: 120, total: 148800, status: "Processing" },
  { id: "SO-88190", buyer: "Anil Traders", type: "B2B", items: 500, total: 610000, status: "Shipped" },
  { id: "SO-88176", buyer: "Priya S.", type: "B2C", items: 1, total: 2499, status: "Delivered" },
];

export const sellerInventory = [
  { sku: "RN14-256", name: "Redmi Note 14 Pro 5G", stock: 340, reserved: 42, status: "Healthy" },
  { sku: "BOAT-550", name: "boAt Rockerz 550", stock: 18, reserved: 6, status: "Low" },
  { sku: "AATA-10", name: "Aashirvaad Atta 10kg", stock: 0, reserved: 0, status: "Out" },
  { sku: "YOGA-6MM", name: "Yoga Mat 6mm", stock: 210, reserved: 15, status: "Healthy" },
];

export const adminKpis = [
  { label: "GMV (30d)", value: "₹4.2 Cr", delta: "+18%", up: true },
  { label: "Active sellers", value: "2,410", delta: "+64", up: true },
  { label: "Pending KYC", value: "38", delta: "review", up: false },
  { label: "Live SKUs", value: "1.9L", delta: "+3.2k", up: true },
];

export const pendingSellers = [
  { name: "Sri Venkatesh Traders", gstin: "36ABCDE1234F1Z5", city: "Hyderabad", cat: "Grocery", kyc: "GST verified" },
  { name: "Nova Electronics", gstin: "27PQRSX6789K1Z2", city: "Mumbai", cat: "Electronics", kyc: "PAN pending" },
  { name: "Rajwadi Textiles", gstin: "24LMNOP4321Q1Z8", city: "Surat", cat: "Fashion", kyc: "GST verified" },
];

export const adminOrders = [
  { id: "BOM-10241", seller: "Nova Electronics", value: 34987, flag: "—", status: "Fulfilled" },
  { id: "BOM-10239", seller: "Shakti Traders", value: 174000, flag: "High value", status: "Review" },
  { id: "BOM-10236", seller: "Rajwadi Textiles", value: 8920, flag: "—", status: "Fulfilled" },
];
