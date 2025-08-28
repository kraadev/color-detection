import React from 'react';

interface HowToUseProps {
  isDarkMode?: boolean;
  onClose?: () => void;
}

const HowToUse = ({ isDarkMode = false, onClose }: HowToUseProps) => {
  const steps = [
    {
      title: "Upload an Image",
      description: "Click on the upload area or drag and drop an image file. Supported formats include JPG, PNG, GIF, and WebP.",
      tips: [
        "Maximum file size: 10MB",
        "Higher resolution images provide better color detection",
        "Images with varied colors work best"
      ]
    },
    {
      title: "Automatic Color Extraction",
      description: "The AI-powered algorithm will analyze your image and extract the most dominant colors automatically.",
      tips: [
        "Processing typically takes 1-3 seconds",
        "The app extracts up to 6 dominant colors",
        "Colors are optimized for design use"
      ]
    },
    {
      title: "Explore Your Palette",
      description: "View your extracted colors in different layouts: grid, list, or gradient view modes.",
      tips: [
        "Click any color to copy its hex code",
        "Hover over colors to preview them as background",
        "Switch between view modes for different perspectives"
      ]
    },
    {
      title: "Customize & Adjust",
      description: "Fine-tune your palette using the luminance slider and test color blindness accessibility.",
      tips: [
        "Adjust brightness from -50% to +50%",
        "Test with different color blindness simulations",
        "Save custom presets during your session"
      ]
    },
    {
      title: "Preview & Export",
      description: "See how your colors look in real UI components and export in multiple formats.",
      tips: [
        "Preview colors in cards, buttons, backgrounds, and typography",
        "Export as JSON, CSS variables, or PNG color strip",
        "Use the accessibility report for WCAG compliance"
      ]
    }
  ];

  const features = [
    {
      icon: "🎨",
      title: "Smart Color Detection",
      description: "Advanced algorithm that identifies the most visually significant colors"
    },
    {
      icon: "♿",
      title: "Accessibility Testing",
      description: "Built-in color blindness simulation and contrast ratio analysis"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Works perfectly on desktop, tablet, and mobile devices"
    },
    {
      icon: "💾",
      title: "Multiple Export Formats",
      description: "Export as JSON data, CSS variables, or PNG color strips"
    },
    {
      icon: "🖼️",
      title: "Live Preview",
      description: "See your colors applied to real UI components instantly"
    },
    {
      icon: "⚡",
      title: "Performance Optimized",
      description: "Fast processing even with large images through smart resizing"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-all duration-500 ${
        isDarkMode ? 'bg-gray-800/95 backdrop-blur-lg text-white' : 'bg-white/95 backdrop-blur-lg text-gray-800'
      }`}>
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1 pr-4">
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent' 
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'
              }`}>
                How to Use Color Detection
              </h1>
              <p className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Extract beautiful color palettes from any image with AI-powered precision
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Close how to use guide"
              >
                ✕
              </button>
            )}
          </div>

          {/* Step-by-step Guide */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Step-by-Step Guide
            </h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-4 md:p-6 transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-white text-sm md:text-base ${
                      isDarkMode ? 'bg-purple-600' : 'bg-blue-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg md:text-xl font-semibold mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`mb-3 leading-relaxed text-sm md:text-base transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>
                      <ul className={`text-xs md:text-sm space-y-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-2">
                            <span className="text-green-500 flex-shrink-0 mt-0.5">•</span>
                            <span className="break-words">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Overview */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Key Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-white/50'
                  }`}
                >
                  <div className="text-2xl md:text-3xl mb-3">{feature.icon}</div>
                  <h3 className={`text-base md:text-lg font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className={`rounded-2xl p-4 md:p-6 transition-all duration-300 ${
            isDarkMode ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50' : 'bg-gradient-to-r from-purple-100/50 to-blue-100/50'
          }`}>
            <h3 className={`text-lg md:text-xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Pro Tips for Best Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Image Selection
                </h4>
                <ul className={`text-xs md:text-sm space-y-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>• Use images with good contrast and varied colors</li>
                  <li>• Avoid heavily filtered or overly saturated images</li>
                  <li>• Photos with natural lighting work best</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Usage Tips
                </h4>
                <ul className={`text-xs md:text-sm space-y-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>• Test accessibility before using in designs</li>
                  <li>• Save custom presets for future reference</li>
                  <li>• Use the preview feature to see real applications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className={`text-base md:text-lg mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Ready to create amazing color palettes?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {onClose && (
                <button
                  onClick={onClose}
                  className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold text-base md:text-lg ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'
                  }`}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;