'use client';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Zap, Plus, Minus, Truck, ShieldCheck, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

export function StoreCard({ store, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="text-left w-full bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition group"
    >
      <div className="relative h-32 sm:h-36 overflow-hidden">
        <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {store.freeDelivery && (
            <Badge className="bg-success text-white border-0 gap-1 shadow-sm">
              <Truck className="w-3 h-3" /> FREE
            </Badge>
          )}
          {!store.isOpen && <Badge variant="destructive" className="shadow-sm">Closed</Badge>}
        </div>
        <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur px-2 py-0.5 rounded-full text-xs font-bold text-primary shadow-sm">
          {store.discount}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm truncate">{store.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5 text-success font-medium">
                <Star className="w-3 h-3 fill-current" /> {store.rating}
              </span>
              <span>•</span>
              <span>{store.reviews}+ reviews</span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-3 h-3" />{store.distance}</span>
          <span className="flex items-center gap-1 font-semibold text-primary"><Clock className="w-3 h-3" />{store.deliveryTime}</span>
        </div>
        <div className="mt-2 pt-2 border-t border-border text-[11px] text-muted-foreground flex items-center justify-between">
          <span>Min order ₹{store.minOrder}</span>
          <span className={store.isOpen ? 'text-success font-medium' : 'text-destructive font-medium'}>
            {store.isOpen ? '● Open Now' : '● Closed'}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export function MedicineCard({ medicine, onAdd, onClick, cartQty = 0, onInc, onDec, layout = 'grid', wishlisted = false, onToggleWish }) {
  if (layout === 'row') {
    return (
      <div className="flex gap-3 bg-card border border-border rounded-xl p-3 hover:shadow-soft transition">
        <button onClick={onClick} className="shrink-0">
          <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden">
            <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
          </div>
        </button>
        <div className="flex-1 min-w-0" onClick={onClick} role="button">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-semibold text-sm truncate">{medicine.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{medicine.brand} • {medicine.pack}</p>
            </div>
            {medicine.rx && <Badge variant="secondary" className="text-[9px] px-1.5 py-0 shrink-0">Rx</Badge>}
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-bold">₹{medicine.price}</span>
            <span className="text-xs text-muted-foreground line-through">₹{medicine.mrp}</span>
            <span className="text-xs text-success font-semibold">{medicine.discount}% off</span>
          </div>
        </div>
        <div className="flex items-center">
          {cartQty > 0 ? (
            <div className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full">
              <button onClick={onDec} className="p-1.5 hover:bg-primary/80 rounded-l-full"><Minus className="w-3 h-3" /></button>
              <span className="text-sm font-bold min-w-[20px] text-center">{cartQty}</span>
              <button onClick={onInc} className="p-1.5 hover:bg-primary/80 rounded-r-full"><Plus className="w-3 h-3" /></button>
            </div>
          ) : (
            <Button onClick={onAdd} variant="outline" size="sm" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              ADD
            </Button>
          )}
        </div>
      </div>
    );
  }
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition min-w-[170px] w-[170px] sm:w-auto">
      <div onClick={onClick} role="button" tabIndex={0} className="block w-full text-left cursor-pointer">
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
          {medicine.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-secondary text-white border-0 shadow-sm">{medicine.discount}% OFF</Badge>
          )}
          {medicine.rx && <Badge variant="outline" className="absolute top-2 right-2 bg-white/90 text-xs">Rx</Badge>}
          {onToggleWish && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggleWish(); }}
              className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur transition ${wishlisted ? 'bg-rose-500 text-white' : 'bg-white/90 hover:bg-white text-muted-foreground hover:text-rose-500'}`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        <div className="p-3">
          <h4 className="font-semibold text-sm line-clamp-1">{medicine.name}</h4>
          <p className="text-[11px] text-muted-foreground line-clamp-1">{medicine.brand}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{medicine.pack}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-bold text-sm">₹{medicine.price}</span>
            <span className="text-xs text-muted-foreground line-through">₹{medicine.mrp}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[11px] text-success font-medium">
            <Star className="w-3 h-3 fill-current" /> {medicine.rating} ({medicine.reviews})
          </div>
        </div>
      </div>
      <div className="px-3 pb-3">
        {cartQty > 0 ? (
          <div className="flex items-center justify-between bg-primary text-primary-foreground rounded-full w-full">
            <button onClick={onDec} className="p-2 hover:bg-primary/80 rounded-l-full"><Minus className="w-3.5 h-3.5" /></button>
            <span className="text-sm font-bold">{cartQty}</span>
            <button onClick={onInc} className="p-2 hover:bg-primary/80 rounded-r-full"><Plus className="w-3.5 h-3.5" /></button>
          </div>
        ) : (
          <Button onClick={onAdd} variant="outline" size="sm" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
            ADD
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export function CategoryCard({ category, onClick }) {
  const Icon = Icons[category.icon] || Icons.Pill;
  return (
    <motion.button whileHover={{ y: -2 }} onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${category.color} flex items-center justify-center transition group-hover:scale-105 shadow-soft`}>
        <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>
      <span className="text-xs sm:text-sm font-medium text-center max-w-[80px] leading-tight">{category.name}</span>
    </motion.button>
  );
}

export function HealthConcernCard({ concern, onClick }) {
  return (
    <motion.button whileHover={{ scale: 1.03 }} onClick={onClick} className="bg-gradient-to-br from-accent to-white border border-border rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 min-w-[110px] hover:shadow-card transition">
      <div className="text-3xl">{concern.emoji}</div>
      <span className="text-xs font-semibold text-center">{concern.name}</span>
    </motion.button>
  );
}

export function OfferCard({ offer }) {
  return (
    <div style={{ background: offer.bg }} className="rounded-2xl p-5 text-white min-w-[260px] w-[260px] shadow-glow">
      <div className="text-xs font-semibold opacity-90 uppercase tracking-wider">Limited Time</div>
      <div className="text-2xl font-extrabold mt-1">{offer.title}</div>
      <div className="text-sm opacity-90 mt-0.5">{offer.subtitle}</div>
      <div className="mt-3 inline-flex items-center gap-1 bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold">
        <Zap className="w-3 h-3" /> CODE: {offer.code}
      </div>
    </div>
  );
}
