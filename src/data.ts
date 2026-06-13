import { Product, Category, SEOConfig } from './types';

export const COMPANY_INFO = {
  name: "RentEase",
  tagline: "Rent Smart. Live Better.",
  shortDescription: "RentEase is India's trusted furniture and appliance rental platform, helping students, working professionals, and families access high-quality household essentials without the burden of ownership.",
  founded: 2024,
  headquarters: "Ahmedabad",
};

export const STORY_INFO = {
  story: "RentEase was founded with a simple vision: make comfortable living accessible without large upfront investments. Whether you're relocating for a job, pursuing higher education, or setting up a temporary home, purchasing furniture and appliances can be expensive and inconvenient. RentEase offers a flexible rental solution that allows customers to enjoy premium products while saving money and reducing waste. Today, RentEase serves customers across major Indian cities with reliable delivery, maintenance support, and transparent pricing.",
  mission: "To provide affordable, flexible, and sustainable rental solutions that simplify urban living.",
  vision: "To become India's most trusted furniture and appliance rental platform, empowering people to live comfortably wherever they are.",
  coreValues: [
    { name: "Customer First", description: "Our customers are at the heart of everything we do, shaping our service, support, and features." },
    { name: "Transparency", description: "Clear pricing, upfront terms, and no hidden fees ever." },
    { name: "Sustainability", description: "Promoting sharing/circular economy to reduce waste and maximize energy-efficient appliance use." },
    { name: "Reliability", description: "Punctual delivery, complete setups, and prompt maintenance response." },
    { name: "Innovation", description: "Continuously improving our platform, logistics, and offerings for urban needs." },
    { name: "Affordability", description: "High quality furniture and home electronics accessible for every budget." }
  ]
};

export const CONTACT_INFO = {
  support: {
    phone: "+91 1800-123-4567",
    whatsapp: "+91 98765 43210",
    email: "support@rentease.in"
  },
  business: {
    email: "business@rentease.in"
  },
  vendor: {
    email: "partners@rentease.in"
  },
  address: {
    title: "Corporate Office",
    companyName: "RentEase Technologies Pvt. Ltd.",
    building: "4th Floor, Shivalik Business Center",
    street: "SG Highway",
    cityStateZip: "Ahmedabad, Gujarat 380015",
    country: "India"
  }
};

export const SERVICE_AREAS = [
  "Ahmedabad",
  "Vadodara",
  "Surat",
  "Mumbai",
  "Pune",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Delhi"
];

export const INITIAL_STATS = {
  happyCustomers: "15,000+",
  productsAvailable: "2,500+",
  citiesServed: "9+",
  monthlyOrders: "1,200+",
  customerRating: "4.8/5"
};

export const WHY_CHOOSE_US = [
  {
    title: "Affordable Rentals",
    description: "Pay only for what you use with flexible monthly plans, starting lower than purchase EMI costs."
  },
  {
    title: "Free Maintenance",
    description: "Enjoy hassle-free maintenance and technical support throughout your entire rental period."
  },
  {
    title: "Fast Delivery",
    description: "Quick 48-hour doorstep delivery, free setup, and quality guidance inside your home."
  },
  {
    title: "Flexible Tenure",
    description: "Choose customized, easy-on-the-wallet rental plans ranging from 3, 6, 12, or 24 months."
  },
  {
    title: "Quality Assured",
    description: "Professionally deep-cleaned, sanitised, and multi-point quality-checked premium products."
  },
  {
    title: "Easy Returns",
    description: "Seamless and simple pickup process when your rental period ends, with zero pressure."
  }
];

export const FAQS = [
  {
    id: "faq-1",
    question: "What is the minimum rental duration?",
    answer: "The minimum rental duration is 3 months."
  },
  {
    id: "faq-2",
    question: "Is a security deposit required?",
    answer: "Yes, a fully refundable security deposit is collected based on the product category when placing the order. It is completely refunded to your bank account within 7 working days of returning the product in good condition."
  },
  {
    id: "faq-3",
    question: "Do you provide installation?",
    answer: "Yes, expert installation, assembly, and demonstation are included at no extra cost for all applicable products (like washing machines, air conditioners, and beds)."
  },
  {
    id: "faq-4",
    question: "What happens if the product is damaged?",
    answer: "We understand that everyday usage can cause minor wear and tear, which is completely covered under our standard rental policy. However, significant structural damages resulting from negligence may incur nominal repair charges."
  },
  {
    id: "faq-5",
    question: "Can I extend my rental tenure?",
    answer: "Yes! You can extend or modify your rental tenure at any time with a customized lowered rate via your customer portal or by notifying our support."
  }
];

