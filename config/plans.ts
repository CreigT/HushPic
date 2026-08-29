export interface Plan {
  id: 'free' | 'pro';
  name: string;
  price: number;
  period: string;
  description: string;
  badge?: string;
  features: string[];
  maxFileSizeMB: number;
  dailyQuota: number | 'Unlimited';
  batchProcessing: boolean;
  ctaText: string;
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Essential image utilities running 100% in your browser.',
    features: [
      '3 free conversions per day',
      '25MB max file size',
      '100% client-side privacy',
      'Zero cloud uploads',
      'Core conversion & compression',
      'No watermark'
    ],
    maxFileSizeMB: 25,
    dailyQuota: 3,
    batchProcessing: false,
    ctaText: 'Current Plan',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9,
    period: 'per month',
    badge: 'Unlimited Power',
    popular: true,
    description: 'Unlimited volume, batch operations, and pro AI filters.',
    features: [
      'Unlimited conversions every day',
      '500MB max file size',
      'Batch processing with ZIP download',
      'Background Remover & 2x HD Upscaler',
      'Highest quality rendering mode',
      'Never uploads to servers',
      'Priority support'
    ],
    maxFileSizeMB: 500,
    dailyQuota: 'Unlimited',
    batchProcessing: true,
    ctaText: 'Get Unlimited Pro — $9/mo',
  }
];
