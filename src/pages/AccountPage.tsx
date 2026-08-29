import React, { useState } from 'react';
import { 
  User, 
  Crown, 
  Zap, 
  CreditCard, 
  LogOut, 
  ExternalLink, 
  CheckCircle, 
  RefreshCw, 
  ArrowLeft,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { QuotaStatus, setPlan, resetDailyQuota } from '../lib/quota';

interface AccountPageProps {
  quota: QuotaStatus;
  onBack: () => void;
  onOpenPaywall: () => void;
  onOpenSignIn: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  quota,
  onBack,
  onOpenPaywall,
  onOpenSignIn,
}) => {
  const [portalMsg, setPortalMsg] = useState(false);

  const signedIn = Boolean(quota.userEmail || quota.isPro);

  if (!signedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
          <p className="text-xs text-slate-400">
            You must be signed in to view your account dashboard and active subscriptions.
          </p>
        </div>
        <button
          onClick={onOpenSignIn}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 font-bold text-sm text-white cursor-pointer shadow-lg shadow-rose-500/20"
        >
          Sign In / Create Account
        </button>
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white cursor-pointer block mx-auto"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  const handlePortalClick = () => {
    setPortalMsg(true);
    setTimeout(() => setPortalMsg(false), 3000);
  };

  const handleSignOut = () => {
    setPlan('free');
    localStorage.removeItem('hushpic_user_email');
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center text-rose-400 shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {quota.userEmail || 'Member Account'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Plan Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Subscription Plan
              </span>
              <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                {quota.isPro ? 'HushPic Pro ($9/mo)' : 'HushPic Free Plan ($0)'}
                {quota.isPro && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    Active
                  </span>
                )}
              </h3>
            </div>

            {quota.isPro ? (
              <Crown className="w-8 h-8 text-amber-400 fill-amber-400/20" />
            ) : (
              <Zap className="w-8 h-8 text-slate-500" />
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Today's Local Processing Usage:</span>
              <span className="font-bold text-white">
                {quota.isPro ? `${quota.used} items (Unlimited)` : `${quota.used} of ${quota.total} free items`}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div
                className={`h-full rounded-full ${quota.isPro ? 'bg-gradient-to-r from-amber-400 to-rose-500 w-full' : 'bg-rose-500'}`}
                style={{ width: quota.isPro ? '100%' : `${Math.min(100, (quota.used / quota.total) * 100)}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {quota.isPro ? (
              <button
                onClick={handlePortalClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-rose-400" />
                <span>Stripe Customer Billing Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={onOpenPaywall}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upgrade to Pro ($9/mo)</span>
              </button>
            )}

            <button
              onClick={resetDailyQuota}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Daily Limit
            </button>
          </div>

          {portalMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Stripe Customer Portal endpoint simulated. In production, opens Stripe billing session to update payment or cancel.</span>
            </div>
          )}
        </div>

        {/* Security & Privacy summary */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Device Privacy Status</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              No files are linked to your email or account. All byte processing remains strictly in browser RAM.
            </p>
          </div>

          <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800">
            Canonical Domain: <strong className="text-slate-300">HushPic.com</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
