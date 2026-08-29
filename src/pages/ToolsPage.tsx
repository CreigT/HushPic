import React, { useState } from 'react';
import { 
  Search, 
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
  FileCode,
  Wand2
} from 'lucide-react';
import { TOOLS, ToolCategory } from '../../config/tools';

interface ToolsPageProps {
  onSelectTool: (slug: string) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ onSelectTool }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Essentials', 'Convert', 'Extra'];

  const filteredTools = TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.shortJob.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Browse All IMAGE Tools
        </h1>
        <p className="text-sm text-slate-400">
          Fast, client-side photo processing utilities. Zero upload delay, 100% privacy on your device.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search all 10 image tools (e.g., HEIC, compress, border, crop)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool.slug)}
            className="group bg-[#0f172a] hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-rose-400 group-hover:border-rose-500/30 transition-colors">
                  {getIcon(tool.iconName)}
                </div>

                <div className="flex items-center gap-1.5">
                  {tool.flagship && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Flagship
                    </span>
                  )}
                  {!tool.free && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Pro
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-900 text-slate-400 border border-slate-800">
                    {tool.category}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors mb-2">
                {tool.name}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {tool.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-emerald-400" /> 100% In-Browser
              </span>
              <span className="text-rose-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Launch Workspace <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-16 text-center text-slate-400 space-y-3">
          <p className="text-base font-semibold">No tools found matching your criteria</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="text-xs text-rose-400 hover:underline cursor-pointer"
          >
            Clear filters & view all tools
          </button>
        </div>
      )}
    </div>
  );
};
