'use client';
import { useState } from 'react';
import { Header } from './SettingsView';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Plus, Home, Briefcase, Trash2, Edit, CreditCard, Wallet, Star, Users, FileText, Bell, HelpCircle, Phone, Mail, MessageCircle, FileCheck, Gift, Percent, Share2, Copy, Upload, Calendar, Clock, Pill, Heart, ChevronRight, Award, Camera } from 'lucide-react';
import { ADDRESSES, MEDICINES, PHARMACIES, ORDERS } from '@/lib/constants/mockData';
import { toast } from 'sonner';
import { MedicineCard } from './Cards';

// ----- Sub view mapping helper -----
export function ProfileSubView({ view, onBack, onNavigate, wishlist, addToCart, cart, removeFromWishlist }) {
  switch (view) {
    case 'edit-profile': return <EditProfileView onBack={onBack} />;
    case 'addresses': return <AddressesView onBack={onBack} />;
    case 'wishlist': return <WishlistView onBack={onBack} wishlist={wishlist} addToCart={addToCart} cart={cart} removeFromWishlist={removeFromWishlist} onOpenMedicine={(id) => onNavigate('medicine', id)} />;
    case 'prescription-history': return <PrescriptionHistoryView onBack={onBack} />;
    case 'uploaded-prescriptions': return <UploadedPrescriptionsView onBack={onBack} />;
    case 'saved-pharmacies': return <SavedPharmaciesView onBack={onBack} onOpenStore={(id) => onNavigate('store', id)} />;
    case 'notifications': return <NotificationsView onBack={onBack} />;
    case 'payment-methods': return <PaymentMethodsView onBack={onBack} />;
    case 'wallet': return <WalletView onBack={onBack} />;
    case 'loyalty': return <LoyaltyView onBack={onBack} />;
    case 'family': return <FamilyView onBack={onBack} />;
    case 'health-records': return <HealthRecordsView onBack={onBack} />;
    case 'reminders': return <RemindersView onBack={onBack} />;
    case 'coupons': return <CouponsView onBack={onBack} />;
    case 'referral': return <ReferralView onBack={onBack} />;
    case 'help': return <HelpView onBack={onBack} onNavigate={onNavigate} />;
    case 'contact': return <ContactView onBack={onBack} />;
    case 'privacy-policy': return <PolicyView onBack={onBack} title="Privacy Policy" />;
    case 'terms': return <PolicyView onBack={onBack} title="Terms & Conditions" />;
    case 'about': return <AboutView onBack={onBack} />;
    default: return <div className="p-8 text-center">Not found</div>;
  }
}

function EditProfileView({ onBack }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Edit Profile" onBack={onBack} />
      <div className="container py-4 max-w-2xl">
        <div className="flex flex-col items-center py-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-glow">A</div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border border-border"><Camera className="w-4 h-4 text-primary" /></button>
          </div>
          <div className="text-sm text-muted-foreground mt-2">Change photo</div>
        </div>
        <Card className="p-5 space-y-3">
          <FieldRow label="Full Name" defaultValue="Arjun Sharma" />
          <FieldRow label="Email" defaultValue="arjun@email.com" type="email" />
          <FieldRow label="Phone" defaultValue="+91 98765 43210" />
          <FieldRow label="Date of Birth" defaultValue="1995-08-15" type="date" />
          <FieldRow label="Blood Group" defaultValue="O+" />
          <FieldRow label="Emergency Contact" defaultValue="+91 98765 12345" />
          <Button className="rounded-full w-full" onClick={() => toast.success('Profile saved')}>Save Changes</Button>
        </Card>
      </div>
    </div>
  );
}

