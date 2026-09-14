import React from 'react';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface AppFooterProps {
  onNavigate: (route: string) => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#01040f] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-500 to-violet-600 flex items-center justify-center text-white shadow-md"><Lock className="w-3.5 h-3.5" /></div>
              <span className="font-extrabold text-lg tracking-tight text-white">HushPic<span className="text-rose-500">.com</span></span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">{BRAND.oneLiner}</p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400"><ShieldCheck className="w-3.5 h-3.5 shrink-0" /><span>Image bytes are processed locally. Account, billing, and usage metadata may sync securely.</span></div>
            <div className="inline-flex px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-bold text-white">{BRAND.sponsorLine}</div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Product</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('/tools')} className="hover:text-rose-400 transition-colors">All Image Tools</button></li>
              <li><button onClick={() => onNavigate('/tools/heic-to-jpg')} className="hover:text-rose-400 transition-colors">HEIC to JPG</button></li>
              <li><button onClick={() => onNavigate('/tools/compress')} className="hover:text-rose-400 transition-colors">Compress Images</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-rose-400 transition-colors">Pro Plan ($9/mo)</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Privacy & Legal</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('/privacy')} className="hover:text-rose-400 transition-colors">Privacy</button></li>
              <li><button onClick={() => onNavigate('/terms')} className="hover:text-rose-400 transition-colors">Terms of Service</button></li>
              <li><a href={`mailto:${BRAND.supportEmail}`} className="hover:text-rose-400 transition-colors flex items-center gap-1"><Mail className="w-3 h-3" /> Support ({BRAND.supportEmail})</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <span>© {new Date().getFullYear()} HushPic.com. Operated by CREIGNIFICENT LLC.</span>
          <span>Privacy-first local image processing</span>
        </div>
      </div>
    </footer>
  );
};
