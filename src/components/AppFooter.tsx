import React from 'react';
import { Lock, Mail, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface AppFooterProps {
  onNavigate: (route: string) => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#01040f] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Privacy Promise */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500 to-violet-600 flex items-center justify-center text-white shadow-md">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                HushPic<span className="text-rose-500">.com</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              {BRAND.oneLiner}
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Zero server upload architecture. Everything happens in your browser.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Product</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/tools')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  All 10 Image Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools/heic-to-jpg')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  HEIC to JPG (iPhone)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools/compress')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Compress Images
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/pricing')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Pro Plan ($9/mo)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Privacy & Legal</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Privacy Contract
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.supportEmail}`}
                  className="hover:text-rose-400 transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" /> Support ({BRAND.supportEmail})
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} HushPic.com. All rights reserved.</span>
            <span>•</span>
            <span>Canonical Domain: <strong className="text-slate-400">HushPic.com</strong></span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Built for speed & absolute privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
