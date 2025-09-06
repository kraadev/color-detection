import React, { useState, useMemo } from 'react';
import {
  ExportFormat,
  getColorName,
  rgbToHex,
  generateAccessibilityReport,
  adjustLuminance,
  simulateProtanopia,
  simulateDeuteranopia,
  simulateTritanopia,
  ColorBlindnessMode,
} from '../lib/colorUtils';
import ColorCard from './ColorCard';
import AccessibilityReport from './AccessibilityReport';

interface ColorPaletteProps {
  colors: number[][];
  isDarkMode: boolean;
  isAnalyzing: boolean;
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;
  onColorHover: (color: number[], event: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onColorClick: (color: number[]) => void;
  onDownload: () => void;
  onPreview: () => void;
}

type ViewMode = 'grid' | 'list' | 'gradient';

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  isDarkMode,
  isAnalyzing,
  exportFormat,
  setExportFormat,
  onColorHover,
  onMouseLeave,
  onColorClick,
  onDownload,
  onPreview,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [customPresets, setCustomPresets] = useState<Record<string, number[][]>>({});

  const saveCustomPreset = (name: string, colorsToSave: number[][]) => {
    setCustomPresets((prev) => ({
      ...prev,
      [name]: colorsToSave,
    }));
    // Note: localStorage is not available in some SSR environments.
    // If you want persistence across sessions, implement a server-side or IndexedDB solution
    // and guard with `typeof window !== 'undefined'` when accessing client-only APIs.
  };

  const [showAccessibilityReport, setShowAccessibilityReport] = useState(false);
  const [luminance, setLuminance] = useState<number>(0);
  const [colorBlindnessMode, setColorBlindnessMode] = useState<ColorBlindnessMode>('normal');

  // Apply luminance adjustment and color blindness simulation to colors
  const adjustedColors = useMemo(() => {
    if (!colors || colors.length === 0) return [] as number[][];

    let processedColors = colors.map((c) => c.slice(0, 3)); // ensure RGB

    // Apply luminance adjustment
    if (luminance !== 0) {
      processedColors = processedColors.map((color) => adjustLuminance(color, luminance));
    }

    // Apply color blindness simulation
    if (colorBlindnessMode !== 'normal') {
      processedColors = processedColors.map((color) => {
        switch (colorBlindnessMode) {
          case 'protanopia':
            return simulateProtanopia(color);
          case 'deuteranopia':
            return simulateDeuteranopia(color);
          case 'tritanopia':
            return simulateTritanopia(color);
          default:
            return color;
        }
      });
    }

    return processedColors;
  }, [colors, luminance, colorBlindnessMode]);

  

  // If analyzing, don't render the palette; return null early.
  if (isAnalyzing) return null;

  return (
    <div
      className={`w-full max-w-6xl rounded-3xl shadow-2xl transition-all duration-500 ${
        isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg'
      }`}
    >
      <div className="p-8">
        <div className="flex flex-col items-center mb-8">
          <h2
            className={`text-4xl font-bold text-center mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}
          >
            Extracted Color Palette ({adjustedColors.length} colors)
          </h2>

          {/* View Mode Toggle */}
          <div
            className={`flex rounded-2xl p-1 transition-all duration-300 mb-4 ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
            }`}
          >
            {(['grid', 'list', 'gradient'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-6 py-2 rounded-xl transition-all duration-300 font-semibold capitalize ${
                  viewMode === mode
                    ? isDarkMode
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Luminance Slider */}
          <div className="w-full max-w-md">
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Luminance Adjustment: {luminance > 0 ? `+${luminance}%` : `${luminance}%`}
            </label>
            <input
              type="range"
              min={-50}
              max={50}
              value={luminance}
              onChange={(e) => setLuminance(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              title="Adjust luminance level"
              style={{
                background: `linear-gradient(to right, ${
                  isDarkMode ? '#4b5563' : '#d1d5db'
                } 0%, ${isDarkMode ? '#9ca3af' : '#9ca3af'} 50%, ${
                  isDarkMode ? '#e5e7eb' : '#f3f4f6'
                } 100%)`,
              }}
            />
            <div className="flex justify-between text-xs mt-1">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>-50%</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>0%</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>+50%</span>
            </div>
          </div>

          {/* Save Custom Preset */}
          <div className="w-full max-w-md mt-6">
            <button
              onClick={() => {
                if (typeof window === 'undefined') return; // guard for SSR
                const presetName = window.prompt('Enter a name for your custom preset:');
                if (presetName) {
                  // Save the current palette as a preset
                  saveCustomPreset(presetName, adjustedColors);
                }
              }}
              className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold ${
                isDarkMode ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
              }`}
            >
              Save Custom Preset
            </button>
          </div>

