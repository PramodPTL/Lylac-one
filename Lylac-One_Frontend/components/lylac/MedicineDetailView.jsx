'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Star, ShieldCheck, Truck, RefreshCw, ChevronRight, Info, AlertTriangle, Pill, Heart, Share2, Store as StoreIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MEDICINES, PHARMACIES } from '@/lib/constants/mockData';
import { MedicineCard } from './Cards';
import { useProducts } from '@/hooks/useCatalog';

export function MedicineDetailView({ medicineId, onBack, cart, onAddToCart, onNavigate, onOpenMedicine, wishlist, toggleWishlist, addToCompare, compare }) {
  // Try to find in live products first (backend id is numeric), fall back to mock
  const liveProductsQ = useProducts({ count: 30 });
  const liveList = liveProductsQ.data?.products || [];
  const medicine = liveList.find((m) => String(m.id) === String(medicineId))
    || MEDICINES.find((m) => m.id === medicineId)
    || liveList[0]
    || MEDICINES[0];
  const qty = cart.find((c) => c.id === medicine.id)?.qty || 0;
  const alternatives = MEDICINES.filter((m) => m.id !== medicine.id && m.category === medicine.category).slice(0, 4);
  const [selectedStore, setSelectedStore] = useState(PHARMACIES[0].id);
  const isWishlisted = wishlist?.includes(medicine.id);
  const inCompare = compare?.includes(medicine.id);

  return (
    <div className="pb-28 md:pb-8">
      <div className="sticky top-0 z-30 bg-white border-b border-border">
        <div className="container flex items-center justify-between py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
          <div className="flex items-center gap-1">
            <button onClick={() => toggleWishlist?.(medicine.id)} className="p-2 rounded-full hover:bg-muted" aria-label="Wishlist">
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button onClick={() => addToCompare?.(medicine.id)} className={`p-2 rounded-full hover:bg-muted ${inCompare ? 'text-primary' : ''}`} aria-label="Compare">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
            <button className="p-2 rounded-full hover:bg-muted"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="container py-6 grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square rounded-2xl bg-muted overflow-hidden shadow-soft">
            <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
          </div>
          <div className="mt-3 flex gap-2">
            {[medicine.image, medicine.image, medicine.image].map((img, i) => (
              <div key={i} className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-primary' : 'border-border'}`}>
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        </div>

        <div>
          {medicine.rx && <Badge variant="secondary" className="mb-2 gap-1"><Pill className="w-3 h-3" /> Prescription Required</Badge>}
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{medicine.name}</h1>
          <p className="text-muted-foreground mt-1">by <span className="text-foreground font-medium">{medicine.brand}</span> • {medicine.manufacturer}</p>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded text-success text-sm font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" /> {medicine.rating}
            </div>
            <span className="text-sm text-muted-foreground">{medicine.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="mt-4 p-4 rounded-2xl border border-border bg-accent/30">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold">₹{medicine.price}</span>
              <span className="text-muted-foreground line-through">₹{medicine.mrp}</span>
              <Badge className="bg-success text-white">{medicine.discount}% OFF</Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">Inclusive of all taxes • {medicine.pack}</div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center p-3 bg-muted rounded-xl"><ShieldCheck className="w-5 h-5 text-primary mb-1" /><span className="font-medium">100% Genuine</span></div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-xl"><Truck className="w-5 h-5 text-primary mb-1" /><span className="font-medium">Fast Delivery</span></div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-xl"><RefreshCw className="w-5 h-5 text-primary mb-1" /><span className="font-medium">Easy Return</span></div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><StoreIcon className="w-4 h-4" /> Available at nearby stores</h4>
            <div className="space-y-2">
              {PHARMACIES.slice(0, 3).map((p) => (
                <button key={p.id} onClick={() => setSelectedStore(p.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition text-left ${selectedStore === p.id ? 'border-primary bg-accent' : 'border-border hover:bg-muted/50'}`}>
                  <div className={`w-2 h-2 rounded-full ${selectedStore === p.id ? 'bg-primary' : 'bg-border'}`} />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-3 h-3" />{p.distance} • <Clock className="w-3 h-3" />{p.deliveryTime}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">₹{medicine.price}</div>
                    <div className="text-[10px] text-success font-medium">In stock</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8">
        <Tabs defaultValue="uses">
          <TabsList className="w-full justify-start overflow-x-auto no-scrollbar h-auto bg-transparent border-b border-border rounded-none p-0">
            {[
              { v: 'uses', l: 'Uses' }, { v: 'composition', l: 'Composition' }, { v: 'dosage', l: 'Dosage' }, { v: 'side', l: 'Side Effects' }, { v: 'reviews', l: 'Reviews' },
            ].map((t) => (
              <TabsTrigger key={t.v} value={t.v} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 font-semibold text-sm">
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="uses" className="pt-4"><InfoBlock icon={Info} title="Medical Uses" text={medicine.uses} /></TabsContent>
          <TabsContent value="composition" className="pt-4"><InfoBlock icon={Pill} title="Active Ingredients" text={medicine.composition} /></TabsContent>
          <TabsContent value="dosage" className="pt-4"><InfoBlock icon={Info} title="Recommended Dosage" text={medicine.dosage} /></TabsContent>
          <TabsContent value="side" className="pt-4"><InfoBlock icon={AlertTriangle} title="Possible Side Effects" text={medicine.sideEffects} tone="warning" /></TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <div className="grid gap-3">
              {[{ n: 'Priya S.', r: 5, t: 'Works great, fast delivery from nearby store!' }, { n: 'Rahul M.', r: 4, t: 'Genuine product. Packaging was excellent.' }].map((rv, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{rv.n}</div>
                    <div className="flex items-center gap-0.5 text-amber-500">{[...Array(rv.r)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{rv.t}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="container mt-10">
        <h3 className="text-xl font-bold mb-4">Alternatives & Related</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {alternatives.map((m) => (
            <MedicineCard key={m.id} medicine={m} onClick={() => onOpenMedicine(m.id)} onAdd={() => onAddToCart(m, 1)} cartQty={cart.find((c) => c.id === m.id)?.qty || 0}
              onInc={() => onAddToCart(m, 1)} onDec={() => onAddToCart(m, -1)} />
          ))}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-16 md:bottom-0 inset-x-0 z-30 bg-white border-t border-border p-3 shadow-lg">
        <div className="container flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-lg font-bold">₹{medicine.price} <span className="text-xs text-muted-foreground line-through font-normal">₹{medicine.mrp}</span></div>
          </div>
          {qty > 0 ? (
            <>
              <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-1">
                <button onClick={() => onAddToCart(medicine, -1)} className="p-2">−</button>
                <span className="font-bold min-w-[24px] text-center">{qty}</span>
                <button onClick={() => onAddToCart(medicine, 1)} className="p-2">+</button>
              </div>
              <Button size="lg" onClick={() => onNavigate('cart')} className="rounded-full flex-1 bg-secondary hover:bg-secondary/90">Go to Cart</Button>
            </>
          ) : (
            <>
              <Button size="lg" variant="outline" onClick={() => onAddToCart(medicine, 1)} className="rounded-full border-primary text-primary flex-1">Add to Cart</Button>
              <Button size="lg" onClick={() => { onAddToCart(medicine, 1); onNavigate('cart'); }} className="rounded-full bg-secondary hover:bg-secondary/90 flex-1">Buy Now</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ icon: Icon, title, text, tone = 'default' }) {
  return (
    <div className={`p-4 rounded-2xl border ${tone === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-border bg-muted/30'}`}>
      <div className="flex items-center gap-2 font-semibold text-sm mb-2"><Icon className={`w-4 h-4 ${tone === 'warning' ? 'text-amber-600' : 'text-primary'}`} />{title}</div>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
