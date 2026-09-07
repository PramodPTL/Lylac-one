'use client';
import { motion } from 'framer-motion';
import { Upload, ArrowRight, Search, MapPin, ShieldCheck, Clock, Truck, ChevronRight, Star, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StoreCard, MedicineCard, CategoryCard, HealthConcernCard, OfferCard } from './Cards';
import { CATEGORIES, HEALTH_CONCERNS, PHARMACIES, MEDICINES, OFFERS, SERVICES, ARTICLES } from '@/lib/constants/mockData';
import { useProducts, useLiveStore } from '@/hooks/useCatalog';
import { STORE_CODE } from '@/lib/api';
import { storeApi } from '@/lib/services';
import { useMemo } from 'react';
import * as Icons from 'lucide-react';

export function HomeView({ onNavigate, onAddToCart, cart, location, onOpenMedicine, onOpenStore, wishlist, toggleWishlist }) {
  const getQty = (id) => cart.find((c) => c.id === id)?.qty || 0;

  // LIVE backend data: fetch the real store + its products
  const liveStoreQ = useLiveStore(STORE_CODE);
  const liveProductsQ = useProducts({ count: 12 });

  // Merge live pharmacy with mock ones (live pharmacy appears first)
  const pharmacies = useMemo(() => {
    if (liveStoreQ.data) return [liveStoreQ.data, ...PHARMACIES];
    return PHARMACIES;
  }, [liveStoreQ.data]);

  const liveProducts = liveProductsQ.data?.products || [];
  const featuredMeds = liveProducts.length > 0 ? liveProducts : MEDICINES;

  return (
    <div className="pb-24 md:pb-0">
      {/* Smaller Hero */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero text-white">
          <div className="container py-6 md:py-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine • Licensed pharmacies
                  </div>
                  <h1 className="text-2xl md:text-4xl font-extrabold leading-tight text-balance">Your neighbourhood pharmacy, <span className="text-amber-200">delivered in 15 min.</span></h1>
                  <p className="mt-2 text-white/90 max-w-lg text-sm md:text-base">Order from verified stores near you. Free delivery above ₹299.</p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Button onClick={() => onNavigate('search')} className="bg-white text-primary hover:bg-white/95 font-semibold rounded-full h-11 px-5">
                      <Search className="w-4 h-4 mr-2" /> Search Medicines
                    </Button>
                    <Button onClick={() => onNavigate('upload')} variant="outline" className="border-white/40 bg-white/10 backdrop-blur hover:bg-white/20 text-white rounded-full h-11 px-5">
                      <Upload className="w-4 h-4 mr-2" /> Upload Prescription
                    </Button>
                  </div>
                </motion.div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="hidden md:block">
                <div className="relative">
                  <img src="https://images.pexels.com/photos/7460048/pexels-photo-7460048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600" alt="Medicines" className="relative rounded-2xl shadow-2xl w-full h-52 object-cover" />
                  <div className="absolute -bottom-3 -left-3 bg-white text-foreground rounded-xl p-2.5 shadow-2xl flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-success/20 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground">Delivered in</div>
                      <div className="font-bold text-primary text-sm">15 minutes</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Pharmacies — MOVED TO TOP (primary action for hyperlocal marketplace) */}
      <SectionHeader title={`Choose a pharmacy near ${location.split(',')[0]}`} subtitle={liveStoreQ.data ? `${pharmacies.length} pharmacies · Live: ${liveStoreQ.data.name}` : 'Verified, rated & delivering to your address'} onSeeAll={() => onNavigate('all-pharmacies')} pillLabel={liveStoreQ.data ? 'Live' : 'Hyperlocal'} />
      <section className="container">
        {liveStoreQ.isLoading ? (
          <SkeletonRow count={4} />
        ) : liveStoreQ.isError && !PHARMACIES.length ? (
          <ErrorBlock message="Couldn't load pharmacies" onRetry={() => liveStoreQ.refetch()} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pharmacies.slice(0, 6).map((p) => <StoreCard key={p.id} store={p} onClick={() => onOpenStore(p.slug || p.id)} />)}
          </div>
        )}
      </section>

      {/* Categories */}
      <SectionHeader title="Shop by Category" subtitle="Everything you need, organised" onSeeAll={() => onNavigate('categories')} />
      <section className="container">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          {CATEGORIES.slice(0, 8).map((c) => <CategoryCard key={c.id} category={c} onClick={() => onNavigate('search')} />)}
        </div>
      </section>

      {/* Health Concerns */}
      <SectionHeader title="Shop by Health Concern" subtitle="Solutions curated by doctors" />
      <section className="container">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {HEALTH_CONCERNS.map((h) => <HealthConcernCard key={h.id} concern={h} onClick={() => onNavigate('search')} />)}
        </div>
      </section>

      {/* Featured Medicines */}
      <SectionHeader title="Featured Medicines" subtitle={liveProducts.length ? `${liveProductsQ.data.total} live products from ${liveStoreQ.data?.name || 'nearby stores'}` : 'Bestsellers this week'} onSeeAll={() => onNavigate('search')} pillLabel={liveProducts.length ? 'Live' : undefined} />
      <section className="container">
        {liveProductsQ.isLoading ? <SkeletonRow count={5} /> :
        liveProductsQ.isError && liveProducts.length === 0 ? <ErrorBlock message="Couldn't load medicines" onRetry={() => liveProductsQ.refetch()} /> :
        <>
          <div className="flex md:hidden gap-3 overflow-x-auto no-scrollbar pb-2">
            {featuredMeds.map((m) => (
              <MedicineCard key={m.id} medicine={m} cartQty={getQty(m.id)}
                onAdd={() => onAddToCart(m, 1)} onInc={() => onAddToCart(m, 1)} onDec={() => onAddToCart(m, -1)}
                onClick={() => onOpenMedicine(m.id)}
                wishlisted={wishlist?.includes(m.id)}
                onToggleWish={() => toggleWishlist?.(m.id)}
              />
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featuredMeds.map((m) => (
              <MedicineCard key={m.id} medicine={m} cartQty={getQty(m.id)}
                onAdd={() => onAddToCart(m, 1)} onInc={() => onAddToCart(m, 1)} onDec={() => onAddToCart(m, -1)}
                onClick={() => onOpenMedicine(m.id)}
                wishlisted={wishlist?.includes(m.id)}
                onToggleWish={() => toggleWishlist?.(m.id)}
              />
            ))}
          </div>
        </>}
      </section>

      {/* Healthcare Services */}
      <SectionHeader title="Healthcare Services" subtitle="Beyond medicines" />
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SERVICES.map((s) => {
            const Icon = Icons[s.icon] || Icons.Sparkles;
            return (
              <Card key={s.id} className="p-4 hover:shadow-card transition cursor-pointer border-border">
                <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Offers */}
      <SectionHeader title="Offers & Coupons" subtitle="Deals you'll love" />
      <section className="container">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {OFFERS.map((o) => <OfferCard key={o.id} offer={o} />)}
        </div>
      </section>

      {/* Health Articles */}
      <SectionHeader title="Health Articles" subtitle="From verified experts" />
      <section className="container pb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {ARTICLES.map((a) => (
            <Card key={a.id} className="overflow-hidden hover:shadow-card transition cursor-pointer group">
              <div className="h-40 overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-accent text-primary font-semibold">{a.category}</span>
                  <span>{a.readTime} read</span>
                </div>
                <h4 className="font-semibold line-clamp-2">{a.title}</h4>
                <button className="mt-2 text-sm text-primary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle, onSeeAll, pillLabel }) {
  return (
    <div className="container mt-8 mb-4 flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
          {pillLabel && <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1">{pillLabel === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />}{pillLabel}</span>}
        </div>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
          See all <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ============ Reusable state components ============
export function SkeletonRow({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-border bg-card">
          <div className="h-32 bg-muted animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorBlock({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
      <AlertTriangle className="w-8 h-8 mx-auto text-destructive mb-2" />
      <div className="font-semibold">{message}</div>
      <div className="text-xs text-muted-foreground mt-1">Please check your connection and try again.</div>
      {onRetry && <Button variant="outline" onClick={onRetry} className="mt-3 rounded-full">Retry</Button>}
    </div>
  );
}

export function EmptyBlock({ title, message, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center">
      {Icon && <Icon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />}
      <div className="font-semibold">{title}</div>
      {message && <div className="text-xs text-muted-foreground mt-1">{message}</div>}
    </div>
  );
}