function AddressesView({ onBack }) {
  const [addrs] = useState(ADDRESSES);
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Saved Addresses" onBack={onBack} />
      <div className="container py-4 max-w-2xl space-y-3">
        {addrs.map((a) => (
          <Card key={a.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent text-primary flex items-center justify-center">{a.label === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><span className="font-bold">{a.label}</span>{a.default && <Badge variant="outline" className="text-[10px]">Default</Badge>}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{a.address}</div>
                <div className="text-xs text-muted-foreground">{a.phone}</div>
              </div>
              <div className="flex flex-col gap-1">
                <button className="p-2 hover:bg-muted rounded"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-2 hover:bg-muted rounded"><Trash2 className="w-4 h-4 text-destructive" /></button>
              </div>
            </div>
          </Card>
        ))}
        <Button variant="outline" className="w-full rounded-full h-12 border-dashed border-2 gap-2"><Plus className="w-4 h-4" /> Add New Address</Button>
      </div>
    </div>
  );
}

function WishlistView({ onBack, wishlist, addToCart, cart, removeFromWishlist, onOpenMedicine }) {
  const items = MEDICINES.filter((m) => wishlist.includes(m.id));
  return (
    <div className="pb-24 md:pb-8">
      <Header title={`Wishlist (${items.length})`} onBack={onBack} />
      <div className="container py-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center mb-3"><Heart className="w-10 h-10 text-primary" /></div>
            <h3 className="font-bold text-lg">Your wishlist is empty</h3>
            <p className="text-sm text-muted-foreground mt-1">Tap the heart on medicines to save them</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {items.map((m) => (
              <div key={m.id} className="relative">
                <MedicineCard medicine={m} cartQty={cart.find((c) => c.id === m.id)?.qty || 0}
                  onAdd={() => addToCart(m, 1)} onInc={() => addToCart(m, 1)} onDec={() => addToCart(m, -1)} onClick={() => onOpenMedicine(m.id)} />
                <button onClick={() => removeFromWishlist(m.id)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-destructive hover:text-white transition">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PrescriptionHistoryView({ onBack }) {
  const items = [
    { d: '4 Jun 2025', dr: 'Dr. Meera Iyer', for: 'Fever & Cold', status: 'Verified' },
    { d: '28 May 2025', dr: 'Dr. Rakesh Menon', for: 'Diabetes refill', status: 'Verified' },
    { d: '12 May 2025', dr: 'Dr. Ananya Sen', for: 'Skin condition', status: 'Pending' },
    { d: '2 May 2025', dr: 'Dr. Vikram Rao', for: 'BP checkup', status: 'Verified' },
  ];
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Prescription History" onBack={onBack} />
      <div className="container py-4 max-w-2xl space-y-3">
        {items.map((p, i) => (
          <Card key={i} className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent text-primary flex items-center justify-center"><FileText className="w-4 h-4" /></div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{p.for}</div>
              <div className="text-xs text-muted-foreground">{p.dr} • {p.d}</div>
            </div>
            <Badge className={p.status === 'Verified' ? 'bg-success text-white' : 'bg-amber-500 text-white'}>{p.status}</Badge>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function UploadedPrescriptionsView({ onBack }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Uploaded Prescriptions" onBack={onBack} />
      <div className="container py-4 max-w-3xl">
        <Card className="p-6 border-2 border-dashed border-primary bg-accent/30 text-center cursor-pointer hover:bg-accent transition">
          <Upload className="w-8 h-8 mx-auto text-primary mb-2" />
          <div className="font-semibold">Upload New Prescription</div>
          <div className="text-xs text-muted-foreground">JPG, PNG or PDF (max 5MB)</div>
        </Card>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {[1,2,3,4].map((i) => (
            <Card key={i} className="overflow-hidden group cursor-pointer">
              <div className="aspect-square bg-muted flex items-center justify-center"><FileText className="w-12 h-12 text-muted-foreground/40" /></div>
              <div className="p-3">
                <div className="font-medium text-sm">Prescription_{i}.pdf</div>
                <div className="text-xs text-muted-foreground">2 Jun 2025</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function SavedPharmaciesView({ onBack, onOpenStore }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Saved Pharmacies" onBack={onBack} />
      <div className="container py-4 max-w-3xl space-y-3">
        {PHARMACIES.slice(0, 3).map((p) => (
          <Card key={p.id} className="p-3 flex items-center gap-3 hover:shadow-card cursor-pointer" onClick={() => onOpenStore(p.id)}>
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0"><img src={p.image} className="w-full h-full object-cover" alt="" /></div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{p.name}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                <span className="text-success font-medium flex items-center gap-0.5"><Star className="w-3 h-3 fill-current" />{p.rating}</span>
                <span>{p.distance}</span><span>•</span><span>{p.deliveryTime}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function NotificationsView({ onBack }) {
  const notifs = [
    { t: 'Order Out for Delivery', s: 'Your order ORD-2451 will arrive in 20 min', time: '5m ago', new: true, icon: '🚚', bg: 'bg-blue-50 dark:bg-blue-950' },
    { t: 'Refill Reminder', s: 'Time to refill your Glycomet 500mg', time: '2h ago', new: true, icon: '💊', bg: 'bg-amber-50 dark:bg-amber-950' },
    { t: 'FLAT 25% OFF', s: 'On all Vitamins today only', time: '5h ago', icon: '🎁', bg: 'bg-purple-50 dark:bg-purple-950' },
    { t: 'Prescription verified', s: 'Dr. Meera Iyer\'s prescription approved', time: '1d ago', icon: '✅', bg: 'bg-emerald-50 dark:bg-emerald-950' },
    { t: 'You earned 50 Lylac Points', s: 'For your recent order ORD-2440', time: '3d ago', icon: '⭐', bg: 'bg-teal-50 dark:bg-teal-950' },
  ];
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Notifications" onBack={onBack} right={<button className="text-xs text-primary font-semibold">Mark all read</button>} />
      <div className="container py-4 max-w-2xl space-y-2">
        {notifs.map((n, i) => (
          <Card key={i} className={`p-4 flex items-start gap-3 ${n.new ? 'border-l-4 border-l-primary' : ''}`}>
            <div className={`w-10 h-10 rounded-full ${n.bg} flex items-center justify-center text-lg`}>{n.icon}</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{n.t}</div>
              <div className="text-xs text-muted-foreground">{n.s}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{n.time}</div>
            </div>
            {n.new && <span className="w-2 h-2 rounded-full bg-primary mt-2" />}
          </Card>
        ))}
      </div>
    </div>
  );
}

function PaymentMethodsView({ onBack }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Payment Methods" onBack={onBack} />
      <div className="container py-4 max-w-2xl space-y-3">
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2">UPI</h3>
          <Card className="divide-y">
            {[{ n: 'arjun@okhdfcbank', b: 'HDFC Bank' }, { n: 'arjun.sharma@paytm', b: 'Paytm' }].map((u) => (
              <div key={u.n} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center"><Wallet className="w-4 h-4" /></div>
                <div className="flex-1"><div className="font-medium text-sm">{u.n}</div><div className="text-xs text-muted-foreground">{u.b}</div></div>
                <Trash2 className="w-4 h-4 text-destructive cursor-pointer" />
              </div>
            ))}
          </Card>
        </div>
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-2 mt-4">Cards</h3>
          <Card className="divide-y">
            {[{ n: '**** 4242', b: 'HDFC Visa Credit' }, { n: '**** 5589', b: 'ICICI Mastercard Debit' }].map((c) => (
              <div key={c.n} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center"><CreditCard className="w-4 h-4" /></div>
                <div className="flex-1"><div className="font-medium text-sm">{c.n}</div><div className="text-xs text-muted-foreground">{c.b}</div></div>
                <Trash2 className="w-4 h-4 text-destructive cursor-pointer" />
              </div>
            ))}
          </Card>
        </div>
        <Button variant="outline" className="w-full rounded-full h-12 border-dashed border-2 gap-2"><Plus className="w-4 h-4" /> Add New Payment</Button>
      </div>
    </div>
  );
}

function WalletView({ onBack }) {
  const txns = [
    { t: 'Order ORD-2440', a: -1245, d: '28 May' },
    { t: 'Cashback', a: +50, d: '28 May' },
    { t: 'Wallet Recharge', a: +500, d: '15 May' },
    { t: 'Referral Bonus', a: +100, d: '10 May' },
  ];
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Lylac Wallet" onBack={onBack} />
      <div className="container py-4 max-w-2xl">
        <Card className="p-6 gradient-hero text-white">
          <div className="text-xs uppercase opacity-90 font-bold">Total Balance</div>
          <div className="text-4xl font-extrabold mt-1">₹250.00</div>
          <div className="text-sm opacity-90 mt-1">Instant refunds • No expiry</div>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/95">Add Money</Button>
            <Button variant="outline" className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20">Withdraw</Button>
          </div>
        </Card>
        <div className="mt-6">
          <h3 className="font-bold mb-3">Recent Transactions</h3>
          <Card className="divide-y">
            {txns.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div><div className="font-medium text-sm">{t.t}</div><div className="text-xs text-muted-foreground">{t.d}</div></div>
                <div className={`font-bold ${t.a > 0 ? 'text-success' : ''}`}>{t.a > 0 ? '+' : ''}₹{Math.abs(t.a)}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

function LoyaltyView({ onBack }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Loyalty Points" onBack={onBack} />
      <div className="container py-4 max-w-2xl">
        <Card className="p-6 text-center bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-glow">
          <Award className="w-12 h-12 mx-auto mb-2" />
          <div className="text-xs uppercase font-bold opacity-90">Lylac Gold Member</div>
          <div className="text-5xl font-extrabold mt-2">1,240</div>
          <div className="text-sm opacity-90">Total Points</div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span>Silver</span><span className="font-bold">Gold ⭐</span><span>Platinum</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-white/30"><div className="h-full rounded-full bg-white" style={{ width: '62%' }} /></div>
          <div className="text-xs mt-2">760 pts to Platinum</div>
        </Card>
        <div className="mt-6">
          <h3 className="font-bold mb-3">How to Earn</h3>
          <Card className="divide-y">
            {[
              { l: 'Every ₹100 spent', v: '+10 pts' },
              { l: 'Refer a friend', v: '+200 pts' },
              { l: 'Rate & review product', v: '+5 pts' },
              { l: 'Complete profile', v: '+50 pts' },
            ].map((r) => (<div key={r.l} className="flex items-center justify-between p-4"><span className="text-sm">{r.l}</span><span className="font-bold text-primary">{r.v}</span></div>))}
          </Card>
        </div>
      </div>
    </div>
  );
}

function FamilyView({ onBack }) {
  const members = [
    { n: 'Priya Sharma', r: 'Spouse', a: 30, blood: 'A+' },
    { n: 'Aarav Sharma', r: 'Son', a: 6, blood: 'O+' },
    { n: 'Ram Prasad Sharma', r: 'Father', a: 65, blood: 'B+' },
  ];
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Family Members" onBack={onBack} />
      <div className="container py-4 max-w-2xl space-y-3">
        {members.map((m, i) => (
          <Card key={i} className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold">{m.n.charAt(0)}</div>
            <div className="flex-1"><div className="font-semibold">{m.n}</div><div className="text-xs text-muted-foreground">{m.r} • {m.a} yrs • {m.blood}</div></div>
            <button className="p-2 hover:bg-muted rounded"><Edit className="w-4 h-4" /></button>
          </Card>
        ))}
        <Button variant="outline" className="w-full rounded-full h-12 border-dashed border-2 gap-2"><Plus className="w-4 h-4" /> Add Family Member</Button>
      </div>
    </div>
  );
}

function HealthRecordsView({ onBack }) {
  const cats = [
    { t: 'Lab Reports', c: 12, i: '🧪', color: 'bg-purple-100 dark:bg-purple-950 text-purple-600' },
    { t: 'Prescriptions', c: 8, i: '📋', color: 'bg-blue-100 dark:bg-blue-950 text-blue-600' },
    { t: 'Vaccine Certificates', c: 3, i: '💉', color: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600' },
    { t: 'Diagnostic Scans', c: 2, i: '🩻', color: 'bg-rose-100 dark:bg-rose-950 text-rose-600' },
    { t: 'Doctor Notes', c: 5, i: '📝', color: 'bg-amber-100 dark:bg-amber-950 text-amber-600' },
    { t: 'Bills', c: 24, i: '🧾', color: 'bg-teal-100 dark:bg-teal-950 text-teal-600' },
  ];
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Health Records" onBack={onBack} />
      <div className="container py-4 max-w-3xl">
        <Card className="p-4 gradient-card border-primary/20">
          <div className="text-sm font-semibold">Digital Health Vault</div>
          <div className="text-xs text-muted-foreground mt-1">Secure, encrypted, always accessible</div>
        </Card>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {cats.map((c) => (
            <Card key={c.t} className="p-4 hover:shadow-card cursor-pointer">
              <div className={`w-11 h-11 rounded-xl ${c.color} flex items-center justify-center text-xl`}>{c.i}</div>
              <div className="font-semibold text-sm mt-3">{c.t}</div>
              <div className="text-xs text-muted-foreground">{c.c} files</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function RemindersView({ onBack }) {
  const reminders = [
    { n: 'Glycomet 500mg', t: '8:00 AM, 8:00 PM', d: 'After meals • 30 days left', a: true },
    { n: 'Vitamin C 500mg', t: '9:00 AM', d: 'Before breakfast • Ongoing', a: true },
    { n: 'Ecosprin 75mg', t: '10:00 PM', d: 'Bedtime • 15 days left', a: false },
  ];
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Medicine Reminders" onBack={onBack} />
      <div className="container py-4 max-w-2xl space-y-3">
        {reminders.map((r, i) => (
          <Card key={i} className="p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center"><Pill className="w-5 h-5" /></div>
            <div className="flex-1">
              <div className="font-semibold">{r.n}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {r.t}</div>
              <div className="text-xs text-muted-foreground">{r.d}</div>
            </div>
            <Badge className={r.a ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}>{r.a ? 'Active' : 'Paused'}</Badge>
          </Card>
        ))}
        <Button variant="outline" className="w-full rounded-full h-12 border-dashed border-2 gap-2"><Plus className="w-4 h-4" /> Add New Reminder</Button>
      </div>
    </div>
  );
}

function CouponsView({ onBack }) {
  const coupons = [
    { c: 'HEALTH25', d: '25% off on Vitamins', exp: 'Expires 30 Jun', color: 'from-purple-500 to-pink-500' },
    { c: 'FIRST100', d: '₹100 off first order', exp: 'Expires 15 Jul', color: 'from-teal-500 to-emerald-500' },
    { c: 'FREEDEL', d: 'Free delivery on ₹299+', exp: 'Expires 20 Jul', color: 'from-amber-500 to-orange-500' },
    { c: 'B2G1', d: 'Buy 2 Get 1 Personal Care', exp: 'Expires 10 Jul', color: 'from-rose-500 to-red-500' },
  ];
  return (
    <div className="pb-24 md:pb-8">
      <Header title="My Coupons" onBack={onBack} />
      <div className="container py-4 max-w-2xl space-y-3">
        {coupons.map((c) => (
          <Card key={c.c} className="overflow-hidden">
            <div className="flex">
              <div className="p-4 flex flex-col items-center justify-center text-white text-center" style={{ background: `linear-gradient(135deg,${c.color.includes('purple') ? '#a855f7,#ec4899' : c.color.includes('teal') ? '#14b8a6,#10b981' : c.color.includes('amber') ? '#f59e0b,#f97316' : '#f43f5e,#ef4444'})`, minWidth: 110 }}>
                <Percent className="w-6 h-6 mb-1" />
                <div className="text-[10px] font-bold uppercase opacity-90">Coupon</div>
              </div>
              <div className="flex-1 p-4">
                <div className="font-bold">{c.d}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.exp}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold bg-muted px-2 py-1 rounded">{c.c}</span>
                  <button onClick={() => { navigator.clipboard?.writeText(c.c); toast.success('Copied!'); }} className="text-primary font-semibold text-xs flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReferralView({ onBack }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Refer & Earn" onBack={onBack} />
      <div className="container py-4 max-w-2xl">
        <Card className="p-6 text-center">
          <div className="text-6xl mb-3">🎁</div>
          <h2 className="text-2xl font-bold">Give ₹100, Get ₹100</h2>
          <p className="text-sm text-muted-foreground mt-2">Refer friends to Lylac One. You both get ₹100 wallet credit when they place their first order.</p>
          <div className="mt-6 p-4 rounded-2xl border-2 border-dashed border-primary bg-accent/30">
            <div className="text-xs uppercase font-bold text-muted-foreground">Your referral code</div>
            <div className="text-3xl font-extrabold text-primary mt-1 tracking-wider">ARJUN25</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button className="rounded-full gap-2"><Share2 className="w-4 h-4" /> Share Link</Button>
            <Button variant="outline" className="rounded-full gap-2" onClick={() => { navigator.clipboard?.writeText('ARJUN25'); toast.success('Copied!'); }}><Copy className="w-4 h-4" /> Copy Code</Button>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-3 gap-3">
            <div><div className="text-2xl font-bold">12</div><div className="text-xs text-muted-foreground">Referred</div></div>
            <div><div className="text-2xl font-bold">8</div><div className="text-xs text-muted-foreground">Joined</div></div>
            <div><div className="text-2xl font-bold text-success">₹800</div><div className="text-xs text-muted-foreground">Earned</div></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function HelpView({ onBack, onNavigate }) {
  const topics = ['Order & Delivery', 'Payments & Refunds', 'Prescription Upload', 'Account & Login', 'Wallet & Coupons', 'Products & Quality'];
  const faqs = [
    { q: 'How do I upload a prescription?', a: 'Go to cart → checkout → upload prescription. Our pharmacist verifies within 15 minutes.' },
    { q: 'What is the delivery time?', a: '15 minutes to 2 hours depending on your chosen pharmacy and slot.' },
    { q: 'Are all medicines genuine?', a: 'Yes, we partner only with licensed pharmacies. Every product is sealed and verified.' },
    { q: 'How can I cancel an order?', a: 'Cancel from Orders page within 5 minutes of placing. Beyond that, contact support.' },
  ];
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Help Center" onBack={onBack} />
      <div className="container py-4 max-w-2xl">
        <Card className="p-4 gradient-card"><Input placeholder="Search for help…" className="h-11 border-0 bg-white dark:bg-background" /></Card>
        <div className="mt-4">
          <h3 className="font-bold mb-3">Popular Topics</h3>
          <div className="grid grid-cols-2 gap-2">
            {topics.map((t) => (
              <Card key={t} className="p-4 hover:shadow-card cursor-pointer">
                <HelpCircle className="w-5 h-5 text-primary mb-2" />
                <div className="text-sm font-semibold">{t}</div>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold mb-3">FAQs</h3>
          <Card className="divide-y">
            {faqs.map((f, i) => (
              <details key={i} className="group">
                <summary className="p-4 cursor-pointer flex items-center justify-between font-medium text-sm">{f.q}<ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" /></summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</div>
              </details>
            ))}
          </Card>
        </div>
        <Button onClick={() => onNavigate('profile-sub', 'contact')} variant="outline" className="w-full mt-4 rounded-full gap-2"><MessageCircle className="w-4 h-4" /> Contact Support</Button>
      </div>
    </div>
  );
}

function ContactView({ onBack }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title="Contact Support" onBack={onBack} />
      <div className="container py-4 max-w-2xl space-y-3">
        {[
          { icon: Phone, l: 'Call us', s: '+91 1800 123 4567 • 24×7', color: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600' },
          { icon: MessageCircle, l: 'Chat with us', s: 'Live chat • Avg reply 2 min', color: 'bg-blue-100 dark:bg-blue-950 text-blue-600' },
          { icon: Mail, l: 'Email', s: 'help@lylacone.com', color: 'bg-purple-100 dark:bg-purple-950 text-purple-600' },
        ].map((c) => {
          const I = c.icon;
          return (
            <Card key={c.l} className="p-4 flex items-center gap-3 cursor-pointer hover:shadow-card">
              <div className={`w-11 h-11 rounded-xl ${c.color} flex items-center justify-center`}><I className="w-5 h-5" /></div>
              <div className="flex-1"><div className="font-semibold">{c.l}</div><div className="text-xs text-muted-foreground">{c.s}</div></div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Card>
          );
        })}
        <Card className="p-5 mt-4">
          <h3 className="font-bold mb-3">Send a message</h3>
          <div className="space-y-2">
            <Input placeholder="Subject" />
            <textarea placeholder="Describe your issue…" rows={4} className="w-full p-3 rounded-lg border border-border bg-background" />
            <Button className="w-full rounded-full" onClick={() => toast.success('Message sent! We\'ll reply in 2 hours.')}>Send Message</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PolicyView({ onBack, title }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title={title} onBack={onBack} />
      <div className="container py-4 max-w-3xl prose prose-sm dark:prose-invert">
        <div className="space-y-4 text-sm leading-relaxed">
          <p className="text-muted-foreground">Last updated: 4 June 2025</p>
          {[
            { h: '1. Introduction', p: `This ${title} governs your use of Lylac One's services. By accessing our app, you agree to these terms.` },
            { h: '2. Data Collection', p: 'We collect personal information (name, phone, address) and health data (prescriptions, orders) solely to provide our services. Data is encrypted at rest and in transit.' },
            { h: '3. Third-Party Sharing', p: 'We share order data with partner pharmacies for fulfilment and with delivery partners for logistics. We never sell your personal information.' },
            { h: '4. Prescription Handling', p: 'Prescriptions are stored in your Digital Health Vault. Only you and verified pharmacists can access them.' },
            { h: '5. Your Rights', p: 'You may request data export, correction, or deletion at any time by contacting help@lylacone.com.' },
            { h: '6. Cookies & Analytics', p: 'We use minimal cookies for session management and analytics to improve the app experience.' },
            { h: '7. Contact', p: 'For any questions, reach us at legal@lylacone.com.' },
          ].map((s) => (
            <div key={s.h}>
              <h3 className="font-bold text-base">{s.h}</h3>
              <p className="text-muted-foreground mt-1">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutView({ onBack }) {
  return (
    <div className="pb-24 md:pb-8">
      <Header title="About Lylac One" onBack={onBack} />
      <div className="container py-4 max-w-2xl">
        <Card className="p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 shadow-glow">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Lylac One</h1>
          <p className="text-sm text-muted-foreground mt-2">v1.0.0 • Made with ❤️ in Bengaluru</p>
          <p className="text-sm mt-4">Lylac One is a hyperlocal online pharmacy marketplace that connects you with verified neighbourhood pharmacies for genuine medicines, delivered in minutes.</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div><div className="text-2xl font-bold">50k+</div><div className="text-xs text-muted-foreground">Happy Users</div></div>
            <div><div className="text-2xl font-bold">1,200+</div><div className="text-xs text-muted-foreground">Partner Stores</div></div>
            <div><div className="text-2xl font-bold">15 min</div><div className="text-xs text-muted-foreground">Avg Delivery</div></div>
          </div>
        </Card>
        <div className="mt-4 space-y-2">
          {['Rate us on Play Store', 'Follow us on Instagram', 'LinkedIn', 'Careers'].map((l) => (
            <Card key={l} className="p-4 flex items-center justify-between hover:shadow-card cursor-pointer">
              <span className="font-medium text-sm">{l}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldRow({ label, defaultValue, type = 'text' }) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase text-muted-foreground">{label}</Label>
      <Input type={type} defaultValue={defaultValue} className="mt-1.5 h-11" />
    </div>
  );
}

// ===== Compare & Recently Viewed =====
export function CompareView({ onBack, compareIds, removeCompare, addToCart, cart }) {
  const items = MEDICINES.filter((m) => compareIds.includes(m.id));
  return (
    <div className="pb-24 md:pb-8">
      <Header title={`Compare (${items.length})`} onBack={onBack} />
      <div className="container py-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center mb-3 text-3xl">⚖️</div>
            <h3 className="font-bold text-lg">Nothing to compare yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Add medicines to compare their price, dosage, and reviews side-by-side.</p>
          </div>
        ) : (
          <div className="overflow-x-auto no-scrollbar">
            <div className="min-w-full inline-block">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-xs font-bold text-muted-foreground uppercase sticky left-0 bg-background z-10 border-b border-border">Attribute</th>
                    {items.map((m) => (
                      <th key={m.id} className="p-3 min-w-[220px] border-b border-border">
                        <div className="relative rounded-xl bg-muted p-3">
                          <button onClick={() => removeCompare(m.id)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center text-xs">×</button>
                          <div className="aspect-square w-24 mx-auto rounded-lg overflow-hidden mb-2"><img src={m.image} alt="" className="w-full h-full object-cover" /></div>
                          <div className="font-semibold text-sm">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.brand}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Price', (m) => <span className="font-bold text-lg">₹{m.price} <span className="text-xs font-normal text-muted-foreground line-through">₹{m.mrp}</span></span>],
                    ['Discount', (m) => <span className="text-success font-semibold">{m.discount}% OFF</span>],
                    ['Rating', (m) => <span>⭐ {m.rating} ({m.reviews})</span>],
                    ['Pack', (m) => <span className="text-sm">{m.pack}</span>],
                    ['Composition', (m) => <span className="text-sm">{m.composition}</span>],
                    ['Uses', (m) => <span className="text-sm text-muted-foreground">{m.uses}</span>],
                    ['Prescription', (m) => m.rx ? <Badge>Required</Badge> : <span className="text-success">Not required</span>],
                    ['Manufacturer', (m) => <span className="text-sm">{m.manufacturer}</span>],
                  ].map(([label, render]) => (
                    <tr key={label} className="border-b border-border">
                      <td className="p-3 text-sm font-semibold sticky left-0 bg-background z-10">{label}</td>
                      {items.map((m) => <td key={m.id} className="p-3 align-top">{render(m)}</td>)}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-3 sticky left-0 bg-background z-10"></td>
                    {items.map((m) => (
                      <td key={m.id} className="p-3">
                        <Button size="sm" className="rounded-full w-full" onClick={() => addToCart(m, 1)}>Add to Cart</Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function RecentlyViewedView({ onBack, recentIds, addToCart, cart, onOpenMedicine }) {
  const items = recentIds.map((id) => MEDICINES.find((m) => m.id === id)).filter(Boolean);
  return (
    <div className="pb-24 md:pb-8">
      <Header title={`Recently Viewed (${items.length})`} onBack={onBack} />
      <div className="container py-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center mb-3 text-3xl">👁️</div>
            <h3 className="font-bold text-lg">Nothing viewed yet</h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {items.map((m) => (
              <MedicineCard key={m.id} medicine={m} cartQty={cart.find((c) => c.id === m.id)?.qty || 0}
                onAdd={() => addToCart(m, 1)} onInc={() => addToCart(m, 1)} onDec={() => addToCart(m, -1)} onClick={() => onOpenMedicine(m.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
