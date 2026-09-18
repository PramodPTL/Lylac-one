'use client';

import { motion } from 'framer-motion';
import { Award, ChevronRight, ShieldCheck, Star, Truck, Upload } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MedicineCard } from './Cards';
import { CATEGORIES } from '@/lib/constants/mockData';

export function StoreCatalogSections({ store, brand, details, theme, products, cartQty, onOpenMedicine, onAddToCart, wishlist, onToggleWishlist, onScroll }) {
  const bestSellers = products.slice(0, 6);
  const rxMeds = products.filter((medicine) => medicine.rx).slice(0, 5);
  const otcMeds = products.filter((medicine) => !medicine.rx).slice(0, 5);
  const personalCare = products.slice(0, 5);
  const babyCare = products.slice(0, 4);
  const devices = products.slice(0, 4);
  const newArrivals = [...products].reverse().slice(0, 5);

  return (
    <>
      <section id="home" className="relative overflow-hidden text-white" style={{ background: theme.hero }}>
        <div className="container py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold mb-4"><Award className="w-3.5 h-3.5" /> {brand.yearsInBusiness}+ years of trust • Est. {brand.established}</div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-balance">{brand.slogan}</h1>
            <p className="mt-3 text-white/90 md:text-lg max-w-lg">{brand.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => onScroll('medicines')} className="rounded-full h-12 px-6 font-bold bg-white text-black hover:bg-white/95" style={{ color: theme.primary }}>Shop Medicines <ChevronRight className="w-4 h-4 ml-1" /></Button>
              <Button size="lg" onClick={() => onScroll('rx-upload')} variant="outline" className="rounded-full h-12 px-6 border-white/40 bg-white/10 backdrop-blur hover:bg-white/20 text-white"><Upload className="w-4 h-4 mr-2" /> Upload Prescription</Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm"><span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Licensed Pharmacy</span><span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> {details.avgDelivery} delivery</span><span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> {store.rating} ★ ({store.reviews.toLocaleString()} reviews)</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="hidden md:block"><img src={brand.heroImage} alt={store.name} className="rounded-3xl shadow-2xl w-full h-80 object-cover" /></motion.div>
        </div>
      </section>

      <section id="offers" className="container mt-10"><SectionTitle theme={theme} title="Featured Offers" subtitle={`Exclusive at ${store.name}`} /><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[
        { title: 'Save 20% on Chronic Care', subtitle: 'Auto-refill your monthly meds', code: 'CHRONIC20', color: theme.primary },
        { title: 'Free Delivery Today', subtitle: `Above ₹${store.minOrder} • Order now`, code: 'FREEDEL', color: theme.secondary },
        { title: 'Buy 2 Get 1 — Vitamins', subtitle: 'On all wellness range', code: 'VIT21', color: theme.dark },
      ].map((offer) => <Card key={offer.code} className="p-5 text-white" style={{ background: offer.color }}><div className="text-xs uppercase font-bold opacity-90">Store Offer</div><div className="text-xl font-extrabold mt-1">{offer.title}</div><div className="text-sm opacity-90 mt-1">{offer.subtitle}</div><div className="mt-3 inline-flex bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold">CODE: {offer.code}</div></Card>)}</div></section>

      <section id="categories" className="container mt-12"><SectionTitle theme={theme} title="Shop by Category" subtitle={`Curated for ${store.name} customers`} /><div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">{CATEGORIES.slice(0, 8).map((category) => { const Icon = Icons[category.icon] || Icons.Pill; return <button key={category.id} onClick={() => onScroll('medicines')} className="flex flex-col items-center gap-2 group"><div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-105 transition" style={{ background: theme.accent, color: theme.primary }}><Icon className="w-7 h-7 md:w-8 md:h-8" /></div><span className="text-xs md:text-sm font-medium text-center leading-tight">{category.name}</span></button>; })}</div></section>

      <ProductSection id="medicines" title="Best-Selling Medicines" subtitle="Our most-loved products" items={bestSellers} theme={theme} cartQty={cartQty} onOpenMedicine={onOpenMedicine} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
      <ProductSection title="Prescription Medicines" subtitle="Requires valid Rx • Verified by our pharmacists" items={rxMeds} theme={theme} cartQty={cartQty} onOpenMedicine={onOpenMedicine} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
      <ProductSection title="Over-the-Counter (OTC)" subtitle="Everyday health essentials" items={otcMeds} theme={theme} cartQty={cartQty} onOpenMedicine={onOpenMedicine} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
      <section id="health-products" className="container mt-12 grid md:grid-cols-2 gap-6"><div><SectionTitle theme={theme} title="Personal Care" subtitle="Grooming & wellness essentials" small /><ProductRow items={personalCare} {...productProps(theme, cartQty, onOpenMedicine, onAddToCart, wishlist, onToggleWishlist)} /></div><div><SectionTitle theme={theme} title="Baby Care" subtitle="Safe products for little ones" small /><ProductRow items={babyCare} {...productProps(theme, cartQty, onOpenMedicine, onAddToCart, wishlist, onToggleWishlist)} /></div></section>
      <ProductSection title="Healthcare Devices" subtitle="BP monitors, glucose meters & more" items={devices} theme={theme} cartQty={cartQty} onOpenMedicine={onOpenMedicine} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
      <ProductSection title="New Arrivals" subtitle={`Just added at ${store.name}`} items={newArrivals} theme={theme} cartQty={cartQty} onOpenMedicine={onOpenMedicine} onAddToCart={onAddToCart} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />

      <section id="rx-upload" className="container mt-14"><div className="rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center" style={{ background: theme.accent }}><div><div className="text-xs uppercase font-bold tracking-wider" style={{ color: theme.primary }}>Doctor's Prescription?</div><h2 className="text-2xl md:text-3xl font-extrabold mt-2">Upload once. We handle the rest.</h2><p className="text-sm text-muted-foreground mt-2 max-w-md">Our licensed pharmacist verifies your prescription in under 10 minutes and prepares your order for delivery from {store.name}.</p><Button size="lg" className="rounded-full mt-4 text-white font-semibold" style={{ background: theme.primary }}><Upload className="w-4 h-4 mr-2" /> Upload Prescription</Button></div><div className="border-2 border-dashed rounded-2xl p-8 text-center bg-background" style={{ borderColor: theme.primary }}><Upload className="w-10 h-10 mx-auto mb-2" style={{ color: theme.primary }} /><div className="font-semibold">Drag & drop your prescription</div><div className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF · Max 5MB</div></div></div></section>
    </>
  );
}

