export interface ColorInfo {
  rgb: number[];
  name: string;
  hex: string;
}

export interface CursorInfo {
  x: number;
  y: number;
  color: number[];
  name: string;
  show: boolean;
}

export type ExportFormat = 'json' | 'css' | 'png';

export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
};

export const colorNames = [
  { name: 'Red', rgb: [255, 0, 0] },
  { name: 'Crimson', rgb: [220, 20, 60] },
  { name: 'Orange', rgb: [255, 165, 0] },
  { name: 'Yellow', rgb: [255, 255, 0] },
  { name: 'Gold', rgb: [255, 215, 0] },
  { name: 'Green', rgb: [0, 128, 0] },
  { name: 'Lime', rgb: [0, 255, 0] },
  { name: 'Forest Green', rgb: [34, 139, 34] },
  { name: 'Blue', rgb: [0, 0, 255] },
  { name: 'Navy', rgb: [0, 0, 128] },
  { name: 'Sky Blue', rgb: [135, 206, 235] },
  { name: 'Cyan', rgb: [0, 255, 255] },
  { name: 'Purple', rgb: [128, 0, 128] },
  { name: 'Violet', rgb: [238, 130, 238] },
  { name: 'Magenta', rgb: [255, 0, 255] },
  { name: 'Pink', rgb: [255, 192, 203] },
  { name: 'Rose', rgb: [255, 0, 127] },
  { name: 'Brown', rgb: [165, 42, 42] },
  { name: 'Chocolate', rgb: [210, 105, 30] },
  { name: 'Tan', rgb: [210, 180, 140] },
  { name: 'Beige', rgb: [245, 245, 220] },
  { name: 'Black', rgb: [0, 0, 0] },
  { name: 'Gray', rgb: [128, 128, 128] },
  { name: 'Silver', rgb: [192, 192, 192] },
  { name: 'White', rgb: [255, 255, 255] },
  { name: 'Maroon', rgb: [128, 0, 0] },
  { name: 'Olive', rgb: [128, 128, 0] },
  { name: 'Teal', rgb: [0, 128, 128] },
  { name: 'Indigo', rgb: [75, 0, 130] },
  { name: 'Coral', rgb: [255, 127, 80] },
  { name: 'Salmon', rgb: [250, 128, 114] },
  { name: 'Khaki', rgb: [240, 230, 140] },
  { name: 'Lavender', rgb: [230, 230, 250] },
  { name: 'Mint', rgb: [189, 252, 201] },
  { name: 'Peach', rgb: [255, 218, 185] },
  { name: 'Turquoise', rgb: [64, 224, 208] },
  { name: 'Plum', rgb: [221, 160, 221] },
  { name: 'Ivory', rgb: [255, 255, 240] },
  { name: 'Jade', rgb: [0, 168, 107] },
  { name: 'Ruby', rgb: [224, 17, 95] },
  { name: 'Emerald', rgb: [80, 200, 120] },
  { name: 'Sapphire', rgb: [15, 82, 186] },
  { name: 'Amber', rgb: [255, 191, 0] },
  { name: 'Copper', rgb: [184, 115, 51] },
  { name: 'Bronze', rgb: [205, 127, 50] }
];

export const getColorName = (rgb: number[]) => {
  let minDistance = Infinity;
  let closestColor = 'Unknown';
  
  for (const color of colorNames) {
    const distance = Math.sqrt(
      Math.pow(rgb[0] - color.rgb[0], 2) +
      Math.pow(rgb[1] - color.rgb[1], 2) +
      Math.pow(rgb[2] - color.rgb[2], 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color.name;
    }
  }
  
  return closestColor;
};

// Color harmony functions
export const hexToRgb = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
};

export const generateAnalogousColors = (hex: string, count = 5): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const colors: string[] = [];
  
  for (let i = -Math.floor(count/2); i <= Math.floor(count/2); i++) {
    if (i === 0) continue;
    const hue = (hsl[0] + i * 30 + 360) % 360;
    const newRgb = hslToRgb(hue, hsl[1], hsl[2]);
    colors.push(rgbToHex(newRgb[0], newRgb[1], newRgb[2]));
  }
  
  return colors;
};

export const generateComplementaryColors = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const complementaryHue = (hsl[0] + 180) % 360;
  const complementaryRgb = hslToRgb(complementaryHue, hsl[1], hsl[2]);
  
  return [
    hex,
    rgbToHex(complementaryRgb[0], complementaryRgb[1], complementaryRgb[2])
  ];
};

export const generateMonochromeColors = (hex: string, count = 5): string[] => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const colors: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const lightness = Math.max(0, Math.min(100, hsl[2] + (i - Math.floor(count/2)) * 15));
    const newRgb = hslToRgb(hsl[0], hsl[1], lightness);
    colors.push(rgbToHex(newRgb[0], newRgb[1], newRgb[2]));
  }
  
  return colors;
};

