import React, { useEffect, useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import { auth, firebaseConfigured } from '../lib/firebase';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EMAIL_KEY = 'hushpic_email_for_signin';

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!firebaseConfigured || !isSignInWithEmailLink(auth, window.location.href)) return;
    const saved = window.localStorage.getItem(EMAIL_KEY) || window.prompt('Confirm your email address') || '';
    if (!saved) return;
    setIsSubmitting(true);
    signInWithEmailLink(auth, saved, window.location.href)
      .then(async (credential) => {
        window.localStorage.removeItem(EMAIL_KEY);
        window.localStorage.setItem('hushpic_user_email', credential.user.email || saved);
        const token = await credential.user.getIdToken();
        window.localStorage.setItem('hushpic_id_token', token);
        window.history.replaceState({}, '', '/');
        onSuccess();
        onClose();
      })
      .catch(() => setMessage('That sign-in link is invalid or expired. Request a new one.'))
      .finally(() => setIsSubmitting(false));
  }, [onClose, onSuccess]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firebaseConfigured) {
      setMessage('Sign-in is not configured yet.');
      return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/signin`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem(EMAIL_KEY, email);
      setMessage('Check your email. We sent you a secure sign-in link.');
    } catch {
      setMessage('Unable to send the sign-in link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"><X className="w-5 h-5" /></button>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-violet-600 flex items-center justify-center text-white mx-auto"><Lock className="w-6 h-6" /></div>
          <h3 className="text-2xl font-bold text-white">Sign In to HushPic</h3>
          <p className="text-xs text-slate-400">Passwordless email sign-in. Your images still never leave your device.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative"><Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" /><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white" /></div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
            {isSubmitting ? 'Please wait…' : <><span>Send Secure Sign-In Link</span><ArrowRight className="w-4 h-4" /></>}
          </button>
          {message && <p className="text-xs text-center text-slate-300">{message}</p>}
        </form>
        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Image processing remains on-device</span></div>
      </div>
    </div>
  );
};
