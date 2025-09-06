import { getColorName } from '../lib/colorUtils';
import { rgbToHex } from '../lib/colorUtils';

interface ColorCardProps {
  color: number[];
  index: number;
  isDarkMode: boolean;
  onMouseEnter: (event: React.MouseEvent, color: number[]) => void;
  onMouseLeave: () => void;
  onClick: (color: number[]) => void;
}

const ColorCard = ({ color, index, isDarkMode, onMouseEnter, onMouseLeave, onClick }: ColorCardProps) => (
  <div
    className="group cursor-pointer transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 animate-slide-in-up"
    onClick={() => onClick(color)}
    onMouseEnter={(event) => onMouseEnter(event, color)}
    onMouseLeave={onMouseLeave}
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div
      className="w-32 h-32 md:w-36 md:h-36 rounded-3xl shadow-xl relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:rotate-3"
      style={{ backgroundColor: `rgb(${color.join(",")})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
      
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-3">
        <div className="font-bold text-lg mb-2 text-center">{getColorName(color)}</div>
        <div className="font-semibold mb-1">RGB({color.join(", ")})</div>
        <div className="font-mono text-sm">{rgbToHex(color[0], color[1], color[2])}</div>
        <div className="mt-3 text-xs animate-pulse">Click to copy!</div>
      </div>
    </div>
    
    <div className="mt-4 text-center">
      <div className={`text-lg md:text-xl font-bold mb-1 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-800'
      }`}>
        {getColorName(color)}
      </div>
      <div className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        RGB({color.join(", ")})
      </div>
      <div className={`text-xs font-mono transition-colors duration-300 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {rgbToHex(color[0], color[1], color[2])}
      </div>
    </div>
  </div>
);

export default ColorCard;