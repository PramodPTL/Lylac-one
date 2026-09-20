'use client';

import { Search, ShoppingCart, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MedicineCard } from './Cards';

export function StoreSearchResults({ query, results, store, theme, cartQty, onAddToCart, onOpenMedicine, wishlist, onToggleWishlist, onClear, onSearchAll, onNotify }) {
  if (!query) return null;
  return <div className="container mt-4"><div className="flex items-center justify-between mb-3"><h2 className="font-bold">{results.length} results for "<span style={{ color: theme.primary }}>{query}</span>"</h2><button onClick={onClear} className="text-sm text-muted-foreground flex items-center gap-1"><X className="w-3 h-3" /> Clear</button></div>{results.length === 0 ? <div className="rounded-2xl p-6 text-center" style={{ background: theme.accent }}><Search className="w-8 h-8 mx-auto mb-2" style={{ color: theme.primary }} /><p className="font-semibold">No medicine found at {store.name}.</p><div className="mt-4 flex justify-center gap-2"><Button onClick={onNotify} style={{ background: theme.primary }} className="text-white">Notify me</Button><Button variant="outline" onClick={onSearchAll}>Search all pharmacies</Button></div></div> : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">{results.slice(0, 15).map((medicine) => <MedicineCard key={medicine.id} medicine={medicine} cartQty={cartQty(medicine.id)} onAdd={() => onAddToCart(medicine, 1)} onInc={() => onAddToCart(medicine, 1)} onDec={() => onAddToCart(medicine, -1)} onClick={() => onOpenMedicine(medicine.id)} wishlisted={wishlist.includes(medicine.id)} onToggleWish={() => onToggleWishlist(medicine.id)} />)}</div>}</div>;
}

export function StoreFloatingActions({ store, brand, theme, cartCount, onOpenCart }) {
  return <>{cartCount > 0 && <div className="fixed bottom-4 inset-x-4 md:hidden z-30"><button onClick={onOpenCart} className="w-full text-white rounded-full h-12 shadow-glow flex items-center justify-between px-5 font-semibold" style={{ background: theme.primary }}><span className="flex items-center gap-2"><ShoppingCart className="w-4 h-4" />{cartCount} items · From {store.name.split(' ')[0]}</span><span>View Cart →</span></button></div>}<a href={`https://wa.me/${brand.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" aria-label="Contact store on WhatsApp" className="fixed bottom-20 md:bottom-6 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-glow z-30" style={{ background: '#25D366' }}><span className="text-white font-bold text-xs">WA</span></a></>;
}

export function CartSwitchDialog({ pendingItem, cart, store, theme, onClose, onConfirm }) {
  return <AlertDialog open={!!pendingItem} onOpenChange={(open) => !open && onClose()}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Replace items in cart?</AlertDialogTitle><AlertDialogDescription>Your cart contains items from <span className="font-semibold text-foreground">{cart[0]?.storeName}</span>. Add this item from <span className="font-semibold text-foreground">{store.name}</span> and clear the existing cart?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep existing</AlertDialogCancel><AlertDialogAction onClick={onConfirm} style={{ background: theme.primary }}>Replace & Add</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>;
}
