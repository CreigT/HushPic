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
  {
    id: 'heic-to-jpg',
    slug: 'heic-to-jpg',
    name: 'HEIC to JPG',
    shortJob: 'Convert iPhone HEIC to JPG without uploading the image',
    description: 'Convert Apple HEIC and HEIF photos into widely supported JPG files directly in your browser.',
    category: 'Convert',
    free: true,
    flagship: true,
    popular: true,
    iconName: 'Smartphone',
    acceptedFormats: ['.heic', '.heif', '.jpg', '.jpeg', '.png'],
    actionLabel: 'Convert to JPG',
    defaultOptions: { quality: 92 },
  },
  {
    id: 'compress',
    slug: 'compress',
    name: 'Compress Image',
    shortJob: 'Reduce image file size with adjustable quality',
    description: 'Reduce image size for web pages, email attachments, and apps using browser-based resizing and image encoding.',
    category: 'Essentials',
    free: true,
    popular: true,
    iconName: 'Minimize2',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.heic'],
    actionLabel: 'Compress Image',
    defaultOptions: {
      compressionLevel: 'recommended',
      quality: 75,
      maxWidth: 1920,
    },
  },
  {
    id: 'resize-social',
    slug: 'resize-social',
    name: 'Resize for Social',
    shortJob: 'Common dimensions for TikTok, Instagram, YouTube & more',
    description: 'Resize or crop photos into common aspect ratios and pixel dimensions for major social platforms.',
    category: 'Essentials',
    free: true,
    popular: true,
    iconName: 'Share2',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Resize Image',
    defaultOptions: {
      preset: 'instagram-square',
      fitMode: 'cover',
      padColor: '#000000',
    },
  },
  {
    id: 'blur-background',
    slug: 'blur-background',
    name: 'Blur Background',
    shortJob: 'Add a centered portrait-style blur effect',
    description: 'Create a radial sharp-center effect over a blurred background, processed locally on your device.',
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
  {
    id: 'remove-background',
    slug: 'remove-background',
    name: 'Simple Background Remover',
    shortJob: 'Remove simple, mostly uniform backgrounds',
    description: 'Samples the image corners and removes similar colors to create a transparent PNG. Best for simple or studio-style backgrounds.',
    category: 'Extra',
    free: false,
    popular: true,
    iconName: 'Eraser',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Remove Background',
    defaultOptions: {
      sensitivity: 35,
      smoothing: 2,
      targetColorMode: 'auto',
    },
  },
  {
    id: 'add-border',
    slug: 'add-border',
    name: 'Add Border & Frame',
    shortJob: 'Add a solid, polaroid-style, or shadow frame',
    description: 'Frame photos with customizable border width, colors, polaroid-style spacing, or a drop-shadow effect.',
    category: 'Extra',
    free: true,
    popular: true,
    iconName: 'Square',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Add Border',
    defaultOptions: {
      borderWidth: 32,
      borderColor: '#ffffff',
      style: 'solid',
      radius: 0,
    },
  },
  {
    id: 'upscale',
    slug: 'upscale',
    name: '2x Image Upscaler',
    shortJob: 'Double pixel dimensions with sharpening',
    description: 'Uses browser image smoothing plus a lightweight sharpening pass to double image dimensions. It does not generate new photographic detail.',
    category: 'Extra',
    free: false,
    popular: true,
    iconName: 'Maximize',
    acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    actionLabel: 'Upscale 2x',
    defaultOptions: {
      scale: 2,
      enhanceSharpness: true,
    },
  },
  {
    id: 'watermark',
    slug: 'watermark',
    name: 'Watermark',
    shortJob: 'Add custom text watermarks',
    description: 'Add copyright notices or credits with adjustable position, opacity, size, color, or repeat tiling.',
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
  {
    id: 'convert',
    slug: 'convert',
    name: 'Convert Image',
    shortJob: 'Convert between JPG, PNG, and WebP',
    description: 'Re-encode supported images as JPG, PNG, or WebP. Browser canvas conversion may remove original metadata such as EXIF data.',
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
  {
    id: 'rotate',
    slug: 'rotate',
    name: 'Rotate & Flip',
    shortJob: 'Rotate 90°, 180°, 270° or flip horizontally/vertically',
    description: 'Fix orientation, mirror an image, or rotate it locally in your browser.',
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
