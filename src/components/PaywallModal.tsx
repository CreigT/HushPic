import React, { useState } from 'react';
import { X, Crown, Check, ArrowRight, Lock, CreditCard } from 'lucide-react';
import { auth } from '../lib/firebase';

export type PaywallReason = 'quota' | 'size' | 'pro_tool' | 'batch' | 'general';
interface PaywallModalProps { isOpen: boolean; onClose: () => void; reason: PaywallReason; customDetails?: string; onSuccessUpgrade: () => void; }

export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, reason, customDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  if (!isOpen) return null;

  const titles: Record<PaywallReason, string> = {
    quota: 'You’ve Used Your Free Daily Conversions', size: 'Unlock Large File Processing',
    pro_tool: 'Unlock HushPic Pro Tools', batch: 'Unlock Batch Processing', general: 'Get HushPic Pro'
  };

  const startCheckout = async () => {
    setError('');
    const user = auth.currentUser;
    if (!user) { setError('Please sign in first, then return to Upgrade Pro.'); return; }
    setIsProcessing(true);
    try {
      const token = await user.getIdToken(true);
      const response = await fetch('/api/create-checkout-session', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || 'Checkout unavailable');
      window.location.assign(data.url);
    } catch (e: any) {
      setError(e?.message || 'Unable to start checkout.');
      setIsProcessing(false);
    }
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
    <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6">
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
      <div><div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-3"><Crown className="w-3.5 h-3.5" /> HushPic Pro</div><h3 className="text-2xl font-extrabold text-white">{titles[reason]}</h3><p className="text-sm text-slate-300 mt-2">{customDetails || 'Upgrade for $9/month. Your image files continue to process locally on your device.'}</p></div>
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid gap-2 text-xs text-slate-200">
        {['Unlimited daily conversions','Up to 500MB per file','Batch convert + ZIP download','Pro image tools'].map(x => <div key={x} className="flex gap-2"><Check className="w-4 h-4 text-emerald-400" />{x}</div>)}
      </div>
      <button type="button" onClick={startCheckout} disabled={isProcessing} className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"><CreditCard className="w-4 h-4" />{isProcessing ? 'Opening secure checkout…' : 'Upgrade to Pro — $9/month'}<ArrowRight className="w-4 h-4" /></button>
      {error && <p className="text-xs text-center text-rose-300">{error}</p>}
      <div className="text-[11px] text-slate-400 flex justify-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> Payment handled securely by Stripe</div>
    </div>
  </div>;
};
