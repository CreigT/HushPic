import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, Shield, HardDrive, Cpu, FileText, Mail, ExternalLink } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" /> HushPic Privacy Contract
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          HushPic Privacy Policy
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
          <span><strong>Effective date:</strong> August 28, 2026</span>
          <span>•</span>
          <span><strong>Last updated:</strong> August 28, 2026</span>
          <span>•</span>
          <span><strong>Service:</strong> HushPic.com</span>
          <span>•</span>
          <span><strong>Operator:</strong> Creignificent LLC</span>
        </div>
      </div>

      {/* Above the fold Short Form Privacy Contract */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/40 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
          <Lock className="w-5 h-5 text-emerald-400" />
          <span>Privacy Contract (short form)</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          HushPic is a local-only image pipeline. Decoding, manipulation, and encoding run in your browser with the HTML5 Canvas API and heic2any. There is no upload endpoint for your photos. We cannot see the files you drop. Quota state stays in your browser under <code className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-xs">hushpic_quota</code> and <code className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-xs">hushpic_quota_date</code>.
        </p>
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>If a future feature ever sends a file to a server, it will be labeled <strong className="text-white">Cloud</strong> in the UI before it can run.</span>
        </div>
      </div>

      {/* Full Unshortened Legal Policy */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed divide-y divide-slate-800/80">
        
        {/* Section 1 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>1. Scope</span>
          </h2>
          <p>
            This Privacy Policy explains how HushPic (“HushPic,” “we,” “us,” “our”) handles information when you visit HushPic.com and use the in-browser tools (the “Service”).
          </p>
          <p className="font-medium text-slate-200">It covers:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
            {[
              'HEIC to JPG',
              'Compress Image',
              'Resize for Social (Instagram, TikTok, YouTube, and other presets)',
              'Blur Background',
              'Studio Background Remover',
              'Add Border & Frame',
              '2× Upscale',
              'Watermark',
              'Convert Format (WebP, PNG, JPG, HEIC, BMP, SVG as supported by your browser)',
              'Rotate & Flip',
            ].map((toolName) => (
              <li key={toolName} className="flex items-center gap-2 text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="text-xs">{toolName}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-400 pt-1">
            It does not cover sites you use after you download a result (for example, posting the JPG to Instagram yourself).
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">2. Core processing rule</h2>
          <p>Every listed tool runs on-device:</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-300 font-medium">
            <li>Your file is read in this tab.</li>
            <li>Pixels are decoded in memory (Canvas and, when needed, heic2any).</li>
            <li>The selected operation runs locally.</li>
            <li>The result is encoded in this tab and offered as a download or ZIP from this tab.</li>
          </ol>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            HushPic does not operate a server upload API for conversion, compression, resize, blur, cutout, framing, upscale, watermark, format convert, rotate, or flip.
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">3. Information we do not collect from the tools</h2>
          <p>We do not receive or store:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Photo or video file bytes</li>
            <li>EXIF, GPS, depth, or other embedded metadata harvested from your files</li>
            <li>On-screen previews or before/after canvases</li>
            <li>Face, subject, or segmentation maps from Blur Background or Studio Background Remover</li>
            <li>Watermark text or logo files, except in local memory while that job runs</li>
            <li>A required account for Free use</li>
          </ul>
          <p className="text-slate-300">
            When you close the tab or navigate away, in-memory pixels from that session are gone from the Service.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 pt-6">
          <h2 className="text-lg font-bold text-white">4. Information stored only on your device</h2>
          <p>
            These keys are written to <code className="text-rose-300 font-mono">localStorage</code> on your browser. They do not contain images.
          </p>
          
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase font-semibold tracking-wider">
                  <th className="py-3 px-4 font-mono">Key</th>
                  <th className="py-3 px-4">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-mono text-rose-300 font-bold">hushpic_quota</td>
                  <td className="py-3 px-4">Count of jobs finished today</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-rose-300 font-bold">hushpic_quota_date</td>
                  <td className="py-3 px-4">Calendar date used to reset the daily count</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-rose-300 font-bold">hushpic_plan</td>
                  <td className="py-3 px-4">Local Pro flag after a real checkout success, if billing is enabled</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-xs">
            You can delete them with your browser’s site data / cookies controls. Clearing them resets quota and the local plan flag on that device.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">5. Information the website host may see</h2>
          <p>
            Delivering the HTML, CSS, and JavaScript through a static host or CDN (for example Vercel) may create ordinary request logs: IP address, time, path, user-agent, referrer. That is how any public website is served. Those logs are not your photos and are not linked to drop-zone files.
          </p>
          <p>
            We do not run advertising pixels. We do not run a cross-site analytics profile on tool usage. If cookieless, privacy-respecting analytics are added later, this policy will be updated first. Analytics will never include files from the drop zone.
          </p>
          <p>
            If you email support, we receive only what you send (address, message, optional sample). Do not attach sensitive photos. Samples are deleted when the ticket is done.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">6. Payments</h2>
          <p>
            If Pro billing is turned on, Stripe processes the subscription. Stripe receives the payment fields you enter on Stripe Checkout. Stripe does not receive your images.
          </p>
          <p>
            Until Stripe is configured, HushPic will not collect card data and will not show a fake checkout form.
          </p>
          <p className="text-xs text-slate-400">
            Stripe’s policy: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline inline-flex items-center gap-1">https://stripe.com/privacy <ExternalLink className="w-3 h-3" /></a>
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">7. Third-party scripts in the page</h2>
          <p>Loaded only to run locally in your tab:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li><strong>heic2any</strong> (typically via a public CDN) — HEIC/HEIF decode when the browser cannot do it natively</li>
            <li><strong>JSZip</strong> — Pro batch ZIP, when you ask for it</li>
            <li>Interface fonts (for example Google Fonts)</li>
          </ul>
          <p className="text-slate-400 text-xs">
            Those libraries execute in your page. Image bytes are not posted to the CDN. The CDN may log that the script file itself was requested.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">8. Cookies</h2>
          <p>
            No advertising cookies. Quota and plan use <code className="text-rose-300 font-mono">localStorage</code>. The host may set a technical cookie required to serve HTTPS.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">9. Tool-specific notes</h2>
          <ul className="space-y-2 text-slate-300">
            <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-white">Blur Background</strong> and <strong className="text-white">Studio Background Remover</strong> compute depth or edge work in the tab. No cutout is uploaded for model inference on our servers.
            </li>
            <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-white">2× Upscale</strong> is local dimension scaling / sharpening in Canvas, not a cloud generative model.
            </li>
            <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-white">Watermark</strong> applies your text or logo in memory only.
            </li>
            <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-white">Convert Format</strong> and <strong className="text-white">HEIC to JPG</strong> encode in the browser. Support for a given output (BMP, SVG, HEIC write-back) depends on what that browser can encode. Failure stays local.
            </li>
            <li className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-white">Rotate & Flip</strong> change pixel orientation in Canvas only.
            </li>
          </ul>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">10. Legal bases (EEA / UK)</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Hosting logs: legitimate interests in operating and securing the site</li>
            <li>Support email: contract or legitimate interests in answering you</li>
            <li>Stripe: performance of a paid contract you request</li>
            <li>Image processing: performed by you, on your device — not HushPic cloud processing</li>
          </ul>
        </section>

        {/* Section 11 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">11. California and similar US state laws</h2>
          <p>
            We do not sell personal information. We do not share personal information for cross-context behavioral advertising. We do not collect sensitive personal information from the image tools.
          </p>
          <p>
            You may request access to or deletion of information we actually hold (usually a support email). We cannot delete photos we never received.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">12. Children</h2>
          <p>
            The Service is not directed to children under 13, or the minimum age in your country. We do not knowingly collect their personal information.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">13. Retention</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Images in the tab: only while the page holds them in memory</li>
            <li><code className="text-rose-300 font-mono">localStorage</code> keys: until you clear site data</li>
            <li>Support email: until the request is resolved, then deleted or minimized</li>
            <li>Stripe / host logs: under those providers’ rules</li>
          </ul>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">14. Security</h2>
          <p>
            Use an updated browser. The public site is served over HTTPS when hosted. No transmission or device is perfectly secure. The privacy design assumes files never leave the device during a tool job.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">15. International hosting</h2>
          <p>
            Static assets may be served from edge locations outside your country. That infrastructure still does not include drop-zone files.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">16. Future cloud tools</h2>
          <p>
            Any feature that uploads a file will be labeled <strong className="text-white">Cloud</strong> before it can run. This policy will be updated before that feature ships.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-lg font-bold text-white">17. Changes</h2>
          <p>
            The Last updated date will change when this policy changes. Material changes to file handling will be stated on this page.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3 pt-6 pb-4">
          <h2 className="text-lg font-bold text-white">18. Contact</h2>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <p className="font-bold text-white">Creignificent LLC</p>
            <p className="text-slate-300">HushPic privacy</p>
            <p className="flex items-center gap-2 text-rose-400">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${BRAND.supportEmail}`} className="hover:underline">{BRAND.supportEmail}</a>
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>Public URL when deployed: <a href="https://hushpic.com/privacy.html" className="text-slate-300 underline">https://hushpic.com/privacy.html</a></p>
              <p>In-app route: <code className="text-rose-300">/#/privacy</code> or <code className="text-rose-300">/privacy</code></p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

