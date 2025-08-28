import { useState } from 'react';
import { rgbToHex, getColorName } from '../lib/colorUtils';

interface FullscreenPreviewProps {
  colors: number[][];
  isDarkMode: boolean;
  onClose: () => void;
}

type PreviewMode = 'cards' | 'buttons' | 'backgrounds' | 'typography';

const FullscreenPreview = ({ colors, isDarkMode, onClose }: FullscreenPreviewProps) => {
  console.log("Colors received for preview:", colors);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('cards');

  if (!colors || colors.length === 0) return null;

  // Get primary, secondary, and accent colors from the palette
  const primaryColor = colors[0];
  const secondaryColor = colors.length > 1 ? colors[1] : primaryColor;
  const accentColor = colors.length > 2 ? colors[2] : secondaryColor;
  const backgroundColor = colors.length > 3 ? colors[3] : [240, 240, 240];
  const textColor = colors.length > 4 ? colors[4] : [0, 0, 0];

  const getContrastColor = (rgb: number[]) => {
    // Simple contrast calculation for text on colored backgrounds
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 128 ? 'text-gray-900' : 'text-white';
  };

  const renderCardsPreview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {/* Primary Color Card */}
      <div
        className="rounded-3xl shadow-2xl p-6 transition-all duration-500 hover:scale-105"
        style={{ backgroundColor: `rgb(${primaryColor.join(',')})` }}
      >
        <div className={`text-2xl font-bold mb-4 ${getContrastColor(primaryColor)}`}>
          Primary Card
        </div>
        <p className={`mb-4 ${getContrastColor(primaryColor)} opacity-90`}>
          This card uses the primary color from your palette. Perfect for important content sections.
        </p>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
            getContrastColor(primaryColor) === 'text-white'
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-black/10 text-gray-900 hover:bg-black/20'
          }`}
        >
          Action Button
        </button>
      </div>

      {/* Secondary Color Card */}
      <div
        className="rounded-3xl shadow-2xl p-6 transition-all duration-500 hover:scale-105"
        style={{ backgroundColor: `rgb(${secondaryColor.join(',')})` }}
      >
        <div className={`text-2xl font-bold mb-4 ${getContrastColor(secondaryColor)}`}>
          Secondary Card
        </div>
        <p className={`mb-4 ${getContrastColor(secondaryColor)} opacity-90`}>
          This card uses the secondary color. Great for supporting content and variations.
        </p>
        <div className="flex space-x-3">
          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
              getContrastColor(secondaryColor) === 'text-white'
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-black/10 text-gray-900 hover:bg-black/20'
            }`}
          >
            Option 1
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
              getContrastColor(secondaryColor) === 'text-white'
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-black/10 text-gray-900 hover:bg-black/20'
            }`}
          >
            Option 2
          </button>
        </div>
      </div>

      {/* Accent Color Card */}
      <div
        className="rounded-3xl shadow-2xl p-6 transition-all duration-500 hover:scale-105"
        style={{ backgroundColor: `rgb(${accentColor.join(',')})` }}
      >
        <div className={`text-2xl font-bold mb-4 ${getContrastColor(accentColor)}`}>
          Accent Card
        </div>
        <p className={`mb-4 ${getContrastColor(accentColor)} opacity-90`}>
          This card uses an accent color. Ideal for highlights and call-to-actions.
        </p>
        <div className="bg-white/20 rounded-xl p-3">
          <div className={`text-sm ${getContrastColor(accentColor)}`}>
            <strong>Color Info:</strong> {getColorName(accentColor)}
          </div>
          <div className={`text-xs ${getContrastColor(accentColor)} opacity-80`}>
            {rgbToHex(accentColor[0], accentColor[1], accentColor[2])}
          </div>
        </div>
      </div>
    </div>
  );

  const renderButtonsPreview = () => (
    <div className="p-8 space-y-8">
      {/* Primary Buttons */}
      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Primary Buttons
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            style={{ backgroundColor: `rgb(${primaryColor.join(',')})` }}
            className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Primary Button
          </button>
          <button
            style={{ 
              backgroundColor: `rgb(${primaryColor.join(',')})`,
              opacity: 0.8
            }}
            className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Hover State
          </button>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Secondary Buttons
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            style={{ 
              border: `2px solid rgb(${secondaryColor.join(',')})`,
              color: `rgb(${secondaryColor.join(',')})`
            }}
            className="px-8 py-4 rounded-2xl bg-transparent font-bold text-lg hover:bg-opacity-10 transition-all duration-300"
          >
            Outline Button
          </button>
          <button
            style={{ backgroundColor: `rgb(${secondaryColor.join(',')})` }}
            className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Filled Button
          </button>
        </div>
      </div>

      {/* Accent Buttons */}
      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Accent Buttons
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            style={{ backgroundColor: `rgb(${accentColor.join(',')})` }}
            className="px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Small Accent
          </button>
          <button
            style={{ 
              background: `linear-gradient(135deg, rgb(${accentColor.join(',')}), rgb(${secondaryColor.join(',')}))`
            }}
            className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Gradient Button
          </button>
        </div>
      </div>
    </div>
  );

  const renderBackgroundsPreview = () => (
    <div className="p-8 space-y-8">
      {/* Solid Background */}
      <div 
        className="rounded-3xl p-8 shadow-2xl"
        style={{ backgroundColor: `rgb(${backgroundColor.join(',')})` }}
      >
        <h3 className={`text-2xl font-bold mb-4 ${getContrastColor(backgroundColor)}`}>
          Solid Background
        </h3>
        <p className={`${getContrastColor(backgroundColor)} opacity-90`}>
          This section demonstrates a solid background color application. Perfect for content containers and sections.
        </p>
      </div>

      {/* Gradient Background */}
      <div 
        className="rounded-3xl p-8 shadow-2xl"
        style={{ 
          background: `linear-gradient(135deg, rgb(${primaryColor.join(',')}), rgb(${secondaryColor.join(',')}))`
        }}
      >
        <h3 className="text-2xl font-bold mb-4 text-white">
          Gradient Background
        </h3>
        <p className="text-white opacity-90">
          Gradient backgrounds create visual interest and depth. This uses your primary and secondary colors.
        </p>
      </div>

      {/* Pattern Background */}
      <div 
        className="rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        style={{ backgroundColor: `rgb(${backgroundColor.join(',')})` }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgb(${accentColor.join(',')}) 0px, rgb(${accentColor.join(',')}) 4px, transparent 4px, transparent 8px)`
        }}></div>
        <div className="relative">
          <h3 className={`text-2xl font-bold mb-4 ${getContrastColor(backgroundColor)}`}>
            Pattern Background
          </h3>
          <p className={`${getContrastColor(backgroundColor)} opacity-90`}>
            Subtle patterns add texture without overwhelming the content. This uses your accent color.
          </p>
        </div>
      </div>
    </div>
  );

  const renderTypographyPreview = () => (
    <div className="p-8 space-y-8">
      {/* Headings */}
      <div className="text-center">
        <h1 
          style={{ color: `rgb(${primaryColor.join(',')})` }}
          className="text-5xl font-bold mb-4"
        >
          Heading 1 - Primary Color
        </h1>
        <h2 
          style={{ color: `rgb(${secondaryColor.join(',')})` }}
          className="text-3xl font-semibold mb-4"
        >
          Heading 2 - Secondary Color
        </h2>
        <h3 
          style={{ color: `rgb(${accentColor.join(',')})` }}
          className="text-xl font-medium"
        >
          Heading 3 - Accent Color
        </h3>
      </div>

      {/* Body Text */}
      <div className="max-w-2xl mx-auto">
        <p 
          style={{ color: `rgb(${textColor.join(',')})` }}
          className="text-lg leading-relaxed mb-6"
        >
          This is body text using your selected text color. Good typography ensures readability and creates hierarchy in your designs.
        </p>
        <p 
          style={{ color: `rgb(${textColor.join(',')})`, opacity: 0.7 }}
          className="text-base leading-relaxed"
        >
          Secondary body text with reduced opacity for less important information or captions.
        </p>
      </div>

      {/* Color Blocks with Text */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[primaryColor, secondaryColor, accentColor].map((color, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 text-center"
            style={{ backgroundColor: `rgb(${color.join(',')})` }}
          >
            <div className={`text-lg font-bold mb-2 ${getContrastColor(color)}`}>
              {getColorName(color)}
            </div>
            <div className={`text-sm ${getContrastColor(color)} opacity-80`}>
              {rgbToHex(color[0], color[1], color[2])}
            </div>
            <div className={`text-xs mt-3 ${getContrastColor(color)} opacity-60`}>
              RGB({color.join(', ')})
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 p-6 border-b ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Color Application Preview</h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ✕
            </button>
          </div>
          
          {/* Preview Mode Selector */}
          <div className={`flex rounded-2xl p-1 mt-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            {(['cards', 'buttons', 'backgrounds', 'typography'] as PreviewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setPreviewMode(mode)}
                className={`px-6 py-2 rounded-xl transition-all duration-300 font-semibold capitalize ${
                  previewMode === mode
                    ? isDarkMode
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {previewMode === 'cards' && renderCardsPreview()}
          {previewMode === 'buttons' && renderButtonsPreview()}
          {previewMode === 'backgrounds' && renderBackgroundsPreview()}
          {previewMode === 'typography' && renderTypographyPreview()}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="text-center text-sm opacity-75">
            Previewing {colors.length} extracted colors in various UI applications
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenPreview;
