import JSZip from 'jszip';

export interface ProcessedFileResult {
  id: string;
  originalName: string;
  outputName: string;
  originalSize: number;
  outputSize: number;
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  mimeType: string;
  processingTimeMs: number;
}

export interface ProcessingOptions {
  [key: string]: any;
}

/**
 * Load an image from a File or Blob into an HTMLImageElement
 */
export async function loadImageFromFile(file: File | Blob): Promise<{ img: HTMLImageElement; width: number; height: number }> {
  // Check if file is HEIC/HEIF
  const isHeic = file.type.includes('heic') || file.type.includes('heif') || 
    ('name' in file && (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')));

  if (isHeic) {
    try {
      // Dynamic import heic2any if available in browser
      const heic2anyModule = await import('heic2any' as any).catch(() => null);
      if (heic2anyModule && (heic2anyModule.default || heic2anyModule)) {
        const heic2any = heic2anyModule.default || heic2anyModule;
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.92,
        });
        const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        return loadImageFromBlob(finalBlob);
      }
    } catch (err) {
      console.warn('heic2any conversion fallback to standard loader:', err);
    }
  }

  return loadImageFromBlob(file);
}

function loadImageFromBlob(blob: Blob): Promise<{ img: HTMLImageElement; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ img, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode image in browser. Ensure file is a valid image.'));
    };
    img.src = url;
  });
}

/**
 * Creates a downloadable sample image directly in canvas for instantaneous user testing
 */
export function generateSampleImage(name = 'sample-photo.jpg', width = 1200, height = 800): File {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Draw vibrant gradient background
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#4f46e5');
  grad.addColorStop(1, '#ec4899');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Draw subtle grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  const step = 40;
  for (let x = 0; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw central glowing emblem
  ctx.save();
  ctx.beginPath();
  ctx.arc(width / 2, height / 2 - 20, 160, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#f43f5e';
  ctx.stroke();

  // Draw lock icon on sample
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🔒 HushPic Sample', width / 2, height / 2 - 10);
  
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('100% Client-Side Privacy Sample', width / 2, height / 2 + 30);
  ctx.restore();

  // Convert canvas to blob
  const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], name, { type: mime });
}

/**
 * Main dispatcher to process a single image file with specific tool options
 */
