export type ToolCategory = 'Essentials' | 'Convert' | 'Extra';

export interface ToolConfig {
  id: string;
  slug: string;
  name: string;
  shortJob: string;
  description: string;
  category: ToolCategory;
  free: boolean;
  flagship?: boolean;
  popular?: boolean;
  iconName: string;
  acceptedFormats: string[];
  actionLabel: string;
  sampleImageUrl?: string;
  defaultOptions?: Record<string, any>;
}

export const TOOLS: ToolConfig[] = [
  // 1. HEIC to JPG (Flagship)
  {
    id: 'heic-to-jpg',
    slug: 'heic-to-jpg',
    name: 'HEIC to JPG',
    shortJob: 'Convert iPhone HEIC to JPG without uploading',
    description: 'Transform Apple HEIC and HEIF photos from iPhone & iPad into universal, crisp JPG images instantly in your browser.',
    category: 'Convert',
    free: true,
    flagship: true,
    popular: true,
    iconName: 'Smartphone',
    acceptedFormats: ['.heic', '.heif', '.jpg', '.jpeg', '.png'],
    actionLabel: 'Convert to JPG',
    defaultOptions: {
      quality: 92,
    },
  },
  // 2. Compress Image
  {
    id: 'compress',
    slug: 'compress',
    name: 'Compress Image',
    shortJob: 'Shrink file size up to 90% without quality loss',
    description: 'Reduce image weight for faster web loading, email attachments, and apps while keeping sharp visual clarity.',
    category: 'Essentials',
    free: true,
    popular: true,
    iconName: 'Minimize2',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.heic'],
    actionLabel: 'Compress Image',
    defaultOptions: {
      compressionLevel: 'recommended', // 'low' | 'recommended' | 'high' | 'custom'
      quality: 75,
      maxWidth: 1920,
    },
  },
  // 3. Resize for Social
  {
    id: 'resize-social',
    slug: 'resize-social',
    name: 'Resize for Social',
    shortJob: 'Perfect dimensions for TikTok, Insta, YouTube & more',
    description: 'Auto-format your photos into standard aspect ratios and exact pixel dimensions for all major social media platforms.',
    category: 'Essentials',
    free: true,
    popular: true,
    iconName: 'Share2',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Resize Image',
    defaultOptions: {
      preset: 'instagram-square',
      fitMode: 'cover', // 'cover' | 'contain' | 'pad'
      padColor: '#000000',
    },
  },
  // 4. Blur Background
  {
    id: 'blur-background',
    slug: 'blur-background',
    name: 'Blur Background',
    shortJob: 'Add professional DSLR-style portrait blur',
    description: 'Highlight your subject with smooth radial and depth blur effects processed completely on your device.',
    category: 'Extra',
    free: true,
    popular: true,
    iconName: 'Sparkles',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Apply Portrait Blur',
    defaultOptions: {
      blurRadius: 15,
      focalSize: 45,
      feather: 30,
    },
  },
  // 5. Background Remover (Pro)
  {
    id: 'remove-background',
    slug: 'remove-background',
    name: 'Background Remover',
    shortJob: 'Instantly isolate subjects with transparent cutout',
    description: 'Browser-based color and contrast edge segmentation engine that creates clean transparent PNG cutouts in seconds.',
    category: 'Extra',
    free: false,
    popular: true,
    iconName: 'Eraser',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Remove Background',
    defaultOptions: {
      sensitivity: 35,
      smoothing: 2,
      targetColorMode: 'auto', // 'auto' | 'custom'
    },
  },
  // 6. Add Border
  {
    id: 'add-border',
    slug: 'add-border',
    name: 'Add Border & Frame',
    shortJob: 'Add stylish white frame, polaroid, or colored border',
    description: 'Frame your photos with customizable borders, polaroid styles, drop shadows, and rounded corners for Instagram and printing.',
    category: 'Extra',
    free: true,
    popular: true,
    iconName: 'Square',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Add Border',
    defaultOptions: {
      borderWidth: 32,
      borderColor: '#ffffff',
      style: 'solid', // 'solid' | 'polaroid' | 'shadow'
      radius: 0,
    },
  },
  // 7. Upscale Image (Pro)
  {
    id: 'upscale',
    slug: 'upscale',
    name: 'Upscale Image',
    shortJob: 'Super resolution 2x HD upscale with enhanced clarity',
    description: 'Double your image resolution using edge-preserving Lanczos and unsharp masking algorithms in the browser.',
    category: 'Extra',
    free: false,
    popular: true,
    iconName: 'Maximize',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Upscale to 2x HD',
    defaultOptions: {
      scale: 2,
      enhanceSharpness: true,
    },
  },
  // 8. Watermark
  {
    id: 'watermark',
    slug: 'watermark',
    name: 'Watermark',
    shortJob: 'Protect work with custom text or logo watermarks',
    description: 'Stamp copyright notices, photography credits, or logos with 9-point grid alignment, opacity, and repeat tiling.',
    category: 'Extra',
    free: true,
    popular: false,
    iconName: 'ShieldCheck',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Apply Watermark',
    defaultOptions: {
      text: '© HushPic Protected',
      position: 'bottom-right',
      opacity: 70,
      fontSize: 24,
      color: '#ffffff',
      tiled: false,
    },
  },
  // 9. Convert Image
  {
    id: 'convert',
    slug: 'convert',
    name: 'Convert Image',
    shortJob: 'Convert seamlessly between JPG, PNG, and WebP',
    description: 'Switch between next-gen WebP, lossless PNG, or lightweight JPG without losing metadata or color profiles.',
    category: 'Convert',
    free: true,
    popular: false,
    iconName: 'RefreshCw',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.bmp', '.svg'],
    actionLabel: 'Convert Format',
    defaultOptions: {
      targetFormat: 'image/webp',
      quality: 90,
    },
  },
  // 10. Rotate & Flip
  {
    id: 'rotate',
    slug: 'rotate',
    name: 'Rotate & Flip',
    shortJob: 'Rotate 90°, 180°, 270° or flip horizontally/vertically',
    description: 'Quickly fix orientation, mirror selfies, and rotate landscape photos without touching server infrastructure.',
    category: 'Essentials',
    free: true,
    popular: false,
    iconName: 'RotateCw',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Transform Image',
    defaultOptions: {
      angle: 90,
      flipH: false,
      flipV: false,
    },
  },
];

export const SOCIAL_PRESETS = [
  { id: 'instagram-square', name: 'Instagram Square', width: 1080, height: 1080, aspect: '1:1', icon: 'Instagram' },
  { id: 'instagram-portrait', name: 'Instagram Portrait', width: 1080, height: 1350, aspect: '4:5', icon: 'Instagram' },
  { id: 'instagram-story', name: 'Instagram Story / Reel', width: 1080, height: 1920, aspect: '9:16', icon: 'Instagram' },
  { id: 'tiktok-video', name: 'TikTok Portrait', width: 1080, height: 1920, aspect: '9:16', icon: 'Video' },
  { id: 'youtube-thumb', name: 'YouTube Thumbnail', width: 1280, height: 720, aspect: '16:9', icon: 'Youtube' },
  { id: 'twitter-post', name: 'X / Twitter Post', width: 1200, height: 675, aspect: '16:9', icon: 'Twitter' },
  { id: 'linkedin-post', name: 'LinkedIn Post', width: 1200, height: 627, aspect: '1.91:1', icon: 'Linkedin' },
  { id: 'facebook-cover', name: 'Facebook Banner', width: 1200, height: 630, aspect: '1.91:1', icon: 'Facebook' },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return TOOLS.find((t) => t.slug === slug || t.id === slug);
}
