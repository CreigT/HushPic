import React from 'react';
import { Zap, Crown, CheckCircle2 } from 'lucide-react';
import { QuotaStatus } from '../lib/quota';

interface QuotaPillProps {
  quota: QuotaStatus;
  onClickUpgrade?: () => void;
}

export const QuotaPill: React.FC<QuotaPillProps> = ({ quota, onClickUpgrade }) => {
  if (quota.isPro) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-violet-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm">
        <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>Pro Unlimited</span>
      </div>
    );
  }

  const remaining = Math.max(0, quota.total - quota.used);
  const isZero = remaining === 0;

  return (
    <button
      onClick={onClickUpgrade}
      title="Click to view upgrade options"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
        isZero
          ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 hover:bg-rose-900/50'
          : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800/80'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isZero ? 'bg-rose-500 animate-ping' : remaining === 1 ? 'bg-amber-400' : 'bg-emerald-400'
        }`}
      />
      <span>
        {isZero ? '0 of 3 uses left' : `${remaining} of ${quota.total} free uses left today`}
      </span>
      <Zap className="w-3 h-3 text-slate-400 ml-0.5" />
    </button>
  );
};
