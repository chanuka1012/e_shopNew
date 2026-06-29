// ─── Products ───────────────────────────────────────────────────────────────
export const products = [
  {
    id: 1, name: "AirPods Pro Max", category: "Electronics",
    price: 549.99, originalPrice: 649.99, rating: 4.8, reviews: 2341,
    stock: 15, sold: 1230,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    ],
    description: "Premium over-ear headphones with industry-leading Active Noise Cancellation, spatial audio, and 20-hour battery life.",
    tags: ["wireless", "noise-cancelling", "premium"], featured: true,
  },
  {
    id: 2, name: "MacBook Air M3", category: "Computers",
    price: 1299.99, originalPrice: null, rating: 4.9, reviews: 891,
    stock: 8, sold: 540,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop"],
    description: "Supercharged by M3 chip. Up to 18-hour battery. Fanless design. 13.6-inch Liquid Retina display.",
    tags: ["laptop", "apple", "m3"], featured: true,
  },
  {
    id: 3, name: "Sony A7 IV Camera", category: "Cameras",
    price: 2499.99, originalPrice: 2799.99, rating: 4.7, reviews: 412,
    stock: 6, sold: 215,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop"],
    description: "33MP full-frame sensor, 4K 60fps video, real-time tracking AF. The ultimate hybrid camera.",
    tags: ["camera", "fullframe", "professional"], featured: false,
  },
  {
    id: 4, name: "Nike Air Max 270", category: "Fashion",
    price: 149.99, originalPrice: 180.00, rating: 4.6, reviews: 5621,
    stock: 45, sold: 8900,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"],
    description: "The Nike Air Max 270 delivers maximum cushioning and a bold silhouette inspired by two iconic Air Max designs.",
    tags: ["shoes", "nike", "sports"], featured: true,
  },
  {
    id: 5, name: "iPad Pro 12.9\"", category: "Electronics",
    price: 1099.99, originalPrice: null, rating: 4.8, reviews: 1102,
    stock: 20, sold: 720,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop"],
    description: "M2 chip. Liquid Retina XDR display. Thunderbolt / USB 4. Works seamlessly with Apple Pencil and Magic Keyboard.",
    tags: ["tablet", "apple", "creative"], featured: false,
  },
  {
    id: 6, name: "Samsung 4K OLED TV 65\"", category: "Electronics",
    price: 1799.99, originalPrice: 2199.99, rating: 4.7, reviews: 834,
    stock: 5, sold: 312,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop"],
    description: "65-inch QD-OLED panel with 144Hz refresh rate, Dolby Atmos, and Neural Quantum Processor 4K.",
    tags: ["tv", "4k", "oled"], featured: false,
  },
  {
    id: 7, name: "Dyson V15 Vacuum", category: "Home",
    price: 749.99, originalPrice: 849.99, rating: 4.5, reviews: 2201,
    stock: 12, sold: 1890,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop"],
    description: "Laser reveals microscopic dust. Twice the suction. HEPA filtration captures 99.97% of particles.",
    tags: ["vacuum", "cleaning", "dyson"], featured: false,
  },
  {
    id: 8, name: "Levi's 501 Original Jeans", category: "Fashion",
    price: 79.99, originalPrice: 98.00, rating: 4.4, reviews: 9832,
    stock: 200, sold: 45000,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop"],
    description: "The original since 1873. Straight fit, button fly, and iconic 5-pocket styling. 100% cotton denim.",
    tags: ["jeans", "denim", "classic"], featured: false,
  },
  {
    id: 9, name: "Instant Pot Duo 7-in-1", category: "Home",
    price: 89.99, originalPrice: 119.99, rating: 4.7, reviews: 41230,
    stock: 88, sold: 95000,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=600&fit=crop"],
    description: "7-in-1: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, and Warmer.",
    tags: ["kitchen", "cooking", "instant-pot"], featured: false,
  },
  {
    id: 10, name: "DJI Mini 4 Pro Drone", category: "Electronics",
    price: 759.99, originalPrice: null, rating: 4.9, reviews: 1203,
    stock: 10, sold: 780,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=600&fit=crop"],
    description: "Under 249 g, 4K/60fps video, 48MP stills, omnidirectional obstacle sensing, 34-min flight time.",
    tags: ["drone", "aerial", "dji"], featured: true,
  },
  {
    id: 11, name: "Logitech MX Master 3S", category: "Computers",
    price: 99.99, originalPrice: null, rating: 4.8, reviews: 6780,
    stock: 55, sold: 22000,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop"],
    description: "8,000 DPI sensor. Quiet clicks. MagSpeed electromagnetic scrolling. Works on any surface.",
    tags: ["mouse", "wireless", "productivity"], featured: false,
  },
  {
    id: 12, name: "Kindle Paperwhite", category: "Electronics",
    price: 139.99, originalPrice: 159.99, rating: 4.6, reviews: 32100,
    stock: 40, sold: 120000,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop"],
    description: "6.8-inch display, adjustable warm light, waterproof, 10-week battery, 16 GB. The best Kindle yet.",
    tags: ["ebook", "reader", "kindle"], featured: false,
  },
];

