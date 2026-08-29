import React from 'react';
import { Check, Sparkles, Crown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PLANS } from '../../config/plans';
import { QuotaStatus } from '../lib/quota';

interface PricingTableProps {
  quota: QuotaStatus;
  onSelectPlan: (planId: 'free' | 'pro') => void;
  isModal?: boolean;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  quota,
  onSelectPlan,
  isModal = false,
}) => {
  return (
    <div className={`w-full ${isModal ? '' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10'}`}>
      {!isModal && (
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Simple, Honest Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Start Free. Upgrade for Unlimited Power.
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            No credit card needed to start. All processing stays 100% in your browser.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {PLANS.map((plan) => {
          const isProPlan = plan.id === 'pro';
          const isCurrent = (plan.id === 'pro' && quota.isPro) || (plan.id === 'free' && !quota.isPro);

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                isProPlan
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500/50 shadow-2xl shadow-rose-500/10'
                  : 'bg-slate-900/60 border border-slate-800/90'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 right-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-violet-600 text-white text-xs font-bold shadow-md">
                    <Crown className="w-3 h-3 fill-white" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      Current Plan
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 min-h-[32px] mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-800">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-xs font-medium text-slate-400">/{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    What's Included:
                  </div>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.id)}
                  disabled={isCurrent && plan.id === 'free'}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    isProPlan
                      ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40'
                      : isCurrent
                      ? 'bg-slate-800/80 text-slate-400 border border-slate-700/60 cursor-default'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {isCurrent && plan.id === 'pro' ? (
                    'Manage Pro Subscription'
                  ) : isCurrent && plan.id === 'free' ? (
                    'Current Plan Active'
                  ) : (
                    <>
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500 mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Cancel anytime in 1-click via Stripe
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
