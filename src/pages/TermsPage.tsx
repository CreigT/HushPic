import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-300">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />Back to Home</button>

      <header className="space-y-3 border-b border-slate-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">HushPic Terms of Service</h1>
        <p className="text-sm text-slate-400">Last updated: September 14, 2026</p>
        <p className="text-sm leading-relaxed">These Terms govern your use of HushPic, operated by {BRAND.operator}. By using the service, you agree to these Terms.</p>
      </header>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">1. Service</h2><p className="text-sm leading-relaxed">HushPic provides browser-based image utilities including resizing, compression, conversion, rotation, watermarking, background-related tools, upscaling, and related features. Image-processing capability can vary by browser, device memory, file format, and file size.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">2. Accounts</h2><p className="text-sm leading-relaxed">Some features require an account. You are responsible for maintaining the confidentiality of your credentials and for activity under your account. You must provide accurate information and may not impersonate another person.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">3. Free and Pro Plans</h2><p className="text-sm leading-relaxed">The Free plan is subject to daily usage and file-size limits. The Pro plan is currently priced at $9 per month unless otherwise shown at checkout. Pro subscription status is determined from Stripe billing records. We may change plan features or prices prospectively, with applicable notice where required.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">4. Billing and Cancellation</h2><p className="text-sm leading-relaxed">Paid subscriptions are billed through Stripe and automatically renew until canceled. You may manage payment methods or cancel through Stripe Customer Portal. Unless required by law or explicitly stated otherwise, charges already incurred are non-refundable. Cancellation normally takes effect according to the billing settings shown in Stripe Customer Portal.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">5. Your Content</h2><p className="text-sm leading-relaxed">You retain ownership of images and other content you process. You represent that you have the rights needed to use the files you select. HushPic does not claim ownership of your images merely because you process them using the service.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">6. Acceptable Use</h2><p className="text-sm leading-relaxed">You may not misuse the service, interfere with its operation, attempt unauthorized access to accounts or infrastructure, automate abusive traffic, circumvent security controls for fraudulent purposes, or use HushPic in violation of applicable law or third-party rights.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">7. Privacy</h2><p className="text-sm leading-relaxed">Our Privacy Policy explains how image processing, account data, billing metadata, device usage records, and infrastructure logs are handled. Image bytes are designed to remain local during normal HushPic image processing, while account/billing/usage metadata may be processed by our service providers.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">8. Availability and Changes</h2><p className="text-sm leading-relaxed">We may update, suspend, or discontinue features to maintain security, reliability, legal compliance, or product quality. We do not guarantee uninterrupted or error-free availability.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">9. Disclaimer</h2><p className="text-sm leading-relaxed">HushPic is provided on an “as is” and “as available” basis to the extent permitted by law. We do not guarantee that every image will produce a desired result, that every browser can process the maximum advertised file size, or that the service will be suitable for every purpose.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">10. Limitation of Liability</h2><p className="text-sm leading-relaxed">To the maximum extent permitted by law, {BRAND.operator} will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the service. Any limitations that cannot legally apply in your jurisdiction remain subject to applicable law.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">11. Contact</h2><p className="text-sm leading-relaxed">Questions about these Terms may be sent to <a className="text-rose-400 hover:text-rose-300" href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>.</p><p className="text-[11px] text-slate-500">{BRAND.sponsorLine}</p></section>
    </div>
  );
};
