import React from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, Shield, ExternalLink, Mail } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFullPage?: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  onViewFullPage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">HushPic Privacy Contract</h3>
              <p className="text-xs text-slate-400">Operator: Creignificent LLC • Effective: August 28, 2026</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300">
          {/* Above the fold short-form contract */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Privacy Contract (Short Form)</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              HushPic is a local-only image pipeline. Decoding, manipulation, and encoding run in your browser with the HTML5 Canvas API and heic2any. There is no upload endpoint for your photos. We cannot see the files you drop. Quota state stays in your browser under <code className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-[11px]">hushpic_quota</code> and <code className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-[11px]">hushpic_quota_date</code>.
            </p>
            <p className="text-xs text-emerald-300">
              If a future feature ever sends a file to a server, it will be labeled <strong className="text-white">Cloud</strong> in the UI before it can run.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">Core Processing Guarantee</h4>
            <p>
              Every listed tool runs entirely on-device (HEIC to JPG, Compress, Resize for Social, Blur Background, Studio Background Remover, Add Border, 2× Upscale, Watermark, Convert, Rotate/Flip). No photo bytes or EXIF metadata are harvested or transmitted.
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2 font-mono text-[11px]">
              <div className="text-slate-400 font-bold">LocalStorage Keys on your Device:</div>
              <div className="text-slate-300"><code>hushpic_quota</code> — Count of jobs finished today</div>
              <div className="text-slate-300"><code>hushpic_quota_date</code> — Calendar date used to reset the daily count</div>
              <div className="text-slate-300"><code>hushpic_plan</code> — Local Pro flag after real checkout success</div>
            </div>

            <div className="pt-2 text-slate-400">
              For full legal details, legal bases, and state disclosures, read the complete unshortened policy on the <button onClick={() => { onClose(); onViewFullPage?.(); }} className="text-rose-400 underline font-semibold cursor-pointer">/privacy</button> page.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Contact: <a href="mailto:CreigTerrence@gmail.com" className="text-rose-400 hover:underline">CreigTerrence@gmail.com</a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Close Contract
          </button>
        </div>
      </div>
    </div>
  );
};
