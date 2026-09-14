import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  important?: boolean;
}

export const FaqList: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'Do you upload my images?',
      a: 'HushPic image tools are designed to process image bytes locally in your browser. The app does not upload your image bytes to HushPic servers for processing. Account, billing, usage, security, and normal hosting request metadata may still be processed by Firebase, Stripe, Vercel, or HushPic as described in the Privacy Policy.',
      important: true,
    },
    {
      q: 'How does HEIC to JPG work with iPhone photos?',
      a: 'HushPic uses a browser-side HEIC decoder and browser image APIs to convert supported HEIC or HEIF images to JPG. The conversion runs locally on your device, subject to browser and device compatibility.',
    },
    {
      q: 'What are the Free vs Pro limits?',
      a: 'The Free tier includes 3 server-verified uses per day and a 25MB file-size limit. Pro is $9/month and adds unlimited daily usage, batch ZIP processing, Pro image tools, and support for files up to 500MB when the browser and device have enough memory.',
    },
    {
      q: 'Can I batch convert multiple files at once?',
      a: 'Yes. Pro members can select multiple supported images, process them locally in the browser, and package the results into a ZIP file. Very large batches are still limited by available device memory.',
    },
    {
      q: 'How do subscriptions and cancellations work?',
      a: 'Subscriptions use Stripe-hosted Checkout. After purchase, Stripe webhooks update your verified Pro entitlement. You can manage payment methods or cancel through Stripe Customer Portal from your HushPic account.',
    },
    {
      q: 'Is HushPic compatible with every browser and device?',
      a: 'HushPic targets modern browsers, but image codecs, canvas behavior, memory limits, HEIC support, and very large files vary by browser and device. We do not guarantee every tool or maximum file size will work on every device.',
    },
  ];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-rose-400" /> Frequently Asked Questions
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Everything You Need to Know</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Privacy, local processing, billing, and browser limitations.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`rounded-2xl border transition-all duration-200 overflow-hidden ${faq.important ? 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-500/5' : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'}`}>
              <button type="button" onClick={() => toggle(idx)} className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none">
                <div className="flex items-center gap-3">
                  {faq.important && <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />}
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-rose-300' : 'text-slate-100'}`}>{faq.q}</span>
                </div>
                <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-white bg-rose-500/20' : ''}`}><ChevronDown className="w-4 h-4" /></div>
              </button>
              {isOpen && <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60"><p>{faq.a}</p></div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};
