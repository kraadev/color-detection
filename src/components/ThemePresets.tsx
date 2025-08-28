import { themePresets, hexColorsToRgb } from '../lib/colorUtils';

interface ThemePresetsProps {
  isDarkMode: boolean;
  onThemeSelect: (colors: number[][]) => void;
}

const ThemePresets = ({ isDarkMode, onThemeSelect }: ThemePresetsProps) => {
  return (
    <div className={`w-full max-w-6xl rounded-3xl shadow-2xl transition-all duration-500 ${
      isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg'
    }`}>
      <div className="p-8">
        <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Preset Themes
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themePresets.map((theme, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                  : 'bg-gray-100/50 hover:bg-white/50'
              }`}
              onClick={() => onThemeSelect(hexColorsToRgb(theme.colors))}
            >
              <div className="h-32 rounded-xl mb-4 shadow-inner overflow-hidden">
                <div 
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(to right, ${theme.colors.join(', ')})`
                  }}
                />
              </div>
              
              <h3 className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {theme.name}
              </h3>
              
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {theme.description}
              </p>
              
              <div className="flex mt-3 space-x-1">
                {theme.colors.slice(0, 5).map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="flex-1 h-4 rounded-md"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-8 text-sm transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Click on any theme to load its color palette</p>
        </div>
      </div>
    </div>
  );
};

export default ThemePresets;
