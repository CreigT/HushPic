import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-300">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />Back to Home</button>

      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold"><ShieldCheck className="w-4 h-4" /> Privacy Policy</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">HushPic Privacy Policy</h1>
        <p className="text-sm text-slate-400">Last updated: September 14, 2026</p>
        <p className="text-sm leading-relaxed">HushPic is operated by {BRAND.operator}. Our product is designed so image bytes are processed locally in your browser. Account, billing, security, and usage metadata may be processed by trusted service providers as described below.</p>
      </header>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">1. Image Processing</h2><p className="text-sm leading-relaxed">Images selected for HushPic tools are processed in browser memory using client-side web APIs and libraries. HushPic does not intentionally upload your image bytes to our application servers for image processing. Closing or refreshing the page clears browser memory associated with the current session, subject to normal browser behavior.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">2. Account Data</h2><p className="text-sm leading-relaxed">If you create an account, Firebase Authentication may process your email address, authentication credentials, verification status, user identifier, security metadata, and related account information. Passwords are handled by Firebase Authentication and are not stored in HushPic application code.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">3. Billing Data</h2><p className="text-sm leading-relaxed">Paid subscriptions are processed by Stripe. Stripe may collect payment card details, billing information, transaction records, tax-related information, and fraud-prevention data under Stripe's own privacy terms. HushPic receives subscription/customer identifiers and subscription status needed to manage access. HushPic does not store raw payment card numbers.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">4. Usage and Device Metadata</h2><p className="text-sm leading-relaxed">To enforce the free daily usage limit, HushPic may set a secure device cookie and store a hashed device identifier with the date and usage count. Signed-in users may have usage associated with their authenticated user ID. Standard hosting infrastructure may also process request metadata such as IP address, user agent, timestamps, and error logs for security and reliability.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">5. Service Providers</h2><p className="text-sm leading-relaxed">HushPic relies on service providers including Vercel for hosting/serverless infrastructure, Google Firebase for authentication and database services, and Stripe for billing. These providers process data according to their own agreements and privacy policies.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">6. Data Retention</h2><p className="text-sm leading-relaxed">We retain account and subscription metadata for as long as reasonably necessary to operate the service, meet legal/accounting obligations, resolve disputes, and prevent abuse. Daily usage records may be retained for operational and abuse-prevention purposes. Stripe retains billing records according to its policies and applicable law.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">7. Security</h2><p className="text-sm leading-relaxed">We use authentication verification, server-side entitlement checks, locked database rules, secure cookies, HTTPS, and access controls intended to reduce unauthorized access. No internet service can guarantee absolute security.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">8. Children</h2><p className="text-sm leading-relaxed">HushPic is not directed to children under 13 and is not intended to knowingly collect personal information from children under 13.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">9. Your Choices</h2><p className="text-sm leading-relaxed">You may choose not to create an account and use the available free functionality subject to usage limits. You may manage or cancel a paid subscription through Stripe Customer Portal. For privacy requests related to HushPic-controlled data, contact us using the support address below.</p></section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-white">10. Contact</h2><p className="text-sm leading-relaxed">Questions or privacy requests: <a className="text-rose-400 hover:text-rose-300" href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>.</p><p className="text-[11px] text-slate-500">{BRAND.sponsorLine}</p></section>
    </div>
  );
};