function ProductSection({ id = undefined, title, subtitle, items, ...props }) { return <section id={id} className="container mt-12"><SectionTitle theme={props.theme} title={title} subtitle={subtitle} /><ProductRow items={items} {...productProps(props.theme, props.cartQty, props.onOpenMedicine, props.onAddToCart, props.wishlist, props.onToggleWishlist)} /></section>; }
function productProps(theme, cartQty, onOpenMedicine, onAddToCart, wishlist, onToggleWishlist) { return { theme, cartQty, onOpenMedicine, onAddToCart, wishlist, onToggleWishlist }; }
function ProductRow({ items, cartQty, onOpenMedicine, onAddToCart, wishlist, onToggleWishlist }) { return <><div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-3">{items.map((medicine) => <MedicineCard key={medicine.id} medicine={medicine} cartQty={cartQty(medicine.id)} onAdd={() => onAddToCart(medicine, 1)} onInc={() => onAddToCart(medicine, 1)} onDec={() => onAddToCart(medicine, -1)} onClick={() => onOpenMedicine(medicine.id)} wishlisted={wishlist.includes(medicine.id)} onToggleWish={() => onToggleWishlist(medicine.id)} />)}</div><div className="md:hidden flex gap-3 overflow-x-auto no-scrollbar pb-2">{items.map((medicine) => <MedicineCard key={medicine.id} medicine={medicine} cartQty={cartQty(medicine.id)} onAdd={() => onAddToCart(medicine, 1)} onInc={() => onAddToCart(medicine, 1)} onDec={() => onAddToCart(medicine, -1)} onClick={() => onOpenMedicine(medicine.id)} wishlisted={wishlist.includes(medicine.id)} onToggleWish={() => onToggleWishlist(medicine.id)} />)}</div></>; }
function SectionTitle({ title, subtitle, theme, small = false }) { return <div className="container mb-4"><h2 className={`${small ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} font-extrabold tracking-tight`} style={{ color: theme.dark || 'inherit' }}>{title}</h2>{subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}</div>; }