          {/* Color Blindness Mode Selector */}
          <div className="w-full max-w-md mt-6">
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Color Blindness Simulation
            </label>
            <div
              className={`flex rounded-2xl p-1 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
              }`}
            >
              {(['normal', 'protanopia', 'deuteranopia', 'tritanopia'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setColorBlindnessMode(mode)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm capitalize ${
                    colorBlindnessMode === mode
                      ? isDarkMode
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-blue-600 text-white shadow-lg'
                      : isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  {mode === 'normal'
                    ? 'Normal'
                    : mode === 'protanopia'
                    ? 'Protanopia'
                    : mode === 'deuteranopia'
                    ? 'Deuteranopia'
                    : 'Tritanopia'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === 'grid' && (
          <>
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-6 gap-6 mb-8">
              {adjustedColors.map((color, i) => (
                <ColorCard
                  key={i}
                  color={color}
                  index={i}
                  isDarkMode={isDarkMode}
                  onMouseEnter={(event) => { onColorHover(color, event); }}
                  onMouseLeave={onMouseLeave}
                  onClick={onColorClick}
                />
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden mb-8">
              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                {adjustedColors.map((color, i) => (
                  <div key={i} className="flex-shrink-0">
                    <ColorCard
                      color={color}
                      index={i}
                      isDarkMode={isDarkMode}
                      onMouseEnter={(event) => { onColorHover(color, event); }}
                      onMouseLeave={onMouseLeave}
                      onClick={onColorClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {viewMode === 'list' && (
          <div className="mb-8">
            <div className="grid gap-4">
              {adjustedColors.map((color, i) => (
                <div
                  key={i}
                  className={`flex items-center p-4 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105 ${
                    isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-white/50'
                  }`}
                  onClick={() => onColorClick(color)}
                  onMouseEnter={(event) => onMouseEnter(color, event)}
                  onMouseLeave={onMouseLeave}
                >
                  <div
                    className="w-16 h-16 rounded-xl mr-4 shadow-inner"
                    style={{ backgroundColor: `rgb(${color.join(',')})` }}
                  />
                  <div className="flex-1">
                    <div
                      className={`font-bold text-lg transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}
                    >
                      {getColorName(color)}
                    </div>
                    <div
                      className={`text-sm font-mono transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      RGB({color.join(', ')})
                    </div>
                    <div
                      className={`text-sm font-mono transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}
                    >
                      {rgbToHex(color[0], color[1], color[2])}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'gradient' && (
          <div className="mb-8">
            <div
              className="w-full h-48 rounded-2xl shadow-inner mb-4"
              style={{
                background: `linear-gradient(to right, ${adjustedColors
                  .map((color) => `rgb(${color.join(',')})`)
                  .join(', ')})`,
              }}
            />
            <div className="grid grid-cols-6 gap-2">
              {adjustedColors.map((color, i) => (
                <div
                  key={i}
                  className="h-8 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: `rgb(${color.join(',')})` }}
                  onClick={() => onColorClick(color)}
                  onMouseEnter={(event) => onMouseEnter(color, event)}
                  onMouseLeave={onMouseLeave}
                  title={`${getColorName(color)} - ${rgbToHex(color[0], color[1], color[2])}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Export Format Selector */}
        <div className="flex justify-center mb-6">
          <div
            className={`flex rounded-2xl p-2 transition-all duration-300 ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
            }`}
          >
            {(['json', 'css', 'png'] as const).map((format) => (
              <button
                key={format}
                onClick={() => setExportFormat(format)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                  exportFormat === format
                    ? isDarkMode
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowAccessibilityReport(!showAccessibilityReport)}
            className={`px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold text-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500'
            }`}
          >
            {showAccessibilityReport ? '📊 Hide Accessibility' : '📊 Show Accessibility'}
          </button>

          <button
            onClick={onPreview}
            className={`px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold text-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-500 hover:to-red-500'
                : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-500 hover:to-red-500'
            }`}
          >
            🎨 Preview Colors
          </button>

          <button
            onClick={onDownload}
            className={`px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold text-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'
            }`}
          >
            {exportFormat === 'json' ? '💾 Download JSON' : exportFormat === 'css' ? '📄 Download CSS' : '🖼️ Download PNG Strip'}
          </button>
        </div>

        {/* Accessibility Report */}
        {showAccessibilityReport && (
          <div className="mt-8">
            <AccessibilityReport report={generateAccessibilityReport(adjustedColors)} isDarkMode={isDarkMode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPalette;
