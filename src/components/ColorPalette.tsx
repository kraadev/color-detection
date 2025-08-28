import { useState } from 'react';
import ColorCard from './ColorCard';

interface ColorPaletteProps {
  colors: number[][];
  isDarkMode: boolean;
}

const ColorPalette = ({ colors, isDarkMode }: ColorPaletteProps) => {
  const [hoveredColor, setHoveredColor] = useState<number[] | null>(null);

  const handleCopy = (color: number[]) => {
    navigator.clipboard.writeText(`rgb(${color.join(",")})`);
    alert(`Copied: rgb(${color.join(",")})`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
      {colors.map((color, index) => (
        <ColorCard
          key={index}
          color={color}
          index={index}
          isDarkMode={isDarkMode}
          onMouseEnter={(color, event) => setHoveredColor(color)}   // ✅ sesuai props
          onMouseLeave={() => setHoveredColor(null)}
          onClick={(color) => handleCopy(color)}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
