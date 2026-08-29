import React from 'react';
import { ShieldCheck, Zap, Award, CloudOff } from 'lucide-react';

export const WhyCards: React.FC = () => {
  const points = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: '100% Private & In-Browser',
      description:
        'Your photos are decoded and processed directly by your computer’s CPU and GPU via HTML5 Canvas. Files never touch our servers.',
      highlight: 'Zero Cloud Storage',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Instant — No Upload Wait',
      description:
        'Why wait minutes uploading 100MB videos or images over slow connections? HushPic works locally at the speed of your processor.',
      highlight: 'Instant Local Speed',
    },
    {
      icon: <Award className="w-6 h-6 text-rose-400" />,
      title: 'Clean & No Watermarks',
      description:
        'Enjoy crystal clear output without ugly overlays or stamps on Free and Pro tiers. What you convert is 100% yours to keep.',
      highlight: 'Zero Branding Injected',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Why Choose HushPic?
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Designed for privacy-conscious photographers, designers, and everyday users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {points.map((pt, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 w-fit mb-4">
                {pt.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{pt.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{pt.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60">
              <span className="text-[11px] font-semibold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                {pt.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
