import React from 'react';
import { Sliders, Sparkles, Wand2, Image as ImageIcon, RotateCw, Check } from 'lucide-react';
import { ToolConfig, SOCIAL_PRESETS } from '../../config/tools';

interface OptionsPanelProps {
  tool: ToolConfig;
  options: Record<string, any>;
  onOptionsChange: (newOptions: Record<string, any>) => void;
  onLoadSampleFile: () => void;
  isProcessing?: boolean;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
  tool,
  options,
  onOptionsChange,
  onLoadSampleFile,
  isProcessing = false,
}) => {
  const updateOption = (key: string, value: any) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-5 shadow-lg">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Tool Options & Settings
          </span>
        </div>

        {/* Load Sample File Button */}
        <button
          type="button"
          onClick={onLoadSampleFile}
          disabled={isProcessing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-rose-300 hover:text-white transition-all cursor-pointer shadow-sm disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Load sample file</span>
        </button>
      </div>

      {/* Tool-specific Options Form Controls */}
      <div className="space-y-4 text-xs">
        {/* 1. HEIC to JPG */}
        {tool.slug === 'heic-to-jpg' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>Output JPEG Quality:</span>
              <span className="font-bold text-white">{options.quality ?? 92}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={options.quality ?? 92}
              onChange={(e) => updateOption('quality', parseInt(e.target.value, 10))}
              className="w-full accent-rose-500 bg-slate-950 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              92% provides near-lossless clarity with substantial size reduction from raw Apple HEIC.
            </p>
          </div>
        )}

        {/* 2. Compress */}
        {tool.slug === 'compress' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-medium">Compression Preset:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', label: 'Low (Max Quality)' },
                  { id: 'recommended', label: 'Recommended' },
                  { id: 'high', label: 'High (Smallest)' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => updateOption('compressionLevel', lvl.id)}
                    className={`py-2 px-2.5 rounded-xl border text-center font-medium transition-all ${
                      (options.compressionLevel || 'recommended') === lvl.id
                        ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Quality Slider:</span>
                <span className="font-bold text-white">{options.quality ?? 75}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                value={options.quality ?? 75}
                onChange={(e) => updateOption('quality', parseInt(e.target.value, 10))}
                className="w-full accent-rose-500 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* 3. Resize for Social */}
        {tool.slug === 'resize-social' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Social Platform Preset:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SOCIAL_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => updateOption('preset', preset.id)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      (options.preset || 'instagram-square') === preset.id
                        ? 'bg-rose-500/20 border-rose-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold truncate text-[11px]">{preset.name}</div>
                    <div className="text-[10px] text-slate-400">{preset.width}x{preset.height} ({preset.aspect})</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Fitting Mode:</label>
                <select
                  value={options.fitMode || 'cover'}
                  onChange={(e) => updateOption('fitMode', e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="cover">Crop & Fill (Cover)</option>
                  <option value="contain">Fit Full Image (Contain / Pad)</option>
                </select>
              </div>

              {options.fitMode === 'contain' && (
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Padding Background:</label>
                  <input
                    type="color"
                    value={options.padColor || '#000000'}
                    onChange={(e) => updateOption('padColor', e.target.value)}
                    className="w-full h-9 rounded-xl bg-slate-950 border border-slate-700 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. Blur Background */}
        {tool.slug === 'blur-background' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Background Blur Intensity:</span>
                <span className="font-bold text-white">{options.blurRadius ?? 15}px</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={options.blurRadius ?? 15}
                onChange={(e) => updateOption('blurRadius', parseInt(e.target.value, 10))}
                className="w-full accent-rose-500 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Focal Subject Area Radius:</span>
                <span className="font-bold text-white">{options.focalSize ?? 45}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="75"
                value={options.focalSize ?? 45}
                onChange={(e) => updateOption('focalSize', parseInt(e.target.value, 10))}
                className="w-full accent-rose-500 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* 5. Remove Background */}
        {tool.slug === 'remove-background' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Color Threshold Sensitivity:</span>
                <span className="font-bold text-white">{options.sensitivity ?? 35}</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                value={options.sensitivity ?? 35}
                onChange={(e) => updateOption('sensitivity', parseInt(e.target.value, 10))}
                className="w-full accent-rose-500 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Isolates foreground subjects and saves as transparent lossless PNG directly on device.
            </p>
          </div>
        )}

        {/* 6. Add Border */}
        {tool.slug === 'add-border' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Border Style:</label>
                <select
                  value={options.style || 'solid'}
                  onChange={(e) => updateOption('style', e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="solid">Standard Uniform Frame</option>
                  <option value="polaroid">Vintage Polaroid (Wide Bottom)</option>
                  <option value="shadow">Soft Drop Shadow Frame</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Border Color:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={options.borderColor || '#ffffff'}
                    onChange={(e) => updateOption('borderColor', e.target.value)}
                    className="w-10 h-8 rounded-lg bg-slate-950 border border-slate-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={options.borderColor || '#ffffff'}
                    onChange={(e) => updateOption('borderColor', e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-300">
                <span>Frame Thickness:</span>
                <span className="font-bold text-white">{options.borderWidth ?? 32}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="80"
                value={options.borderWidth ?? 32}
                onChange={(e) => updateOption('borderWidth', parseInt(e.target.value, 10))}
                className="w-full accent-rose-500 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* 7. Upscale */}
        {tool.slug === 'upscale' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Target Upscale Factor:</span>
              <span className="font-bold text-rose-400 text-sm">2x Super Resolution HD</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enhanceSharpness"
                checked={options.enhanceSharpness !== false}
                onChange={(e) => updateOption('enhanceSharpness', e.target.checked)}
                className="rounded accent-rose-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="enhanceSharpness" className="text-slate-300 cursor-pointer">
                Apply edge-preserving unsharp mask filter
              </label>
            </div>
          </div>
        )}

        {/* 8. Watermark */}
        {tool.slug === 'watermark' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Watermark Text:</label>
              <input
                type="text"
                value={options.text ?? '© HushPic Protected'}
                onChange={(e) => updateOption('text', e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Position:</label>
                <select
                  value={options.position || 'bottom-right'}
                  onChange={(e) => updateOption('position', e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                  <option value="center">Center</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Opacity:</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={options.opacity ?? 70}
                  onChange={(e) => updateOption('opacity', parseInt(e.target.value, 10))}
                  className="w-full accent-rose-500 mt-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* 9. Convert */}
        {tool.slug === 'convert' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Target Image Format:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { mime: 'image/jpeg', name: 'JPG / JPEG' },
                  { mime: 'image/png', name: 'PNG (Lossless)' },
                  { mime: 'image/webp', name: 'WebP (Next-Gen)' },
                ].map((fmt) => (
                  <button
                    key={fmt.mime}
                    type="button"
                    onClick={() => updateOption('targetFormat', fmt.mime)}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                      (options.targetFormat || 'image/webp') === fmt.mime
                        ? 'bg-rose-500/20 border-rose-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmt.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 10. Rotate */}
        {tool.slug === 'rotate' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Rotation Angle:</label>
              <div className="grid grid-cols-3 gap-2">
                {[90, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    type="button"
                    onClick={() => updateOption('angle', deg)}
                    className={`py-2 rounded-xl border font-bold ${
                      (options.angle ?? 90) === deg
                        ? 'bg-rose-500/20 border-rose-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {deg}° Rotate
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-1">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.flipH ?? false}
                  onChange={(e) => updateOption('flipH', e.target.checked)}
                  className="rounded accent-rose-500 w-4 h-4 cursor-pointer"
                />
                <span>Flip Horizontal (Mirror)</span>
              </label>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.flipV ?? false}
                  onChange={(e) => updateOption('flipV', e.target.checked)}
                  className="rounded accent-rose-500 w-4 h-4 cursor-pointer"
                />
                <span>Flip Vertical</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
