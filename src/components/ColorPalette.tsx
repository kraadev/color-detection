"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface ColorPaletteProps {
  colors: number[][];
  layout: "grid" | "list" | "gradient";
  isDarkMode: boolean;
  onMouseEnter: (color: number[], event: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onColorClick: (color: number[]) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  layout,
  isDarkMode,
  onMouseEnter,
  onMouseLeave,
  onColorClick,
}) => {
  return (
    <div
      className={cn(
        "w-full h-full transition-all duration-500 ease-in-out",
        layout === "grid" &&
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4",
        layout === "list" && "flex flex-col gap-4 p-4",
        layout === "gradient" && "flex flex-col items-center justify-center p-8"
      )}
    >
      {layout === "grid" &&
        colors.map((color, i) => (
          <ColorCard
            key={i}
            color={color}
            index={i}
            isDarkMode={isDarkMode}
            onMouseEnter={(event) => onMouseEnter(color, event)}   // ✅ FIX
            onMouseLeave={onMouseLeave}
            onClick={() => onColorClick(color)}                    // ✅ konsisten
          />
        ))}

      {layout === "list" &&
        colors.map((color, i) => (
          <ColorRow
            key={i}
            color={color}
            index={i}
            isDarkMode={isDarkMode}
            onMouseEnter={(event) => onMouseEnter(color, event)}
            onMouseLeave={onMouseLeave}
            onClick={() => onColorClick(color)}
          />
        ))}

      {layout === "gradient" && (
        <GradientDisplay
          colors={colors}
          isDarkMode={isDarkMode}
          onMouseEnter={(event) => {
            const midColor = colors[Math.floor(colors.length / 2)];
            onMouseEnter(midColor, event);
          }}
          onMouseLeave={onMouseLeave}
          onClick={() => onColorClick(colors[Math.floor(colors.length / 2)])}
        />
      )}
    </div>
  );
};

interface ColorCardProps {
  color: number[];
  index: number;
  isDarkMode: boolean;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const ColorCard: React.FC<ColorCardProps> = ({
  color,
  index,
  isDarkMode,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const [copied, setCopied] = useState(false);
  const colorString = `rgb(${color.join(",")})`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(colorString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="group relative aspect-square cursor-pointer rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
      style={{ backgroundColor: colorString }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white text-xs p-2 flex justify-between items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span>{colorString}</span>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};

interface ColorRowProps {
  color: number[];
  index: number;
  isDarkMode: boolean;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const ColorRow: React.FC<ColorRowProps> = ({
  color,
  index,
  isDarkMode,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const [copied, setCopied] = useState(false);
  const colorString = `rgb(${color.join(",")})`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(colorString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="group relative h-20 rounded-lg shadow-md overflow-hidden cursor-pointer flex items-center transition-transform duration-300 hover:scale-[1.02]"
      style={{ backgroundColor: colorString }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm text-white text-sm p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>{colorString}</span>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

interface GradientDisplayProps {
  colors: number[][];
  isDarkMode: boolean;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const GradientDisplay: React.FC<GradientDisplayProps> = ({
  colors,
  isDarkMode,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const [copied, setCopied] = useState(false);
  const gradientString = `linear-gradient(to right, ${colors
    .map((c) => `rgb(${c.join(",")})`)
    .join(", ")})`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(gradientString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="group relative w-full h-40 rounded-xl shadow-lg cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      style={{ background: gradientString }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm text-white text-sm p-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Gradient</span>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ColorPalette;
