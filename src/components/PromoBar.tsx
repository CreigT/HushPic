import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface PromoBarProps {
  onNavigate: (route: string) => void;
}

export const PromoBar: React.FC<PromoBarProps> = () => {
  return (
    <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-violet-600 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">
          Privacy-first image tools — processing stays in your browser.
        </span>
      </div>
    </div>
  );
};
