import React from 'react';
import { TrustChip } from './TrustChip';
import { ShieldCheck, Cpu, CloudOff } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-8 pb-4 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center">
      {/* 3. TrustChip ABOVE hero */}
      <div className="mb-6">
        <TrustChip />
      </div>

      {/* 4. Hero Headline & Subhead */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-4">
        Your <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">IMAGE</span> Tools
        <br />
        <span className="text-slate-100">All in One Place.</span>
      </h1>

      <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6">
        Resize, compress and convert your images in your browser. Files stay on device — not even us can see them.
      </p>

      {/* Value Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-slate-400">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
          <span>Privacy-first</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
          <Cpu className="w-3.5 h-3.5 text-violet-400" />
          <span>100% Local Processing</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
          <CloudOff className="w-3.5 h-3.5 text-pink-400" />
          <span>No Uploads • No Cloud</span>
        </div>
      </div>
    </section>
  );
};