export async function processImageFile(
  file: File,
  toolSlug: string,
  options: ProcessingOptions = {}
): Promise<ProcessedFileResult> {
  const startTime = performance.now();
  const { img, width: origW, height: origH } = await loadImageFromFile(file);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  if (!ctx) throw new Error('Canvas 2D context not available');

  let outputMimeType = 'image/jpeg';
  let quality = 0.92;
  let targetExtension = 'jpg';
  const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

  switch (toolSlug) {
    case 'heic-to-jpg': {
      canvas.width = origW;
      canvas.height = origH;
      ctx.drawImage(img, 0, 0);
      outputMimeType = 'image/jpeg';
      quality = (options.quality ?? 92) / 100;
      targetExtension = 'jpg';
      break;
    }

    case 'compress': {
      let targetW = origW;
      let targetH = origH;
      const compressionLevel = options.compressionLevel || 'recommended';
      let q = 0.75;

      if (compressionLevel === 'low') {
        q = 0.85;
      } else if (compressionLevel === 'recommended') {
        q = 0.72;
        if (targetW > 2400) {
          const ratio = 2400 / targetW;
          targetW = Math.round(targetW * ratio);
          targetH = Math.round(targetH * ratio);
        }
      } else if (compressionLevel === 'high') {
        q = 0.55;
        if (targetW > 1600) {
          const ratio = 1600 / targetW;
          targetW = Math.round(targetW * ratio);
          targetH = Math.round(targetH * ratio);
        }
      } else if (compressionLevel === 'custom') {
        q = (options.quality ?? 75) / 100;
        if (options.maxWidth && options.maxWidth < targetW) {
          const ratio = options.maxWidth / targetW;
          targetW = Math.round(targetW * ratio);
          targetH = Math.round(targetH * ratio);
        }
      }

      canvas.width = targetW;
      canvas.height = targetH;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);

      outputMimeType = file.type === 'image/png' && compressionLevel === 'recommended' ? 'image/webp' : (file.type || 'image/jpeg');
      quality = q;
      targetExtension = outputMimeType === 'image/png' ? 'png' : (outputMimeType === 'image/webp' ? 'webp' : 'jpg');
      break;
    }

    case 'resize-social': {
      let targetW = 1080;
      let targetH = 1080;
      const preset = options.preset || 'instagram-square';
      const fitMode = options.fitMode || 'cover'; // 'cover' | 'contain' | 'pad'
      const padColor = options.padColor || '#000000';

      const presetsMap: Record<string, [number, number]> = {
        'instagram-square': [1080, 1080],
        'instagram-portrait': [1080, 1350],
        'instagram-story': [1080, 1920],
        'tiktok-video': [1080, 1920],
        'youtube-thumb': [1280, 720],
        'twitter-post': [1200, 675],
        'linkedin-post': [1200, 627],
        'facebook-cover': [1200, 630],
        'custom': [options.customWidth || 1080, options.customHeight || 1080]
      };

      if (presetsMap[preset]) {
        [targetW, targetH] = presetsMap[preset];
      }

      canvas.width = targetW;
      canvas.height = targetH;

      ctx.fillStyle = padColor;
      ctx.fillRect(0, 0, targetW, targetH);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      if (fitMode === 'cover') {
        const scale = Math.max(targetW / origW, targetH / origH);
        const nw = origW * scale;
        const nh = origH * scale;
        const dx = (targetW - nw) / 2;
        const dy = (targetH - nh) / 2;
        ctx.drawImage(img, dx, dy, nw, nh);
      } else {
        // contain / pad
        const scale = Math.min(targetW / origW, targetH / origH);
        const nw = origW * scale;
        const nh = origH * scale;
        const dx = (targetW - nw) / 2;
        const dy = (targetH - nh) / 2;
        ctx.drawImage(img, dx, dy, nw, nh);
      }

      outputMimeType = 'image/jpeg';
      quality = 0.92;
      targetExtension = 'jpg';
      break;
    }

    case 'blur-background': {
      canvas.width = origW;
      canvas.height = origH;

      const blurRadius = options.blurRadius ?? 15;
      const focalSizePercent = options.focalSize ?? 45; // 20% - 80%

      // 1. Draw blurred background
      ctx.filter = `blur(${blurRadius}px)`;
      ctx.drawImage(img, -blurRadius * 2, -blurRadius * 2, origW + blurRadius * 4, origH + blurRadius * 4);
      ctx.filter = 'none';

      // 2. Create sharp subject radial mask
      const sharpCanvas = document.createElement('canvas');
      sharpCanvas.width = origW;
      sharpCanvas.height = origH;
      const sCtx = sharpCanvas.getContext('2d')!;
      sCtx.drawImage(img, 0, 0);

      // Create radial mask
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = origW;
      maskCanvas.height = origH;
      const mCtx = maskCanvas.getContext('2d')!;

      const centerX = origW / 2;
      const centerY = origH * 0.45;
      const radius = (Math.min(origW, origH) * (focalSizePercent / 100));

      const grad = mCtx.createRadialGradient(centerX, centerY, radius * 0.4, centerX, centerY, radius);
      grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      mCtx.fillStyle = grad;
      mCtx.beginPath();
      mCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      mCtx.fill();

      // Mask the sharp layer
      sCtx.globalCompositeOperation = 'destination-in';
      sCtx.drawImage(maskCanvas, 0, 0);

      // Composite sharp center over blurred background
      ctx.drawImage(sharpCanvas, 0, 0);

      outputMimeType = 'image/jpeg';
      quality = 0.92;
      targetExtension = 'jpg';
      break;
    }

    case 'remove-background': {
      canvas.width = origW;
      canvas.height = origH;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, origW, origH);
      const data = imgData.data;
      const sensitivity = (options.sensitivity ?? 35) * 2.5;

      // Sample 4 corners to detect dominant background color
      const cornerSamples = [
        [0, 0],
        [origW - 1, 0],
        [0, origH - 1],
        [origW - 1, origH - 1],
      ];

      let bgR = 0, bgG = 0, bgB = 0;
      cornerSamples.forEach(([x, y]) => {
        const idx = (y * origW + x) * 4;
        bgR += data[idx];
        bgG += data[idx + 1];
        bgB += data[idx + 2];
      });
      bgR /= 4;
      bgG /= 4;
      bgB /= 4;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean color distance
        const dist = Math.sqrt(
          (r - bgR) ** 2 +
          (g - bgG) ** 2 +
          (b - bgB) ** 2
        );

        if (dist < sensitivity) {
          // Fade alpha smoothly at border
          const alphaFactor = Math.max(0, (dist - (sensitivity * 0.7)) / (sensitivity * 0.3));
          data[i + 3] = Math.round(data[i + 3] * alphaFactor);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      outputMimeType = 'image/png';
      quality = 1.0;
      targetExtension = 'png';
      break;
    }

    case 'add-border': {
      const borderWidth = options.borderWidth ?? 32;
      const borderColor = options.borderColor ?? '#ffffff';
      const style = options.style ?? 'solid'; // 'solid' | 'polaroid' | 'shadow'

      let padTop = borderWidth;
      let padBottom = borderWidth;
      let padLeft = borderWidth;
      let padRight = borderWidth;

      if (style === 'polaroid') {
        padTop = borderWidth;
        padLeft = borderWidth;
        padRight = borderWidth;
        padBottom = borderWidth * 3.2; // Classic polaroid chin
      }

      canvas.width = origW + padLeft + padRight;
      canvas.height = origH + padTop + padBottom;

      // Draw background border color
      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (style === 'shadow') {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 8;
      }

      ctx.drawImage(img, padLeft, padTop, origW, origH);

      outputMimeType = 'image/jpeg';
      quality = 0.92;
      targetExtension = 'jpg';
      break;
    }

    case 'upscale': {
      const scale = options.scale ?? 2;
      const targetW = origW * scale;
      const targetH = origH * scale;

      canvas.width = targetW;
      canvas.height = targetH;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);

      if (options.enhanceSharpness !== false) {
        // High quality unsharp mask filter on canvas pixels
        const imgData = ctx.getImageData(0, 0, targetW, targetH);
        const d = imgData.data;
        const copy = new Uint8ClampedArray(d);

        const amount = 0.25;
        for (let y = 1; y < targetH - 1; y++) {
          for (let x = 1; x < targetW - 1; x++) {
            const idx = (y * targetW + x) * 4;
            for (let c = 0; c < 3; c++) {
              const current = copy[idx + c];
              const up = copy[((y - 1) * targetW + x) * 4 + c];
              const down = copy[((y + 1) * targetW + x) * 4 + c];
              const left = copy[(y * targetW + (x - 1)) * 4 + c];
              const right = copy[(y * targetW + (x + 1)) * 4 + c];
              const neighborAvg = (up + down + left + right) / 4;
              d[idx + c] = Math.min(255, Math.max(0, current + (current - neighborAvg) * amount));
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      outputMimeType = 'image/jpeg';
      quality = 0.95;
      targetExtension = 'jpg';
      break;
    }

    case 'watermark': {
      canvas.width = origW;
      canvas.height = origH;
      ctx.drawImage(img, 0, 0);

      const text = options.text || '© HushPic Protected';
      const opacity = (options.opacity ?? 70) / 100;
      const fontSize = options.fontSize || Math.max(20, Math.round(origW / 28));
      const color = options.color || '#ffffff';
      const position = options.position || 'bottom-right';
      const tiled = options.tiled || false;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      if (tiled) {
        ctx.rotate((-25 * Math.PI) / 180);
        const stepX = fontSize * 12;
        const stepY = fontSize * 5;
        for (let x = -origW; x < origW * 2; x += stepX) {
          for (let y = -origH; y < origH * 2; y += stepY) {
            ctx.fillText(text, x, y);
          }
        }
      } else {
        const textMetrics = ctx.measureText(text);
        const textW = textMetrics.width;
        const pad = Math.max(24, fontSize);

        let tx = pad;
        let ty = pad + fontSize;

        if (position === 'bottom-right') {
          tx = origW - textW - pad;
          ty = origH - pad;
        } else if (position === 'bottom-left') {
          tx = pad;
          ty = origH - pad;
        } else if (position === 'top-right') {
          tx = origW - textW - pad;
          ty = pad + fontSize;
        } else if (position === 'top-left') {
          tx = pad;
          ty = pad + fontSize;
        } else if (position === 'center') {
          tx = (origW - textW) / 2;
          ty = origH / 2;
        }

        ctx.fillText(text, tx, ty);
      }
      ctx.restore();

      outputMimeType = 'image/jpeg';
      quality = 0.92;
      targetExtension = 'jpg';
      break;
    }

    case 'convert': {
      canvas.width = origW;
      canvas.height = origH;
      
      const targetFormat = options.targetFormat || 'image/webp';
      outputMimeType = targetFormat;
      quality = (options.quality ?? 90) / 100;

      if (outputMimeType === 'image/jpeg') {
        // Fill white background for JPEGs
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, origW, origH);
        targetExtension = 'jpg';
      } else if (outputMimeType === 'image/png') {
        targetExtension = 'png';
      } else if (outputMimeType === 'image/webp') {
        targetExtension = 'webp';
      }

      ctx.drawImage(img, 0, 0);
      break;
    }

    case 'rotate': {
      const angle = options.angle ?? 90;
      const flipH = options.flipH ?? false;
      const flipV = options.flipV ?? false;

      const rad = (angle * Math.PI) / 180;
      const is90or270 = angle === 90 || angle === 270;

      const targetW = is90or270 ? origH : origW;
      const targetH = is90or270 ? origW : origH;

      canvas.width = targetW;
      canvas.height = targetH;

      ctx.save();
      ctx.translate(targetW / 2, targetH / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -origW / 2, -origH / 2);
      ctx.restore();

      outputMimeType = file.type || 'image/jpeg';
      quality = 0.95;
      targetExtension = outputMimeType === 'image/png' ? 'png' : 'jpg';
      break;
    }

    default: {
      canvas.width = origW;
      canvas.height = origH;
      ctx.drawImage(img, 0, 0);
      outputMimeType = 'image/jpeg';
      quality = 0.92;
      targetExtension = 'jpg';
      break;
    }
  }

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to generate image blob from canvas'));
      },
      outputMimeType,
      quality
    );
  });

  const dataUrl = canvas.toDataURL(outputMimeType, quality);
  const outputName = `${baseName}-${toolSlug}.${targetExtension}`;
  const endTime = performance.now();

  return {
    id: Math.random().toString(36).substring(2, 9),
    originalName: file.name,
    outputName,
    originalSize: file.size,
    outputSize: blob.size,
    blob,
    dataUrl,
    width: canvas.width,
    height: canvas.height,
    originalWidth: origW,
    originalHeight: origH,
    mimeType: outputMimeType,
    processingTimeMs: Math.round(endTime - startTime),
  };
}

/**
 * Packages multiple processed files into a single ZIP archive for Pro batch downloads
 */
export async function createZipArchive(results: ProcessedFileResult[]): Promise<Blob> {
  const zip = new JSZip();
  results.forEach((res) => {
    zip.file(res.outputName, res.blob);
  });
  return zip.generateAsync({ type: 'blob' });
}

/**
 * Triggers a direct browser file download without opening new windows
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Format bytes into human readable format (e.g., 2.4 MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
