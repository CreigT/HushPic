import React, { useState } from 'react';
import { X, Crown, Check, ArrowRight, Lock, CreditCard, AlertCircle } from 'lucide-react';
import { auth } from '../lib/firebase';
import { apiFetch } from '../lib/api';

export type PaywallReason = 'quota' | 'size' | 'pro_tool' | 'batch' | 'general';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: PaywallReason;
  customDetails?: string;
  onSuccessUpgrade: () => void;
  onRequireSignIn: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  reason,
  customDetails,
  onRequireSignIn,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const getReasonContent = () => {
    switch (reason) {
      case 'quota':
        return { badge: 'Daily Limit Reached', title: 'You’ve Used Your 3 Free Daily Conversions', description: customDetails || 'Upgrade to HushPic Pro for unlimited daily processing and larger files.' };
      case 'size':
        return { badge: 'File Size Limit', title: 'Large File Detected (>25MB)', description: customDetails || 'Free accounts support files up to 25MB. Pro supports files up to 500MB when your browser/device has enough memory.' };
      case 'pro_tool':
        return { badge: 'Pro Feature', title: 'Unlock Pro Image Tools', description: customDetails || 'Upgrade to HushPic Pro for Pro-only tools and unlimited processing.' };
      case 'batch':
        return { badge: 'Batch Processing', title: 'Batch Convert & ZIP Download', description: 'Upgrade to HushPic Pro for batch processing and ZIP downloads.' };
      default:
        return { badge: 'HushPic Pro', title: 'Get Unlimited Conversions', description: 'Upgrade for $9/month. Image processing remains on your device.' };
    }
  };

  const startCheckout = async () => {
    setError(null);
    if (!auth.currentUser) {
      onRequireSignIn();
      return;
    }

    setIsProcessing(true);
    try {
      const { url } = await apiFetch<{ url: string }>('/api/checkout', { method: 'POST' });
      window.location.assign(url);
    } catch (err: any) {
      if (err?.status === 403) setError('Verify your email first, then return and upgrade.');
      else setError(err?.message || 'Unable to start Stripe Checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reasonContent = getReasonContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer" aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold mb-3">
              <Crown className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /><span>{reasonContent.badge}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight">{reasonContent.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">{reasonContent.description}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400">HushPic Pro Includes:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              {['Unlimited daily conversions', 'Up to 500MB per file', 'Batch convert + ZIP download', 'Pro image tools'].map((item) => (
                <div key={item} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /><span>{item}</span></div>
              ))}
            </div>
          </div>

          {error && <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-300 flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}

          <button type="button" onClick={startCheckout} disabled={isProcessing} className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold text-sm shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75">
            {isProcessing ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Opening secure checkout...</span></> : <><CreditCard className="w-4 h-4" /><span>Upgrade to Pro — $9/month</span><ArrowRight className="w-4 h-4" /></>}
          </button>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> Payment handled by Stripe</span>
            <span>Manage or cancel in Customer Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
