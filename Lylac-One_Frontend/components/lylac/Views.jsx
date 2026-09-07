'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Plus, Minus, Tag, ShieldCheck, Truck, Upload, MapPin, CreditCard, Check, Wallet, Package, Clock, ChevronRight, ShoppingCart, User, FileText, Bell, Heart, MapPinned, RefreshCw, HelpCircle, LogOut, Settings, Star, Percent, Users, FolderHeart, Pill, BookOpen, Gift, Info, Shield, Search as SearchIcon, SlidersHorizontal, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ADDRESSES, ORDERS, PHARMACIES, MEDICINES, CATEGORIES } from '@/lib/constants/mockData';
import { toast } from 'sonner';
import { MedicineCard, CategoryCard } from './Cards';
import * as Icons from 'lucide-react';

// =============== CART VIEW ===============
export function CartView({ cart, onAddToCart, onRemove, onNavigate, onBack }) {
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(null);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const mrpTotal = cart.reduce((s, i) => s + i.mrp * i.qty, 0);
  const productDiscount = mrpTotal - subtotal;
  const couponDiscount = applied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 299 ? 0 : 30;
  const total = subtotal - couponDiscount + delivery;
  const hasRx = cart.some((i) => i.rx);

  const applyCoupon = () => {
    if (['HEALTH25', 'FIRST100', 'FREEDEL', 'B2G1'].includes(coupon.toUpperCase())) {
      setApplied(coupon.toUpperCase());
      toast.success(`Coupon ${coupon.toUpperCase()} applied!`);
    } else toast.error('Invalid coupon code');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-4"><ShoppingCart className="w-12 h-12 text-primary" /></div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2 max-w-sm">Explore nearby pharmacies and add medicines to your cart.</p>
        <Button onClick={() => onNavigate('home')} size="lg" className="mt-6 rounded-full">Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="pb-32 md:pb-8">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">Cart ({cart.length})</h1>
        </div>
      </div>

      <div className="container py-4 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {hasRx && (
            <Card className="p-4 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center shrink-0"><Upload className="w-5 h-5 text-amber-700 dark:text-amber-300" /></div>
                <div className="flex-1">
                  <div className="font-semibold text-amber-900 dark:text-amber-200">Prescription required</div>
                  <div className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">Some items need a valid prescription. Upload during checkout.</div>
                </div>
                <Button size="sm" variant="outline" className="border-amber-300 dark:border-amber-700">Upload</Button>
              </div>
            </Card>
          )}

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">A</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{PHARMACIES[0].name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1"><Truck className="w-3 h-3" /> Delivery in {PHARMACIES[0].deliveryTime}</div>
              </div>
              <Badge variant="outline" className="text-success border-success">Open</Badge>
            </div>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-sm truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.pack}</div>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">₹{item.price * item.qty}</span>
                        <span className="text-xs text-muted-foreground line-through">₹{item.mrp * item.qty}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full">
                        <button onClick={() => onAddToCart(item, -1)} className="p-1.5"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-bold min-w-[16px] text-center">{item.qty}</span>
                        <button onClick={() => onAddToCart(item, 1)} className="p-1.5"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3"><Tag className="w-4 h-4 text-primary" /><h3 className="font-semibold">Apply Coupon</h3></div>
            <div className="flex gap-2">
              <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter code (try HEALTH25)" className="h-10" />
              <Button onClick={applyCoupon} variant="outline" className="rounded-full border-primary text-primary">Apply</Button>
            </div>
            {applied && <div className="mt-2 text-xs text-success font-semibold flex items-center gap-1"><Check className="w-3 h-3" /> {applied} applied — Extra 10% off</div>}
          </Card>
        </div>

        <div className="lg:sticky lg:top-20 h-fit">
          <Card className="p-5">
            <h3 className="font-bold text-lg mb-4">Bill Details</h3>
            <div className="space-y-2 text-sm">
              <Row label="Item total (MRP)" value={`₹${mrpTotal}`} />
              <Row label="Product discount" value={`- ₹${productDiscount}`} tone="success" />
              {applied && <Row label={`Coupon (${applied})`} value={`- ₹${couponDiscount}`} tone="success" />}
              <Row label="Delivery" value={delivery === 0 ? 'FREE' : `₹${delivery}`} tone={delivery === 0 ? 'success' : 'default'} />
              <Separator className="my-3" />
              <div className="flex items-center justify-between font-bold text-base"><span>To Pay</span><span>₹{total}</span></div>
              <div className="text-xs text-success font-medium flex items-center gap-1 mt-1"><Percent className="w-3 h-3" /> You saved ₹{productDiscount + couponDiscount}!</div>
            </div>
            <Button onClick={() => onNavigate('checkout')} size="lg" className="w-full mt-4 rounded-full bg-secondary hover:bg-secondary/90 font-semibold h-12">
              Proceed to Checkout <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