export const SOCIAL_MEDIA = {
  facebook: "https://facebook.com/renteaseindia",
  instagram: "https://instagram.com/renteaseindia",
  linkedin: "https://linkedin.com/company/rentease",
  youtube: "https://youtube.com/@renteaseindia"
};

export const DEFAULT_SEO: SEOConfig = {
  metaTitle: "RentEase | Luxury Furniture & Appliance Rentals India",
  metaDescription: "Rent premium home furniture, bedroom sets, kitchen appliances, and cooling systems in India. Pay as you go with flexible monthly plans, free setup & free maintenance.",
  keywords: "furniture rental, appliance rental india, rent sofa online, rent refrigerator, washing machine on rent, rent bed ahmedabad, rent ac mumbai, rentease"
};

// Pricing calculations helper
export function getTenureMultiplier(months: number): number {
  switch (months) {
    case 3: return 1.25; // 25% extra for short-term
    case 6: return 1.15; // 15% extra
    case 12: return 1.0;  // base price helper
    case 24: return 0.85; // 15% discount for long-term loyalty!
    default: return 1.0;
  }
}

export function calculateMonthlyRent(basePrice: number, months: number): number {
  const multiplier = getTenureMultiplier(months);
  return Math.round(basePrice * multiplier);
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Urban Sleep 3-Seater Sofa",
    category: "furniture",
    subcategory: "Living Room",
    monthlyPrice: 399, // Base (for 12 months)
    securityDeposit: 999,
    image: "/images/Urban-Sleep-3-Seater-Sofa.avif",
    description: "Extremely comfortable fabric sofa built with solid wood frame and premium high-density foam cushioning. Fits beautifully into modern Indian living rooms.",
    rating: 4.8,
    reviewCount: 312,
    specs: [
      { label: "Dimensions", value: "78 x 34 x 33 inches" },
      { label: "Material", value: "High Grade Polyester Fabric & Sal Wood Frame" },
      { label: "Color", value: "Slate Grey" },
      { label: "Seating Capacity", value: "3 Persons" }
    ],
    features: [
      "Stain-resistant easily-cleaned surface",
      "Soft padded backrest cushions",
      "Reinforced wood legs for support",
      "Sleek and minimalist space-saving profile"
    ],
    stockReady: true
  },
  {
    id: "prod-2",
    name: "Premium L-Shaped Sofa",
    category: "furniture",
    subcategory: "Living Room",
    monthlyPrice: 799,
    securityDeposit: 1999,
    image: "/images/premium-l-shaped-sofa.jfif",
    description: "Spacious premium L-shaped sofa designed for modern homes. Offers luxurious comfort with ample seating for family gatherings and guests.",
    rating: 4.9,
    reviewCount: 245,
    specs: [
      { label: "Dimensions", value: "102 x 68 x 35 inches" },
      { label: "Material", value: "Premium Fabric & Solid Wood Frame" },
      { label: "Color", value: "Dark Blue" },
      { label: "Seating Capacity", value: "5 Persons" }
    ],
    features: [
      "Extra spacious seating",
      "Premium foam cushioning",
      "Durable hardwood structure",
      "Modern contemporary design"
    ],
    stockReady: true
  },

{
  id: "prod-3",
  name: "Modern Fabric Sofa",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 499,
  securityDeposit: 1299,
  image: "/images/modern-fabric-sofa.webp",
  description: "Elegant fabric sofa with minimalist styling. Perfect for compact apartments and contemporary living spaces.",
  rating: 4.7,
  reviewCount: 185,
  specs: [
    { label: "Dimensions", value: "72 x 32 x 34 inches" },
    { label: "Material", value: "Polyester Fabric & Pine Wood" },
    { label: "Color", value: "Beige" },
    { label: "Seating Capacity", value: "3 Persons" }
  ],
  features: [
    "Compact space-saving design",
    "Premium fabric upholstery",
    "Comfortable back support",
    "Easy maintenance"
  ],
  stockReady: true
},

