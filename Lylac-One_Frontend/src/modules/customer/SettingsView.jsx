'use client';
import { useState } from 'react';
import { ArrowLeft, Bell, Lock, Globe, Sun, Moon, Monitor, MapPin, ShieldCheck, Smartphone, Trash2, LogOut, User, Mail, Phone, Key, ChevronRight, Eye, Fingerprint } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export function SettingsView({ onBack, theme, setTheme, onNavigate }) {
  const [section, setSection] = useState(null);
  const sections = [
    { id: 'account', label: 'Account Settings', icon: User, sub: 'Manage your Lylac account' },
    { id: 'personal', label: 'Personal Information', icon: User, sub: 'Name, email, DOB, gender' },
    { id: 'password', label: 'Change Password', icon: Key, sub: 'Update your password' },
    { id: 'language', label: 'Language', icon: Globe, sub: 'English (India)' },
    { id: 'theme', label: 'Theme', icon: Sun, sub: `${theme.charAt(0).toUpperCase() + theme.slice(1)}` },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell, sub: 'Push, Email, SMS' },
    { id: 'location', label: 'Location Preferences', icon: MapPin, sub: 'Delivery radius, address' },
    { id: 'privacy', label: 'Privacy Settings', icon: Eye, sub: 'Data sharing, ads' },
    { id: 'security', label: 'Security Settings', icon: ShieldCheck, sub: '2FA, biometrics' },
    { id: 'devices', label: 'Connected Devices', icon: Smartphone, sub: '3 devices' },
    { id: 'delete', label: 'Delete Account', icon: Trash2, sub: 'Permanently remove data', danger: true },
    { id: 'logout', label: 'Logout', icon: LogOut, sub: 'Sign out of Lylac One', danger: true },
  ];

  if (section) return <SettingsSection id={section} onBack={() => setSection(null)} theme={theme} setTheme={setTheme} />;

  return (
    <div className="pb-24 md:pb-8">
      <Header title="Settings" onBack={onBack} />
      <div className="container py-4 max-w-2xl">
        <Card className="divide-y divide-border overflow-hidden">
          {sections.map((s) => {
            const I = s.icon;
            return (
              <button key={s.id} onClick={() => s.id === 'logout' ? (toast.success('Logged out'), onNavigate('home')) : setSection(s.id)} className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 text-left ${s.danger ? 'text-destructive' : ''}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.danger ? 'bg-destructive/10 text-destructive' : 'bg-accent text-primary'}`}>
                  <I className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

function SettingsSection({ id, onBack, theme, setTheme }) {
  const titles = { account: 'Account Settings', personal: 'Personal Information', password: 'Change Password', language: 'Language', theme: 'Theme', notifications: 'Notification Preferences', location: 'Location Preferences', privacy: 'Privacy Settings', security: 'Security Settings', devices: 'Connected Devices', delete: 'Delete Account' };
  return (
    <div className="pb-24 md:pb-8">
      <Header title={titles[id]} onBack={onBack} />
      <div className="container py-4 max-w-2xl">
        {id === 'theme' && (
          <Card className="p-5">
            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-2">
              {[
                { v: 'light', l: 'Light', icon: Sun, s: 'Bright interface' },
                { v: 'dark', l: 'Dark', icon: Moon, s: 'Easier on the eyes' },
                { v: 'system', l: 'System', icon: Monitor, s: 'Match device setting' },
              ].map((t) => {
                const I = t.icon;
                return (
                  <label key={t.v} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${theme === t.v ? 'border-primary bg-accent' : 'border-border'}`}>
                    <RadioGroupItem value={t.v} />
                    <I className="w-5 h-5 text-primary" />
                    <div className="flex-1"><div className="font-semibold">{t.l}</div><div className="text-xs text-muted-foreground">{t.s}</div></div>
                  </label>
                );
              })}
            </RadioGroup>
          </Card>
        )}
        {id === 'personal' && (
          <Card className="p-5 space-y-3">
            <FormRow label="Full Name" defaultValue="Arjun Sharma" />
            <FormRow label="Email" defaultValue="arjun@email.com" />
            <FormRow label="Phone" defaultValue="+91 98765 43210" />
            <FormRow label="Date of Birth" defaultValue="1995-08-15" type="date" />
            <div>
              <Label className="text-xs font-semibold uppercase">Gender</Label>
              <Select defaultValue="male">
                <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
              </Select>
            </div>
            <Button className="rounded-full" onClick={() => toast.success('Profile updated')}>Save Changes</Button>
          </Card>
        )}
        {id === 'password' && (
          <Card className="p-5 space-y-3">
            <FormRow label="Current Password" type="password" />
            <FormRow label="New Password" type="password" />
            <FormRow label="Confirm New Password" type="password" />
            <Button className="rounded-full" onClick={() => toast.success('Password changed')}>Update Password</Button>
          </Card>
        )}
        {id === 'language' && (
          <Card className="p-5">
            <RadioGroup defaultValue="en-in" className="space-y-2">
              {['English (India)', 'हिंदी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'മലയാളം', 'मराठी'].map((l, i) => (
                <label key={l} className="flex items-center gap-3 p-3 rounded-xl border-2 border-border hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={i === 0 ? 'en-in' : l} />
                  <span className="font-medium">{l}</span>
                </label>
              ))}
            </RadioGroup>
          </Card>
        )}
        {id === 'notifications' && (
          <Card className="p-5 space-y-3">
            {[
              { k: 'push', l: 'Push Notifications', s: 'Order updates, offers', d: true },
              { k: 'email', l: 'Email Alerts', s: 'Invoices & reports', d: true },
              { k: 'sms', l: 'SMS Notifications', s: 'OTPs & delivery updates', d: true },
              { k: 'offers', l: 'Promotional Offers', s: 'Deals from nearby stores', d: false },
              { k: 'reminders', l: 'Medicine Reminders', s: 'Dosage & refill alerts', d: true },
            ].map((n) => <ToggleRow key={n.k} label={n.l} sub={n.s} defaultChecked={n.d} />)}
          </Card>
        )}
        {id === 'location' && (
          <Card className="p-5 space-y-4">
            <div>
              <Label className="text-xs font-semibold uppercase">Default Delivery Address</Label>
              <div className="mt-1.5 p-3 rounded-xl bg-muted"><div className="font-semibold text-sm">Home</div><div className="text-xs text-muted-foreground">Flat 302, Skyline Apartments, MG Road, Bengaluru</div></div>
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase">Delivery Radius</Label>
              <Select defaultValue="5"><SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger><SelectContent>{[2,3,5,10,15].map((k) => <SelectItem key={k} value={String(k)}>{k} km</SelectItem>)}</SelectContent></Select>
            </div>
            <ToggleRow label="Use GPS location" sub="Auto-detect nearest pharmacies" defaultChecked />
          </Card>
        )}
        {id === 'privacy' && (
          <Card className="p-5 space-y-3">
            <ToggleRow label="Personalized Ads" sub="See offers based on activity" defaultChecked />
            <ToggleRow label="Share Analytics" sub="Help us improve Lylac" defaultChecked />
            <ToggleRow label="Show Profile to Doctors" sub="For consultations" />
            <ToggleRow label="Two-way Sync with Health Apps" sub="Google Fit, Apple Health" />
          </Card>
        )}
        {id === 'security' && (
          <Card className="p-5 space-y-3">
            <ToggleRow icon={Fingerprint} label="Biometric Login" sub="Use fingerprint / face ID" defaultChecked />
            <ToggleRow icon={ShieldCheck} label="Two-Factor Authentication" sub="Extra security layer" />
            <ToggleRow icon={Lock} label="App Lock" sub="Require PIN to open app" defaultChecked />
            <Button variant="outline" className="w-full rounded-full">View Login Activity</Button>
          </Card>
        )}
        {id === 'devices' && (
          <Card className="divide-y divide-border overflow-hidden">
            {[
              { d: 'iPhone 15 Pro', o: 'iOS 18', last: 'Active now', current: true },
              { d: 'MacBook Air', o: 'Chrome • macOS', last: '2 hours ago' },
              { d: 'Samsung Galaxy', o: 'Android 14', last: '3 days ago' },
            ].map((d) => (
              <div key={d.d} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-lg bg-accent text-primary flex items-center justify-center"><Smartphone className="w-4 h-4" /></div>
                <div className="flex-1">
                  <div className="font-medium text-sm flex items-center gap-2">{d.d} {d.current && <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success font-bold">This device</span>}</div>
                  <div className="text-xs text-muted-foreground">{d.o} • {d.last}</div>
                </div>
                {!d.current && <button className="text-xs text-destructive font-semibold">Revoke</button>}
              </div>
            ))}
          </Card>
        )}
        {id === 'account' && (
          <Card className="p-5 space-y-3">
            <FormRow label="Username" defaultValue="arjun.sharma" />
            <FormRow label="Referral Code" defaultValue="ARJUN25" />
            <div className="text-xs text-muted-foreground pt-2 border-t">Member since June 2024 • Lylac Gold</div>
          </Card>
        )}
        {id === 'delete' && (
          <Card className="p-5 border-destructive/30 bg-destructive/5">
            <h3 className="font-bold text-destructive">Delete your Lylac One account</h3>
            <p className="text-sm text-muted-foreground mt-2">Once deleted, your data, orders, prescriptions and wallet balance will be permanently removed. This action cannot be undone.</p>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="destructive" className="mt-4 rounded-full">Delete My Account</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This permanently deletes your account and all associated data.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast.success('Deletion scheduled in 30 days')}>Confirm Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Card>
        )}
      </div>
    </div>
  );
}

function FormRow({ label, type = 'text', defaultValue }) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase text-muted-foreground">{label}</Label>
      <Input type={type} defaultValue={defaultValue} className="mt-1.5 h-11" />
    </div>
  );
}

function ToggleRow({ icon: Icon, label, sub, defaultChecked }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-center gap-3 py-2">
      {Icon && <div className="w-9 h-9 rounded-lg bg-accent text-primary flex items-center justify-center"><Icon className="w-4 h-4" /></div>}
      <div className="flex-1">
        <div className="font-medium text-sm">{label}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}

export function Header({ title, onBack, right }) {
  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex items-center gap-2 py-3">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="text-lg font-bold flex-1">{title}</h1>
        {right}
      </div>
    </div>
  );
}
