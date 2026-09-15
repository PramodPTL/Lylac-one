'use client';
import { useState, useCallback, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { Navbar, BottomNav, Footer } from '@/components/lylac/AppShell';
import { HomeView } from '@/components/lylac/HomeView';
import { SearchView } from '@/components/lylac/SearchView';
import { MedicineDetailView } from '@/components/lylac/MedicineDetailView';
import { CartView, CheckoutView, OrdersView, OrderTrackingView, ProfileView, CategoriesView, LocationView, AllPharmaciesView } from '@/components/lylac/Views';
import { AuthView } from '@/components/lylac/AuthView';
import { SettingsView } from '@/components/lylac/SettingsView';
import { ProfileSubView, CompareView, RecentlyViewedView } from '@/components/lylac/ProfileSubViews';
import { usePersistedState, useDarkMode } from '@/hooks/usePersistedState';
import { PHARMACIES } from '@/lib/constants/mockData';

function InnerApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [view, setView] = useState('home');
  const [prev, setPrev] = useState([]);
  const [location, setLocation] = useState('Koramangala, Bengaluru');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [profileSubRoute, setProfileSubRoute] = useState(null);

  // Persistence (shared with /store/[slug] via localStorage)
  const [cart, setCart] = usePersistedState('lylac-cart', []);
  const [currentStoreId, setCurrentStoreId] = usePersistedState('lylac-current-store', null);
  const [wishlist, setWishlist] = usePersistedState('lylac-wishlist', []);
  const [compare, setCompare] = usePersistedState('lylac-compare', []);
  const [recentlyViewed, setRecentlyViewed] = usePersistedState('lylac-recent', []);
  const [isAuthed, setIsAuthed] = usePersistedState('lylac-authed', false);
  const [theme, setTheme] = useDarkMode();

  // Read initial view from URL search params (e.g. /?view=cart&id=X)
  useEffect(() => {
    const v = searchParams.get('view');
    const id = searchParams.get('id');
    if (v) {
      if (id) {
        if (v === 'medicine') setSelectedMedicine(id);
        if (v === 'tracking') setSelectedOrder(id);
        if (v === 'profile-sub') setProfileSubRoute(id);
      }
      setView(v);
    }
  }, [searchParams]);

  const navigate = useCallback((v, param) => {
    // Pharmacies -> real Next.js route
    if (v === 'store') {
      // Support: mock id, mock slug, live store slug (e.g. 'default')
      const store = PHARMACIES.find((p) => p.id === param || p.slug === param);
      const slug = store?.slug || String(param || '').toLowerCase();
      router.push(`/store/${slug}`);
      return;
    }
    if (v === 'profile-sub') { setProfileSubRoute(param); }
    if (v === 'medicine') setSelectedMedicine(param);
    if (v === 'tracking') setSelectedOrder(param);
    setPrev((p) => [...p, view]);
    setView(v);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, router]);

  const back = useCallback(() => {
    setPrev((p) => {
      if (p.length === 0) { setView('home'); return []; }
      const last = p[p.length - 1];
      setView(last);
      return p.slice(0, -1);
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openMedicine = (id) => {
    setRecentlyViewed((r) => [id, ...r.filter((x) => x !== id)].slice(0, 20));
    navigate('medicine', id);
  };
  const openStore = (idOrSlug) => navigate('store', idOrSlug);
  const openOrder = (id) => navigate('tracking', id);

  const addToCart = (medicine, delta) => {
    setCart((c) => {
      const idx = c.findIndex((i) => i.id === medicine.id);
      if (idx === -1 && delta > 0) { toast.success(`${medicine.name} added to cart`); return [...c, { ...medicine, qty: delta }]; }
      if (idx === -1) return c;
      const newQty = c[idx].qty + delta;
      if (newQty <= 0) {
        const next = c.filter((_, i) => i !== idx);
        if (next.length === 0) setCurrentStoreId(null);
        return next;
      }
      const next = [...c]; next[idx] = { ...next[idx], qty: newQty }; return next;
    });
  };
  const removeFromCart = (id) => {
    setCart((c) => {
      const next = c.filter((i) => i.id !== id);
      if (next.length === 0) setCurrentStoreId(null);
      return next;
    });
    toast.info('Removed from cart');
  };
  const placeOrder = () => { setCart([]); setCurrentStoreId(null); setView('tracking'); setSelectedOrder('ORD-2451'); };

  const toggleWishlist = (id) => {
    setWishlist((w) => {
      const has = w.includes(id);
      toast.success(has ? 'Removed from wishlist' : 'Added to wishlist ❤️');
      return has ? w.filter((x) => x !== id) : [...w, id];
    });
  };
  const removeFromWishlist = (id) => { setWishlist((w) => w.filter((x) => x !== id)); toast.info('Removed'); };
  const addToCompare = (id) => {
    setCompare((c) => {
      if (c.includes(id)) { toast.info('Already in compare'); return c; }
      if (c.length >= 4) { toast.error('Max 4 items to compare'); return c; }
      toast.success('Added to compare'); return [...c, id];
    });
  };
  const removeCompare = (id) => setCompare((c) => c.filter((x) => x !== id));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const commonProps = {
    cart, onAddToCart: addToCart, onNavigate: navigate, onBack: back,
    onOpenMedicine: openMedicine, onOpenStore: openStore,
    wishlist, toggleWishlist,
  };

  const renderView = () => {
    switch (view) {
      case 'home': return <HomeView {...commonProps} location={location} />;
      case 'search': return <SearchView {...commonProps} />;
      case 'medicine': return <MedicineDetailView medicineId={selectedMedicine} {...commonProps} addToCompare={addToCompare} compare={compare} />;
      case 'all-pharmacies': return <AllPharmaciesView onBack={back} onOpenStore={openStore} />;
      case 'cart': return <CartView cart={cart} onAddToCart={addToCart} onRemove={removeFromCart} onNavigate={navigate} onBack={back} />;
      case 'checkout': return <CheckoutView cart={cart} onBack={back} onNavigate={navigate} onPlaceOrder={placeOrder} />;
      case 'orders': return <OrdersView onBack={back} onOpenOrder={openOrder} />;
      case 'tracking': return <OrderTrackingView orderId={selectedOrder} onBack={back} />;
      case 'profile': return <ProfileView onBack={back} onNavigate={navigate} />;
      case 'categories': return <CategoriesView onBack={back} onNavigate={navigate} />;
      case 'location': return <LocationView onBack={back} currentLocation={location} onSelect={(l) => { setLocation(l); back(); }} />;
      case 'settings': return <SettingsView onBack={back} theme={theme} setTheme={setTheme} onNavigate={navigate} />;
      case 'wishlist': return <ProfileSubView view="wishlist" onBack={back} onNavigate={navigate} wishlist={wishlist} addToCart={addToCart} cart={cart} removeFromWishlist={removeFromWishlist} />;
      case 'compare': return <CompareView onBack={back} compareIds={compare} removeCompare={removeCompare} addToCart={addToCart} cart={cart} />;
      case 'recently-viewed': return <RecentlyViewedView onBack={back} recentIds={recentlyViewed} addToCart={addToCart} cart={cart} onOpenMedicine={openMedicine} />;
      case 'profile-sub': return <ProfileSubView view={profileSubRoute} onBack={back} onNavigate={navigate} wishlist={wishlist} addToCart={addToCart} cart={cart} removeFromWishlist={removeFromWishlist} />;
      case 'auth': return <AuthView onBack={back} onSuccess={() => { setIsAuthed(true); back(); }} />;
      case 'upload':
        return (
          <div className="container py-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-accent flex items-center justify-center mb-4 text-3xl">📄</div>
            <h2 className="text-2xl font-bold">Upload Prescription</h2>
            <p className="text-muted-foreground mt-2">Our pharmacist will verify and prepare your order.</p>
            <div className="mt-6 border-2 border-dashed border-primary rounded-2xl p-10 bg-accent/30 cursor-pointer hover:bg-accent transition">
              <div className="text-5xl mb-2">📤</div>
              <div className="font-semibold">Tap to upload</div>
              <div className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF (max 5MB)</div>
            </div>
            <button onClick={back} className="mt-6 text-sm text-primary font-semibold">Back to Home</button>
          </div>
        );
      default: return <HomeView {...commonProps} location={location} />;
    }
  };

  const hideNav = view === 'auth';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNav && (
        <Navbar location={location} cartCount={cartCount} onNavigate={navigate} currentView={view}
          theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          onLoginClick={() => navigate('auth')} isAuthed={isAuthed} />
      )}
      <main className="flex-1 animate-fade-in">
        <AnimatePresence mode="wait">
          <motion.div key={view + (profileSubRoute || '') + (selectedMedicine || '')}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      {!hideNav && <Footer />}
      {!hideNav && <BottomNav currentView={view} onNavigate={navigate} cartCount={cartCount} />}
    </div>
  );
}

const App = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
    <InnerApp />
  </Suspense>
);

export default App;