export const categories = ["All", "Electronics", "Computers", "Cameras", "Fashion", "Home"];

// ─── Users ───────────────────────────────────────────────────────────────────
export const users = [
  { id: 1, name: "Admin User", email: "admin@shopwave.com", password: "admin123", role: "admin", avatar: "AU", joined: "2023-01-01" },
  { id: 2, name: "Jane Cooper", email: "jane@example.com", password: "user123", role: "user", avatar: "JC", joined: "2024-02-15" },
  { id: 3, name: "Alex Rivera", email: "alex@example.com", password: "user123", role: "user", avatar: "AR", joined: "2024-05-20" },
];

// ─── Orders ──────────────────────────────────────────────────────────────────
export const orders = [
  {
    id: "ORD-1001", userId: 2, date: "2025-06-01",
    status: "delivered", total: 1649.98,
    items: [{ productId: 2, name: "MacBook Air M3", qty: 1, price: 1299.99 }, { productId: 1, name: "AirPods Pro Max", qty: 1, price: 549.99 }],
    address: "123 Oak St, San Francisco, CA 94105",
  },
  {
    id: "ORD-1002", userId: 3, date: "2025-06-10",
    status: "processing", total: 149.99,
    items: [{ productId: 4, name: "Nike Air Max 270", qty: 1, price: 149.99 }],
    address: "45 Maple Ave, Austin, TX 78701",
  },
  {
    id: "ORD-1003", userId: 2, date: "2025-06-15",
    status: "shipped", total: 759.99,
    items: [{ productId: 10, name: "DJI Mini 4 Pro Drone", qty: 1, price: 759.99 }],
    address: "123 Oak St, San Francisco, CA 94105",
  },
  {
    id: "ORD-1004", userId: 3, date: "2025-06-20",
    status: "pending", total: 2499.99,
    items: [{ productId: 3, name: "Sony A7 IV Camera", qty: 1, price: 2499.99 }],
    address: "45 Maple Ave, Austin, TX 78701",
  },
  {
    id: "ORD-1005", userId: 2, date: "2025-06-22",
    status: "cancelled", total: 89.99,
    items: [{ productId: 9, name: "Instant Pot Duo", qty: 1, price: 89.99 }],
    address: "123 Oak St, San Francisco, CA 94105",
  },
];

export const stats = {
  revenue: 48291.50,
  orders: 312,
  customers: 1892,
  products: products.length,
  revenueGrowth: 18.4,
  ordersGrowth: 12.1,
  customersGrowth: 8.7,
};

export const revenueChart = [
  { month: "Jan", revenue: 31200 },
  { month: "Feb", revenue: 27800 },
  { month: "Mar", revenue: 35600 },
  { month: "Apr", revenue: 38900 },
  { month: "May", revenue: 42100 },
  { month: "Jun", revenue: 48291 },
];
