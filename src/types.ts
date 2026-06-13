export interface Product {
  id: string;
  name: string;
  category: 'furniture' | 'appliances';
  subcategory: string;
  monthlyPrice: number; // Base price for 12 months
  securityDeposit: number;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  specs: { label: string; value: string }[];
  features: string[];
  stockReady: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
}

export interface CartItem {
  id: string; // Unique combination of product.id + tenure
  product: Product;
  quantity: number;
  tenureMonths: 3 | 6 | 12 | 24;
  monthlyRent: number; // dynamically calculated based on tenure factor
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerWhatsapp?: string;
  billingCity: string;
  deliveryAddress: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    tenureMonths: number;
    monthlyRent: number;
  }[];
  totalMonthlyRent: number;
  totalDeposit: number;
  status: 'pending' | 'approved' | 'delivered' | 'returned' | 'cancelled';
  orderDate: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'resolved';
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}
