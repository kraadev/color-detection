import React from 'react';

interface AccessibilityReportProps {
  report: Array<{
    foreground: number[];
    background: number[];
    contrastRatio: number;
    compliance: { level: string; status: string; score: string };
  }>;
  isDarkMode: boolean;
}

const AccessibilityReport: React.FC<AccessibilityReportProps> = ({ report, isDarkMode }) => {
  const getComplianceColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass':
      case 'passed':
        return 'bg-emerald-500';
      case 'fail':
      case 'failed':
        return 'bg-red-500';
      case 'aa':
        return 'bg-green-500';
      case 'aaa':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass':
      case 'passed':
        return '✓';
      case 'fail':
      case 'failed':
        return '✗';
      case 'aa':
        return '★';
      case 'aaa':
        return '★★';
      default:
        return '?';
    }
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const getContrastRating = (ratio: number) => {
    if (ratio >= 7) return { text: 'Excellent', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' };
    if (ratio >= 4.5) return { text: 'Good', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
    if (ratio >= 3) return { text: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
    return { text: 'Poor', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
  };

  return (
    <div className={`w-full max-w-6xl rounded-3xl shadow-2xl transition-all duration-500 animate-slideInUp ${
      isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' : 'bg-white/70 backdrop-blur-lg border border-white/20'
    }`}>
      <div className="p-8">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
            isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600'
          }`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            Accessibility Report
          </h2>
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            WCAG 2.1 Color Contrast Analysis • {report.length} Combinations Tested
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700/50 border border-gray-600/30' : 'bg-white/50 border border-gray-200/50'
          }`}>
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {report.filter(item => item.compliance.status.toLowerCase().includes('pass')).length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Passed Tests</div>
            </div>
          </div>
          
          <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700/50 border border-gray-600/30' : 'bg-white/50 border border-gray-200/50'
          }`}>
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {(report.reduce((sum, item) => sum + item.contrastRatio, 0) / report.length).toFixed(1)}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Avg. Contrast</div>
            </div>
          </div>
          
          <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700/50 border border-gray-600/30' : 'bg-white/50 border border-gray-200/50'
          }`}>
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {Math.round((report.filter(item => item.compliance.status.toLowerCase().includes('pass')).length / report.length) * 100)}%
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success Rate</div>
            </div>
          </div>
        </div>

        {/* Modern Card Layout instead of Table */}
        <div className="space-y-4">
          {report.map((item, index) => {
            const rating = getContrastRating(item.contrastRatio);
            return (
              <div 
                key={index}
                className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border ${
                  isDarkMode 
                    ? 'bg-gray-700/30 hover:bg-gray-700/50 border-gray-600/30' 
                    : 'bg-white/60 hover:bg-white/80 border-gray-200/50'
                } animate-slideInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  
                  {/* Color Swatches */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Foreground:
                      </span>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded-lg shadow-md border-2 border-white/50 transition-transform duration-200 hover:scale-110"
                          style={{ backgroundColor: `rgb(${item.foreground.join(',')})` }}
                        />
                        <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {rgbToHex(item.foreground[0], item.foreground[1], item.foreground[2])}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Background:
                      </span>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded-lg shadow-md border-2 border-white/50 transition-transform duration-200 hover:scale-110"
                          style={{ backgroundColor: `rgb(${item.background.join(',')})` }}
                        />
                        <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {rgbToHex(item.background[0], item.background[1], item.background[2])}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contrast Info */}
                  <div className="flex items-center space-x-6">
                    {/* Contrast Ratio */}
                    <div className="text-center">
                      <div className={`text-2xl font-bold transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {item.contrastRatio.toFixed(1)}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Contrast
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${rating.bg} ${rating.color}`}>
                      {rating.text}
                    </div>

                    {/* Compliance Status */}
                    <div className="flex items-center space-x-2">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold transition-all duration-300 hover:scale-110 ${
                        getComplianceColor(item.compliance.status)
                      }`}>
                        {getComplianceIcon(item.compliance.status)}
                      </div>
                      <div className="text-center">
                        <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {item.compliance.level}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.compliance.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className={`w-full h-2 rounded-full overflow-hidden ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-700 delay-${index * 100} ${
                        item.contrastRatio >= 4.5 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                        item.contrastRatio >= 3 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                      style={{ 
                        width: `${Math.min((item.contrastRatio / 21) * 100, 100)}%`,
                        animationDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Min: 3.0
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      WCAG AA: 4.5
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      WCAG AAA: 7.0
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className={`mt-8 p-6 rounded-2xl ${
          isDarkMode ? 'bg-gray-700/30 border border-gray-600/30' : 'bg-gray-50/50 border border-gray-200/30'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Understanding Contrast Ratios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-500"></div>
              <div>
                <div className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>4.5+ (WCAG AA)</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Good accessibility</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              <div>
                <div className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>3.0-4.4</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Minimal compliance</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></div>
              <div>
                <div className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Below 3.0</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Poor accessibility</div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
            isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">
              Higher contrast ratios improve readability for all users
            </span>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes progressFill {
          from { 
            width: 0; 
          }
          to { 
            width: var(--target-width); 
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
};

export default AccessibilityReport;