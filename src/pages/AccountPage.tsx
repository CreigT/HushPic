import React, { useState } from 'react';
import { User, Crown, Zap, CreditCard, LogOut, ExternalLink, ArrowLeft, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { QuotaStatus } from '../lib/quota';
import { auth } from '../lib/firebase';
import { apiFetch } from '../lib/api';

interface AccountPageProps {
  quota: QuotaStatus;
  onBack: () => void;
  onOpenPaywall: () => void;
  onOpenSignIn: () => void;
  onAuthChanged: () => Promise<void> | void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ quota, onBack, onOpenPaywall, onOpenSignIn, onAuthChanged }) => {
  const [portalBusy, setPortalBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = auth.currentUser;

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mx-auto"><User className="w-8 h-8" /></div>
        <div className="space-y-2"><h2 className="text-2xl font-bold text-white">Sign In Required</h2><p className="text-xs text-slate-400">Sign in to view your verified plan and billing status.</p></div>
        <button onClick={onOpenSignIn} className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 font-bold text-sm text-white">Sign In / Create Account</button>
        <button onClick={onBack} className="text-xs text-slate-400 hover:text-white">← Back to Home</button>
      </div>
    );
  }

  const openPortal = async () => {
    setError(null);
    setPortalBusy(true);
    try {
      const { url } = await apiFetch<{ url: string }>('/api/portal', { method: 'POST' });
      window.location.assign(url);
    } catch (err: any) {
      setError(err?.message || 'Unable to open billing portal.');
    } finally {
      setPortalBusy(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    await onAuthChanged();
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /><span>Back to Home</span></button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center text-rose-400"><User className="w-7 h-7" /></div>
          <div><h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">My Account</h1><p className="text-xs sm:text-sm text-slate-400">{user.email}</p></div>
        </div>
        <button onClick={handleSignOut} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-rose-400"><LogOut className="w-4 h-4" /> Sign Out</button>
      </div>

      {!user.emailVerified && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />Verify your email before starting a paid subscription.</div>
      )}

      {error && <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div><span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Subscription Plan</span><h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">{quota.isPro ? 'HushPic Pro ($9/mo)' : 'HushPic Free Plan ($0)'}{quota.isPro && <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">Active</span>}</h3></div>
            {quota.isPro ? <Crown className="w-8 h-8 text-amber-400" /> : <Zap className="w-8 h-8 text-slate-500" />}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs text-slate-300"><span>Today's Server-Verified Usage:</span><span className="font-bold text-white">{quota.isPro ? 'Unlimited' : `${quota.used} of ${quota.total} free uses`}</span></div>
            {!quota.isPro && <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden"><div className="h-full rounded-full bg-rose-500" style={{ width: `${Math.min(100, (quota.used / quota.total) * 100)}%` }} /></div>}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {quota.isPro ? (
              <button onClick={openPortal} disabled={portalBusy} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white disabled:opacity-60"><CreditCard className="w-4 h-4 text-rose-400" /><span>{portalBusy ? 'Opening Portal...' : 'Manage Billing in Stripe'}</span><ExternalLink className="w-3 h-3 text-slate-400" /></button>
            ) : (
              <button onClick={onOpenPaywall} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white text-xs font-bold"><Sparkles className="w-4 h-4" /><span>Upgrade to Pro ($9/mo)</span></button>
            )}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
          <div><div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3"><ShieldCheck className="w-4 h-4" /></div><h4 className="text-sm font-bold text-white">Privacy Boundary</h4><p className="text-xs text-slate-400 mt-2 leading-relaxed">Account, billing, and usage metadata can sync to trusted services. Image bytes are processed locally in your browser and are not uploaded by HushPic for processing.</p></div>
          <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800">Sponsored by <strong className="text-slate-300">CREIGNIFICENT LLC</strong></div>
        </div>
      </div>
    </div>
  );
};
