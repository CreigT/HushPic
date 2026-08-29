import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PromoBarProps {
  onNavigate: (route: string) => void;
}

export const PromoBar: React.FC<PromoBarProps> = ({ onNavigate }) => {
  return (
    <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-violet-600 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse" />
        <span className="truncate">
          Launch Offer: Get Pro for $9/mo — Unlimited conversions, 500MB files & AI cutouts.
        </span>
        <button
          onClick={() => onNavigate('/pricing')}
          className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-rose-100 transition-colors shrink-0 ml-1 cursor-pointer"
        >
          View Offer <ArrowRight className="w-3 h-3 inline" />
        </button>
      </div>
    </div>
  );
};