function Row({ label, value, tone = 'default' }) {
  const color = tone === 'success' ? 'text-success font-medium' : 'text-foreground';
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span className={color}>{value}</span></div>;
}

// =============== CHECKOUT ===============
export function CheckoutView({ cart, onBack, onNavigate, onPlaceOrder }) {
  const [address, setAddress] = useState(ADDRESSES[0].id);
  const [slot, setSlot] = useState('now');
  const [payment, setPayment] = useState('upi');
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 299 ? 0 : 30;
  const total = subtotal + delivery;
  const place = () => { toast.success('Order placed successfully! 🎉'); onPlaceOrder(); };

  return (
    <div className="pb-24 md:pb-8">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">Checkout</h1>
        </div>
      </div>
      <div className="container py-4 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5">
            <SectionTitle icon={MapPin} title="1. Delivery Address" />
            <RadioGroup value={address} onValueChange={setAddress} className="mt-3 space-y-2">
              {ADDRESSES.map((a) => (
                <label key={a.id} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer ${address === a.id ? 'border-primary bg-accent' : 'border-border'}`}>
                  <RadioGroupItem value={a.id} className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><span className="font-semibold">{a.label}</span>{a.default && <Badge variant="outline" className="text-[10px]">Default</Badge>}</div>
                    <div className="text-sm text-muted-foreground">{a.address}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.phone}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
            <Button variant="outline" className="mt-3 rounded-full w-full sm:w-auto">+ Add New Address</Button>
          </Card>
          <Card className="p-5">
            <SectionTitle icon={Clock} title="2. Delivery Slot" />
            <RadioGroup value={slot} onValueChange={setSlot} className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { v: 'now', l: 'Deliver Now', s: '15-25 min' },
                { v: 'evening', l: 'Today Evening', s: '5 PM - 8 PM' },
                { v: 'tomorrow', l: 'Tomorrow', s: '9 AM - 12 PM' },
              ].map((s) => (
                <label key={s.v} className={`p-3 rounded-xl border-2 cursor-pointer ${slot === s.v ? 'border-primary bg-accent' : 'border-border'}`}>
                  <RadioGroupItem value={s.v} className="sr-only" />
                  <div className="font-semibold text-sm">{s.l}</div>
                  <div className="text-xs text-muted-foreground">{s.s}</div>
                </label>
              ))}
            </RadioGroup>
          </Card>
          <Card className="p-5">
            <SectionTitle icon={Upload} title="3. Upload Prescription (optional)" />
            <div className="mt-3 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary hover:bg-accent/30 cursor-pointer transition">
              <Upload className="w-8 h-8 mx-auto text-primary mb-2" />
              <div className="font-medium text-sm">Click to upload or drag & drop</div>
              <div className="text-xs text-muted-foreground mt-0.5">JPG, PNG or PDF (max 5MB)</div>
            </div>
          </Card>
          <Card className="p-5">
            <SectionTitle icon={CreditCard} title="4. Payment Method" />
            <RadioGroup value={payment} onValueChange={setPayment} className="mt-3 space-y-2">
              {[
                { v: 'upi', l: 'UPI', s: 'Pay via GPay, PhonePe, Paytm', icon: Wallet },
                { v: 'card', l: 'Credit / Debit Card', s: 'Visa, Mastercard, RuPay', icon: CreditCard },
                { v: 'cod', l: 'Cash on Delivery', s: 'Pay when delivered', icon: Package },
              ].map((p) => {
                const I = p.icon;
                return (
                  <label key={p.v} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${payment === p.v ? 'border-primary bg-accent' : 'border-border'}`}>
                    <RadioGroupItem value={p.v} />
                    <I className="w-5 h-5 text-primary" />
                    <div className="flex-1"><div className="font-semibold text-sm">{p.l}</div><div className="text-xs text-muted-foreground">{p.s}</div></div>
                  </label>
                );
              })}
            </RadioGroup>
          </Card>
        </div>

        <div className="lg:sticky lg:top-20 h-fit">
          <Card className="p-5">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm max-h-48 overflow-y-auto pr-1">
              {cart.map((i) => (<div key={i.id} className="flex items-center justify-between text-sm"><span className="truncate flex-1 pr-2">{i.name} × {i.qty}</span><span className="font-medium">₹{i.price * i.qty}</span></div>))}
            </div>
            <Separator className="my-3" />
            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Delivery" value={delivery === 0 ? 'FREE' : `₹${delivery}`} tone={delivery === 0 ? 'success' : 'default'} />
            <Separator className="my-3" />
            <div className="flex items-center justify-between font-bold"><span>Total</span><span className="text-lg">₹{total}</span></div>
            <Button onClick={place} size="lg" className="w-full mt-4 rounded-full bg-secondary hover:bg-secondary/90 h-12 font-semibold">Place Order • ₹{total}</Button>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground justify-center"><ShieldCheck className="w-3 h-3" /> 100% Safe & Secure Payments</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
