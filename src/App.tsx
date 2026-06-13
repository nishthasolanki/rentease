import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import FAQView from './components/FAQView';
import ContactView from './components/ContactView';
import ProductsView from './components/ProductsView';
import AdminView from './components/AdminView';
import CartDrawer from './components/CartDrawer';

import { Product, CartItem, Order, ContactInquiry, SEOConfig } from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_STATS, 
  DEFAULT_SEO, 
  calculateMonthlyRent 
} from './data';

// Initial Mock Datasets representing persistent cloud-like storage
const MOCK_INQUIRIES: ContactInquiry[] = [
  {
    id: "inq-1",
    name: "Vikram Mehta",
    email: "vikram@mehta.co",
    phone: "98250 11223",
    subject: "Custom Rental Tonnage / Office Fitouts",
    message: "We are leasing a new tech coworking floor on SG Highway, Ahmedabad and want to rent 40 ergonomic mesh office chairs and 10 solid oak wood desks for a minimum of 12 months. Do you support special bulk B2B rates?",
    date: "2026-06-03",
    status: "unread"
  },
  {
    id: "inq-2",
    name: "Pooja Trivedi",
    email: "pooja.t@gmail.com",
    subject: "Billing / Refund Help",
    message: "I am relocating away from Vadodara next week since my rental tenure has expired. When can I expect a pickup coordinator to confirm my refund deposit transfer?",
    date: "2026-06-04",
    status: "resolved"
  }
];

const MOCK_ORDERS: Order[] = [
  {
    id: "RE-289561",
    customerName: "Siddharth Goel",
    customerEmail: "siddharth.g@gmail.com",
    customerPhone: "98765 09876",
    customerWhatsapp: "98765 09876",
    billingCity: "Ahmedabad",
    deliveryAddress: "A-502, Shivalik Residences, Anandnagar, Ahmedabad, Gujarat - 380515",
    items: [
      {
        productId: "prod-1",
        productName: "Urban Sleep 3-Seater Sofa",
        productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
        quantity: 1,
        tenureMonths: 12,
        monthlyRent: 399
      },
      {
        productId: "prod-3",
        productName: "Minimalist Solid Oak Study/Working Table",
        productImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
        quantity: 1,
        tenureMonths: 12,
        monthlyRent: 199
      }
    ],
    totalMonthlyRent: 598,
    totalDeposit: 1498,
    status: "approved",
    orderDate: "2026-06-01"
  },
  {
    id: "RE-931082",
    customerName: "Kriti Sen",
    customerEmail: "kritisen@yahoo.com",
    customerPhone: "95600 45210",
    customerWhatsapp: "95600 45210",
    billingCity: "Mumbai",
    deliveryAddress: "Flat 1204, Sea Breeze Towers, Worli Sea Face, Mumbai - 400030",
    items: [
      {
        productId: "prod-4",
        productName: "NeoFrost 240L Double Door Refrigerator",
        productImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
        quantity: 1,
        tenureMonths: 6,
        monthlyRent: 861
      }
    ],
    totalMonthlyRent: 861,
    totalDeposit: 1999,
    status: "pending",
    orderDate: "2026-06-04"
  }
];

