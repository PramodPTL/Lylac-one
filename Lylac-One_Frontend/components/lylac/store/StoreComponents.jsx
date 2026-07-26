'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeft, ChevronRight, Star, MapPin, Clock, Truck, ShieldCheck, Phone, Mail, Search as SearchIcon, SlidersHorizontal, Heart, ShoppingCart, Package, Award, MessageCircle, ThumbsUp, Home, ChevronLeft, Info, Shield, RefreshCw, FileCheck, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MedicineCard } from '@/components/lylac/Cards';
import { usePersistedState, useDarkMode } from '@/hooks/usePersistedState';
import { PHARMACIES, MEDICINES, CATEGORIES, STORE_DETAILS } from '@/lib/constants/mockData';
import * as Icons from 'lucide-react';

// ============== BREADCRUMB ==============
export function Breadcrumb({ items }) {
  return (
    <nav className="container py-3 flex items-center gap-1.5 text-xs text-muted-foreground overflow-x-auto no-scrollbar">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5 shrink-0">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {it.href ? (
            <Link href={it.href} className="hover:text-primary transition">{it.label}</Link>
          ) : (
            <span className="text-foreground font-medium">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ============== STORE HEADER ==============
export function StoreHeader({ store, saved, onToggleSave, onBack }) {
  return (
    <div className="relative">
      <div className="relative h-52 md:h-64 overflow-hidden">
        <img src={store.image} className="w-full h-full object-cover" alt={store.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/40" />
        <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-full bg-white/95 shadow-lg z-10"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <button onClick={onToggleSave} className="absolute top-4 right-4 p-2 rounded-full bg-white/95 shadow-lg z-10">
          <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500 text-rose-500' : 'text-foreground'}`} />
        </button>
      </div>
      <div className="container -mt-14 md:-mt-20 relative z-10">
        <div className="bg-card border border-border rounded-2xl p-4 md:p-5 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white text-2xl md:text-3xl font-bold flex items-center justify-center shadow-glow shrink-0">
              {store.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold">{store.name}</h1>
                <Badge className="bg-primary text-primary-foreground gap-1 border-0"><ShieldCheck className="w-3 h-3" /> Verified</Badge>
                {store.freeDelivery && <Badge className="bg-success text-white gap-1 border-0"><Truck className="w-3 h-3" /> Free Delivery</Badge>}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{store.address} • {store.hours}</div>
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-sm">
                <span className="flex items-center gap-1 text-success font-semibold"><Star className="w-3.5 h-3.5 fill-current" />{store.rating} <span className="text-muted-foreground font-normal">({store.reviews.toLocaleString()} reviews)</span></span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{store.distance}</span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 font-semibold"><Clock className="w-3.5 h-3.5" />{store.deliveryTime}</span>
                <span className="text-muted-foreground">•</span>
                <span className={`font-semibold ${store.isOpen ? 'text-success' : 'text-destructive'}`}>{store.isOpen ? '● Open Now' : '● Closed'}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Min order ₹{store.minOrder}</span>
              </div>
            </div>
          </div>
          {store.description && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{store.description}</p>}
        </div>
      </div>
    </div>
  );
}

// ============== STORE STATISTICS ==============
export function StoreStatistics({ store, details }) {
  const stats = [
    { l: 'Products Available', v: details.products.toLocaleString(), icon: Package, c: 'bg-blue-100 dark:bg-blue-950 text-blue-600' },
    { l: 'Categories', v: details.categories, icon: SlidersHorizontal, c: 'bg-purple-100 dark:bg-purple-950 text-purple-600' },
    { l: 'Avg Delivery', v: details.avgDelivery, icon: Clock, c: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600' },
    { l: 'Orders Completed', v: details.ordersCompleted, icon: FileCheck, c: 'bg-amber-100 dark:bg-amber-950 text-amber-600' },
    { l: 'Customer Rating', v: `${store.rating}/5`, icon: Star, c: 'bg-rose-100 dark:bg-rose-950 text-rose-600' },
  ];
  return (
    <div className="container mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s) => {
          const I = s.icon;
          return (
            <Card key={s.l} className="p-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.c} flex items-center justify-center shrink-0`}><I className="w-4 h-4" /></div>
              <div className="min-w-0">
                <div className="text-lg font-bold leading-tight">{s.v}</div>
                <div className="text-[11px] text-muted-foreground truncate">{s.l}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ============== CATEGORY SIDEBAR ==============
export function CategorySidebar({ active, onSelect, counts }) {
  return (
    <aside className="hidden lg:block sticky top-24 self-start w-56 shrink-0">
      <Card className="p-3">
        <h3 className="font-bold text-sm mb-2 px-2">Categories</h3>
        <div className="space-y-0.5">
          <button onClick={() => onSelect('all')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${active === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
            <span className="flex items-center justify-between">All Products <span className="text-xs opacity-70">{counts.all}</span></span>
          </button>
          {CATEGORIES.slice(0, 12).map((c) => {
            const Icon = Icons[c.icon] || Icons.Pill;
            const isActive = active === c.id;
            return (
              <button key={c.id} onClick={() => onSelect(c.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 truncate">{c.name}</span>
                {counts[c.id] > 0 && <span className="text-xs opacity-70">{counts[c.id]}</span>}
              </button>
            );
          })}
        </div>
      </Card>
    </aside>
  );
}

export function CategoryChips({ active, onSelect, counts }) {
  return (
    <div className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar pb-1">
      <button onClick={() => onSelect('all')} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${active === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>All ({counts.all})</button>
      {CATEGORIES.slice(0, 10).map((c) => {
        const Icon = Icons[c.icon] || Icons.Pill;
        const isActive = active === c.id;
        return (
          <button key={c.id} onClick={() => onSelect(c.id)} className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-accent'}`}>
            <Icon className="w-3.5 h-3.5" />{c.name}
          </button>
        );
      })}
    </div>
  );
}

// ============== FILTER DRAWER ==============
export function FilterDrawer({ filters, setFilters, brands }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Sort by</h4>
        <RadioGroup value={filters.sort} onValueChange={(v) => setFilters({ ...filters, sort: v })} className="space-y-2">
          {[
            { v: 'popular', l: 'Popular' }, { v: 'low', l: 'Price: Low to High' }, { v: 'high', l: 'Price: High to Low' },
            { v: 'best', l: 'Best Selling' }, { v: 'rating', l: 'Highest Rated' }, { v: 'new', l: 'New Arrivals' },
          ].map((s) => (<label key={s.v} className="flex items-center gap-2 text-sm"><RadioGroupItem value={s.v} />{s.l}</label>))}
        </RadioGroup>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <Slider value={filters.priceRange} onValueChange={(v) => setFilters({ ...filters, priceRange: v })} min={0} max={500} step={10} />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground"><span>₹{filters.priceRange[0]}</span><span>₹{filters.priceRange[1]}</span></div>
      </div>
      {brands.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3">Brand</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {brands.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={filters.brands.includes(b)}
                  onCheckedChange={(c) => setFilters({ ...filters, brands: c ? [...filters.brands, b] : filters.brands.filter((x) => x !== b) })}
                />{b}
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-3">
        <h4 className="font-semibold">Availability & Type</h4>
        <label className="flex items-center gap-2 text-sm"><Checkbox checked={filters.inStock} onCheckedChange={(c) => setFilters({ ...filters, inStock: c })} /> In Stock only</label>
        <label className="flex items-center gap-2 text-sm"><Checkbox checked={filters.rx} onCheckedChange={(c) => setFilters({ ...filters, rx: c })} /> Prescription Required</label>
        <label className="flex items-center gap-2 text-sm"><Checkbox checked={filters.generic} onCheckedChange={(c) => setFilters({ ...filters, generic: c })} /> Generic Medicines</label>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Discount</h4>
        <div className="grid grid-cols-4 gap-2">
          {[0, 10, 20, 30].map((d) => (
            <button key={d} onClick={() => setFilters({ ...filters, discount: d })} className={`px-3 py-2 rounded-lg text-xs font-medium border ${filters.discount === d ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}>
              {d === 0 ? 'Any' : `${d}%+`}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Minimum Rating</h4>
        <div className="grid grid-cols-4 gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => setFilters({ ...filters, minRating: r })} className={`px-3 py-2 rounded-lg text-xs font-medium border ${filters.minRating === r ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}>
              {r === 0 ? 'Any' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============== FEATURED CAROUSEL ==============
export function FeaturedProducts({ items, onOpen, onAdd, cart, wishlist, toggleWish }) {
  if (!items.length) return null;
  return (
    <div className="container mt-8">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold">Featured at this Store</h2>
          <p className="text-xs text-muted-foreground">Recommended by the pharmacist</p>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {items.map((m) => (
          <MedicineCard key={m.id} medicine={m}
            cartQty={cart.find((c) => c.id === m.id)?.qty || 0}
            onAdd={() => onAdd(m, 1)} onInc={() => onAdd(m, 1)} onDec={() => onAdd(m, -1)}
            onClick={() => onOpen(m.id)}
            wishlisted={wishlist.includes(m.id)}
            onToggleWish={() => toggleWish(m.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ============== STORE SERVICES ==============
export function StoreServices({ services }) {
  const catalog = {
    'home-delivery': { label: 'Home Delivery', icon: 'Truck', desc: 'Free above ₹299' },
    'doctor-consult': { label: 'Doctor Consultation', icon: 'Stethoscope', desc: 'Chat in 15 min' },
    'rx-upload': { label: 'Prescription Upload', icon: 'Upload', desc: 'Verified in 10 min' },
    'health-packages': { label: 'Health Packages', icon: 'HeartPulse', desc: 'Preventive care' },
    'lab-tests': { label: 'Lab Tests', icon: 'FlaskConical', desc: 'Home collection' },
  };
  return (
    <div className="container mt-8">
      <h2 className="text-lg md:text-xl font-bold mb-3">Healthcare Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {services.map((s) => {
          const c = catalog[s];
          if (!c) return null;
          const Icon = Icons[c.icon] || Icons.Sparkles;
          return (
            <Card key={s} className="p-4 hover:shadow-card cursor-pointer transition group">
              <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition"><Icon className="w-5 h-5" /></div>
              <div className="font-semibold text-sm">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.desc}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ============== STORE INFO CARD ==============
export function StoreInfoCard({ store, details }) {
  const rows = [
    { l: 'About', v: details.description, icon: Info },
    { l: 'Working Hours', v: store.hours, icon: Clock },
    { l: 'Contact', v: details.contact, icon: Phone },
    { l: 'Address', v: store.address, icon: MapPin },
    { l: 'Delivery Radius', v: details.deliveryRadius, icon: Truck },
    { l: 'Payment Options', v: details.paymentOptions, icon: FileCheck },
    { l: 'Return Policy', v: details.returnPolicy, icon: RefreshCw },
    { l: 'License', v: details.license, icon: Shield },
  ];
  return (
    <div className="container mt-8">
      <h2 className="text-lg md:text-xl font-bold mb-3">Store Information</h2>
      <Card className="divide-y divide-border">
        {rows.map((r) => {
          const I = r.icon;
          return (
            <div key={r.l} className="p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent text-primary flex items-center justify-center shrink-0"><I className="w-4 h-4" /></div>
              <div className="min-w-0">
                <div className="text-xs uppercase font-bold text-muted-foreground">{r.l}</div>
                <div className="text-sm mt-0.5">{r.v}</div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ============== REVIEWS SECTION ==============
export function ReviewsSection({ store, details }) {
  return (
    <div className="container mt-8">
      <h2 className="text-lg md:text-xl font-bold mb-3">Customer Reviews</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-5xl font-extrabold text-primary">{store.rating}</div>
          <div className="flex text-amber-500 mt-1">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(store.rating) ? 'fill-current' : ''}`} />)}</div>
          <div className="text-sm text-muted-foreground mt-1">{store.reviews.toLocaleString()} verified reviews</div>
          <div className="mt-4 space-y-1">
            {[5,4,3,2,1].map((star) => {
              const pct = details.ratingBreakdown[star] || 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3">{star}</span>
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
                  <span className="w-7 text-right text-muted-foreground">{pct}%</span>
                </div>
              );
            })}
          </div>
        </Card>
        <div className="md:col-span-2 space-y-3">
          {details.reviews.map((rv, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-accent text-primary font-bold flex items-center justify-center">{rv.n.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-sm">{rv.n}</div>
                    <div className="text-[11px] text-muted-foreground">{rv.d}</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">{[...Array(rv.r)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-current" />)}</div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{rv.t}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary"><ThumbsUp className="w-3 h-3" /> Helpful ({rv.helpful})</button>
                <button className="hover:text-primary">Reply</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============== SIMILAR PHARMACIES ==============
export function SimilarPharmacies({ excludeId }) {
  const items = PHARMACIES.filter((p) => p.id !== excludeId).slice(0, 4);
  return (
    <div className="container mt-8 pb-8">
      <h2 className="text-lg md:text-xl font-bold mb-3">Similar Pharmacies Nearby</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((p) => (
          <Link key={p.id} href={`/store/${p.slug}`} className="block group">
            <Card className="overflow-hidden hover:shadow-card transition">
              <div className="h-24 overflow-hidden"><img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={p.name} /></div>
              <div className="p-3">
                <div className="font-semibold text-sm truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-0.5 text-success"><Star className="w-3 h-3 fill-current" />{p.rating}</span>
                  <span>{p.distance}</span>
                  <span>{p.deliveryTime}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
