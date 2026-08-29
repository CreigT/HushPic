import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  FileArchive, 
  ShieldCheck,
  Eye,
  Sliders,
  Smartphone, 
  Minimize2, 
  Share2, 
  Eraser, 
  Square, 
  Maximize, 
  RefreshCw, 
  RotateCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolConfig } from '../../config/tools';
import { DropZone } from './DropZone';
import { FileList } from './FileList';
import { OptionsPanel } from './OptionsPanel';
import { ProcessButton } from './ProcessButton';
import { PaywallModal, PaywallReason } from './PaywallModal';
import { QuotaStatus, consumeQuota } from '../lib/quota';
import { 
  processImageFile, 
  ProcessedFileResult, 
  generateSampleImage, 
  createZipArchive, 
  downloadBlob, 
  formatBytes 
} from '../lib/fileProcessor';

interface ToolWorkspaceProps {
  tool: ToolConfig;
  onBack: () => void;
  quota: QuotaStatus;
  onOpenPaywall: (reason?: PaywallReason, details?: string) => void;
}

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({
  tool,
  onBack,
  quota,
  onOpenPaywall,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<Record<string, any>>(tool.defaultOptions || {});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedResults, setProcessedResults] = useState<ProcessedFileResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'preview'>('side-by-side');

  // Reset workspace when tool changes
  useEffect(() => {
    setSelectedFiles([]);
    setProcessedResults([]);
    setErrorMessage(null);
    setOptions(tool.defaultOptions || {});
  }, [tool.id]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles((prev) => (quota.isPro ? [...prev, ...files] : files));
    setProcessedResults([]);
    setErrorMessage(null);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveFile = (fromIndex: number, toIndex: number) => {
    setSelectedFiles((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const handleLoadSample = () => {
    const sample = generateSampleImage(`sample-hushpic-${tool.slug}.jpg`, 1280, 850);
    setSelectedFiles([sample]);
    setProcessedResults([]);
    setErrorMessage(null);
  };

  const handleRunProcessing = async () => {
    if (selectedFiles.length === 0) return;

    // 1. Paywall Check for Pro Tools
    if (!tool.free && !quota.isPro) {
      onOpenPaywall('pro_tool', `${tool.name} is a Pro-exclusive feature.`);
      return;
    }

    // 2. Paywall Check for Quota
    if (!quota.isPro && quota.used >= quota.total) {
      onOpenPaywall('quota', `You have used your ${quota.total} free daily conversions.`);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const results: ProcessedFileResult[] = [];
      for (const file of selectedFiles) {
        const res = await processImageFile(file, tool.slug, options);
        results.push(res);
      }

      // Consume quota
      consumeQuota();
      setProcessedResults(results);

      // Trigger confetti on successful output
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err: any) {
      console.error('Processing error:', err);
      setErrorMessage(err.message || 'An error occurred during local image processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = (result: ProcessedFileResult) => {
    downloadBlob(result.blob, result.outputName);
  };

  const handleDownloadBatchZip = async () => {
    if (processedResults.length === 0) return;
    try {
      const zipBlob = await createZipArchive(processedResults);
      downloadBlob(zipBlob, `hushpic-${tool.slug}-batch.zip`);
    } catch (err) {
      console.error('ZIP generation failed:', err);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setProcessedResults([]);
    setErrorMessage(null);
  };

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Minimize2': return <Minimize2 className="w-6 h-6" />;
      case 'Share2': return <Share2 className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Eraser': return <Eraser className="w-6 h-6" />;
      case 'Square': return <Square className="w-6 h-6" />;
      case 'Maximize': return <Maximize className="w-6 h-6" />;
      case 'RefreshCw': return <RefreshCw className="w-6 h-6" />;
      case 'RotateCw': return <RotateCw className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Back to All Tools */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Tools</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Client-Side • No Upload</span>
        </div>
      </div>

      {/* 2. Tool Name + One-line Job Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-rose-400 flex items-center justify-center shadow-md shrink-0">
            {getToolIcon(tool.iconName)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {tool.name}
              </h1>
              {tool.flagship && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Flagship
                </span>
              )}
              {!tool.free && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Pro
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">{tool.shortJob}</p>
          </div>
        </div>
      </div>

      {/* 3. States handling */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <div className="flex-1">{errorMessage}</div>
          <button
            onClick={() => setErrorMessage(null)}
            className="px-3 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800 font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* SUCCESS STATE */}
      {processedResults.length > 0 ? (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Conversion Successful!</h3>
                  <p className="text-xs text-slate-400">
                    Processed {processedResults.length} file{processedResults.length > 1 ? 's' : ''} in{' '}
                    {processedResults.reduce((acc, r) => acc + r.processingTimeMs, 0)}ms.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {processedResults.length > 1 && (
                  <button
                    onClick={handleDownloadBatchZip}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg cursor-pointer"
                  >
                    <FileArchive className="w-4 h-4" />
                    <span>Download All as ZIP</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Process Another</span>
                </button>
              </div>
            </div>

            {/* Results Grid / Previews */}
            <div className="space-y-4">
              {processedResults.map((result) => {
                const sizeSaved = result.originalSize - result.outputSize;
                const percentSaved = Math.round((sizeSaved / result.originalSize) * 100);

                return (
                  <div
                    key={result.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-white truncate max-w-sm">
                          {result.outputName}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span>Original: {formatBytes(result.originalSize)}</span>
                          <span>→</span>
                          <span className="text-emerald-400 font-bold">
                            Output: {formatBytes(result.outputSize)}
                          </span>
                          {percentSaved > 0 && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                              Saved {percentSaved}%
                            </span>
                          )}
                          <span>• {result.width}x{result.height}px</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownloadSingle(result)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download File</span>
                      </button>
                    </div>

                    {/* Image Preview Canvas */}
                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-checkerboard flex items-center justify-center max-h-96">
                      <img
                        src={result.dataUrl}
                        alt={result.outputName}
                        className="max-h-96 object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* WORKSPACE EDITING FLOW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Dropzone & File List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedFiles.length === 0 ? (
              <DropZone
                onFilesSelected={handleFilesSelected}
                onPaywallTrigger={(reason, details) => onOpenPaywall(reason, details)}
                quota={quota}
                acceptedFormats={tool.acceptedFormats}
              />
            ) : (
              <div className="space-y-4">
                <FileList
                  files={selectedFiles}
                  onRemoveFile={handleRemoveFile}
                  onMoveFile={handleMoveFile}
                  isProcessing={isProcessing}
                />

                {quota.isPro && (
                  <div className="pt-2">
                    <DropZone
                      compact
                      onFilesSelected={handleFilesSelected}
                      onPaywallTrigger={(reason, details) => onOpenPaywall(reason, details)}
                      quota={quota}
                      acceptedFormats={tool.acceptedFormats}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Options Panel & Primary Action Button (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <OptionsPanel
              tool={tool}
              options={options}
              onOptionsChange={setOptions}
              onLoadSampleFile={handleLoadSample}
              isProcessing={isProcessing}
            />

            <ProcessButton
              tool={tool}
              quota={quota}
              fileCount={selectedFiles.length}
              isProcessing={isProcessing}
              onProcess={handleRunProcessing}
            />

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Privacy & Engine Contract</span>
              </div>
              <p>
                Memory buffers are purged immediately upon page refresh or closing. Nothing is logged or transferred.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
