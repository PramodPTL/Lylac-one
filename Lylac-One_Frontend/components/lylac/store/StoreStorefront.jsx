'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeft, Search as SearchIcon, ShoppingCart, Heart, Sun, Moon, ChevronRight, ShieldCheck, Clock, MapPin, Phone, MessageCircle, Award, Star, Truck, Facebook, Instagram, Twitter, Youtube, Upload, X, Menu, ExternalLink, PhoneCall, Send, Sparkles, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MedicineCard } from '@/components/lylac/Cards';
import { usePersistedState, useDarkMode } from '@/hooks/usePersistedState';
import { useProducts } from '@/hooks/useCatalog';
import { PHARMACIES, MEDICINES, CATEGORIES, STORE_DETAILS, STORE_BRAND } from '@/lib/constants/mockData';
import * as Icons from 'lucide-react';

export function StoreStorefront({ store }) {
  const router = useRouter();
  const details = STORE_DETAILS[store.id] || STORE_DETAILS['ph-1'];
  const brand = STORE_BRAND[store.id] || STORE_BRAND['ph-1'];
  const theme = brand.theme;

  const [cart, setCart] = usePersistedState('lylac-cart', []);
  const [currentStoreId, setCurrentStoreId] = usePersistedState('lylac-current-store', null);
  const [wishlist, setWishlist] = usePersistedState('lylac-wishlist', []);
  const [savedStores, setSavedStores] = usePersistedState('lylac-saved-stores', []);
  const [darkTheme, setDarkTheme] = useDarkMode();

  // Live backend products
  const liveProductsQ = useProducts({ count: 24 });
  const liveProducts = liveProductsQ.data?.products || [];
  const products = liveProducts.length > 0 ? liveProducts : MEDICINES;

  const [q, setQ] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const saved = savedStores.includes(store.id);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const searchResults = q ? products.filter((m) => `${m.name} ${m.brand} ${m.composition || ''}`.toLowerCase().includes(q.toLowerCase())) : [];
  const noResults = q && searchResults.length === 0;

  // Section datasets — everything is scoped to this pharmacy (live-first)
  const bestSellers = products.slice(0, 6);
  const rxMeds = products.filter((m) => m.rx).slice(0, 5);
  const otcMeds = products.filter((m) => !m.rx).slice(0, 5);
  const personalCare = products.slice(0, 5);
  const babyCare = products.slice(0, 4);
  const devices = products.slice(0, 4);
  const newArrivals = [...products].reverse().slice(0, 5);

  // ============ ACTIONS ============
  const goMarketplace = () => router.push('/');
  const openMedicine = (id) => router.push(`/?view=medicine&id=${id}&from=${store.slug}`);
  const openCart = () => router.push('/?view=cart');
  const toggleWishlist = (id) => {
    setWishlist((w) => {
      const has = w.includes(id);
      toast.success(has ? 'Removed from wishlist' : 'Added to wishlist ❤️');
      return has ? w.filter((x) => x !== id) : [...w, id];
    });
  };
  const toggleSave = () => {
    setSavedStores((s) => s.includes(store.id) ? s.filter((x) => x !== store.id) : [...s, store.id]);
    toast.success(saved ? 'Removed from saved' : 'Saved to your pharmacies ❤️');
  };
  const addToCart = (medicine, delta) => {
    if (delta > 0 && currentStoreId && currentStoreId !== store.id && cart.length > 0) {
      setPendingItem({ medicine, delta }); return;
    }
    setCart((c) => {
      const idx = c.findIndex((i) => i.id === medicine.id);
      if (idx === -1 && delta > 0) {
        if (!currentStoreId) setCurrentStoreId(store.id);
        toast.success(`${medicine.name} added to cart`);
        return [...c, { ...medicine, qty: delta, storeId: store.id, storeName: store.name }];
      }
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
  const confirmSwitch = () => {
    if (!pendingItem) return;
    setCart([{ ...pendingItem.medicine, qty: pendingItem.delta, storeId: store.id, storeName: store.name }]);
    setCurrentStoreId(store.id);
    toast.success(`Switched to ${store.name}.`);
    setPendingItem(null);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
    setMobileMenu(false);
  };

  const cartQty = (id) => cart.find((c) => c.id === id)?.qty || 0;
  const wished = (id) => wishlist.includes(id);

  const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'medicines', label: 'Medicines' },
    { id: 'categories', label: 'Categories' },
    { id: 'health-products', label: 'Health Products' },
    { id: 'rx-upload', label: 'Prescription Upload' },
    { id: 'offers', label: 'Offers' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  // Scoped CSS variables so the whole page is themed for this pharmacy only
  const themeStyle = {
    '--pf-primary': theme.primary,
    '--pf-secondary': theme.secondary,
    '--pf-accent': theme.accent,
    '--pf-dark': theme.dark,
    '--pf-hero': theme.hero,
    fontFamily: theme.font,
  };

  return (
    <div style={themeStyle} className="min-h-screen bg-background">
      {/* ========== TOP UTILITY STRIP ========== */}
      <div className="text-white text-xs" style={{ background: theme.dark }}>
        <div className="container flex items-center justify-between h-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {brand.contact}</span>
            <span className="hidden sm:flex items-center gap-1"><Clock className="w-3 h-3" /> {store.hours}</span>
          </div>
          <button onClick={goMarketplace} className="flex items-center gap-1 opacity-80 hover:opacity-100 transition">
            <ChevronLeft className="w-3 h-3" /> Back to Marketplace
          </button>
        </div>
      </div>

      {/* ========== PHARMACY NAVBAR ========== */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container flex items-center gap-3 h-16">
          <Link href={`/store/${store.slug}`} className="flex items-center gap-2.5 shrink-0">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg" style={{ background: theme.hero }}>
              {store.logo}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-base md:text-lg leading-tight truncate" style={{ color: theme.primary }}>{store.name}</div>
              <div className="text-[10px] text-muted-foreground truncate leading-tight italic">{brand.slogan}</div>
            </div>
          </Link>

          <div className="flex-1 hidden md:block max-w-lg mx-4">
            <div className="relative">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search medicines at ${store.name.split(' ')[0]}…`} className="pl-10 h-10 rounded-full bg-muted/60 border-none focus-visible:ring-2" style={{ '--tw-ring-color': theme.primary }} />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={toggleSave} className="hidden sm:flex p-2 rounded-full hover:bg-muted" aria-label="Save pharmacy">
              <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <a href={`https://wa.me/${brand.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hidden sm:flex p-2 rounded-full hover:bg-muted" title="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.2 3.5 5.5 4.8.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4z"/><path d="M20.5 3.5c-2.3-2.3-5.3-3.5-8.5-3.5C5.4 0 0 5.4 0 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6c1.7 1 3.7 1.4 5.7 1.4 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3zM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7.9.9-3.6-.2-.4C2.6 15.5 2 13.8 2 12 2 6.5 6.5 2 12 2c2.7 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 .1 5.5-4.4 9.9-9.9 9.9z"/></svg>
            </a>
            <button onClick={() => setDarkTheme(darkTheme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-muted" aria-label="Toggle theme">
              {darkTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={openCart} className="relative p-2 rounded-full hover:bg-muted">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-[10px] text-white border-0" style={{ background: theme.secondary }}>{cartCount}</Badge>}
            </button>
            <Sheet open={mobileMenu} onOpenChange={setMobileMenu}>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 rounded-full hover:bg-muted"><Menu className="w-5 h-5" /></button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="pt-4">
                  <div className="text-lg font-bold mb-4" style={{ color: theme.primary }}>{store.name}</div>
                  {NAV_ITEMS.map((n) => (
                    <button key={n.id} onClick={() => scrollTo(n.id)} className="block w-full text-left py-3 border-b border-border font-medium hover:text-primary">{n.label}</button>
                  ))}
                  <button onClick={goMarketplace} className="block w-full text-left py-3 mt-4 text-xs text-muted-foreground">← Back to Marketplace</button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Pharmacy-specific nav row */}
        <nav className="hidden md:block border-t border-border">
          <div className="container flex items-center gap-1 h-11 overflow-x-auto no-scrollbar">
            {NAV_ITEMS.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition whitespace-nowrap ${activeSection === n.id ? 'text-white' : 'hover:bg-muted'}`}
                style={activeSection === n.id ? { background: theme.primary } : { color: 'inherit' }}>
                {n.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden container pb-3">
          <div className="relative">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search medicines…" className="pl-10 h-10 rounded-full bg-muted/60 border-none" />
          </div>
        </div>
      </header>

      {/* ========== SEARCH RESULTS OVERLAY ========== */}
      {q && (
        <div className="container mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">{searchResults.length} results for "<span style={{ color: theme.primary }}>{q}</span>"</h3>
            <button onClick={() => setQ('')} className="text-sm text-muted-foreground flex items-center gap-1"><X className="w-3 h-3" /> Clear</button>
          </div>
          {noResults ? (
            <NotFoundBlock store={store} query={q} theme={theme} onSearchAll={() => router.push(`/?view=search`)} onNotify={() => toast.success('We will notify you when it\'s available!')} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {searchResults.slice(0, 15).map((m) => (
                <MedicineCard key={m.id} medicine={m} cartQty={cartQty(m.id)} onAdd={() => addToCart(m, 1)} onInc={() => addToCart(m, 1)} onDec={() => addToCart(m, -1)} onClick={() => openMedicine(m.id)} wishlisted={wished(m.id)} onToggleWish={() => toggleWishlist(m.id)} />
              ))}
            </div>
          )}
        </div>
      )}

      {!q && (
        <>
          {/* ========== HERO ========== */}
          <section id="home" className="relative overflow-hidden text-white" style={{ background: theme.hero }}>
            <div className="container py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center relative z-10">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  <Award className="w-3.5 h-3.5" /> {brand.yearsInBusiness}+ years of trust • Est. {brand.established}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-balance">{brand.slogan}</h1>
                <p className="mt-3 text-white/90 md:text-lg max-w-lg">{brand.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button size="lg" onClick={() => scrollTo('medicines')} className="rounded-full h-12 px-6 font-bold bg-white text-black hover:bg-white/95" style={{ color: theme.primary }}>
                    Shop Medicines <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button size="lg" onClick={() => scrollTo('rx-upload')} variant="outline" className="rounded-full h-12 px-6 border-white/40 bg-white/10 backdrop-blur hover:bg-white/20 text-white">
                    <Upload className="w-4 h-4 mr-2" /> Upload Prescription
                  </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Licensed Pharmacy</div>
                  <div className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> {details.avgDelivery} delivery</div>
                  <div className="flex items-center gap-1.5"><Star className="w-4 h-4" /> {store.rating} ★ ({store.reviews.toLocaleString()} reviews)</div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="hidden md:block">
                <div className="relative">
                  <img src={brand.heroImage} alt={store.name} className="rounded-3xl shadow-2xl w-full h-80 object-cover" />
                  <div className="absolute -bottom-5 -left-5 bg-white text-foreground rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3">
                    <img src={brand.ownerImage} alt={brand.ownerName} className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: theme.primary }} />
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase font-bold">Meet the Owner</div>
                      <div className="text-sm font-bold">{brand.ownerName}</div>
                      <div className="text-[11px] text-muted-foreground">{brand.ownerTitle}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* decorative */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 20%, white 0%, transparent 30%), radial-gradient(circle at 80% 80%, white 0%, transparent 30%)' }} />
          </section>

          {/* ========== FEATURED OFFERS ========== */}
          <section id="offers" className="container mt-10">
            <SectionTitle theme={theme} title="Featured Offers" subtitle={`Exclusive at ${store.name}`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { t: 'Save 20% on Chronic Care', s: 'Auto-refill your monthly meds', c: 'CHRONIC20', bg: theme.primary },
                { t: 'Free Delivery Today', s: `Above ₹${store.minOrder} • Order now`, c: 'FREEDEL', bg: theme.secondary },
                { t: 'Buy 2 Get 1 — Vitamins', s: 'On all wellness range', c: 'VIT21', bg: theme.dark },
              ].map((o, i) => (
                <Card key={i} className="p-5 text-white overflow-hidden relative" style={{ background: o.bg }}>
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
                  <div className="text-xs uppercase font-bold opacity-90">Store Offer</div>
                  <div className="text-xl font-extrabold mt-1">{o.t}</div>
                  <div className="text-sm opacity-90 mt-1">{o.s}</div>
                  <div className="mt-3 inline-flex bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold">CODE: {o.c}</div>
                </Card>
              ))}
            </div>
          </section>

          {/* ========== SHOP BY CATEGORY ========== */}
          <section id="categories" className="container mt-12">
            <SectionTitle theme={theme} title="Shop by Category" subtitle={`Curated for ${store.name} customers`} />
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {CATEGORIES.slice(0, 8).map((c) => {
                const Icon = Icons[c.icon] || Icons.Pill;
                return (
                  <button key={c.id} onClick={() => scrollTo('medicines')} className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-105 transition" style={{ background: theme.accent, color: theme.primary }}>
                      <Icon className="w-7 h-7 md:w-8 md:h-8" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-center leading-tight">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ========== BEST SELLERS ========== */}
          <section id="medicines" className="container mt-12">
            <SectionTitle theme={theme} title="Best-Selling Medicines" subtitle="Our most-loved products" />
            <ProductRow items={bestSellers} theme={theme} onOpen={openMedicine} onAdd={addToCart} cartQty={cartQty} wished={wished} toggleWish={toggleWishlist} />
          </section>

          {/* ========== PRESCRIPTION ========== */}
          <section className="container mt-12">
            <SectionTitle theme={theme} title="Prescription Medicines" subtitle="Requires valid Rx • Verified by our pharmacists" />
            <ProductRow items={rxMeds} theme={theme} onOpen={openMedicine} onAdd={addToCart} cartQty={cartQty} wished={wished} toggleWish={toggleWishlist} />
          </section>

          {/* ========== OTC ========== */}
          <section className="container mt-12">
            <SectionTitle theme={theme} title="Over-the-Counter (OTC)" subtitle="Everyday health essentials" />
            <ProductRow items={otcMeds} theme={theme} onOpen={openMedicine} onAdd={addToCart} cartQty={cartQty} wished={wished} toggleWish={toggleWishlist} />
          </section>

          {/* ========== HEALTH PRODUCTS SPLIT ========== */}
          <section id="health-products" className="container mt-12 grid md:grid-cols-2 gap-6">
            <div>
              <SectionTitle theme={theme} title="Personal Care" subtitle="Grooming & wellness essentials" small />
              <ProductRow items={personalCare} theme={theme} onOpen={openMedicine} onAdd={addToCart} cartQty={cartQty} wished={wished} toggleWish={toggleWishlist} />
            </div>
            <div>
              <SectionTitle theme={theme} title="Baby Care" subtitle="Safe products for little ones" small />
              <ProductRow items={babyCare} theme={theme} onOpen={openMedicine} onAdd={addToCart} cartQty={cartQty} wished={wished} toggleWish={toggleWishlist} />
            </div>
          </section>

          {/* ========== DEVICES ========== */}
          <section className="container mt-12">
            <SectionTitle theme={theme} title="Healthcare Devices" subtitle="BP monitors, glucose meters & more" />
            <ProductRow items={devices} theme={theme} onOpen={openMedicine} onAdd={addToCart} cartQty={cartQty} wished={wished} toggleWish={toggleWishlist} />
          </section>

          {/* ========== NEW ARRIVALS ========== */}
          <section className="container mt-12">
            <SectionTitle theme={theme} title="New Arrivals" subtitle={`Just added at ${store.name}`} />
            <ProductRow items={newArrivals} theme={theme} onOpen={openMedicine} onAdd={addToCart} cartQty={cartQty} wished={wished} toggleWish={toggleWishlist} />
          </section>

          {/* ========== PRESCRIPTION UPLOAD ========== */}
          <section id="rx-upload" className="container mt-14">
            <div className="rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center" style={{ background: theme.accent }}>
              <div>
                <div className="text-xs uppercase font-bold tracking-wider" style={{ color: theme.primary }}>Doctor's Prescription?</div>
                <h3 className="text-2xl md:text-3xl font-extrabold mt-2">Upload once. We handle the rest.</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">Our licensed pharmacist verifies your prescription in under 10 minutes and prepares your order for delivery from {store.name}.</p>
                <Button size="lg" className="rounded-full mt-4 text-white font-semibold" style={{ background: theme.primary }}>
                  <Upload className="w-4 h-4 mr-2" /> Upload Prescription
                </Button>
              </div>
              <div className="border-2 border-dashed rounded-2xl p-8 text-center bg-background cursor-pointer transition hover:bg-muted" style={{ borderColor: theme.primary }}>
                <Upload className="w-10 h-10 mx-auto mb-2" style={{ color: theme.primary }} />
                <div className="font-semibold">Drag & drop your prescription</div>
                <div className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF · Max 5MB</div>
              </div>
            </div>
          </section>

          {/* ========== WHY CHOOSE ========== */}
          <section className="container mt-14">
            <SectionTitle theme={theme} title={`Why choose ${store.name}?`} subtitle={`${brand.yearsInBusiness} years of serving your community`} centered />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {brand.whyChoose.map((w, i) => {
                const Icon = Icons[w.icon] || Icons.Sparkles;
                return (
                  <Card key={i} className="p-5 text-center hover:shadow-card transition">
                    <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3" style={{ background: theme.accent, color: theme.primary }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="font-bold">{w.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{w.desc}</div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ========== TESTIMONIALS ========== */}
          <section className="container mt-14">
            <SectionTitle theme={theme} title="What our customers say" subtitle={`${store.reviews.toLocaleString()}+ happy customers`} centered />
            <div className="grid md:grid-cols-3 gap-4">
              {brand.testimonials.map((t, i) => (
                <Card key={i} className="p-5">
                  <div className="flex text-amber-500 mb-2">{[...Array(t.r)].map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}</div>
                  <p className="text-sm leading-relaxed">"{t.t}"</p>
                  <div className="mt-4 flex items-center gap-3 pt-3 border-t border-border">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold" style={{ background: theme.primary }}>{t.n.charAt(0)}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.n}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ========== ABOUT US ========== */}
          <section id="about" className="container mt-14">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider" style={{ color: theme.primary }}>About {store.name}</div>
                <h3 className="text-2xl md:text-3xl font-extrabold mt-2">Serving families since {brand.established}</h3>
                <p className="text-sm md:text-base text-muted-foreground mt-3 leading-relaxed">{details.description}</p>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <MiniStat n={brand.yearsInBusiness + '+'} l="Years" color={theme.primary} />
                  <MiniStat n={details.ordersCompleted} l="Orders" color={theme.primary} />
                  <MiniStat n={details.products.toLocaleString() + '+'} l="Products" color={theme.primary} />
                </div>
                <div className="mt-5 flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: theme.primary, background: theme.accent }}>
                  <img src={brand.ownerImage} className="w-14 h-14 rounded-full object-cover shrink-0" alt={brand.ownerName} />
                  <div>
                    <div className="font-bold">{brand.ownerName}</div>
                    <div className="text-xs text-muted-foreground">{brand.ownerTitle} · License No: {brand.licenseNo}</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img src={brand.banner} className="rounded-2xl w-full h-72 object-cover shadow-card" alt={store.name} />
                <div className="absolute bottom-4 right-4 bg-background rounded-xl px-3 py-2 shadow-lg text-xs">
                  <div className="font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" style={{ color: theme.primary }} /> Verified Pharmacy</div>
                  <div className="text-muted-foreground mt-0.5">License: {brand.licenseNo}</div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== CONTACT & LOCATION ========== */}
          <section id="contact" className="container mt-14">
            <SectionTitle theme={theme} title="Visit us or get in touch" subtitle="We are here to help — always" />
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-5 space-y-3">
                <ContactRow icon={MapPin} label="Address" value={`${store.address} · Delivery radius ${details.deliveryRadius}`} color={theme.primary} />
                <ContactRow icon={Clock} label="Store Hours" value={store.hours} color={theme.primary} />
                <ContactRow icon={PhoneCall} label="Call" value={brand.contact} color={theme.primary} href={`tel:${brand.contact}`} />
                <ContactRow icon={MessageCircle} label="WhatsApp" value={brand.whatsapp} color={theme.primary} href={`https://wa.me/${brand.whatsapp.replace(/\D/g,'')}`} />
                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase">Send us a message</div>
                  <div className="flex gap-2">
                    <Input placeholder="Your message…" className="h-10" />
                    <Button className="rounded-full text-white h-10 px-4" style={{ background: theme.primary }}><Send className="w-4 h-4" /></Button>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden">
                {/* Google Maps placeholder */}
                <div className="relative h-72 md:h-full min-h-[280px]" style={{ background: `linear-gradient(135deg, ${theme.accent} 0%, #fff 100%)` }}>
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(0,0,0,0.06) 0px, transparent 40px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.06) 0px, transparent 60px), linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.03) 49%, rgba(0,0,0,0.03) 51%, transparent 52%)' }} />
                  {/* Fake streets */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                    <path d="M 0 100 L 400 120" stroke="#94a3b8" strokeWidth="2" opacity="0.4"/>
                    <path d="M 80 0 L 100 300" stroke="#94a3b8" strokeWidth="2" opacity="0.4"/>
                    <path d="M 200 0 L 220 300" stroke="#94a3b8" strokeWidth="2" opacity="0.4"/>
                    <path d="M 0 200 L 400 210" stroke="#94a3b8" strokeWidth="2" opacity="0.4"/>
                    <path d="M 300 0 L 320 300" stroke="#94a3b8" strokeWidth="2" opacity="0.4"/>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="pulse-ring w-10 h-10 rounded-full flex items-center justify-center shadow-glow" style={{ background: theme.primary }}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="mt-2 bg-background px-3 py-1.5 rounded-full text-xs font-bold shadow" style={{ color: theme.primary }}>{store.name}</div>
                  </div>
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`} target="_blank" rel="noreferrer" className="bg-background rounded-full px-3 py-1.5 text-xs font-semibold shadow inline-flex items-center gap-1 hover:shadow-md">
                      <ExternalLink className="w-3 h-3" /> Directions
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ========== CAN'T FIND MEDICINE (subtle link to marketplace) ========== */}
          <section className="container mt-14">
            <NotFoundBlock store={store} theme={theme} generic onSearchAll={() => router.push('/?view=search')} onNotify={() => toast.success('We will notify you when it\'s available.')} />
          </section>
        </>
      )}

      {/* ========== PHARMACY FOOTER ========== */}
      <footer className="mt-14 text-white" style={{ background: theme.dark }}>
        <div className="container py-10 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white text-black font-bold text-xl flex items-center justify-center" style={{ color: theme.primary }}>{store.logo}</div>
              <div>
                <div className="font-bold text-lg">{store.name}</div>
                <div className="text-xs opacity-80 italic">{brand.slogan}</div>
              </div>
            </div>
            <p className="text-sm opacity-80 mt-3 max-w-md">{details.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Youtube} />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase mb-3">Store</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-start gap-2"><Clock className="w-3.5 h-3.5 mt-0.5" /> {store.hours}</li>
              <li className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 mt-0.5" /> {store.address}</li>
              <li className="flex items-start gap-2"><Phone className="w-3.5 h-3.5 mt-0.5" /> {brand.contact}</li>
              <li className="flex items-start gap-2"><ShieldCheck className="w-3.5 h-3.5 mt-0.5" /> License: {brand.licenseNo}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase mb-3">Policies</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Terms & Conditions</li>
              <li className="hover:underline cursor-pointer">Return Policy</li>
              <li className="hover:underline cursor-pointer">Shipping Policy</li>
              <li onClick={() => scrollTo('about')} className="hover:underline cursor-pointer">About Us</li>
              <li onClick={() => scrollTo('contact')} className="hover:underline cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        {/* Powered by strip */}
        <div className="border-t border-white/10 py-4 text-center">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-2 text-xs opacity-80">
            <div>© {new Date().getFullYear()} {store.name}. All rights reserved.</div>
            <button onClick={goMarketplace} className="flex items-center gap-1.5 hover:opacity-100">
              <Sparkles className="w-3 h-3" /> Powered by <span className="font-bold text-white">Lylac One</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Sticky floating WhatsApp */}
      <a href={`https://wa.me/${brand.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="fixed bottom-20 md:bottom-6 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-glow z-30" style={{ background: '#25D366' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.2 3.5 5.5 4.8.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4z"/><path d="M20.5 3.5c-2.3-2.3-5.3-3.5-8.5-3.5C5.4 0 0 5.4 0 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6c1.7 1 3.7 1.4 5.7 1.4 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3zM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7.9.9-3.6-.2-.4C2.6 15.5 2 13.8 2 12 2 6.5 6.5 2 12 2c2.7 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 .1 5.5-4.4 9.9-9.9 9.9z"/></svg>
      </a>

      {/* Sticky cart bar (mobile) */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 inset-x-4 md:hidden z-30">
          <button onClick={openCart} className="w-full text-white rounded-full h-12 shadow-glow flex items-center justify-between px-5 font-semibold" style={{ background: theme.primary }}>
            <span className="flex items-center gap-2"><ShoppingCart className="w-4 h-4" />{cartCount} items · From {store.name.split(' ')[0]}</span>
            <span className="flex items-center gap-1">View Cart →</span>
          </button>
        </div>
      )}

      {/* Cart-switch dialog */}
      <AlertDialog open={!!pendingItem} onOpenChange={(o) => !o && setPendingItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace items in cart?</AlertDialogTitle>
            <AlertDialogDescription>
              Your cart contains items from <span className="font-semibold text-foreground">{cart[0]?.storeName}</span>. Each order can contain items from a single pharmacy.
              Add this item from <span className="font-semibold text-foreground">{store.name}</span> and clear existing cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep existing</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSwitch} style={{ background: theme.primary }}>Replace & Add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============ HELPER SUB-COMPONENTS ============
function SectionTitle({ title, subtitle, theme, small, centered }) {
  return (
    <div className={`mb-4 ${centered ? 'text-center' : ''}`}>
      <h2 className={`${small ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} font-extrabold tracking-tight`} style={{ color: theme.dark || 'inherit' }}>{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}

function ProductRow({ items, theme, onOpen, onAdd, cartQty, wished, toggleWish }) {
  return (
    <>
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-3">
        {items.map((m) => (
          <MedicineCard key={m.id} medicine={m}
            cartQty={cartQty(m.id)}
            onAdd={() => onAdd(m, 1)} onInc={() => onAdd(m, 1)} onDec={() => onAdd(m, -1)}
            onClick={() => onOpen(m.id)}
            wishlisted={wished(m.id)} onToggleWish={() => toggleWish(m.id)} />
        ))}
      </div>
      <div className="md:hidden flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {items.map((m) => (
          <MedicineCard key={m.id} medicine={m}
            cartQty={cartQty(m.id)}
            onAdd={() => onAdd(m, 1)} onInc={() => onAdd(m, 1)} onDec={() => onAdd(m, -1)}
            onClick={() => onOpen(m.id)}
            wishlisted={wished(m.id)} onToggleWish={() => toggleWish(m.id)} />
        ))}
      </div>
    </>
  );
}

function MiniStat({ n, l, color }) {
  return (
    <div className="text-center p-3 rounded-xl bg-muted/40">
      <div className="text-2xl font-extrabold" style={{ color }}>{n}</div>
      <div className="text-xs text-muted-foreground">{l}</div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, color, href }) {
  const Wrap = href ? 'a' : 'div';
  return (
    <Wrap href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}20`, color }}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase font-bold text-muted-foreground">{label}</div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </Wrap>
  );
}

function SocialIcon({ icon: Icon }) {
  return (
    <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
      <Icon className="w-4 h-4" />
    </button>
  );
}

function NotFoundBlock({ store, query, theme, generic, onSearchAll, onNotify }) {
  return (
    <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: theme.accent }}>
      <div className="text-5xl mb-3">🔍</div>
      <h3 className="text-xl md:text-2xl font-bold">
        {generic
          ? `Can't find your medicine at ${store.name}?`
          : `"${query}" is currently unavailable at ${store.name}.`}
      </h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
        {generic
          ? `We stock ${STORE_DETAILS[store.id]?.products.toLocaleString() || '10,000'}+ products but you may need something specific. We can help.`
          : 'Our pharmacist can source it for you, or you can check other verified pharmacies nearby.'}
      </p>
      <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
        <Button size="lg" onClick={onNotify} className="rounded-full text-white font-semibold" style={{ background: theme.primary }}>
          <Sparkles className="w-4 h-4 mr-2" /> Notify me when available
        </Button>
        <Button size="lg" variant="outline" onClick={onSearchAll} className="rounded-full font-semibold border-2" style={{ borderColor: theme.primary, color: theme.primary }}>
          Search across all Lylac One pharmacies
        </Button>
      </div>
    </div>
  );
}
