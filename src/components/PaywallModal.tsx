import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Sparkles, 
  Check, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Lock,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND } from '../../config/brand';
import { setPlan } from '../lib/quota';

export type PaywallReason = 'quota' | 'size' | 'pro_tool' | 'batch' | 'general';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: PaywallReason;
  customDetails?: string;
  onSuccessUpgrade: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  reason,
  customDetails,
  onSuccessUpgrade,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const getReasonContent = () => {
    switch (reason) {
      case 'quota':
        return {
          badge: 'Daily Limit Reached',
          title: 'You’ve Used Your 3 Free Daily Conversions',
          description:
            customDetails ||
            'Upgrade to HushPic Pro for $9/mo to get unlimited daily conversions, batch processing, and 500MB uploads.',
        };
      case 'size':
        return {
          badge: 'File Size Limit',
          title: 'Large File Detected (>25MB)',
          description:
            customDetails ||
            `Free accounts support files up to 25MB. Upgrade to Pro to process large raw photos up to 500MB directly in your browser.`,
        };
      case 'pro_tool':
        return {
          badge: 'Pro Feature',
          title: 'Unlock Professional AI Filters',
          description:
            customDetails ||
            'Background Remover and 2x HD Upscaler are included with HushPic Pro with unlimited exports and no watermarks.',
        };
      case 'batch':
        return {
          badge: 'Batch Processing',
          title: 'Batch Convert & ZIP Download',
          description: 'Process dozens of images concurrently and download them in a single ZIP file with HushPic Pro.',
        };
      default:
        return {
          badge: 'HushPic Pro',
          title: 'Get Unlimited Conversions',
          description: 'Upgrade for $9/mo. 100% privacy, zero uploads, unlimited volume.',
        };
    }
  };

  const reasonContent = getReasonContent();

  const handleSimulatedStripeCheckout = () => {
    setIsProcessing(true);
    // Simulate Stripe Checkout session completion
    setTimeout(() => {
      const email = emailInput.trim() || 'pro-member@hushpic.com';
      setPlan('pro', email);
      setIsProcessing(false);
      setShowCheckoutSuccess(true);
      
      // Fire celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        onSuccessUpgrade();
        onClose();
        setShowCheckoutSuccess(false);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glowing aura */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {showCheckoutSuccess ? (
          <div className="py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Welcome to HushPic Pro!</h3>
            <p className="text-sm text-slate-300">
              Unlimited conversions, 500MB file limit, and Pro filters are now active on your device.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Badge */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold mb-3">
                <Crown className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                <span>{reasonContent.badge}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                {reasonContent.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {reasonContent.description}
              </p>
            </div>

            {/* Pro Features checklist */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                HushPic Pro Plan Includes:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unlimited daily conversions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Up to 500MB per file</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Batch convert + ZIP download</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Background Remover & Upscaler</span>
                </div>
              </div>
            </div>

            {/* Stripe Email & Checkout form */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Your Email (for receipt & Stripe Customer Portal)
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="button"
                onClick={handleSimulatedStripeCheckout}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold text-sm shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting to Stripe Checkout...</span>
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Upgrade to Pro — $9/month</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Guarantees */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> 100% Privacy guaranteed
              </span>
              <span>Cancel anytime in 1-click</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
