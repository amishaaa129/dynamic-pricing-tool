export type ProductRow = {
  id: string;
  name: string;
  category: string;
  sku: string;
  current: number;
  suggested: number;
  demandScore: number;
  demandTrend: number[]; // 7-day spark
  trendDir: "up" | "flat" | "down";
  marketAvg: number;
  status: "Optimised" | "Manual" | "Paused";
  updated: string;
};

export const productRows: ProductRow[] = [
  {
    id: "p1", name: "Sony WH-1000XM5", category: "Over-Ear Headphones", sku: "SKU-A1023",
    current: 24990, suggested: 24590, demandScore: 84,
    demandTrend: [40, 42, 48, 55, 60, 72, 80], trendDir: "up",
    marketAvg: 26500, status: "Optimised", updated: "4m ago",
  },
  {
    id: "p2", name: "boAt Airdopes 141", category: "TWS Earphones", sku: "SKU-B2210",
    current: 1299, suggested: 1249, demandScore: 71,
    demandTrend: [55, 52, 50, 51, 49, 50, 50], trendDir: "flat",
    marketAvg: 1399, status: "Optimised", updated: "7m ago",
  },
  {
    id: "p3", name: "Noise ColorFit Pro 4", category: "Smartwatch", sku: "SKU-C5512",
    current: 3499, suggested: 3299, demandScore: 62,
    demandTrend: [70, 65, 60, 55, 50, 48, 42], trendDir: "down",
    marketAvg: 3650, status: "Manual", updated: "1h ago",
  },
  {
    id: "p4", name: "Realme Buds Air 5", category: "TWS Earphones", sku: "SKU-D4480",
    current: 2799, suggested: 2899, demandScore: 77,
    demandTrend: [30, 38, 45, 50, 58, 65, 72], trendDir: "up",
    marketAvg: 2950, status: "Optimised", updated: "12m ago",
  },
  {
    id: "p5", name: "JBL Flip 6", category: "Bluetooth Speaker", sku: "SKU-E6620",
    current: 11999, suggested: 11999, demandScore: 58,
    demandTrend: [50, 51, 50, 52, 51, 50, 51], trendDir: "flat",
    marketAvg: 12450, status: "Paused", updated: "3h ago",
  },
  {
    id: "p6", name: "OnePlus Nord Buds 2", category: "TWS Earphones", sku: "SKU-F7710",
    current: 2999, suggested: 2849, demandScore: 69,
    demandTrend: [40, 45, 48, 52, 55, 58, 64], trendDir: "up",
    marketAvg: 3120, status: "Optimised", updated: "9m ago",
  },
  {
    id: "p7", name: "Samsung Galaxy Buds FE", category: "TWS Earphones", sku: "SKU-G8821",
    current: 5999, suggested: 5799, demandScore: 66,
    demandTrend: [60, 58, 56, 50, 48, 46, 42], trendDir: "down",
    marketAvg: 6250, status: "Manual", updated: "22m ago",
  },
  {
    id: "p8", name: "Fireboltt Phoenix", category: "Smartwatch", sku: "SKU-H9920",
    current: 1799, suggested: 1799, demandScore: 54,
    demandTrend: [45, 47, 48, 47, 48, 47, 48], trendDir: "flat",
    marketAvg: 1850, status: "Paused", updated: "5h ago",
  },
];

// Competitors data
export type CompRow = {
  id: string;
  name: string;
  category: string;
  yours: number;
  theirs: number;
  trend: number[];
};

