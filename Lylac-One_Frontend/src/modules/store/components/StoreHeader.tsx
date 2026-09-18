'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, Heart, Menu, Moon, Phone, Search, ShoppingCart, Sun, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const STORE_NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'medicines', label: 'Medicines' },
  { id: 'categories', label: 'Categories' },
  { id: 'health-products', label: 'Health Products' },
  { id: 'rx-upload', label: 'Prescription Upload' },
  { id: 'offers', label: 'Offers' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact Us' },
];

export function StoreHeader({ store, brand, theme, query, onQueryChange, cartCount, saved, onToggleSave, onToggleTheme, darkTheme, onOpenCart, onMarketplace, onScroll }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigateTo = (id) => {
    onScroll(id);
    setMobileMenu(false);
  };

  return (
    <>
      <div className="text-white text-xs" style={{ background: theme.dark }}>
        <div className="container flex items-center justify-between h-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {brand.contact}</span>
            <span className="hidden sm:flex items-center gap-1"><Clock className="w-3 h-3" /> {store.hours}</span>
          </div>
          <button onClick={onMarketplace} className="flex items-center gap-1 opacity-80 hover:opacity-100 transition">
            <ChevronLeft className="w-3 h-3" /> Back to Marketplace
          </button>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container flex items-center gap-3 h-16">
          <Link href={`/store/${store.slug}`} className="flex items-center gap-2.5 shrink-0">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg" style={{ background: theme.hero }}>{store.logo}</div>
            <div className="min-w-0">
              <div className="font-bold text-base md:text-lg leading-tight truncate" style={{ color: theme.primary }}>{store.name}</div>
              <div className="text-[10px] text-muted-foreground truncate leading-tight italic">{brand.slogan}</div>
            </div>
          </Link>

          <div className="flex-1 hidden md:block max-w-lg mx-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={`Search medicines at ${store.name.split(' ')[0]}...`} className="pl-10 h-10 rounded-full bg-muted/60 border-none focus-visible:ring-2" style={{ '--tw-ring-color': theme.primary } as React.CSSProperties} />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={onToggleSave} className="hidden sm:flex p-2 rounded-full hover:bg-muted" aria-label="Save pharmacy">
              <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button onClick={onToggleTheme} className="p-2 rounded-full hover:bg-muted" aria-label="Toggle theme">
              {darkTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={onOpenCart} className="relative p-2 rounded-full hover:bg-muted" aria-label="Open cart">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-[10px] text-white border-0" style={{ background: theme.secondary }}>{cartCount}</Badge>}
            </button>
            <Sheet open={mobileMenu} onOpenChange={setMobileMenu}>
              <SheetTrigger asChild><button className="md:hidden p-2 rounded-full hover:bg-muted" aria-label="Open store menu"><Menu className="w-5 h-5" /></button></SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="pt-4">
                  <div className="text-lg font-bold mb-4" style={{ color: theme.primary }}>{store.name}</div>
                  {STORE_NAV_ITEMS.map((item) => <button key={item.id} onClick={() => navigateTo(item.id)} className="block w-full text-left py-3 border-b border-border font-medium hover:text-primary">{item.label}</button>)}
                  <button onClick={onMarketplace} className="block w-full text-left py-3 mt-4 text-xs text-muted-foreground">Back to Marketplace</button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <nav className="hidden md:block border-t border-border">
          <div className="container flex items-center gap-1 h-11 overflow-x-auto no-scrollbar">
            {STORE_NAV_ITEMS.map((item) => <button key={item.id} onClick={() => onScroll(item.id)} className="px-3 py-1.5 rounded-full text-sm font-semibold transition whitespace-nowrap hover:bg-muted">{item.label}</button>)}
          </div>
        </nav>
        <div className="md:hidden container pb-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search medicines..." className="pl-10 h-10 rounded-full bg-muted/60 border-none" />
          </div>
        </div>
      </header>
    </>
  );
}