function SectionTitle({ icon: Icon, title }) {
  return <div className="flex items-center gap-2 font-semibold"><Icon className="w-4 h-4 text-primary" />{title}</div>;
}

// =============== ORDERS ===============
export function OrdersView({ onBack, onOpenOrder }) {
  return (
    <div className="pb-24 md:pb-8">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted md:hidden"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">My Orders</h1>
        </div>
      </div>
      <div className="container py-4 space-y-3 max-w-3xl">
        {ORDERS.map((o) => (
          <Card key={o.id} className="p-4 hover:shadow-card transition cursor-pointer" onClick={() => onOpenOrder(o.id)}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2"><span className="font-bold text-sm">{o.id}</span>
                  <Badge className={o.status === 'Delivered' ? 'bg-success text-white' : 'bg-secondary text-white'}>{o.status}</Badge></div>
                <div className="text-sm text-muted-foreground mt-0.5">{o.pharmacy} • {o.items} items</div>
                <div className="text-xs text-muted-foreground">{o.date}</div>
              </div>
              <div className="text-right"><div className="font-bold">₹{o.total}</div><ChevronRight className="w-4 h-4 text-muted-foreground ml-auto mt-1" /></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// =============== TRACKING ===============
export function OrderTrackingView({ orderId, onBack }) {
  const order = ORDERS.find((o) => o.id === orderId) || ORDERS[0];
  return (
    <div className="pb-24 md:pb-8">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">Track Order</h1>
        </div>
      </div>
      <div className="container py-4 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div><div className="text-xs text-muted-foreground">Order ID</div><div className="font-bold">{order.id}</div></div>
              <Badge className="bg-secondary text-white">{order.status}</Badge>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="h-56 bg-gradient-to-br from-teal-100 via-emerald-50 to-cyan-100 dark:from-teal-950 dark:via-emerald-950 dark:to-cyan-950 relative">
              <div className="absolute top-6 left-8 flex flex-col items-center"><div className="w-4 h-4 rounded-full bg-primary" /><div className="text-[10px] font-bold text-primary mt-1">Store</div></div>
              <div className="absolute bottom-6 right-8 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center pulse-ring"><Truck className="w-4 h-4 text-white" /></div>
                <div className="text-[10px] font-bold text-secondary mt-1">Your address</div>
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none"><path d="M 60 40 Q 300 100 500 200" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeDasharray="6 4" fill="none" /></svg>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="font-bold mb-4">Delivery Timeline</h3>
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-border" />
              {order.timeline.map((t, i) => (
                <div key={i} className="relative pb-4 last:pb-0">
                  <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 ${t.done ? 'bg-primary border-primary' : 'bg-background border-border'}`}>
                    {t.done && <Check className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />}
                  </div>
                  <div className={t.done ? 'font-semibold' : 'text-muted-foreground'}>{t.step}</div>
                  <div className="text-xs text-muted-foreground">{t.time}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div>
          {order.partner && (
            <Card className="p-5">
              <h3 className="font-bold mb-3">Delivery Partner</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{order.partner.name.charAt(0)}</div>
                <div className="flex-1"><div className="font-semibold">{order.partner.name}</div><div className="text-xs text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-current" /> {order.partner.rating} • {order.partner.vehicle}</div></div>
              </div>
              <Button variant="outline" className="w-full mt-4 rounded-full">Call Rider</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// =============== PROFILE ===============
export function ProfileView({ onBack, onNavigate }) {
  const groups = [
    {
      t: 'Orders & Prescriptions', items: [
        { icon: Package, label: 'My Orders', sub: '24 orders', route: 'orders' },
        { icon: Heart, label: 'Wishlist', sub: 'Saved medicines', route: 'wishlist' },
        { icon: FileText, label: 'Prescription History', sub: '4 uploads', route: 'prescription-history' },
        { icon: Upload, label: 'Uploaded Prescriptions', sub: 'Manage files', route: 'uploaded-prescriptions' },
        { icon: MapPinned, label: 'Saved Pharmacies', sub: '3 stores', route: 'saved-pharmacies' },
      ]
    },
    {
      t: 'Wallet & Rewards', items: [
        { icon: Wallet, label: 'Lylac Wallet', sub: '₹250 balance', route: 'wallet' },
        { icon: Award, label: 'Loyalty Points', sub: '1,240 pts • Gold', route: 'loyalty' },
        { icon: Percent, label: 'Coupons & Offers', sub: '4 active', route: 'coupons' },
        { icon: Gift, label: 'Refer & Earn', sub: 'Get ₹100', route: 'referral' },
      ]
    },
    {
      t: 'Account', items: [
        { icon: User, label: 'Edit Profile', sub: 'Name, email, phone', route: 'edit-profile' },
        { icon: MapPinned, label: 'Saved Addresses', sub: '2 saved', route: 'addresses' },
        { icon: Users, label: 'Family Members', sub: '3 profiles', route: 'family' },
        { icon: FolderHeart, label: 'Health Records', sub: 'Digital vault', route: 'health-records' },
        { icon: Bell, label: 'Notifications', sub: '2 new', route: 'notifications' },
        { icon: Pill, label: 'Medicine Reminders', sub: '3 active', route: 'reminders' },
        { icon: CreditCard, label: 'Payment Methods', sub: 'UPI, cards', route: 'payment-methods' },
      ]
    },
    {
      t: 'Support & More', items: [
        { icon: HelpCircle, label: 'Help Center', sub: 'FAQs & guides', route: 'help' },
        { icon: Info, label: 'Contact Support', sub: '24/7 available', route: 'contact' },
        { icon: Shield, label: 'Privacy Policy', route: 'privacy-policy' },
        { icon: BookOpen, label: 'Terms & Conditions', route: 'terms' },
        { icon: Sparkles, label: 'About Lylac One', sub: 'v1.0.0', route: 'about' },
        { icon: Settings, label: 'Settings', sub: 'Preferences', route: 'settings' },
      ]
    },
    {
      t: '', items: [
        { icon: LogOut, label: 'Logout', danger: true, route: 'logout' }
      ]
    }
  ];

  return (
    <div className="pb-24 md:pb-8">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted md:hidden"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">Profile</h1>
        </div>
      </div>
      <div className="container py-4 max-w-3xl">
        <Card className="p-5 gradient-hero text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">A</div>
            <div className="flex-1">
              <div className="text-xl font-bold">Arjun Sharma</div>
              <div className="text-sm opacity-90">+91 98765 43210 • arjun@email.com</div>
              <button onClick={() => onNavigate('profile-sub', 'edit-profile')} className="text-xs mt-1 underline opacity-90">Edit profile</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/20">
            <button onClick={() => onNavigate('orders')} className="text-center"><div className="text-lg font-bold">24</div><div className="text-[11px] opacity-90">Orders</div></button>
            <button className="text-center"><div className="text-lg font-bold">₹2,450</div><div className="text-[11px] opacity-90">Saved</div></button>
            <button onClick={() => onNavigate('profile-sub', 'loyalty')} className="text-center"><div className="text-lg font-bold">1,240</div><div className="text-[11px] opacity-90">Lylac Points</div></button>
          </div>
        </Card>

        {/* Quick action tiles */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4">
          {[
            { l: 'Wishlist', i: Heart, r: 'wishlist', c: 'bg-rose-100 dark:bg-rose-950 text-rose-600' },
            { l: 'Recent', i: Clock, r: 'recently-viewed', c: 'bg-blue-100 dark:bg-blue-950 text-blue-600' },
            { l: 'Compare', i: SlidersHorizontal, r: 'compare', c: 'bg-purple-100 dark:bg-purple-950 text-purple-600' },
            { l: 'Reminders', i: Pill, r: 'reminders', c: 'bg-amber-100 dark:bg-amber-950 text-amber-600' },
          ].map((q) => {
            const I = q.i;
            return (
              <button key={q.l} onClick={() => q.r === 'compare' || q.r === 'recently-viewed' || q.r === 'wishlist' ? onNavigate(q.r) : onNavigate('profile-sub', q.r)} className="p-3 rounded-xl border border-border hover:shadow-card transition flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-lg ${q.c} flex items-center justify-center`}><I className="w-4 h-4" /></div>
                <div className="text-xs font-semibold">{q.l}</div>
              </button>
            );
          })}
        </div>

        {groups.map((g, gi) => (
          <div key={gi} className="mt-6">
            {g.t && <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2 px-1">{g.t}</h3>}
            <Card className="divide-y divide-border overflow-hidden">
              {g.items.map((it, i) => {
                const I = it.icon;
                const handle = () => {
                  if (it.route === 'logout') { toast.success('Logged out'); onNavigate('home'); return; }
                  if (['orders', 'wishlist', 'settings'].includes(it.route)) return onNavigate(it.route);
                  onNavigate('profile-sub', it.route);
                };
                return (
                  <button key={i} onClick={handle} className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition text-left ${it.danger ? 'text-destructive' : ''}`}>
                    <div className={`w-9 h-9 rounded-lg ${it.danger ? 'bg-destructive/10 text-destructive' : 'bg-accent text-primary'} flex items-center justify-center`}><I className="w-4 h-4" /></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{it.label}</div>
                      {it.sub && <div className="text-xs text-muted-foreground">{it.sub}</div>}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                );
              })}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============== CATEGORIES ===============
export function CategoriesView({ onBack, onNavigate }) {
  return (
    <div className="pb-24 md:pb-8">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted md:hidden"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">All Categories</h1>
        </div>
      </div>
      <div className="container py-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => {
            const Icon = Icons[c.icon] || Icons.Pill;
            return (
              <button key={c.id} onClick={() => onNavigate('search')} className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-border hover:shadow-card transition bg-card">
                <div className={`w-14 h-14 rounded-xl ${c.color} flex items-center justify-center`}><Icon className="w-6 h-6" /></div>
                <span className="text-xs font-semibold text-center">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =============== LOCATION ===============
export function LocationView({ onBack, currentLocation, onSelect }) {
  const locations = ['Koramangala, Bengaluru', 'Indiranagar, Bengaluru', 'HSR Layout, Bengaluru', 'Whitefield, Bengaluru', 'MG Road, Bengaluru', 'Bellandur, Bengaluru'];
  return (
    <div className="pb-24 md:pb-8">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">Select Location</h1>
        </div>
      </div>
      <div className="container py-4 max-w-2xl">
        <Card className="p-4 border-primary/30 bg-accent/30">
          <button onClick={() => { onSelect('Koramangala, Bengaluru'); toast.success('Location detected'); }} className="w-full flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
            <div className="flex-1"><div className="font-semibold">Use current location</div><div className="text-xs text-muted-foreground">Using GPS</div></div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </Card>
        <div className="mt-6"><Input placeholder="Search for area, street, city…" className="h-11 rounded-full" /></div>
        <div className="mt-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2">Popular Locations</h3>
          <Card className="divide-y divide-border overflow-hidden">
            {locations.map((l) => (
              <button key={l} onClick={() => onSelect(l)} className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 text-left">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1 text-sm">{l}</span>
                {l === currentLocation && <Check className="w-4 h-4 text-success" />}
              </button>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// =============== STORE CATALOG (Amazon/Blinkit seller-style) ===============
export function StoreView({ storeId, onBack, onOpenMedicine, cart, onAddToCart, onNavigate, wishlist, toggleWishlist }) {
  const store = PHARMACIES.find((p) => p.id === storeId) || PHARMACIES[0];
  const [q, setQ] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [saved, setSaved] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ inStock: true, rx: false, priceRange: [0, 500], discount: 0, sort: 'popular' });

  const meds = MEDICINES.filter((m) => {
    if (q && !`${m.name} ${m.brand}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (activeCat !== 'all' && m.category !== activeCat) return false;
    if (filters.rx && !m.rx) return false;
    if (filters.inStock && !m.inStock) return false;
    if (m.price < filters.priceRange[0] || m.price > filters.priceRange[1]) return false;
    if (m.discount < filters.discount) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sort === 'low') return a.price - b.price;
    if (filters.sort === 'high') return b.price - a.price;
    if (filters.sort === 'discount') return b.discount - a.discount;
    if (filters.sort === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  // categories present in this store (mock: use all)
  const storeCats = [{ id: 'all', name: 'All', color: 'bg-primary text-primary-foreground' }, ...CATEGORIES.slice(0, 8)];

  return (
    <div className="pb-24 md:pb-8">
      {/* Store banner */}
      <div className="relative h-44 md:h-52">
        <img src={store.image} className="w-full h-full object-cover" alt={store.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/40" />
        <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-full bg-white/95 shadow-lg"><ArrowLeft className="w-5 h-5" /></button>
        <button onClick={() => { setSaved(!saved); toast.success(saved ? 'Removed from saved' : 'Pharmacy saved!'); }} className="absolute top-4 right-4 p-2 rounded-full bg-white/95 shadow-lg">
          <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
        <div className="absolute bottom-3 inset-x-0 container text-white">
          <div className="flex items-end gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white text-primary text-2xl font-bold flex items-center justify-center shadow-xl">{store.logo}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold truncate">{store.name}</h1>
              <div className="text-xs opacity-90 truncate">{store.address} • {store.hours}</div>
              <div className="flex items-center flex-wrap gap-2 mt-1 text-[11px]">
                <span className="flex items-center gap-1 bg-success px-2 py-0.5 rounded-full font-bold"><Star className="w-3 h-3 fill-current" />{store.rating}</span>
                <span className="flex items-center gap-1"><Truck className="w-3 h-3" />{store.deliveryTime}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{store.distance}</span>
                <span className={`px-2 py-0.5 rounded-full font-semibold ${store.isOpen ? 'bg-success/90' : 'bg-destructive/90'}`}>{store.isOpen ? 'Open' : 'Closed'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store info bar */}
      <div className="container mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { l: 'Delivery', v: store.deliveryTime, i: Clock },
          { l: 'Free above', v: `₹${store.minOrder}`, i: Truck },
          { l: 'Distance', v: store.distance, i: MapPin },
          { l: 'Reviews', v: `${store.reviews}+`, i: Star },
        ].map((s) => {
          const I = s.i;
          return (
            <div key={s.l} className="p-3 rounded-xl bg-muted/50 flex items-center gap-2 text-xs">
              <I className="w-4 h-4 text-primary shrink-0" />
              <div><div className="text-muted-foreground">{s.l}</div><div className="font-bold">{s.v}</div></div>
            </div>
          );
        })}
      </div>

      {/* Sticky search + categories */}
      <div className="sticky top-16 md:top-16 z-20 bg-background/95 backdrop-blur border-b border-border mt-4">
        <div className="container py-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search in ${store.name}…`} className="w-full h-11 pl-10 rounded-full bg-muted/70 border-none outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full shrink-0"><SlidersHorizontal className="w-4 h-4" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader><SheetTitle>Filters & Sort</SheetTitle></SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Sort by</h4>
                    <RadioGroup value={filters.sort} onValueChange={(v) => setFilters({ ...filters, sort: v })} className="space-y-2">
                      {[
                        { v: 'popular', l: 'Popularity' }, { v: 'low', l: 'Price: Low to High' }, { v: 'high', l: 'Price: High to Low' }, { v: 'discount', l: 'Discount' }, { v: 'rating', l: 'Customer Rating' },
                      ].map((s) => (<label key={s.v} className="flex items-center gap-2 text-sm"><RadioGroupItem value={s.v} />{s.l}</label>))}
                    </RadioGroup>
                  </div>
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
                  <Button onClick={() => setShowFilters(false)} className="w-full rounded-full">Apply</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="container pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {storeCats.map((c) => {
              const Icon = Icons[c.icon] || null;
              const active = activeCat === c.id;
              return (
                <button key={c.id} onClick={() => setActiveCat(c.id)} className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-accent'}`}>
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="text-sm text-muted-foreground mb-3">{meds.length} products {q && <>for "<span className="font-semibold text-foreground">{q}</span>"</>}</div>
        {meds.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <SearchIcon className="w-12 h-12 mx-auto opacity-30 mb-3" />
            <p>No products match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {meds.map((m) => (
              <MedicineCard key={m.id} medicine={m} onClick={() => onOpenMedicine(m.id)}
                onAdd={() => onAddToCart(m, 1)} onInc={() => onAddToCart(m, 1)} onDec={() => onAddToCart(m, -1)}
                cartQty={cart.find((c) => c.id === m.id)?.qty || 0}
                wishlisted={wishlist?.includes(m.id)}
                onToggleWish={() => toggleWishlist?.(m.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =============== ALL PHARMACIES ===============
export function AllPharmaciesView({ onBack, onOpenStore }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('distance');
  const pharmacies = [...PHARMACIES].filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'delivery') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      return parseFloat(a.distance) - parseFloat(b.distance);
    });
  const { StoreCard } = require('./Cards');
  return (
    <div className="pb-24 md:pb-8">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center gap-2 py-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold flex-1">Nearby Pharmacies</h1>
        </div>
        <div className="container pb-3 flex gap-2">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pharmacies…" className="h-10 rounded-full flex-1" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-full px-3 border border-border bg-background text-sm">
            <option value="distance">Nearest</option>
            <option value="rating">Highest Rated</option>
            <option value="delivery">Fastest Delivery</option>
          </select>
        </div>
      </div>
      <div className="container py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pharmacies.map((p) => <StoreCard key={p.id} store={p} onClick={() => onOpenStore(p.id)} />)}
        </div>
      </div>
    </div>
  );
}