export const competitorData: Record<string, CompRow[]> = {
  amazon: [
    { id: "p1", name: "Sony WH-1000XM5", category: "Over-Ear", yours: 24990, theirs: 22999, trend: [25500, 25200, 24500, 23800, 23200, 23000, 22999] },
    { id: "p2", name: "boAt Airdopes 141", category: "TWS", yours: 1299, theirs: 1199, trend: [1499, 1499, 1399, 1299, 1249, 1249, 1199] },
    { id: "p5", name: "JBL Flip 6", category: "Speaker", yours: 11999, theirs: 9399, trend: [12000, 11500, 10800, 10200, 9800, 9500, 9399] },
    { id: "p4", name: "Realme Buds Air 5", category: "TWS", yours: 2799, theirs: 2899, trend: [3100, 3050, 3000, 2950, 2920, 2900, 2899] },
    { id: "p6", name: "OnePlus Nord Buds 2", category: "TWS", yours: 2999, theirs: 2799, trend: [3200, 3100, 3050, 2950, 2900, 2850, 2799] },
    { id: "p3", name: "Noise ColorFit Pro 4", category: "Smartwatch", yours: 3499, theirs: 3699, trend: [3800, 3750, 3720, 3700, 3699, 3700, 3699] },
  ],
  flipkart: [
    { id: "p1", name: "Sony WH-1000XM5", category: "Over-Ear", yours: 24990, theirs: 25490, trend: [26000, 25900, 25800, 25700, 25600, 25500, 25490] },
    { id: "p7", name: "Samsung Galaxy Buds FE", category: "TWS", yours: 5999, theirs: 5499, trend: [6200, 6000, 5800, 5700, 5600, 5550, 5499] },
    { id: "p8", name: "Fireboltt Phoenix", category: "Smartwatch", yours: 1799, theirs: 1899, trend: [2000, 1980, 1950, 1920, 1900, 1900, 1899] },
  ],
  meesho: [
    { id: "p2", name: "boAt Airdopes 141", category: "TWS", yours: 1299, theirs: 1349, trend: [1400, 1390, 1380, 1370, 1360, 1350, 1349] },
    { id: "p3", name: "Noise ColorFit Pro 4", category: "Smartwatch", yours: 3499, theirs: 3299, trend: [3500, 3450, 3400, 3380, 3350, 3320, 3299] },
  ],
  myntra: [
    { id: "p7", name: "Samsung Galaxy Buds FE", category: "TWS", yours: 5999, theirs: 5899, trend: [6100, 6050, 6000, 5950, 5920, 5900, 5899] },
    { id: "p4", name: "Realme Buds Air 5", category: "TWS", yours: 2799, theirs: 2699, trend: [2900, 2850, 2800, 2780, 2750, 2720, 2699] },
  ],
};

export type Alert = {
  id: number;
  platform: "A" | "F" | "M" | "Y";
  platformName: string;
  product: string;
  from: number;
  to: number;
  recommended: number;
  time: string;
};

export const priceAlerts: Alert[] = [
  { id: 1, platform: "A", platformName: "Amazon", product: "boAt Airdopes 141", from: 1499, to: 1199, recommended: 1249, time: "6 minutes ago" },
  { id: 2, platform: "A", platformName: "Amazon", product: "JBL Flip 6", from: 10200, to: 9399, recommended: 9799, time: "18 minutes ago" },
  { id: 3, platform: "F", platformName: "Flipkart", product: "Samsung Galaxy Buds FE", from: 5700, to: 5499, recommended: 5599, time: "42 minutes ago" },
  { id: 4, platform: "M", platformName: "Meesho", product: "Noise ColorFit Pro 4", from: 3400, to: 3299, recommended: 3349, time: "1 hour ago" },
  { id: 5, platform: "A", platformName: "Amazon", product: "Sony WH-1000XM5", from: 23800, to: 22999, recommended: 23499, time: "2 hours ago" },
];

// Logs
export type LogEntry = {
  id: string;
  timestamp: string;
  event: "Auto-optimised" | "Manual override" | "Reverted" | "Rule triggered" | "Paused";
  product: string;
  sku: string;
  before: number;
  after: number;
  reason: string;
  actor: string;
  isUser: boolean;
  confidence: number;
  signalSnapshot: { label: string; value: string }[];
  constraints: { label: string; pass: boolean }[];
};

