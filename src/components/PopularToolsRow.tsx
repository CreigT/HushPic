import React from 'react';
import { 
  Smartphone, 
  Minimize2, 
  Share2, 
  Sparkles, 
  Eraser, 
  Square, 
  Maximize,
  ArrowRight
} from 'lucide-react';

interface PopularToolsRowProps {
  onSelectTool: (slug: string) => void;
  onViewAllTools: () => void;
}

export const PopularToolsRow: React.FC<PopularToolsRowProps> = ({
  onSelectTool,
  onViewAllTools,
}) => {
  const popularChips = [
    {
      slug: 'heic-to-jpg',
      name: 'HEIC to JPG',
      icon: <Smartphone className="w-3.5 h-3.5" />,
      flagship: true,
      pro: false,
    },
    {
      slug: 'compress',
      name: 'Compress Image',
      icon: <Minimize2 className="w-3.5 h-3.5" />,
      flagship: false,
      pro: false,
    },
    {
      slug: 'resize-social',
      name: 'Resize for Social',
      icon: <Share2 className="w-3.5 h-3.5" />,
      flagship: false,
      pro: false,
    },
    {
      slug: 'blur-background',
      name: 'Blur Background',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      flagship: false,
      pro: false,
    },
    {
      slug: 'remove-background',
      name: 'Background Remover',
      icon: <Eraser className="w-3.5 h-3.5" />,
      flagship: false,
      pro: true,
    },
    {
      slug: 'add-border',
      name: 'Add Border',
      icon: <Square className="w-3.5 h-3.5" />,
      flagship: false,
      pro: false,
    },
    {
      slug: 'upscale',
      name: 'Upscale Image',
      icon: <Maximize className="w-3.5 h-3.5" />,
      flagship: false,
      pro: true,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-6 pb-2">
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Popular Instant Tools
        </span>
        <button
          onClick={onViewAllTools}
          className="text-xs font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
        >
          View all 10 tools <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {popularChips.map((tool) => (
          <button
            key={tool.slug}
            onClick={() => onSelectTool(tool.slug)}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-medium whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <span className="text-slate-400 group-hover:text-rose-400 transition-colors">
              {tool.icon}
            </span>
            <span>{tool.name}</span>
            {tool.flagship && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Flagship
              </span>
            )}
            {tool.pro && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Pro
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
