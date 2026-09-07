'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Phone, User as UserIcon, ShieldCheck, Sparkles, Eye, EyeOff, Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { authApi } from '@/lib/services';
import { STORE_CODE } from '@/lib/api';

export function AuthView({ mode = 'login', onBack, onSuccess, onSwitchMode }) {
  const [step, setStep] = useState(mode === 'otp' ? 'otp' : mode);
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState('');
  const [form, setForm] = useState({ name: '', firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [busy, setBusy] = useState(false);
  const { login, register } = useAuth();

  const submitLogin = async (e) => {
    e?.preventDefault?.();
    if (!form.email || !form.password) return toast.error('Enter email & password');
    setBusy(true);
    try {
      await login({ username: form.email, password: form.password });
      onSuccess?.();
    } catch (err) {
      toast.error(err?.message || 'Invalid credentials');
    } finally { setBusy(false); }
  };
  const submitSignup = async (e) => {
    e?.preventDefault?.();
    if (!form.email || !form.password || !form.name) return toast.error('Please fill all fields');
    const [firstName, ...rest] = form.name.split(' ');
    const lastName = rest.join(' ') || firstName;
    setBusy(true);
    try {
      await register({
        userName: form.email,
        emailAddress: form.email,
        firstName, lastName,
        password: form.password,
        repeatPassword: form.password,
        storeCode: STORE_CODE,
        language: 'en',
      });
      setStep('otp');
      toast.info('Account created! (OTP verification is a placeholder)');
    } catch (err) {
      toast.error(err?.message || 'Registration failed');
    } finally { setBusy(false); }
  };
  const verifyOtp = () => {
    // TODO: Missing backend endpoint for OTP verification. Simulated for now.
    if (otp.length === 4) { toast.success('Account verified!'); onSuccess?.(); }
    else toast.error('Enter 4-digit OTP');
  };
  const submitForgot = async () => {
    if (!form.email) return toast.error('Enter your email');
    setBusy(true);
    try {
      await authApi.requestPasswordReset(form.email);
      toast.success('Reset link sent! Check your email.');
      setStep('login');
    } catch (err) { toast.error(err?.message || 'Request failed'); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-background dark:via-background dark:to-background flex flex-col">
      <div className="p-4">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold text-primary">Lylac<span className="text-secondary">One</span></span>
            </div>
            <h1 className="text-2xl font-bold">
              {step === 'login' && 'Welcome back'}
              {step === 'signup' && 'Create your account'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'forgot' && 'Reset password'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {step === 'login' && 'Sign in to continue ordering medicines'}
              {step === 'signup' && 'Get 15-min delivery from nearby pharmacies'}
              {step === 'otp' && `We've sent a 4-digit code to ${form.phone || '+91 98765 43210'}`}
              {step === 'forgot' && 'Enter your email and we\'ll send a reset link'}
            </p>
          </div>

          <Card className="p-6 shadow-card">
            {step === 'login' && (
              <form onSubmit={submitLogin} className="space-y-4">
                <Field icon={Mail} label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">Password</Label>
                  <div className="relative mt-1.5">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="pl-10 pr-10 h-11" placeholder="Enter password" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button type="button" onClick={() => setStep('forgot')} className="text-xs text-primary font-semibold hover:underline">Forgot password?</button>
                <Button type="submit" size="lg" disabled={busy} className="w-full rounded-full bg-secondary hover:bg-secondary/90 font-semibold">
                  {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Sign In
                </Button>
              </form>
            )}

            {step === 'signup' && (
              <form onSubmit={submitSignup} className="space-y-4">
                <Field icon={UserIcon} label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Arjun Sharma" />
                <Field icon={Phone} label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+91 98765 43210" />
                <Field icon={Mail} label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
                <Field icon={Lock} label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="Min 8 characters" />
                <Button type="submit" size="lg" disabled={busy} className="w-full rounded-full bg-secondary hover:bg-secondary/90 font-semibold">
                  {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Create Account
                </Button>
              </form>
            )}

            {step === 'otp' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-14 h-14 text-2xl" />
                      <InputOTPSlot index={1} className="w-14 h-14 text-2xl" />
                      <InputOTPSlot index={2} className="w-14 h-14 text-2xl" />
                      <InputOTPSlot index={3} className="w-14 h-14 text-2xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Didn't receive? <button className="text-primary font-semibold">Resend in 30s</button>
                </div>
                <Button onClick={verifyOtp} size="lg" className="w-full rounded-full bg-secondary hover:bg-secondary/90 font-semibold">Verify & Continue</Button>
              </div>
            )}

            {step === 'forgot' && (
              <div className="space-y-4">
                <Field icon={Mail} label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
                <Button onClick={submitForgot} size="lg" disabled={busy} className="w-full rounded-full bg-secondary hover:bg-secondary/90 font-semibold">
                  {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Send Reset Link
                </Button>
              </div>
            )}

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Button variant="outline" size="lg" onClick={() => { toast.info('Google login (placeholder)'); onSuccess?.(); }} className="w-full rounded-full font-semibold gap-2">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
              Continue with Google
            </Button>
          </Card>

          <div className="text-center mt-5 text-sm">
            {step === 'login' && (<>New to Lylac? <button onClick={() => setStep('signup')} className="text-primary font-bold">Create account</button></>)}
            {step === 'signup' && (<>Have an account? <button onClick={() => setStep('login')} className="text-primary font-bold">Sign in</button></>)}
            {(step === 'otp' || step === 'forgot') && (<button onClick={() => setStep('login')} className="text-primary font-bold">Back to login</button>)}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified pharmacies</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> 15-min delivery</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <Label className="text-xs font-semibold text-muted-foreground uppercase">{label}</Label>
      <div className="relative mt-1.5">
        <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="pl-10 h-11" placeholder={placeholder} />
      </div>
    </div>
  );
}
