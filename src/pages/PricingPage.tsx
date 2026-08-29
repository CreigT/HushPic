import React from 'react';
import { PricingTable } from '../components/PricingTable';
import { FaqList } from '../components/FaqList';
import { QuotaStatus } from '../lib/quota';
import { ShieldCheck, Check, Zap, Sparkles, Lock, ArrowLeft } from 'lucide-react';

interface PricingPageProps {
  quota: QuotaStatus;
  onOpenPaywall: () => void;
  onBack: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  quota,
  onOpenPaywall,
  onBack,
}) => {
  return (
    <div className="space-y-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group mb-6"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <PricingTable
          quota={quota}
          onSelectPlan={(planId) => {
            if (planId === 'pro') {
              onOpenPaywall();
            }
          }}
        />

        {/* Deep Comparison Feature Matrix */}
        <div className="max-w-4xl mx-auto mt-16 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white tracking-tight text-center">
            Detailed Plan Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">Free ($0)</th>
                  <th className="py-3 px-4 text-rose-400">Pro ($9/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Daily Conversions</td>
                  <td className="py-3 px-4">3 per day (resets 00:00)</td>
                  <td className="py-3 px-4 text-rose-300 font-bold">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Max File Size</td>
                  <td className="py-3 px-4">25MB per file</td>
                  <td className="py-3 px-4 text-rose-300 font-bold">500MB per file</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Browser Privacy Engine</td>
                  <td className="py-3 px-4 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 100% In-Browser
                  </td>
                  <td className="py-3 px-4 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 100% In-Browser
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">iPhone HEIC to JPG</td>
                  <td className="py-3 px-4">Included (3/day)</td>
                  <td className="py-3 px-4 text-rose-300">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Batch Convert & ZIP</td>
                  <td className="py-3 px-4 text-slate-500">—</td>
                  <td className="py-3 px-4 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Included
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Background Remover</td>
                  <td className="py-3 px-4 text-slate-500">—</td>
                  <td className="py-3 px-4 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Included
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">2x HD Upscaler</td>
                  <td className="py-3 px-4 text-slate-500">—</td>
                  <td className="py-3 px-4 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Included
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Watermarks & Ads</td>
                  <td className="py-3 px-4">No watermarks</td>
                  <td className="py-3 px-4 font-bold text-white">No watermarks</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Billing & Cancellation</td>
                  <td className="py-3 px-4">Free forever</td>
                  <td className="py-3 px-4">Self-serve Stripe 1-click cancel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FaqList />
    </div>
  );
};