// RGB to HSL conversion
export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return [h * 360, s * 100, l * 100];
};

// HSL to RGB conversion
export const hslToRgb = (h: number, s: number, l: number): number[] => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// Color blindness simulation functions
export const simulateProtanopia = (rgb: number[]): number[] => {
  const [r, g, b] = rgb;
  return [
    Math.round(r * 0.56667 + g * 0.43333),
    Math.round(r * 0.55833 + g * 0.44167),
    b
  ];
};

export const simulateDeuteranopia = (rgb: number[]): number[] => {
  const [r, g, b] = rgb;
  return [
    Math.round(r * 0.625 + g * 0.375),
    Math.round(r * 0.7 + g * 0.3),
    b
  ];
};

export const simulateTritanopia = (rgb: number[]): number[] => {
  const [r, g, b] = rgb;
  return [
    r,
    Math.round(g * 0.7 + b * 0.3),
    Math.round(g * 0.3 + b * 0.7)
  ];
};

export type ColorBlindnessMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';

// Preset themes
export interface ThemePreset {
  name: string;
  description: string;
  colors: string[]; // Array of hex colors
}

export const themePresets: ThemePreset[] = [
  {
    name: "Instagram Vibe",
    description: "Vibrant and trendy colors inspired by Instagram aesthetics",
    colors: ["#833AB4", "#FD1D1D", "#FCB045", "#405DE6", "#5851DB"]
  },
  {
    name: "Nature",
    description: "Earthy and natural tones from the environment",
    colors: ["#4CAF50", "#8BC34A", "#CDDC39", "#795548", "#607D8B"]
  },
  {
    name: "Sunset",
    description: "Warm sunset colors with orange and purple hues",
    colors: ["#FF6B6B", "#FF8E53", "#FFD166", "#4ECDC4", "#1A535C"]
  },
  {
    name: "Ocean",
    description: "Cool blue tones inspired by the sea",
    colors: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#03045E"]
  },
  {
    name: "Pastel",
    description: "Soft and gentle pastel colors",
    colors: ["#FFD6E0", "#FFEFD8", "#D4F0F0", "#8FCACA", "#CCE2CB"]
  },
  {
    name: "Neon",
    description: "Bright and vibrant neon colors",
    colors: ["#FF10F0", "#39FF14", "#00FFFF", "#FF073A", "#CCFF00"]
  },
  {
    name: "Autumn",
    description: "Warm autumn foliage colors",
    colors: ["#8B4513", "#D2691E", "#CD853F", "#A0522D", "#8B0000"]
  },
  {
    name: "Winter",
    description: "Cool winter tones with icy blues",
    colors: ["#E0FFFF", "#B0E0E6", "#87CEEB", "#4682B4", "#2F4F4F"]
  }
];

// Convert hex colors to RGB arrays
export const hexColorsToRgb = (hexColors: string[]): number[][] => {
  return hexColors.map(hex => hexToRgb(hex));
};

// Calculate relative luminance for WCAG contrast ratio
export const getRelativeLuminance = (rgb: number[]): number => {
  const [r, g, b] = rgb.map(c => {
    const cNormalized = c / 255;
    return cNormalized <= 0.03928 
      ? cNormalized / 12.92 
      : Math.pow((cNormalized + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Calculate contrast ratio between two colors
export const getContrastRatio = (color1: number[], color2: number[]): number => {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Get WCAG compliance level
export const getWcagCompliance = (contrastRatio: number): { level: string; status: string; score: string } => {
  if (contrastRatio >= 7) {
    return { level: 'AAA', status: 'Excellent', score: '7:1+' };
  } else if (contrastRatio >= 4.5) {
    return { level: 'AA', status: 'Good', score: '4.5:1' };
  } else if (contrastRatio >= 3) {
    return { level: 'A', status: 'Acceptable', score: '3:1' };
  } else {
    return { level: 'Fail', status: 'Poor', score: '<3:1' };
  }
};

// Generate accessibility report for a color palette
export const generateAccessibilityReport = (colors: number[][]): Array<{
  foreground: number[];
  background: number[];
  contrastRatio: number;
  compliance: { level: string; status: string; score: string };
}> => {
  const report = [];
  
  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      const contrastRatio = getContrastRatio(colors[i], colors[j]);
      const compliance = getWcagCompliance(contrastRatio);
      
      report.push({
        foreground: colors[i],
        background: colors[j],
        contrastRatio: parseFloat(contrastRatio.toFixed(2)),
        compliance
      });
    }
  }
  
  return report.sort((a, b) => b.contrastRatio - a.contrastRatio);
};

export const adjustLuminance = (rgb: number[], luminance: number): number[] => {
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  hsl[2] = Math.max(0, Math.min(100, hsl[2] + luminance)); // Adjust lightness
  const newRgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
  return newRgb;
};
