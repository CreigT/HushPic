import React, { useState, useRef, useEffect } from 'react';
import { 
  Lock, 
  ChevronDown, 
  Sparkles, 
  User, 
  Menu, 
  X, 
  Smartphone, 
  Minimize2, 
  Share2, 
  Eraser, 
  Square, 
  Maximize, 
  ShieldCheck, 
  RefreshCw, 
  RotateCw,
  Search,
  Zap,
  LogOut
} from 'lucide-react';
import { QuotaPill } from './QuotaPill';
import { QuotaStatus } from '../lib/quota';
import { TOOLS, ToolConfig } from '../../config/tools';

interface AppHeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  quota: QuotaStatus;
  onOpenPaywall: () => void;
  onOpenSignIn: () => void;
  onOpenAccount: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentRoute,
  onNavigate,
  quota,
  onOpenPaywall,
  onOpenSignIn,
  onOpenAccount,
}) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTools = TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortJob.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Minimize2': return <Minimize2 className="w-4 h-4" />;
      case 'Share2': return <Share2 className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Eraser': return <Eraser className="w-4 h-4" />;
      case 'Square': return <Square className="w-4 h-4" />;
      case 'Maximize': return <Maximize className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4" />;
      case 'RotateCw': return <RotateCw className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const handleToolSelect = (slug: string) => {
    setToolsOpen(false);
    setMobileMenuOpen(false);
    onNavigate(`/tools/${slug}`);
  };

  const signedIn = Boolean(quota.userEmail || quota.isPro);

  return (
    <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo + Desktop Navigation */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            aria-label="HushPic Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Lock className="w-4 h-4 fill-white/20" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                HushPic<span className="text-rose-500">.com</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  toolsOpen || currentRoute.startsWith('/tools')
                    ? 'text-white bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    toolsOpen ? 'rotate-180 text-rose-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Tools Dropdown Menu */}
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search image tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-1">
                    {filteredTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleToolSelect(tool.slug)}
                        className="w-full text-left flex items-start gap-3 p-2 rounded-xl hover:bg-slate-800/70 transition-colors group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-rose-500/20 group-hover:text-rose-400 transition-colors shrink-0">
                          {getIcon(tool.iconName)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-slate-200 group-hover:text-white truncate">
                              {tool.name}
                            </span>
                            {tool.flagship && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                Flagship
                              </span>
                            )}
                            {!tool.free && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                                Pro
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate">{tool.shortJob}</p>
                        </div>
                      </button>
                    ))}

                    {filteredTools.length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No tools found matching "{searchQuery}"
                      </div>
                    )}
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-800 flex justify-between items-center px-1">
                    <button
                      onClick={() => {
                        setToolsOpen(false);
                        onNavigate('/tools');
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
                    >
                      View all 10 tools →
                    </button>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-emerald-400" /> 100% In-Browser
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('/pricing')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentRoute === '/pricing'
                  ? 'text-white bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Pricing
            </button>
          </nav>
        </div>

        {/* Right: Quota + Pro CTA + Auth Button */}
        <div className="flex items-center gap-3">
          {/* Daily Quota Pill */}
          <div className="hidden sm:block">
            <QuotaPill quota={quota} onClickUpgrade={onOpenPaywall} />
          </div>

          {/* Upgrade CTA (if not pro) */}
          {!quota.isPro && (
            <button
              onClick={onOpenPaywall}
              className="relative group overflow-hidden rounded-full p-px font-semibold text-xs transition-all duration-300 cursor-pointer shadow-lg shadow-rose-500/10 hover:shadow-rose-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 rounded-full group-hover:opacity-90" />
              <span className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/20 text-white font-bold backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-rose-200" />
                <span>Upgrade Pro</span>
              </span>
            </button>
          )}

          {/* Sign In / Account Button - GUEST RULES ENFORCED: Guests cannot see Dashboard or Vault */}
          {signedIn ? (
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Account</span>
            </button>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="sm:hidden mb-2">
            <QuotaPill quota={quota} onClickUpgrade={onOpenPaywall} />
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/tools');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              All 10 Image Tools
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/pricing');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              Pricing Plans ($9/mo)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/privacy');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/terms');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              Terms of Service
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800">
            {signedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 text-sm font-semibold text-white"
              >
                <User className="w-4 h-4 text-rose-400" />
                Manage Account ({quota.userEmail || 'Pro Member'})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignIn();
                }}
                className="w-full py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-semibold text-white"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