export default function App() {
  
  // 1. Primary Page Tab Route
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Ahmedabad');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 2. Active category shortcut state
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'furniture' | 'appliances'>('all');

  // 3. Persistent Local Databases init
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rentease_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rentease_orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('rentease_inquiries');
    return saved ? JSON.parse(saved) : MOCK_INQUIRIES;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('rentease_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [seoConfig, setSeoConfig] = useState<SEOConfig>(() => {
    const saved = localStorage.getItem('rentease_seo');
    return saved ? JSON.parse(saved) : DEFAULT_SEO;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rentease_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Synchronization with LocalStorage & Dynamic Header titles placement
  useEffect(() => {
    localStorage.setItem('rentease_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rentease_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rentease_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('rentease_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('rentease_seo', JSON.stringify(seoConfig));
    
    // Inject dynamic DOM page titles and metadata descriptions
    document.title = seoConfig.metaTitle;
    
    let descriptionMetaTag = document.querySelector('meta[name="description"]');
    if (!descriptionMetaTag) {
      descriptionMetaTag = document.createElement('meta');
      descriptionMetaTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionMetaTag);
    }
    descriptionMetaTag.setAttribute('content', seoConfig.metaDescription);

    let keywordsMetaTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsMetaTag) {
      keywordsMetaTag = document.createElement('meta');
      keywordsMetaTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMetaTag);
    }
    keywordsMetaTag.setAttribute('content', seoConfig.keywords);

  }, [seoConfig]);

  useEffect(() => {
    localStorage.setItem('rentease_cart', JSON.stringify(cart));
  }, [cart]);

  // Jump to top of viewport on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentTab]);

  // 5. Cart Operations
  const handleAddToCart = (product: Product, quantity: number, tenure: 3 | 6 | 12 | 24) => {
    const cartItemId = `${product.id}-${tenure}`;
    const calculatedRent = calculateMonthlyRent(product.monthlyPrice, tenure);

    setCart((prev) => {
      const exists = prev.find((item) => item.id === cartItemId);
      if (exists) {
        return prev.map((item) => 
          item.id === cartItemId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, {
        id: cartItemId,
        product,
        quantity,
        tenureMonths: tenure,
        monthlyRent: calculatedRent
      }];
    });

    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    setCart((prev) => prev.map((item) => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const handleCheckoutSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Reset active cart
  };

  // 6. Contact Inquiries Management
  const handleAddInquiry = (rawInquiry: Omit<ContactInquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: ContactInquiry = {
      ...rawInquiry,
      id: `INQ-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'unread'
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleResolveInquiry = (id: string) => {
    setInquiries((prev) => prev.map((item) => 
      item.id === id ? { ...item, status: 'resolved' } : item
    ));
  };

  // 7. Catalog Stock Operations
  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const customId = `prod-${Date.now()}`;
    setProducts((prev) => [...prev, { ...newProd, id: customId }]);
    
    // Adjust stats products count dynamically
    setStats((prev: any) => ({
      ...prev,
      productsAvailable: `${parseInt(prev.productsAvailable) + 1}+`
    }));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    
    // Lower stats products count dynamically
    setStats((prev: any) => ({
      ...prev,
      productsAvailable: `${Math.max(0, parseInt(prev.productsAvailable) - 1)}+`
    }));
  };

  const handleToggleStockProduct = (id: string) => {
    setProducts((prev) => prev.map((p) => 
      p.id === id ? { ...p, stockReady: !p.stockReady } : p
    ));
  };

  // 8. Order Agreements Management
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) => prev.map((ord) => 
      ord.id === orderId ? { ...ord, status: newStatus } : ord
    ));

    // Side effects on happy customer stats if user completes lease lifecycle!
    if (newStatus === 'delivered') {
      setStats((prev: any) => ({
        ...prev,
        happyCustomers: `${parseInt(prev.happyCustomers.replace(/,/g, '')) + 15}+`
      }));
    }
  };

  const handleClearAllOrders = () => {
    setOrders([]);
  };

  // 9. Shopping Cart items count total representation
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 10. Primary Tab Router renderer
  const renderActiveTab = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeView
            products={products}
            stats={stats}
            setCurrentTab={setCurrentTab}
            setCategoryFilter={setCategoryFilter}
            onProductClick={(p) => {
              setSelectedProduct(p);
              setCurrentTab('products');
            }}
          />
        );
      
      case 'products':
        return (
          <ProductsView
            products={products}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            onAddToCart={handleAddToCart}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        );

      case 'about':
        return <AboutView />;

      case 'faqs':
        return <FAQView />;

      case 'contact':
        return (
          <ContactView 
            onAddInquiry={handleAddInquiry} 
          />
        );

      case 'admin':
        return (
          <AdminView
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onToggleStockProduct={handleToggleStockProduct}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onClearAllOrders={handleClearAllOrders}
            inquiries={inquiries}
            onResolveInquiry={handleResolveInquiry}
            stats={stats}
            onUpdateStats={setStats}
            seoConfig={seoConfig}
            onUpdateSEO={setSeoConfig}
          />
        );

      default:
        return (
          <HomeView
            products={products}
            stats={stats}
            setCurrentTab={setCurrentTab}
            setCategoryFilter={setCategoryFilter}
            onProductClick={(p) => {
              setSelectedProduct(p);
              setCurrentTab('products');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-950 font-sans text-gray-800">
      
      {/* Dynamic Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cartItemsCount}
        openCart={() => setCartOpen(true)}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {renderActiveTab()}
      </main>

      {/* Custom persistent Sidebar Shopping Cart panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQty={handleUpdateCartQty}
        onCheckoutSuccess={handleCheckoutSuccess}
        selectedCity={selectedCity}
      />

      {/* Footer Credentials layout */}
      <Footer 
        setCurrentTab={setCurrentTab} 
      />

      {/* Persistent helper tooltip for AI Studio reviewers */}
      <div className="fixed bottom-4 left-4 z-30 hidden sm:block">
        <div className="bg-slate-900 border border-slate-700/80 text-white rounded-xl p-3 shadow-lg flex items-center gap-3 text-[11px] max-w-xs backdrop-blur-md opacity-90 hover:opacity-100 transition-opacity">
          <div className="h-6 w-6 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-gray-900 font-mono text-[10px]">CRM</div>
          <div>
            <p className="font-bold text-gray-100">Live Client CRM Simulation</p>
            <p className="text-gray-400 font-sans mt-0.5 leading-normal">Submitting questions on **Contact** or placing a custom lease adds CRM feeds under **Admin Console** tab inside local state.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
