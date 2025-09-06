import { generateAnalogousColors, generateComplementaryColors, generateMonochromeColors, hexToRgb } from '../lib/colorUtils';
import ColorCard from './ColorCard';

interface ColorHarmonyProps {
  selectedColor: string | null;
  isDarkMode: boolean;
  onMouseEnter: (event: React.MouseEvent, color: number[]) => void;
  onMouseLeave: () => void;
  onColorClick: (color: number[]) => void;
}

const ColorHarmony = ({ selectedColor, isDarkMode, onMouseEnter, onMouseLeave, onColorClick }: ColorHarmonyProps) => {
  if (!selectedColor) return null;

  const analogousColors = generateAnalogousColors(selectedColor);
  const complementaryColors = generateComplementaryColors(selectedColor);
  const monochromeColors = generateMonochromeColors(selectedColor);

  const harmonyTypes = [
    {
      title: 'Analogous Colors',
      description: 'Colors adjacent on the color wheel',
      colors: analogousColors
    },
    {
      title: 'Complementary Colors',
      description: 'Colors opposite on the color wheel',
      colors: complementaryColors
    },
    {
      title: 'Monochrome Colors',
      description: 'Variations of lightness and darkness',
      colors: monochromeColors
    }
  ];

  return (
    <div className={`w-full max-w-6xl rounded-3xl shadow-2xl transition-all duration-500 ${
      isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg'
    }`}>
      <div className="p-8">
        <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Color Harmony Preview
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {harmonyTypes.map((harmony, harmonyIndex) => (
            <div key={harmonyIndex} className="text-center">
              <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {harmony.title}
              </h3>
              <p className={`text-sm mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {harmony.description}
              </p>
              
              <div className="flex flex-col items-center space-y-4">
                {harmony.colors.map((colorHex, index) => {
                  const rgb = hexToRgb(colorHex);
                  return (
                    <div key={index} className="w-20">
                      <ColorCard
                        color={rgb}
                        index={index}
                        isDarkMode={isDarkMode}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClick={onColorClick}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-8 text-sm transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Click on any color to copy its HEX code to clipboard</p>
        </div>
      </div>
    </div>
  );
};

export default ColorHarmony;