import React from 'react';
import { ArrowRight, Loader2, Sparkles, Lock } from 'lucide-react';
import { ToolConfig } from '../../config/tools';
import { QuotaStatus } from '../lib/quota';

interface ProcessButtonProps {
  tool: ToolConfig;
  quota: QuotaStatus;
  fileCount: number;
  isProcessing: boolean;
  onProcess: () => void;
}

export const ProcessButton: React.FC<ProcessButtonProps> = ({
  tool,
  quota,
  fileCount,
  isProcessing,
  onProcess,
}) => {
  const isProRequired = !tool.free && !quota.isPro;

  return (
    <button
      type="button"
      onClick={onProcess}
      disabled={fileCount === 0 || isProcessing}
      className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
        fileCount === 0 || isProcessing
          ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
          : isProRequired
          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-500/25'
          : 'bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:from-rose-600 hover:to-violet-700 text-white shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.01]'
      }`}
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing locally on device...</span>
        </>
      ) : isProRequired ? (
        <>
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Unlock {tool.actionLabel} (Pro)</span>
          <ArrowRight className="w-4 h-4" />
        </>
      ) : (
        <>
          <span>{tool.actionLabel} {fileCount > 1 ? `(${fileCount} Files)` : ''}</span>
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  );
};
