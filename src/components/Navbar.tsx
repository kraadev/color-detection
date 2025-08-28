import ColorLogo from './ColorLogo';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  showAbout: boolean;
  setShowAbout: (value: boolean) => void;
  hasImage: boolean;
  onClearImage: () => void;
  showPresets: () => void;
  onShowHowToUse: () => void;
}

const Navbar = ({ 
  isDarkMode, 
  setIsDarkMode, 
  showAbout, 
  setShowAbout, 
  hasImage, 
  onClearImage, 
  showPresets,
  onShowHowToUse
}: NavbarProps) => (
  <nav className={`w-full px-6 py-4 backdrop-blur-md transition-all duration-300 ${
    isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white/30 border-gray-200'
  } border-b`}>
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <ColorLogo />
        <span className={`text-xl font-bold transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          ColorExtract Pro
        </span>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-6">
        <button
          onClick={onShowHowToUse}
          className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
            isDarkMode 
              ? 'text-blue-300 hover:text-white hover:bg-blue-800/30' 
              : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
          }`}
        >
          How to Use
        </button>
        
        <button
          onClick={showPresets}
          className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
            isDarkMode 
              ? 'text-purple-300 hover:text-white hover:bg-purple-800/30' 
              : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'
          }`}
        >
          Themes
        </button>

        <button
          onClick={() => setShowAbout(!showAbout)}
          className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
            isDarkMode 
              ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          About
        </button>
        
        {hasImage && (
          <button
            onClick={onClearImage}
            className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
              isDarkMode 
                ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30' 
                : 'text-red-600 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            Clear
          </button>
        )}
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isDarkMode 
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
              : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
          }`}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          <div className="text-lg md:text-xl">
            {isDarkMode ? '☀️' : '🌙'}
          </div>
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;