import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, Shield, ArrowUpRight, Plus, AlertCircle } from 'lucide-react';
import { BRAND } from '../../config/brand';
import { QuotaStatus } from '../lib/quota';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  onPaywallTrigger: (reason: 'size' | 'quota' | 'pro_tool', details?: string) => void;
  quota: QuotaStatus;
  acceptedFormats?: string[];
  maxFiles?: number;
  compact?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onFilesSelected,
  onPaywallTrigger,
  quota,
  acceptedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'],
  maxFiles = 10,
  compact = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxMB = quota.isPro ? BRAND.proMaxFileSizeMB : BRAND.freeMaxFileSizeMB;
  const maxBytes = maxMB * 1024 * 1024;

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const filesArray = Array.from(fileList);
    const validFiles: File[] = [];

    for (const file of filesArray) {
      // Check file size paywall trigger
      if (file.size > maxBytes) {
        onPaywallTrigger(
          'size',
          `"${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Free plan supports up to ${BRAND.freeMaxFileSizeMB}MB.`
        );
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles.slice(0, quota.isPro ? 50 : 1));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer transition-all duration-300 rounded-3xl border-2 border-dashed ${
          isDragging
            ? 'border-rose-500 bg-rose-500/10 scale-[1.01] shadow-2xl shadow-rose-500/20'
            : 'border-slate-800 hover:border-rose-500/50 bg-slate-900/50 hover:bg-slate-900/80'
        } ${compact ? 'p-6 sm:p-8' : 'p-8 sm:p-14'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={quota.isPro}
          accept={acceptedFormats.join(',')}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Ambient background glow effect on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-rose-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center text-center space-y-4">
          {/* Main Upload Icon Badge */}
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/80 flex items-center justify-center text-rose-400 shadow-xl group-hover:scale-110 group-hover:border-rose-500/40 transition-all duration-300">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400 group-hover:text-rose-300 transition-colors" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
              <Shield className="w-3 h-3" />
            </div>
          </div>

          {/* Heading text */}
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Drop files here or <span className="text-rose-400 underline decoration-rose-400/40 underline-offset-4 group-hover:decoration-rose-400">Choose Files</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Accepts <span className="text-slate-300 font-medium">.JPG, .PNG, .WEBP, .HEIC, .HEIF</span>
            </p>
          </div>

          {/* File Limits info */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span className="px-2.5 py-1 rounded-md bg-slate-950/60 border border-slate-800/80">
              Max file size: <strong className="text-slate-300">{maxMB}MB</strong> {!quota.isPro && <span className="text-slate-500">(500MB Pro)</span>}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-950/60 border border-slate-800/80">
              {quota.isPro ? '✨ Batch Processing Enabled' : '⚡ Single File (Batch in Pro)'}
            </span>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white text-sm font-bold shadow-lg shadow-rose-500/25 group-hover:shadow-rose-500/40 transition-all cursor-pointer"
            >
              <FileImage className="w-4 h-4" />
              <span>Select Images from Device</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
