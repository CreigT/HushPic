import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  important?: boolean;
}

export const FaqList: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqs: FaqItem[] = [
    {
      q: 'Do you upload my images?',
      a: 'No, absolutely not. All file bytes are decoded and processed entirely in your browser using the HTML5 Canvas API and WebAssembly. Core tools never upload files to any server or cloud storage. If any specialized optional feature in the future ever uses cloud AI, it will be explicitly labeled with "Leaves this device".',
      important: true,
    },
    {
      q: 'How does HEIC to JPG work with iPhone photos?',
      a: 'When you take photos with modern iPhones and iPads, iOS saves them in Apple’s proprietary HEIC format. HushPic reads the raw HEIC container directly in your browser, parses the image buffer client-side, and converts it into universal, high-quality JPEG without sending your private camera roll to the internet.',
    },
    {
      q: 'What are the Free vs Pro limits?',
      a: 'The Free tier gives you 3 image conversions per day with a 25MB file size limit and no watermarks. Pro ($9/mo) gives you unlimited daily conversions, 500MB max file size, batch conversions with 1-click ZIP downloads, and access to the Background Remover and 2x HD Upscaler.',
    },
    {
      q: 'Can I batch convert multiple files at once?',
      a: 'Yes! Pro members can drag and drop dozens of images at once. HushPic processes them concurrently in the browser and packages the results into a single clean ZIP archive with one click.',
    },
    {
      q: 'How do subscriptions and cancellations work?',
      a: 'Subscriptions are billed securely at $9/month via Stripe Checkout. You can manage, update payment methods, or cancel your subscription anytime with 1-click through the self-serve Stripe Customer Portal in your Account dashboard.',
    },
    {
      q: 'Is HushPic compatible with all browsers and mobile devices?',
      a: 'Yes, HushPic runs on all modern browsers including Safari (iOS & Mac), Chrome, Firefox, Edge, and Android mobile browsers.',
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-rose-400" /> Frequently Asked Questions
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Learn about our privacy contract, browser engine, and features.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                faq.important
                  ? 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-500/5'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  {faq.important && (
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-rose-300' : 'text-slate-100'}`}>
                    {faq.q}
                  </span>
                </div>
                <div
                  className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-white bg-rose-500/20' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
