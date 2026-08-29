import React from 'react';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
          <FileText className="w-4 h-4 text-rose-400" /> Terms of Service
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms & Conditions of Service
        </h1>
        <p className="text-sm text-slate-400">
          Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • HushPic.com
        </p>
      </div>

      {/* Terms Body */}
      <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the services at <strong>https://HushPic.com</strong>, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            2. Service Description & Subscription Tiers
          </h2>
          <p>
            HushPic provides browser-based image compression, format conversion, and graphical editing utilities.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong>Free Tier:</strong> Includes up to 3 conversions per day and maximum file sizes of 25MB.</li>
            <li><strong>Pro Tier ($9/month):</strong> Includes unlimited conversions, 500MB file uploads, batch ZIP downloads, and advanced filters.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            3. Subscriptions, Payments & Cancellations
          </h2>
          <p>
            Payments are processed securely through Stripe. Subscriptions renew automatically each month unless canceled prior to the renewal date. You can cancel your subscription at any time via the self-service Stripe Customer Portal in your Account dashboard with no cancellation fees.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            4. User Content & Intellectual Property
          </h2>
          <p>
            Because all file conversions occur locally on your machine, HushPic does not claim any ownership, license, or rights over your images. You retain full intellectual property rights to all media processed through our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            5. Support & Inquiries
          </h2>
          <p>
            For support requests, billing queries, or technical assistance, contact our team at <a href={`mailto:${BRAND.supportEmail}`} className="text-rose-400 hover:underline">{BRAND.supportEmail}</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
