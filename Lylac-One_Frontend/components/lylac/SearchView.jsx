'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, TrendingUp, Clock, ArrowLeft, SlidersHorizontal, Star, MapPin, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { MEDICINES, PHARMACIES, TRENDING_SEARCHES, RECENT_SEARCHES, CATEGORIES, HEALTH_CONCERNS } from '@/lib/constants/mockData';
import { MedicineCard, StoreCard, CategoryCard } from './Cards';

export function SearchView({ onBack, onAddToCart, cart, onOpenMedicine, onOpenStore }) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ rx: false, inStock: true, priceRange: [0, 500], discount: 0 });

  const getQty = (id) => cart.find((c) => c.id === id)?.qty || 0;

  const filteredMeds = useMemo(() => {
    return MEDICINES.filter((m) => {
      if (query && !`${m.name} ${m.brand} ${m.composition}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.rx && !m.rx) return false;
      if (filters.inStock && !m.inStock) return false;
      if (m.price < filters.priceRange[0] || m.price > filters.priceRange[1]) return false;
      if (m.discount < filters.discount) return false;
      return true;
    });
  }, [query, filters]);

  const filteredStores = PHARMACIES.filter((p) => !query || p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="pb-24 md:pb-8 min-h-screen bg-background">
      <div className="sticky top-0 z-30 bg-white border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search medicines, brands, stores…" className="pl-10 pr-9 h-11 rounded-full bg-muted/50 border-none focus-visible:ring-primary" />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"><X className="w-3.5 h-3.5" /></button>}
          </div>
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full shrink-0"><SlidersHorizontal className="w-4 h-4" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <Slider value={filters.priceRange} onValueChange={(v) => setFilters({ ...filters, priceRange: v })} min={0} max={500} step={10} />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground"><span>₹{filters.priceRange[0]}</span><span>₹{filters.priceRange[1]}</span></div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Availability</h4>
                  <label className="flex items-center gap-2 text-sm"><Checkbox checked={filters.inStock} onCheckedChange={(c) => setFilters({ ...filters, inStock: c })} /> In Stock only</label>
                  <label className="flex items-center gap-2 text-sm"><Checkbox checked={filters.rx} onCheckedChange={(c) => setFilters({ ...filters, rx: c })} /> Prescription Required</label>
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
                <Button onClick={() => setShowFilters(false)} className="w-full rounded-full">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {!query ? (
        <div className="container py-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3"><Clock className="w-4 h-4 text-muted-foreground" /><h3 className="font-semibold text-sm text-muted-foreground uppercase">Recent</h3></div>
            <div className="flex flex-wrap gap-2">{RECENT_SEARCHES.map((s) => (<button key={s} onClick={() => setQuery(s)} className="px-3 py-1.5 rounded-full bg-muted text-sm hover:bg-accent hover:text-primary">{s}</button>))}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-secondary" /><h3 className="font-semibold text-sm text-muted-foreground uppercase">Trending</h3></div>
            <div className="flex flex-wrap gap-2">{TRENDING_SEARCHES.map((s) => (<button key={s} onClick={() => setQuery(s)} className="px-3 py-1.5 rounded-full bg-accent text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground">{s}</button>))}</div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Popular Categories</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {CATEGORIES.slice(0, 12).map((c) => <CategoryCard key={c.id} category={c} onClick={() => setQuery(c.name)} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-4">
          <div className="text-sm text-muted-foreground mb-3">Showing {filteredMeds.length} medicines & {filteredStores.length} stores for "<span className="font-semibold text-foreground">{query}</span>"</div>
          {filteredStores.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Pharmacies</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredStores.slice(0, 4).map((p) => <StoreCard key={p.id} store={p} onClick={() => onOpenStore(p.id)} />)}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-semibold mb-3">Medicines ({filteredMeds.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredMeds.map((m) => (
                <MedicineCard key={m.id} medicine={m} cartQty={getQty(m.id)}
                  onAdd={() => onAddToCart(m, 1)} onInc={() => onAddToCart(m, 1)} onDec={() => onAddToCart(m, -1)}
                  onClick={() => onOpenMedicine(m.id)}
                />
              ))}
            </div>
            {filteredMeds.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto opacity-30 mb-3" />
                <p>No medicines found. Try a different search.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
