import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

interface TrustChipProps {
  className?: string;
  onClick?: () => void;
}

export const TrustChip: React.FC<TrustChipProps> = ({ className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 shadow-inner backdrop-blur-md text-xs font-medium text-slate-300 ${onClick ? 'cursor-pointer hover:border-emerald-500/40 transition-colors' : ''} ${className}`}
    >
      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 to-violet-500 flex items-center justify-center text-white shrink-0">
        <Lock className="w-2.5 h-2.5" />
      </div>
      <span>Files never leave your device — not even us can see them</span>
      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pl-1 border-l border-white/10">
        <ShieldCheck className="w-3 h-3" /> 100% Client-Side
      </span>
    </div>
  );
};
