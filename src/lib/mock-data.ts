export const priceHistory = [
  { day: "Mon", yours: 4099, market: 4720 },
  { day: "Tue", yours: 4150, market: 4680 },
  { day: "Wed", yours: 4099, market: 4640 },
  { day: "Thu", yours: 4199, market: 4700 },
  { day: "Fri", yours: 4250, market: 4660 },
  { day: "Sat", yours: 4180, market: 4620 },
  { day: "Sun", yours: 4299, market: 4650 },
];

export type Signal = {
  id: number;
  category: "demand" | "competitor" | "behavior";
  message: string;
  time: string;
  influenced: boolean;
};

export const signals: Signal[] = [
  { id: 1, category: "competitor", message: "Amazon dropped Sony WH-1000XM5 by 8% · 4 min ago", time: "4m", influenced: true },
  { id: 2, category: "behavior", message: "Cart additions up 23% in last hour · 12 min ago", time: "12m", influenced: true },
  { id: 3, category: "demand", message: "Search volume spike for 'noise cancelling' · 18 min ago", time: "18m", influenced: false },
  { id: 4, category: "competitor", message: "Flipkart raised boAt Airdopes 141 by ₹50 · 24 min ago", time: "24m", influenced: false },
  { id: 5, category: "behavior", message: "Bounce rate down 4.2% on PDP · 31 min ago", time: "31m", influenced: false },
  { id: 6, category: "demand", message: "Inventory threshold hit for Noise ColorFit Pro 4 · 42 min ago", time: "42m", influenced: true },
  { id: 7, category: "competitor", message: "Croma matched our price on JBL Tune 770NC · 56 min ago", time: "56m", influenced: false },
  { id: 8, category: "behavior", message: "Wishlist additions up 11% session-wide · 1h ago", time: "1h", influenced: false },
  { id: 9, category: "demand", message: "Festive demand index moved to 7.4 / 10 · 1h ago", time: "1h", influenced: true },
  { id: 10, category: "competitor", message: "Reliance Digital launched bundle offer · 2h ago", time: "2h", influenced: false },
];

export type Product = {
  id: string;
  name: string;
  current: number;
  suggested: number;
  demand: number;
  status: "Optimised" | "Manual Override" | "Monitoring";
};

export const products: Product[] = [
  { id: "p1", name: "Sony WH-1000XM5", current: 4299, suggested: 4299, demand: 87, status: "Optimised" },
  { id: "p2", name: "boAt Airdopes 141", current: 1199, suggested: 1149, demand: 72, status: "Optimised" },
  { id: "p3", name: "Noise ColorFit Pro 4", current: 3499, suggested: 3299, demand: 64, status: "Manual Override" },
  { id: "p4", name: "JBL Tune 770NC", current: 6999, suggested: 7150, demand: 58, status: "Optimised" },
  { id: "p5", name: "OnePlus Buds 3", current: 4999, suggested: 4799, demand: 81, status: "Optimised" },
  { id: "p6", name: "Sennheiser Momentum 4", current: 27990, suggested: 28490, demand: 41, status: "Monitoring" },
  { id: "p7", name: "Bose QC Ultra Earbuds", current: 25990, suggested: 25590, demand: 69, status: "Optimised" },
  { id: "p8", name: "Realme Buds Air 6 Pro", current: 4499, suggested: 4399, demand: 54, status: "Monitoring" },
];

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");
