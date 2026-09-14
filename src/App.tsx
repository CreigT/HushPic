import React, { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { PromoBar } from './components/PromoBar';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { PaywallModal, PaywallReason } from './components/PaywallModal';
import { SignInModal } from './components/SignInModal';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { PricingPage } from './pages/PricingPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AccountPage } from './pages/AccountPage';
import { ToolWorkspace } from './components/ToolWorkspace';
import { EMPTY_QUOTA, getQuotaStatus, QuotaStatus } from './lib/quota';
import { auth } from './lib/firebase';
import { getToolBySlug, TOOLS } from '../config/tools';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [quota, setQuota] = useState<QuotaStatus>(EMPTY_QUOTA);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState<PaywallReason>('general');
  const [paywallDetails, setPaywallDetails] = useState<string | undefined>(undefined);
  const [signInOpen, setSignInOpen] = useState(false);

  const refreshQuota = useCallback(async () => {
    try {
      setQuota(await getQuotaStatus());
    } catch (error) {
      console.error('Unable to refresh quota', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      void refreshQuota();
    });
    void refreshQuota();
    return unsubscribe;
  }, [refreshQuota]);

  useEffect(() => {
    const handleLocationChange = () => {
      let path = window.location.pathname || '/';
      if (window.location.hash) {
        const hashPath = window.location.hash.replace('#', '');
        if (hashPath.startsWith('/')) path = hashPath;
      }
      setCurrentRoute(path);
    };
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', route);
    } catch {
      // safe fallback if sandbox prevents history
    }
  };

  const handleOpenPaywall = (reason: PaywallReason = 'general', details?: string) => {
    setPaywallReason(reason);
    setPaywallDetails(details);
    setPaywallOpen(true);
  };

  const handleHomepageFilesDropped = (files: File[]) => {
    if (files.length === 0) return;
    const fileName = files[0].name.toLowerCase();
    let targetSlug = 'compress';
    if (fileName.endsWith('.heic') || fileName.endsWith('.heif')) targetSlug = 'heic-to-jpg';
    navigate(`/tools/${targetSlug}`);
  };

  let activeTool = null;
  if (currentRoute.startsWith('/tools/')) {
    const slug = currentRoute.replace('/tools/', '').split('/')[0];
    activeTool = getToolBySlug(slug) || TOOLS[0];
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-[#f8fafc]">
      <PromoBar onNavigate={navigate} />
      <AppHeader
        currentRoute={currentRoute}
        onNavigate={navigate}
        quota={quota}
        onOpenPaywall={() => handleOpenPaywall('general')}
        onOpenSignIn={() => setSignInOpen(true)}
        onOpenAccount={() => {
          if (auth.currentUser) navigate('/account');
          else setSignInOpen(true);
        }}
      />

      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage onNavigate={navigate} quota={quota} onOpenPaywall={handleOpenPaywall} onFilesDropped={handleHomepageFilesDropped} />
        )}
        {currentRoute === '/tools' && <ToolsPage onSelectTool={(slug) => navigate(`/tools/${slug}`)} />}
        {currentRoute.startsWith('/tools/') && activeTool && (
          <ToolWorkspace tool={activeTool} onBack={() => navigate('/tools')} quota={quota} onOpenPaywall={handleOpenPaywall} onQuotaChanged={refreshQuota} />
        )}
        {currentRoute === '/pricing' && (
          <PricingPage quota={quota} onOpenPaywall={() => handleOpenPaywall('general')} onBack={() => navigate('/')} />
        )}
        {(currentRoute === '/signin' || currentRoute === '/signup') && (
          <div className="py-12">
            <SignInModal isOpen={true} onClose={() => navigate('/')} onSuccess={() => { void refreshQuota(); navigate('/'); }} />
          </div>
        )}
        {currentRoute === '/account' && (
          <AccountPage quota={quota} onBack={() => navigate('/')} onOpenPaywall={() => handleOpenPaywall('general')} onOpenSignIn={() => setSignInOpen(true)} onAuthChanged={refreshQuota} />
        )}
        {currentRoute === '/privacy' && <PrivacyPage onBack={() => navigate('/')} />}
        {currentRoute === '/terms' && <TermsPage onBack={() => navigate('/')} />}
      </main>

      <AppFooter onNavigate={navigate} />
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        reason={paywallReason}
        customDetails={paywallDetails}
        onSuccessUpgrade={() => void refreshQuota()}
        onRequireSignIn={() => { setPaywallOpen(false); setSignInOpen(true); }}
      />
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} onSuccess={() => void refreshQuota()} />
    </div>
  );
}
