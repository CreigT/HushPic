import React from 'react';
import { Hero } from '../components/Hero';
import { DropZone } from '../components/DropZone';
import { PopularToolsRow } from '../components/PopularToolsRow';
import { ToolGrid } from '../components/ToolGrid';
import { WhyCards } from '../components/WhyCards';
import { PricingTable } from '../components/PricingTable';
import { FaqList } from '../components/FaqList';
import { QuotaStatus } from '../lib/quota';
import { PaywallReason } from '../components/PaywallModal';

interface HomePageProps {
  onNavigate: (route: string) => void;
  quota: QuotaStatus;
  onOpenPaywall: (reason?: PaywallReason, details?: string) => void;
  onFilesDropped: (files: File[]) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  quota,
  onOpenPaywall,
  onFilesDropped,
}) => {
  const handleSelectTool = (slug: string) => {
    onNavigate(`/tools/${slug}`);
  };

  return (
    <div className="space-y-4">
      {/* 3. & 4. TrustChip + Hero */}
      <Hero />

      {/* 5. DropZone */}
      <div className="pt-2">
        <DropZone
          onFilesSelected={onFilesDropped}
          onPaywallTrigger={(reason, details) => onOpenPaywall(reason, details)}
          quota={quota}
        />
      </div>

      {/* 6. PopularToolsRow (UNDER drop zone) */}
      <PopularToolsRow
        onSelectTool={handleSelectTool}
        onViewAllTools={() => onNavigate('/tools')}
      />

      {/* 7. ToolGrid 3 sections */}
      <div className="pt-8">
        <ToolGrid onSelectTool={handleSelectTool} />
      </div>

      {/* 8. Why cards */}
      <WhyCards />

      {/* 9. Pricing teaser */}
      <PricingTable
        quota={quota}
        onSelectPlan={(planId) => {
          if (planId === 'pro') {
            onOpenPaywall('general');
          }
        }}
      />

      {/* 10. FAQ (Q1 MUST be privacy) */}
      <FaqList />
    </div>
  );
};