export const logEntries: LogEntry[] = [
  {
    id: "L001", timestamp: "Today, 14:32", event: "Rule triggered", product: "Sony WH-1000XM5", sku: "SKU-A1023",
    before: 25490, after: 24299, reason: "Competitor drop on Amazon · demand high",
    actor: "Engine v2.1", isUser: false, confidence: 91,
    signalSnapshot: [
      { label: "Demand score", value: "84/100" },
      { label: "Cart adds (1h)", value: "+23%" },
      { label: "Amazon delta", value: "−8%" },
      { label: "Elasticity", value: "−1.4" },
    ],
    constraints: [
      { label: "Min margin (30%) maintained", pass: true },
      { label: "Max discount (25%) not breached", pass: true },
      { label: "Competitor match rule", pass: false },
    ],
  },
  {
    id: "L002", timestamp: "Today, 14:18", event: "Auto-optimised", product: "boAt Airdopes 141", sku: "SKU-B2210",
    before: 1299, after: 1249, reason: "Routine recalculation · −3.8% adjustment",
    actor: "Engine v2.1", isUser: false, confidence: 87,
    signalSnapshot: [{ label: "Demand", value: "71" }, { label: "Avg market", value: "₹1,310" }],
    constraints: [{ label: "Min margin maintained", pass: true }, { label: "Max discount", pass: true }],
  },
  {
    id: "L003", timestamp: "Today, 13:54", event: "Manual override", product: "Noise ColorFit Pro 4", sku: "SKU-C5512",
    before: 3299, after: 3499, reason: "Held above market · brand positioning decision",
    actor: "RM", isUser: true, confidence: 100,
    signalSnapshot: [{ label: "Demand", value: "62" }, { label: "Suggested", value: "₹3,299" }],
    constraints: [{ label: "Manual lock applied", pass: true }],
  },
  {
    id: "L004", timestamp: "Today, 13:21", event: "Auto-optimised", product: "Realme Buds Air 5", sku: "SKU-D4480",
    before: 2849, after: 2899, reason: "Demand surge · +3.6% lift",
    actor: "Engine v2.1", isUser: false, confidence: 84,
    signalSnapshot: [{ label: "Demand", value: "77" }, { label: "Search vol", value: "+34%" }],
    constraints: [{ label: "Min margin", pass: true }, { label: "Max discount", pass: true }],
  },
  {
    id: "L005", timestamp: "Today, 12:48", event: "Reverted", product: "JBL Flip 6", sku: "SKU-E6620",
    before: 10499, after: 11999, reason: "Reverted manual change · returned to baseline",
    actor: "AS", isUser: true, confidence: 100,
    signalSnapshot: [{ label: "Previous price", value: "₹11,999" }],
    constraints: [{ label: "Revert window valid", pass: true }],
  },
  {
    id: "L006", timestamp: "Today, 11:30", event: "Rule triggered", product: "OnePlus Nord Buds 2", sku: "SKU-F7710",
    before: 2999, after: 2849, reason: "Cart abandonment threshold crossed",
    actor: "Engine v2.1", isUser: false, confidence: 89,
    signalSnapshot: [{ label: "Demand", value: "69" }, { label: "Abandonment", value: "+18%" }],
    constraints: [{ label: "Min margin", pass: true }, { label: "Max discount", pass: true }],
  },
  {
    id: "L007", timestamp: "Today, 10:12", event: "Auto-optimised", product: "Samsung Galaxy Buds FE", sku: "SKU-G8821",
    before: 6199, after: 5999, reason: "Flipkart price match · +0% margin impact",
    actor: "Engine v2.1", isUser: false, confidence: 82,
    signalSnapshot: [{ label: "Flipkart", value: "₹5,899" }],
    constraints: [{ label: "Min margin", pass: true }],
  },
  {
    id: "L008", timestamp: "Yesterday, 19:42", event: "Paused", product: "Fireboltt Phoenix", sku: "SKU-H9920",
    before: 1799, after: 1799, reason: "Engine paused by operator · low signal",
    actor: "RM", isUser: true, confidence: 100,
    signalSnapshot: [{ label: "Status", value: "Paused" }],
    constraints: [{ label: "Pause window active", pass: true }],
  },
  {
    id: "L009", timestamp: "Yesterday, 17:08", event: "Auto-optimised", product: "Sony WH-1000XM5", sku: "SKU-A1023",
    before: 25890, after: 25490, reason: "Routine recalculation · −1.5%",
    actor: "Engine v2.1", isUser: false, confidence: 86,
    signalSnapshot: [{ label: "Demand", value: "82" }],
    constraints: [{ label: "Min margin", pass: true }],
  },
  {
    id: "L010", timestamp: "Yesterday, 15:36", event: "Manual override", product: "JBL Flip 6", sku: "SKU-E6620",
    before: 11999, after: 10499, reason: "Festive promo override",
    actor: "AS", isUser: true, confidence: 100,
    signalSnapshot: [{ label: "Override", value: "Promo" }],
    constraints: [{ label: "Promo window valid", pass: true }],
  },
  {
    id: "L011", timestamp: "Yesterday, 13:02", event: "Auto-optimised", product: "boAt Airdopes 141", sku: "SKU-B2210",
    before: 1349, after: 1299, reason: "Demand stable · margin protected",
    actor: "Engine v2.1", isUser: false, confidence: 88,
    signalSnapshot: [{ label: "Demand", value: "70" }],
    constraints: [{ label: "Min margin", pass: true }],
  },
  {
    id: "L012", timestamp: "Yesterday, 11:24", event: "Auto-optimised", product: "Realme Buds Air 5", sku: "SKU-D4480",
    before: 2899, after: 2849, reason: "Marginal recalculation",
    actor: "Engine v2.1", isUser: false, confidence: 80,
    signalSnapshot: [{ label: "Demand", value: "75" }],
    constraints: [{ label: "Min margin", pass: true }],
  },
  {
    id: "L013", timestamp: "2 days ago, 18:51", event: "Rule triggered", product: "Noise ColorFit Pro 4", sku: "SKU-C5512",
    before: 3599, after: 3299, reason: "Inventory depth rule · clearance threshold",
    actor: "Engine v2.1", isUser: false, confidence: 92,
    signalSnapshot: [{ label: "Stock", value: "412" }],
    constraints: [{ label: "Clearance valid", pass: true }],
  },
  {
    id: "L014", timestamp: "2 days ago, 14:19", event: "Auto-optimised", product: "OnePlus Nord Buds 2", sku: "SKU-F7710",
    before: 2899, after: 2999, reason: "Demand cooled · raise to baseline",
    actor: "Engine v2.1", isUser: false, confidence: 79,
    signalSnapshot: [{ label: "Demand", value: "65" }],
    constraints: [{ label: "Min margin", pass: true }],
  },
  {
    id: "L015", timestamp: "2 days ago, 10:07", event: "Manual override", product: "Sony WH-1000XM5", sku: "SKU-A1023",
    before: 25490, after: 25890, reason: "Hold pricing for upcoming campaign",
    actor: "RM", isUser: true, confidence: 100,
    signalSnapshot: [{ label: "Campaign hold", value: "Active" }],
    constraints: [{ label: "Manual lock", pass: true }],
  },
  {
    id: "L016", timestamp: "3 days ago, 16:44", event: "Auto-optimised", product: "Samsung Galaxy Buds FE", sku: "SKU-G8821",
    before: 6299, after: 6199, reason: "Routine recalculation",
    actor: "Engine v2.1", isUser: false, confidence: 83,
    signalSnapshot: [{ label: "Demand", value: "64" }],
    constraints: [{ label: "Min margin", pass: true }],
  },
  {
    id: "L017", timestamp: "3 days ago, 09:18", event: "Auto-optimised", product: "Fireboltt Phoenix", sku: "SKU-H9920",
    before: 1849, after: 1799, reason: "Low elasticity · small adjustment",
    actor: "Engine v2.1", isUser: false, confidence: 76,
    signalSnapshot: [{ label: "Demand", value: "54" }],
    constraints: [{ label: "Min margin", pass: true }],
  },
];
