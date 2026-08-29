import React from 'react';
import { 
  Smartphone, 
  Minimize2, 
  Share2, 
  Sparkles, 
  Eraser, 
  Square, 
  Maximize, 
  ShieldCheck, 
  RefreshCw, 
  RotateCw,
  ArrowRight,
  Lock,
  Layers,
  Wand2,
  FileCode
} from 'lucide-react';
import { TOOLS, ToolConfig } from '../../config/tools';

interface ToolGridProps {
  onSelectTool: (slug: string) => void;
  selectedCategory?: string;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ onSelectTool }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Minimize2': return <Minimize2 className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Eraser': return <Eraser className="w-5 h-5" />;
      case 'Square': return <Square className="w-5 h-5" />;
      case 'Maximize': return <Maximize className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5" />;
      case 'RotateCw': return <RotateCw className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const essentials = TOOLS.filter((t) => t.category === 'Essentials');
  const convert = TOOLS.filter((t) => t.category === 'Convert');
  const extra = TOOLS.filter((t) => t.category === 'Extra');

  const renderSection = (title: string, subtitle: string, icon: React.ReactNode, toolList: ToolConfig[]) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-800/80">
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {toolList.map((tool) => (
          <div
            key={tool.id}
            id={`tool-card-${tool.slug}`}
            onClick={() => onSelectTool(tool.slug)}
            className="group relative bg-[#0f172a] hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-rose-400 group-hover:border-rose-500/30 transition-colors">
                  {getIcon(tool.iconName)}
                </div>

                <div className="flex items-center gap-1.5">
                  {tool.flagship && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm">
                      Flagship
                    </span>
                  )}
                  {!tool.free && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Pro
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors mb-1">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {tool.shortJob}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-emerald-400" /> In-Browser
              </span>
              <span className="text-rose-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Open Tool <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Essentials */}
      {renderSection(
        'Essentials',
        'Daily compression, aspect sizing, and rotation workflows',
        <Layers className="w-5 h-5" />,
        essentials
      )}

      {/* 2. Convert */}
      {renderSection(
        'Convert',
        'High speed format converters including iPhone HEIC and WebP',
        <FileCode className="w-5 h-5" />,
        convert
      )}

      {/* 3. Extra */}
      {renderSection(
        'Extra & Creative Filters',
        'Depth blur, background isolator, frame borders, 2x upscaling, and watermarks',
        <Wand2 className="w-5 h-5" />,
        extra
      )}
    </section>
  );
};
