import React, { useState, useEffect } from 'react';
import { PromoBar } from './components/PromoBar';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { PaywallModal, PaywallReason } from './components/PaywallModal';
import { SignInModal } from './components/SignInModal';
import { AccountSheet } from './components/AccountSheet';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { PricingPage } from './pages/PricingPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AccountPage } from './pages/AccountPage';
import { ToolWorkspace } from './components/ToolWorkspace';
import { getQuotaStatus, QuotaStatus } from './lib/quota';
import { getToolBySlug, TOOLS } from '../config/tools';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [quota, setQuota] = useState<QuotaStatus>(getQuotaStatus());
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState<PaywallReason>('general');
  const [paywallDetails, setPaywallDetails] = useState<string | undefined>(undefined);
  const [signInOpen, setSignInOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  // Update quota state when changes occur
  const refreshQuota = () => {
    setQuota(getQuotaStatus());
  };

  useEffect(() => {
    refreshQuota();
    const handleQuotaUpdate = () => refreshQuota();
    window.addEventListener('hushpic_quota_updated', handleQuotaUpdate);
    return () => window.removeEventListener('hushpic_quota_updated', handleQuotaUpdate);
  }, []);

  // Listen to browser popstate / hashchange / back-forward
  useEffect(() => {
    const handleLocationChange = () => {
      let path = window.location.pathname || '/';
      if (window.location.hash) {
        const hashPath = window.location.hash.replace('#', '');
        if (hashPath.startsWith('/')) {
          path = hashPath;
        }
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

  // When files are dropped directly on homepage dropzone:
  const handleHomepageFilesDropped = (files: File[]) => {
    if (files.length === 0) return;
    const firstFile = files[0];
    const fileName = firstFile.name.toLowerCase();
    
    // Auto-route to the best matching tool based on file
    let targetSlug = 'compress';
    if (fileName.endsWith('.heic') || fileName.endsWith('.heif')) {
      targetSlug = 'heic-to-jpg';
    } else if (fileName.endsWith('.png') || fileName.endsWith('.webp')) {
      targetSlug = 'compress';
    }
    
    navigate(`/tools/${targetSlug}`);
  };

  // Resolve active tool if route is /tools/:slug
  let activeTool = null;
  if (currentRoute.startsWith('/tools/')) {
    const slug = currentRoute.replace('/tools/', '').split('/')[0];
    activeTool = getToolBySlug(slug) || TOOLS[0];
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-[#f8fafc]">
      {/* 1. PromoBar (One line only: Launch Offer: Get Pro for $9/mo - View Offer -> /pricing) */}
      <PromoBar onNavigate={navigate} />

      {/* 2. AppHeader */}
      <AppHeader
        currentRoute={currentRoute}
        onNavigate={navigate}
        quota={quota}
        onOpenPaywall={() => handleOpenPaywall('general')}
        onOpenSignIn={() => setSignInOpen(true)}
        onOpenAccount={() => {
          if (quota.userEmail || quota.isPro) {
            navigate('/account');
          } else {
            setSignInOpen(true);
          }
        }}
      />

      {/* Main Page Router Views */}
      <main className="flex-1">
        {/* HOMEPAGE */}
        {currentRoute === '/' && (
          <HomePage
            onNavigate={navigate}
            quota={quota}
            onOpenPaywall={handleOpenPaywall}
            onFilesDropped={handleHomepageFilesDropped}
          />
        )}

        {/* ALL TOOLS CATALOG */}
        {currentRoute === '/tools' && (
          <ToolsPage onSelectTool={(slug) => navigate(`/tools/${slug}`)} />
        )}

        {/* WORKSPACE SHELL (every /tools/{slug} same chrome) */}
        {currentRoute.startsWith('/tools/') && activeTool && (
          <ToolWorkspace
            tool={activeTool}
            onBack={() => navigate('/tools')}
            quota={quota}
            onOpenPaywall={handleOpenPaywall}
          />
        )}

        {/* PRICING PAGE */}
        {currentRoute === '/pricing' && (
          <PricingPage
            quota={quota}
            onOpenPaywall={() => handleOpenPaywall('general')}
            onBack={() => navigate('/')}
          />
        )}

        {/* SIGN IN / SIGN UP */}
        {(currentRoute === '/signin' || currentRoute === '/signup') && (
          <div className="py-12">
            <SignInModal
              isOpen={true}
              onClose={() => navigate('/')}
              onSuccess={() => {
                refreshQuota();
                navigate('/');
              }}
            />
          </div>
        )}

        {/* ACCOUNT PAGE (Guests cannot see Dashboard or Vault. Only signed-in see Account) */}
        {currentRoute === '/account' && (
          <AccountPage
            quota={quota}
            onBack={() => navigate('/')}
            onOpenPaywall={() => handleOpenPaywall('general')}
            onOpenSignIn={() => setSignInOpen(true)}
          />
        )}

        {/* PRIVACY POLICY */}
        {currentRoute === '/privacy' && (
          <PrivacyPage onBack={() => navigate('/')} />
        )}

        {/* TERMS OF SERVICE */}
        {currentRoute === '/terms' && (
          <TermsPage onBack={() => navigate('/')} />
        )}
      </main>

      {/* 11. Footer: Privacy, Terms, Support, canonical HushPic.com, OG HushPic.com */}
      <AppFooter onNavigate={navigate} />

      {/* GLOBAL MODALS */}
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        reason={paywallReason}
        customDetails={paywallDetails}
        onSuccessUpgrade={() => {
          refreshQuota();
        }}
      />

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSuccess={() => {
          refreshQuota();
        }}
      />

      <AccountSheet
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        quota={quota}
        onOpenPaywall={() => {
          setAccountOpen(false);
          handleOpenPaywall('general');
        }}
      />
    </div>
  );
}
