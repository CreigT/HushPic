import React, { useState } from 'react';
import { 
  X, 
  User, 
  Crown, 
  Zap, 
  CreditCard, 
  LogOut, 
  ExternalLink, 
  CheckCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { QuotaStatus, setPlan, resetDailyQuota } from '../lib/quota';

interface AccountSheetProps {
  isOpen: boolean;
  onClose: () => void;
  quota: QuotaStatus;
  onOpenPaywall: () => void;
}

export const AccountSheet: React.FC<AccountSheetProps> = ({
  isOpen,
  onClose,
  quota,
  onOpenPaywall,
}) => {
  const [showPortalMsg, setShowPortalMsg] = useState(false);

  if (!isOpen) return null;

  const handleOpenCustomerPortal = () => {
    setShowPortalMsg(true);
    setTimeout(() => setShowPortalMsg(false), 3000);
  };

  const handleSignOut = () => {
    setPlan('free');
    localStorage.removeItem('hushpic_user_email');
    onClose();
  };

  const handleToggleTestPro = () => {
    if (quota.isPro) {
      setPlan('free');
    } else {
      setPlan('pro', quota.userEmail || 'member@hushpic.com');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-7 overflow-hidden space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Account & Subscription</h3>
              <p className="text-xs text-slate-400 truncate max-w-[200px]">
                {quota.userEmail || 'Guest / Local Session'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Plan Card */}
        <div className={`p-4 rounded-2xl border ${quota.isPro ? 'bg-gradient-to-br from-slate-950 to-slate-900 border-rose-500/40 shadow-lg' : 'bg-slate-950/70 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Membership</span>
            {quota.isPro ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                <Crown className="w-3 h-3 fill-amber-400" /> Pro Active ($9/mo)
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-medium">
                Free Plan ($0)
              </span>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Daily conversions used today:</span>
              <span className="font-bold text-white">
                {quota.isPro ? `${quota.used} (Unlimited remaining)` : `${quota.used} / ${quota.total} (${quota.remaining} left)`}
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full ${quota.isPro ? 'bg-gradient-to-r from-amber-400 to-rose-500 w-full' : 'bg-rose-500'}`}
                style={{ width: quota.isPro ? '100%' : `${Math.min(100, (quota.used / quota.total) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2.5">
          {quota.isPro ? (
            <button
              onClick={handleOpenCustomerPortal}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-rose-400" />
              <span>Stripe Customer Billing Portal</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenPaywall();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white text-xs font-bold shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Upgrade to Pro ($9/mo)</span>
            </button>
          )}

          {showPortalMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Connected to Stripe Customer Portal. In live mode, this opens Stripe to update card or cancel plan.</span>
            </div>
          )}

          {/* Quick Dev/Test tools */}
          <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
            <button
              onClick={resetDailyQuota}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
              title="Reset daily counter to 0"
            >
              <RefreshCw className="w-3 h-3" /> Reset Daily Limit
            </button>

            <button
              onClick={handleToggleTestPro}
              className="text-[11px] text-rose-400 hover:text-rose-300 font-medium p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              {quota.isPro ? 'Switch to Free Tier' : 'Quick Test Pro'}
            </button>
          </div>
        </div>

        {/* Footer & Sign out */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">HushPic.com • Privacy-first</span>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
