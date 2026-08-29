import React from 'react';
import { Trash2, FileImage, MoveUp, MoveDown, CheckCircle2, Shield } from 'lucide-react';
import { formatBytes } from '../lib/fileProcessor';

interface FileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
  onMoveFile?: (fromIndex: number, toIndex: number) => void;
  isProcessing?: boolean;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onRemoveFile,
  onMoveFile,
  isProcessing = false,
}) => {
  if (files.length === 0) return null;

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Selected Files ({files.length})</span>
        <span className="flex items-center gap-1 text-[11px] text-emerald-400">
          <Shield className="w-3 h-3" /> Ready in memory
        </span>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {files.map((file, idx) => (
          <div
            key={`${file.name}-${idx}`}
            className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400 shrink-0">
                <FileImage className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                  {file.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {formatBytes(file.size)} • {file.type || 'image'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {onMoveFile && files.length > 1 && (
                <div className="flex items-center">
                  <button
                    disabled={idx === 0 || isProcessing}
                    onClick={() => onMoveFile(idx, idx - 1)}
                    className="p-1 rounded text-slate-500 hover:text-slate-300 disabled:opacity-30"
                    title="Move up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === files.length - 1 || isProcessing}
                    onClick={() => onMoveFile(idx, idx + 1)}
                    className="p-1 rounded text-slate-500 hover:text-slate-300 disabled:opacity-30"
                    title="Move down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                disabled={isProcessing}
                onClick={() => onRemoveFile(idx)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors disabled:opacity-40"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