{
  id: "prod-4",
  name: "Luxury Recliner Chair",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 699,
  securityDeposit: 1799,
  image: "/images/luxury-recliner-chair.webp",
  description: "Luxury recliner chair crafted for maximum comfort. Ideal for reading, watching TV, and relaxation.",
  rating: 4.8,
  reviewCount: 148,
  specs: [
    { label: "Dimensions", value: "38 x 36 x 40 inches" },
    { label: "Material", value: "Premium Leatherette" },
    { label: "Color", value: "Brown" },
    { label: "Weight Capacity", value: "120 kg" }
  ],
  features: [
    "Multiple reclining positions",
    "Padded armrests",
    "Premium cushioning",
    "Ergonomic lumbar support"
  ],
  stockReady: true

  },
  
  {
  id: "prod-5",
  name: "Wooden Coffee Table",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 199,
  securityDeposit: 499,
  image: "/images/wooden-coffee-table.webp",
  description: "Elegant wooden coffee table crafted for modern living rooms. Offers a stylish centerpiece for gatherings and everyday use.",
  rating: 4.6,
  reviewCount: 220,
  specs: [
    { label: "Dimensions", value: "40 x 20 x 18 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Walnut Brown" },
    { label: "Shape", value: "Rectangular" }
  ],
  features: [
    "Premium wood finish",
    "Scratch-resistant surface",
    "Easy maintenance",
    "Strong and stable design"
  ],
  stockReady: true
},

{
  id: "prod-6",
  name: "Glass Top Coffee Table",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 249,
  securityDeposit: 699,
  image: "/images/glass-top-coffee-table.jpg",
  description: "Contemporary glass-top coffee table designed to elevate modern interiors with elegance and functionality.",
  rating: 4.7,
  reviewCount: 167,
  specs: [
    { label: "Dimensions", value: "42 x 22 x 18 inches" },
    { label: "Material", value: "Tempered Glass & Metal Frame" },
    { label: "Color", value: "Clear Glass" },
    { label: "Shape", value: "Rectangular" }
  ],
  features: [
    "Tempered safety glass",
    "Modern premium look",
    "Rust-resistant frame",
    "Easy to clean"
  ],
  stockReady: true
},

{
  id: "prod-7",
  name: "TV Entertainment Unit",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 349,
  securityDeposit: 899,
  image: "/images/tv-entertainment-unit.jpg",
  description: "Stylish TV entertainment unit with storage compartments for media devices, books, and decor accessories.",
  rating: 4.8,
  reviewCount: 194,
  specs: [
    { label: "Dimensions", value: "60 x 16 x 22 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Dark Walnut" },
    { label: "TV Support", value: "Up to 65 Inch TV" }
  ],
  features: [
    "Multiple storage shelves",
    "Cable management system",
    "Premium finish",
    "Strong and durable structure"
  ],
  stockReady: true
},

{
  id: "prod-8",
  name: "Wooden Side Table",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 149,
  securityDeposit: 399,
  image: "/images/wooden-side-table.avif",
  description: "Compact wooden side table perfect for bedrooms and living rooms. Adds convenience and elegance to any space.",
  rating: 4.5,
  reviewCount: 126,
  specs: [
    { label: "Dimensions", value: "18 x 18 x 22 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Natural Oak" },
    { label: "Weight", value: "8 kg" }
  ],
  features: [
    "Compact design",
    "Easy assembly",
    "Multipurpose use",
    "Lightweight and durable"
  ],
  stockReady: true
},

