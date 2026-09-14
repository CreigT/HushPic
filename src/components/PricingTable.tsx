import React from 'react';
import { Check, Sparkles, Crown, ShieldCheck } from 'lucide-react';
import { PLANS } from '../../config/plans';
import { QuotaStatus } from '../lib/quota';

interface PricingTableProps {
  quota: QuotaStatus;
  onSelectPlan: (planId: 'free' | 'pro') => void;
  isModal?: boolean;
}

export const PricingTable: React.FC<PricingTableProps> = ({ quota, onSelectPlan, isModal = false }) => {
  return (
    <div className={`w-full ${isModal ? '' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10'}`}>
      {!isModal && (
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3"><Sparkles className="w-3.5 h-3.5" /> Simple, Honest Pricing</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Start Free. Upgrade When You Need More.</h2>
          <p className="text-sm text-slate-400 mt-2">Images stay on your device. Stripe handles paid subscription checkout and billing.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {PLANS.map((plan) => {
          const isProPlan = plan.id === 'pro';
          const isCurrent = (plan.id === 'free' && !quota.isPro) || (plan.id === 'pro' && quota.isPro);
          return (
            <div key={plan.id} className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between ${isProPlan ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500/30' : 'bg-slate-900/60 border border-slate-800/90'}`}>
              {isProPlan && <div className="absolute -top-3.5 right-6"><span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-violet-600 text-white text-xs font-bold shadow-md"><Crown className="w-3 h-3" /> Pro</span></div>}
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-2"><h3 className="text-xl font-bold text-white">{plan.name}</h3>{isCurrent && <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">Current Plan</span>}</div>
                <p className="text-xs text-slate-400 min-h-[32px] mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-800"><span className="text-4xl sm:text-5xl font-black text-white tracking-tight">${plan.price}</span><span className="text-xs font-medium text-slate-400">/{plan.period}</span></div>
                <div className="space-y-3 mb-8"><div className="text-xs font-semibold uppercase tracking-wider text-slate-300">What's Included:</div>{plan.features.map((feature, i) => <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300"><div className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-2.5 h-2.5" /></div><span>{feature}</span></div>)}</div>
              </div>
              <div>
                <button type="button" disabled={isCurrent || !isProPlan} onClick={() => onSelectPlan(plan.id)} className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${isCurrent || !isProPlan ? 'bg-slate-800/80 text-slate-400 border border-slate-700/60 cursor-default' : 'bg-gradient-to-r from-rose-500 to-violet-600 text-white hover:from-rose-600 hover:to-violet-700'}`}>{isCurrent ? 'Current Plan Active' : isProPlan ? 'Upgrade to Pro — $9/month' : 'Free Plan'}</button>
                <p className="text-[11px] text-center text-slate-500 mt-3 flex items-center justify-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" />{isProPlan ? 'Secure checkout and billing by Stripe.' : 'No payment required.'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