{
  id: "prod-9",
  name: "Bookshelf Cabinet",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 299,
  securityDeposit: 799,
  image: "/images/bookshelf-cabinet.jpg",
  description: "Modern bookshelf cabinet offering organized storage for books, decor items, and office essentials.",
  rating: 4.7,
  reviewCount: 182,
  specs: [
    { label: "Dimensions", value: "30 x 12 x 72 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "White Oak" },
    { label: "Shelves", value: "6 Shelves" }
  ],
  features: [
    "Large storage capacity",
    "Contemporary design",
    "Sturdy construction",
    "Space-efficient layout"
  ],
  stockReady: true
},

{
  id: "prod-10",
  name: "Bean Bag Chair",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 179,
  securityDeposit: 499,
  image: "/images/bean-bag-chair.avif",
  description: "Comfortable bean bag chair ideal for relaxing, reading, gaming, and casual seating in modern homes.",
  rating: 4.6,
  reviewCount: 275,
  specs: [
    { label: "Material", value: "Premium Fabric Cover" },
    { label: "Color", value: "Navy Blue" },
    { label: "Filling", value: "High Density Beans" },
    { label: "Capacity", value: "1 Adult" }
  ],
  features: [
    "Lightweight design",
    "Easy to move",
    "Ergonomic seating",
    "Soft and comfortable"
  ],
  stockReady: true
},

{
  id: "prod-11",
  name: "Accent Lounge Chair",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 299,
  securityDeposit: 799,
  image: "/images/accent-lounge-chair.webp",
  description: "Designer accent lounge chair crafted to enhance modern interiors while providing exceptional comfort.",
  rating: 4.7,
  reviewCount: 134,
  specs: [
    { label: "Dimensions", value: "30 x 32 x 36 inches" },
    { label: "Material", value: "Premium Fabric & Wood" },
    { label: "Color", value: "Mustard Yellow" },
    { label: "Weight Capacity", value: "110 kg" }
  ],
  features: [
    "Elegant designer look",
    "Comfortable seating",
    "Premium upholstery",
    "Durable frame"
  ],
  stockReady: true
},

{
  id: "prod-12",
  name: "Corner Sofa Set",
  category: "furniture",
  subcategory: "Living Room",
  monthlyPrice: 899,
  securityDeposit: 2499,
  image: "/images/corner-sofa-set.jfif",
  description: "Large premium corner sofa set offering luxurious comfort and maximum seating capacity for families.",
  rating: 4.9,
  reviewCount: 298,
  specs: [
    { label: "Dimensions", value: "118 x 82 x 35 inches" },
    { label: "Material", value: "Premium Fabric & Hardwood Frame" },
    { label: "Color", value: "Charcoal Grey" },
    { label: "Seating Capacity", value: "6 Persons" }
  ],
  features: [
    "Extra large seating area",
    "Premium cushioning",
    "Modern luxury design",
    "Long-lasting construction"
  ],
  stockReady: true
},
{
  id: "bed-1",
  name: "Queen Size Bed",
  category: "furniture",
  subcategory: "Bedroom",
  monthlyPrice: 699,
  securityDeposit: 1999,
  image: "/images/queen-size-bed.jfif",
  description: "Premium queen size bed crafted with engineered wood and modern finish. Perfect for couples and spacious bedrooms.",
  rating: 4.8,
  reviewCount: 276,
  specs: [
    { label: "Dimensions", value: "78 x 60 x 42 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Walnut Brown" },
    { label: "Storage", value: "No" }
  ],
  features: [
    "Modern design",
    "Durable construction",
    "Comfortable headboard",
    "Easy maintenance"
  ],
  stockReady: true
},
{
  id: "bed-2",
  name: "King Size Bed",
  category: "furniture",
  subcategory: "Bedroom",
  monthlyPrice: 899,
  securityDeposit: 2499,
  image: "/images/king-size-bed.jpg",
  description: "Luxurious king size bed designed for maximum comfort and elegant bedroom interiors.",
  rating: 4.9,
  reviewCount: 198,
  specs: [
    { label: "Dimensions", value: "78 x 72 x 44 inches" },
    { label: "Material", value: "Solid Wood" },
    { label: "Color", value: "Dark Walnut" },
    { label: "Storage", value: "No" }
  ],
  features: [
    "Premium finish",
    "Large sleeping area",
    "Strong wooden frame",
    "Elegant design"
  ],
  stockReady: true
},
{
  id: "bed-3",
  name: "Single Bed",
  category: "furniture",
  subcategory: "Bedroom",
  monthlyPrice: 399,
  securityDeposit: 999,
  image: "/images/single-bed.jfif",
  description: "Compact single bed ideal for students, working professionals, and guest rooms.",
  rating: 4.6,
  reviewCount: 152,
  specs: [
    { label: "Dimensions", value: "75 x 36 x 40 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Natural Oak" },
    { label: "Storage", value: "No" }
  ],
  features: [
    "Space saving",
    "Strong frame",
    "Lightweight design",
    "Easy assembly"
  ],
  stockReady: true
},
{
  id: "bed-4",
  name: "Bedside Table",
  category: "furniture",
  subcategory: "Bedroom",
  monthlyPrice: 149,
  securityDeposit: 399,
  image: "/images/bedside-table.jpg",
  description: "Modern bedside table with storage drawer for keeping essentials within reach.",
  rating: 4.5,
  reviewCount: 126,
  specs: [
    { label: "Dimensions", value: "18 x 16 x 20 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "White Oak" },
    { label: "Drawers", value: "1" }
  ],
  features: [
    "Compact design",
    "Storage drawer",
    "Modern finish",
    "Durable build"
  ],
  stockReady: true
},
{
  id: "bed-5",
  name: "Wooden Wardrobe",
  category: "furniture",
  subcategory: "Bedroom",
  monthlyPrice: 599,
  securityDeposit: 1499,
  image: "/images/wooden-wardrobe.webp",
  description: "Spacious wooden wardrobe with hanging space and shelves for organized storage.",
  rating: 4.7,
  reviewCount: 178,
  specs: [
    { label: "Dimensions", value: "72 x 36 x 20 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Walnut Brown" },
    { label: "Doors", value: "2" }
  ],
  features: [
    "Large storage capacity",
    "Premium finish",
    "Hanging section",
    "Multiple shelves"
  ],
  stockReady: true
},
{
  id: "bed-6",
  name: "Sliding Door Wardrobe",
  category: "furniture",
  subcategory: "Bedroom",
  monthlyPrice: 799,
  securityDeposit: 1999,
  image: "/images/sliding-door-wardrobe.png",
  description: "Modern sliding door wardrobe designed for contemporary homes with maximum storage efficiency.",
  rating: 4.8,
  reviewCount: 165,
  specs: [
    { label: "Dimensions", value: "78 x 48 x 22 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Dark Walnut" },
    { label: "Doors", value: "Sliding" }
  ],
  features: [
    "Space-saving design",
    "Smooth sliding mechanism",
    "Large storage",
    "Premium finish"
  ],
  stockReady: true
},
{
  id: "bed-7",
  name: "Dressing Table",
  category: "furniture",
  subcategory: "Bedroom",
  monthlyPrice: 349,
  securityDeposit: 899,
  image: "/images/dressing-table.webp",
  description: "Elegant dressing table with large mirror and storage drawers, perfect for daily grooming and bedroom organization.",
  rating: 4.7,
  reviewCount: 142,
  specs: [
    { label: "Dimensions", value: "42 x 18 x 60 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "White Walnut" },
    { label: "Mirror", value: "Full Size" }
  ],
  features: [
    "Large mirror",
    "Multiple storage drawers",
    "Modern design",
    "Premium finish"
  ],
  stockReady: true
},
{
  id: "bed-8",
  name: "Kids Single Bed",
  category: "furniture",
  subcategory: "Bedroom",
  monthlyPrice: 349,
  securityDeposit: 899,
  image: "/images/kids-single-bed.jpg",
  description: "Comfortable and safe single bed specially designed for children with rounded edges and sturdy construction.",
  rating: 4.7,
  reviewCount: 96,
  specs: [
    { label: "Dimensions", value: "72 x 36 x 32 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Sky Blue" },
    { label: "Age Group", value: "4-12 Years" }
  ],
  features: [
    "Child-safe design",
    "Rounded corners",
    "Durable structure",
    "Colorful finish"
  ],
  stockReady: true
},
{
  id: "study-1",
  name: "Ergonomic Office Chair",
  category: "furniture",
  subcategory: "Study/Office",
  monthlyPrice: 349,
  securityDeposit: 899,
  image: "/images/ergonomic-office-chair.webp",
  description: "Comfortable ergonomic office chair designed for long working hours with adjustable height, lumbar support, and breathable mesh back.",
  rating: 4.8,
  reviewCount: 215,
  specs: [
    { label: "Dimensions", value: "26 x 26 x 46 inches" },
    { label: "Material", value: "Mesh Fabric & Steel Frame" },
    { label: "Color", value: "Black" },
    { label: "Weight Capacity", value: "120 kg" }
  ],
  features: [
    "Adjustable seat height",
    "Breathable mesh back",
    "360° swivel wheels",
    "Ergonomic lumbar support"
  ],
  stockReady: true
},

{
  id: "study-2",
  name: "Executive Office Chair",
  category: "furniture",
  subcategory: "Study/Office",
  monthlyPrice: 499,
  securityDeposit: 1299,
  image: "/images/executive-office-chair.jpg",
  description: "Premium executive chair with luxurious cushioning, high-back support, and elegant leatherette finish for professional workspaces.",
  rating: 4.9,
  reviewCount: 178,
  specs: [
    { label: "Dimensions", value: "28 x 30 x 50 inches" },
    { label: "Material", value: "Leatherette & Steel Frame" },
    { label: "Color", value: "Brown" },
    { label: "Weight Capacity", value: "130 kg" }
  ],
  features: [
    "High-back support",
    "Premium cushioning",
    "Tilt mechanism",
    "Smooth caster wheels"
  ],
  stockReady: true
},

{
  id: "study-3",
  name: "Work From Home Desk",
  category: "furniture",
  subcategory: "Study/Office",
  monthlyPrice: 399,
  securityDeposit: 999,
  image: "/images/work-from-home-desk.jpg",
  description: "Spacious work-from-home desk with modern styling, ideal for laptops, monitors, and office essentials.",
  rating: 4.7,
  reviewCount: 196,
  specs: [
    { label: "Dimensions", value: "48 x 24 x 30 inches" },
    { label: "Material", value: "Engineered Wood & Metal" },
    { label: "Color", value: "Oak Brown" },
    { label: "Storage", value: "2 Shelves" }
  ],
  features: [
    "Large work surface",
    "Modern minimalist design",
    "Strong metal frame",
    "Built-in storage shelves"
  ],
  stockReady: true
},
{
  id: "study-4",
  name: "Premium Computer Table",
  category: "furniture",
  subcategory: "Study/Office",
  monthlyPrice: 449,
  securityDeposit: 1199,
  image: "/images/premium-computer-table.jpg",
  description: "Modern computer table with dedicated space for CPU, monitor, keyboard, and accessories. Designed for productivity and long working hours.",
  rating: 4.8,
  reviewCount: 184,
  specs: [
    { label: "Dimensions", value: "50 x 24 x 30 inches" },
    { label: "Material", value: "Engineered Wood & Metal Frame" },
    { label: "Color", value: "Walnut Brown" },
    { label: "Storage", value: "CPU Rack & Side Shelf" }
  ],
  features: [
    "Dedicated CPU compartment",
    "Spacious work surface",
    "Cable management support",
    "Strong metal frame"
  ],
  stockReady: true
},

{
  id: "study-5",
  name: "Bookshelf Study Unit",
  category: "furniture",
  subcategory: "Study/Office",
  monthlyPrice: 549,
  securityDeposit: 1499,
  image: "/images/bookshelf-study-unit.jpg",
  description: "Multi-functional study unit combining a spacious work desk with built-in bookshelves for organized storage and efficient learning.",
  rating: 4.9,
  reviewCount: 156,
  specs: [
    { label: "Dimensions", value: "60 x 24 x 72 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Natural Oak" },
    { label: "Shelves", value: "5 Open Shelves" }
  ],
  features: [
    "Integrated bookshelf design",
    "Large study workspace",
    "Ample storage capacity",
    "Modern space-saving layout"
  ],
  stockReady: true
},

{
  id: "study-6",
  name: "Office Storage Cabinet",
  category: "furniture",
  subcategory: "Study/Office",
  monthlyPrice: 399,
  securityDeposit: 999,
  image: "/images/office-storage-cabinet.jpg",
  description: "Professional office storage cabinet designed to securely organize documents, files, stationery, and workplace essentials.",
  rating: 4.7,
  reviewCount: 132,
  specs: [
    { label: "Dimensions", value: "36 x 18 x 72 inches" },
    { label: "Material", value: "Engineered Wood" },
    { label: "Color", value: "Dark Walnut" },
    { label: "Storage", value: "4 Shelves & 2 Doors" }
  ],
  features: [
    "Large storage capacity",
    "Lockable cabinet doors",
    "Professional office design",
    "Durable construction"
  ],
  stockReady: true
},
{
  id: "app-1",
  name: "Single Door Refrigerator",
  category: "appliances",
  subcategory: "Refrigerator",
  monthlyPrice: 599,
  securityDeposit: 1499,
  image: "/images/single-door-refrigerator.avif",
  description: "Energy-efficient single door refrigerator ideal for students, bachelors, and small families.",
  rating: 4.7,
  reviewCount: 164,
  specs: [
    { label: "Capacity", value: "190 Litres" },
    { label: "Energy Rating", value: "3 Star" },
    { label: "Color", value: "Silver" },
    { label: "Type", value: "Single Door" }
  ],
  features: [
    "Direct Cool Technology",
    "Low Power Consumption",
    "Large Vegetable Tray",
    "Toughened Glass Shelves"
  ],
  stockReady: true
},
{
  id: "app-2",
  name: "Double Door Refrigerator",
  category: "appliances",
  subcategory: "Refrigerator",
  monthlyPrice: 899,
  securityDeposit: 2499,
  image: "/images/double-door-refrigerator.webp",
  description: "Spacious double door refrigerator with separate freezer section and advanced cooling technology.",
  rating: 4.8,
  reviewCount: 218,
  specs: [
    { label: "Capacity", value: "260 Litres" },
    { label: "Energy Rating", value: "4 Star" },
    { label: "Color", value: "Silver Grey" },
    { label: "Type", value: "Double Door" }
  ],
  features: [
    "Frost Free Technology",
    "Separate Freezer Compartment",
    "Energy Efficient Operation",
    "Toughened Glass Shelves"
  ],
  stockReady: true
},
{
  id: "app-3",
  name: "Convertible Refrigerator",
  category: "appliances",
  subcategory: "Refrigerator",
  monthlyPrice: 1199,
  securityDeposit: 2999,
  image: "/images/convertible-refrigerator.avif",
  description: "Premium convertible refrigerator offering flexible storage and energy-saving performance.",
  rating: 4.9,
  reviewCount: 142,

  specs: [
    { label: "Capacity", value: "340 Litres" },
    { label: "Energy Rating", value: "5 Star" },
    { label: "Color", value: "Metallic Silver" },
    { label: "Type", value: "Convertible Double Door" }
  ],

  features: [
    "Convertible Freezer Technology",
    "Smart Inverter Compressor",
    "Frost Free Cooling",
    "Energy Efficient Operation"
  ],

  stockReady: true
},
{
  id: "app-4",
  name: "Semi Automatic Washing Machine",
  category: "appliances",
  subcategory: "Washing Machine",
  monthlyPrice: 699,
  securityDeposit: 1799,
  image: "/images/semi-automatic-washing-machine.jfif",
  description: "Affordable semi-automatic washing machine suitable for everyday laundry needs.",
  rating: 4.6,
  reviewCount: 188,

  specs: [
    { label: "Capacity", value: "7 Kg" },
    { label: "Type", value: "Semi Automatic Top Load" },
    { label: "Energy Rating", value: "4 Star" },
    { label: "Color", value: "White & Blue" }
  ],

  features: [
    "Powerful washing performance",
    "Low water consumption",
    "Rust-proof body",
    "Separate wash and spin tubs"
  ],

  stockReady: true
},
{
  id: "app-5",
  name: "Fully Automatic Top Load",
  category: "appliances",
  subcategory: "Washing Machine",
  monthlyPrice: 999,
  securityDeposit: 2499,
  image: "/images/fully-automatic-top-load.jfif",
  description: "Convenient fully automatic washing machine with multiple wash programs and smart controls.",
  rating: 4.8,
  reviewCount: 235,

  specs: [
    { label: "Capacity", value: "8 Kg" },
    { label: "Type", value: "Fully Automatic Top Load" },
    { label: "Energy Rating", value: "5 Star" },
    { label: "Color", value: "Silver" }
  ],

  features: [
    "Multiple wash programs",
    "Digital control panel",
    "Quick wash function",
    "Auto restart technology"
  ],

  stockReady: true
},
{
  id: "app-6",
  name: "Front Load Washing Machine",
  category: "appliances",
  subcategory: "Washing Machine",
  monthlyPrice: 1299,
  securityDeposit: 2999,
  image: "/images/front-load-washing-machine.avif",
  description: "Premium front load washing machine offering efficient cleaning and low water consumption.",
  rating: 4.9,
  reviewCount: 176,

  specs: [
    { label: "Capacity", value: "9 Kg" },
    { label: "Type", value: "Front Load" },
    { label: "Energy Rating", value: "5 Star" },
    { label: "Color", value: "Dark Grey" }
  ],

  features: [
    "Inverter motor technology",
    "Low noise operation",
    "Steam wash function",
    "Smart fabric care programs"
  ],

  stockReady: true
},
{
  id: "app-7",
  name: "1 Ton Split AC",
  category: "appliances",
  subcategory: "Air Conditioner",
  monthlyPrice: 1499,
  securityDeposit: 3999,
  image: "/images/1-ton-split-ac.jpg",
  description: "Energy-efficient 1 Ton split AC ideal for bedrooms and compact living spaces.",
  rating: 4.8,
  reviewCount: 221,

  specs: [
    { label: "Capacity", value: "1 Ton" },
    { label: "Energy Rating", value: "3 Star" },
    { label: "Color", value: "White" },
    { label: "Cooling Area", value: "Up to 120 sq.ft." }
  ],

  features: [
    "Fast cooling technology",
    "Low power consumption",
    "Sleep mode operation",
    "Copper condenser coil"
  ],

  stockReady: true
},
{
  id: "app-8",
  name: "1.5 Ton Inverter AC",
  category: "appliances",
  subcategory: "Air Conditioner",
  monthlyPrice: 1899,
  securityDeposit: 4999,
  image: "/images/1.5-ton-inverter-ac.jpg",
  description: "Advanced inverter AC with powerful cooling and reduced electricity consumption.",
  rating: 4.9,
  reviewCount: 278,

  specs: [
    { label: "Capacity", value: "1.5 Ton" },
    { label: "Energy Rating", value: "5 Star" },
    { label: "Color", value: "White" },
    { label: "Cooling Area", value: "Up to 180 sq.ft." }
  ],

  features: [
    "Inverter compressor technology",
    "Turbo cooling mode",
    "Smart energy saving",
    "Anti-dust filtration system"
  ],

  stockReady: true
},
{
  id: "app-9",
  name: "2 Ton Premium Split AC",
  category: "appliances",
  subcategory: "Air Conditioner",
  monthlyPrice: 2499,
  securityDeposit: 5999,
  image: "/images/2-ton-premium-split-ac.jpg",
  description: "High-capacity split AC designed for large rooms and superior cooling performance.",
  rating: 4.9,
  reviewCount: 132,

  specs: [
    { label: "Capacity", value: "2 Ton" },
    { label: "Energy Rating", value: "5 Star" },
    { label: "Color", value: "Silver White" },
    { label: "Cooling Area", value: "Up to 250 sq.ft." }
  ],

  features: [
    "High-performance cooling",
    "Smart inverter technology",
    "Low noise operation",
    "Advanced air purification"
  ],

  stockReady: true
},
{
  id: "app-10",
  name: "Microwave Oven",
  category: "appliances",
  subcategory: "Kitchen Appliances",
  monthlyPrice: 499,
  securityDeposit: 1299,
  image: "/images/microwave-oven.jfif",
  description: "Compact microwave oven suitable for heating, cooking, and daily kitchen use.",
  rating: 4.7,
  reviewCount: 194,

  specs: [
    { label: "Capacity", value: "25 Litres" },
    { label: "Power", value: "900 Watts" },
    { label: "Color", value: "Black" },
    { label: "Type", value: "Convection Microwave" }
  ],

  features: [
    "Multiple cooking modes",
    "Digital control panel",
    "Auto cook menu",
    "Quick heating technology"
  ],

  stockReady: true
},
{
  id: "app-11",
  name: "Mixer Grinder",
  category: "appliances",
  subcategory: "Kitchen Appliances",
  monthlyPrice: 299,
  securityDeposit: 799,
  image: "/images/mixer-grinder.jpg",
  description: "High-performance mixer grinder designed for grinding, blending, and food preparation.",
  rating: 4.6,
  reviewCount: 245,

  specs: [
    { label: "Power", value: "750 Watts" },
    { label: "Jars", value: "3 Stainless Steel Jars" },
    { label: "Color", value: "White & Grey" },
    { label: "Motor Type", value: "Copper Motor" }
  ],

  features: [
    "High-speed grinding",
    "Overload protection",
    "Durable stainless steel blades",
    "Multi-purpose food processing"
  ],

  stockReady: true
},
{
  id: "app-12",
  name: "Induction Cooktop",
  category: "appliances",
  subcategory: "Kitchen Appliances",
  monthlyPrice: 349,
  securityDeposit: 899,
  image: "/images/induction-cooktop.webp",
  description: "Portable induction cooktop with multiple cooking modes and energy-efficient heating.",
  rating: 4.8,
  reviewCount: 167,

  specs: [
    { label: "Power", value: "2000 Watts" },
    { label: "Cooking Modes", value: "7 Preset Modes" },
    { label: "Color", value: "Black" },
    { label: "Control Type", value: "Touch Panel" }
  ],

  features: [
    "Energy-efficient heating",
    "Touch control operation",
    "Auto shut-off protection",
    "Compact portable design"
  ],

  stockReady: true
},
];
