"use client";
import { useState, useRef, useEffect } from "react";
import { ExportFormat, rgbToHex, getColorName } from "@/src/lib/colorUtils";
import Navbar from "@/src/components/Navbar";
import UploadArea from "@/src/components/UploadArea";
import ColorPalette from "@/src/components/ColorPalette";
import ColorTooltip from "@/src/components/ColorTooltip";
import ColorHarmony from "@/src/components/ColorHarmony";
import ThemePresets from "@/src/components/ThemePresets";
import FullscreenPreview from "@/src/components/FullscreenPreview";
import HowToUse from "@/src/components/HowToUse";

interface CursorInfo {
  x: number;
  y: number;
  color: number[];
  name: string;
  show: boolean;
}

export default function InteractiveColorDetector() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<number[][] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json');
  const [cursorInfo, setCursorInfo] = useState<CursorInfo | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageTransition, setPageTransition] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  // Animation trigger on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Page transition handler
  const handlePageTransition = (transitionType: string, callback: () => void) => {
    setPageTransition(transitionType);
    setTimeout(() => {
      callback();
      setPageTransition('');
    }, 300);
  };

  const extractColors = (canvas: HTMLCanvasElement, numColors = 5) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    
    const maxSize = 800;
    const { width, height } = canvas;
    
    if (width > maxSize || height > maxSize) {
      const scale = Math.min(maxSize / width, maxSize / height);
      const newWidth = Math.floor(width * scale);
      const newHeight = Math.floor(height * scale);
      
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = newWidth;
      tempCanvas.height = newHeight;
      
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0, newWidth, newHeight);
        const imageData = tempCtx.getImageData(0, 0, newWidth, newHeight);
        return extractColorsFromImageData(imageData, numColors);
      }
    }
    
    const imageData = ctx.getImageData(0, 0, width, height);
    return extractColorsFromImageData(imageData, numColors);
  };

  const extractColorsFromImageData = (imageData: ImageData, numColors: number) => {
    const data = imageData.data;
    const colorMap = new Map();
    
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];
      
      if (alpha < 128) continue;
      
      const roundedR = Math.round(r / 10) * 10;
      const roundedG = Math.round(g / 10) * 10;
      const roundedB = Math.round(b / 10) * 10;
      
      const key = `${roundedR},${roundedG},${roundedB}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }
    
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, numColors)
      .map(([color]) => color.split(',').map(Number));
  };

  const handleImageUpload = (file: File) => {
    if (file) {
      setIsAnalyzing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgElement = e.target as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      ctx.drawImage(imgElement, 0, 0);
      
      if (canvasRef.current) {
        canvasRef.current.width = imgElement.naturalWidth;
        canvasRef.current.height = imgElement.naturalHeight;
        const canvasCtx = canvasRef.current.getContext('2d');
        if (canvasCtx) {
          canvasCtx.drawImage(imgElement, 0, 0);
        }
      }
      
      setTimeout(() => {
        const result = extractColors(canvas, 6);
        setColors(result);
        setIsAnalyzing(false);
      }, 100);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const clearImage = () => {
    handlePageTransition('fadeOut', () => {
      setImageSrc(null);
      setColors(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

const handleMouseEnter = (color: number[], event: React.MouseEvent) => {
    document.body.style.transition = "background 0.8s ease";
    document.body.style.background = `rgb(${color.join(",")})`;
    
    // Set initial cursor info for tooltip
    setCursorInfo({
      x: 0, // Will be updated by mousemove listener
      y: 0, // Will be updated by mousemove listener
      color: color,
      name: getColorName(color),
      show: true,
    });
  };

  const handleMouseLeave = () => {
    document.body.style.transition = "background 0.8s ease";
    document.body.style.background = "";
    setCursorInfo(null);
  };

  // Track mouse movement to update cursor position for tooltip
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cursorInfo && cursorInfo.show) {
        setCursorInfo(prev => prev ? {
          ...prev,
          x: event.clientX,
          y: event.clientY
        } : null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorInfo]);

  const getColorUnderCursor = (event: React.MouseEvent<HTMLImageElement>): number[] | null => {
    if (!canvasRef.current) return null;
    
    const img = event.currentTarget;
    const rect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    
    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return null;
    
    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;
    
    return [data[0], data[1], data[2]];
  };

  const handleImageMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const color = getColorUnderCursor(event);
    if (color) {
      setCursorInfo({
        x: event.clientX,
        y: event.clientY,
        color: color,
        name: getColorName(color),
        show: true,
      });
    }
  };

  const handleImageMouseLeave = () => {
    setCursorInfo(null);
  };

  const handleColorClick = (color: number[]) => {
    const hexString = rgbToHex(color[0], color[1], color[2]);
    navigator.clipboard.writeText(hexString);
    setCopiedColor(hexString);
    setSelectedColor(hexString);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handlePreview = () => {
    handlePageTransition('slideUp', () => {
      setShowPreview(true);
    });
  };

  const handleThemeSelect = (themeColors: number[][]) => {
    handlePageTransition('slideDown', () => {
      setColors(themeColors);
      setShowPresets(false);
    });
  };

  const generatePalettePNG = () => {
    if (!colors || !downloadCanvasRef.current) return;
    
    const canvas = downloadCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 600;
    canvas.height = 100;
    
    const colorWidth = canvas.width / colors.length;
    
    colors.forEach((color, index) => {
      ctx.fillStyle = `rgb(${color.join(',')})`;
      ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height);
    });
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "color-palette.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleDownload = () => {
    if (!colors) return;
    
    if (exportFormat === 'png') {
      generatePalettePNG();
      return;
    }
    
    let content: string;
    let filename: string;
    let mimeType: string;
    
    if (exportFormat === 'json') {
      const paletteData = colors.map((c) => ({
        name: getColorName(c),
        rgb: `rgb(${c.join(",")})`,
        hex: rgbToHex(c[0], c[1], c[2]),
      }));
      content = JSON.stringify(paletteData, null, 2);
      filename = "color-palette.json";
      mimeType = "application/json";
    } else {
      const cssVars = colors.map((c, i) => 
        `  --color-${i + 1}: ${rgbToHex(c[0], c[1], c[2])}; /* ${getColorName(c)} */`
      ).join('\n');
      content = `:root {\n${cssVars}\n}`;
      filename = "color-palette.css";
      mimeType = "text/css";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100'
    } ${pageTransition === 'fadeOut' ? 'animate-fadeOut' : ''} ${pageTransition === 'slideUp' ? 'animate-slideUpPage' : ''} ${pageTransition === 'slideDown' ? 'animate-slideDownPage' : ''}`}>
      {/* Animated Navbar */}
      <div className={`transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <Navbar 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          showAbout={showAbout}
          setShowAbout={setShowAbout}
          hasImage={!!imageSrc}
          onClearImage={clearImage}
          showPresets={() => setShowPresets(!showPresets)}
          onShowHowToUse={() => setShowHowToUse(true)}
        />
      </div>
      
      <div className="flex flex-col items-center p-6 pt-12">
        {/* Hero Section with Advanced Animations */}
        <div className={`text-center mb-12 max-w-2xl transition-all duration-700 ${
          pageTransition ? 'transform scale-95 opacity-50' : 'transform scale-100 opacity-100'
        }`}>
          {/* Main Title with Enhanced Animation */}
          <div className="overflow-hidden">
            <h1 className={`text-6xl md:text-7xl font-bold mb-4 transition-all duration-1500 ease-out ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'
            } ${
              isLoaded 
                ? 'transform translate-y-0 opacity-100 animate-bounce-gentle' 
                : 'transform translate-y-10 opacity-0'
            }`}>
              Color Detection
            </h1>
          </div>
          
          {/* Subtitle with Slide-in Animation */}
          <p className={`text-xl leading-relaxed transition-all duration-1000 delay-1000 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } ${
            isLoaded 
              ? 'transform translate-x-0 opacity-100' 
              : 'transform translate-x-full opacity-0'
          }`}>
            Extract beautiful color palettes from any image with AI-powered precision
          </p>
        </div>

        {/* Upload Area with Enhanced Transition */}
        <div className={`transition-all duration-1200 delay-1200 ${
          isLoaded 
            ? 'transform scale-100 opacity-100' 
            : 'transform scale-75 opacity-0'
        } ${pageTransition ? 'transform scale-90 opacity-60' : ''}`}>
          <UploadArea 
            isDarkMode={isDarkMode}
            dragActive={dragActive}
            onDrag={handleDrag}
            onDrop={handleDrop}
            onFileChange={handleFileInputChange}
            fileInputRef={fileInputRef}
          />
        </div>

        {/* Image Display with Smooth Entrance and Transition */}
        {imageSrc && (
          <div className={`mb-8 rounded-3xl shadow-2xl transition-all duration-1000 overflow-hidden animate-fadeInScale ${
            isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg'
          } ${pageTransition ? 'transform scale-95 opacity-70' : 'transform scale-100 opacity-100'}`}>
            <div className="p-8">
              <div className="relative group">
                <img
                  src={imageSrc}
                  alt="Uploaded"
                  onLoad={handleImageLoad}
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                  crossOrigin="anonymous"
                  className="max-w-full max-h-96 rounded-2xl shadow-xl mx-auto transition-all duration-500 group-hover:scale-105 cursor-crosshair animate-slideInUp"
                />
                <canvas ref={canvasRef} className="hidden" />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                      <div className="text-xl font-semibold animate-pulse">Analyzing colors...</div>
                      <div className="text-sm opacity-75 mt-2">Optimizing for best performance</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Color Palette with Enhanced Staggered Animation */}
        {imageSrc && colors && (
          <div className={`animate-slideInUp transition-all duration-700 ${
            pageTransition ? 'transform scale-95 opacity-60' : 'transform scale-100 opacity-100'
          }`}>
            <ColorPalette 
              colors={colors} 
              isDarkMode={isDarkMode}
              isAnalyzing={isAnalyzing}
              exportFormat={exportFormat}
              setExportFormat={setExportFormat}
              onColorHover={handleMouseEnter}   // ✅ ganti dengan nama baru
              onMouseLeave={handleMouseLeave}
              onColorClick={handleColorClick}
              onDownload={handleDownload}
              onPreview={handlePreview}
            />
          </div>
        )}

        {showPresets && (
          <div className="animate-slideInFromBottom">
            <ThemePresets 
              isDarkMode={isDarkMode}
              onThemeSelect={handleThemeSelect}
            />
          </div>
        )}

        {showPreview && colors && (
          <FullscreenPreview 
            colors={colors}
            isDarkMode={isDarkMode}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>

      {/* How To Use Modal with Smooth Entrance */}
      {showHowToUse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="animate-modalSlideIn">
            <HowToUse 
              isDarkMode={isDarkMode}
              onClose={() => setShowHowToUse(false)}
            />
          </div>
        </div>
      )}

      <ColorTooltip cursorInfo={cursorInfo} isDarkMode={isDarkMode} />
      <ColorHarmony 
        selectedColor={selectedColor} 
        isDarkMode={isDarkMode} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        onColorClick={handleColorClick} 
      />

      {/* About Modal with Enhanced Animation */}
      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className={`max-w-lg w-full rounded-3xl shadow-2xl p-8 transition-all duration-500 animate-modalSlideIn ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}>
            <h3 className="text-2xl font-bold mb-4">About ColorExtract Pro</h3>
            <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              AI-powered color detection tool that extracts dominant colors from images with performance optimization for large files.
            </p>
            <div className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• Smart canvas resizing for better performance</li>
                <li>• Real-time color picking with mouse hover</li>
                <li>• Multiple export formats (JSON, CSS, PNG)</li>
                <li>• Interactive background color preview</li>
                <li>• Mobile-responsive design</li>
              </ul>
            </div>
            <button
              onClick={() => handlePageTransition('fadeOut', () => setShowAbout(false))}
              className={`w-full py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isDarkMode 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Copy notification with Enhanced Animation */}
      {copiedColor && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl z-50 animate-bounceIn">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-spin">✓</span>
            <div>
              <div className="font-bold">Color Copied!</div>
              <div className="text-sm opacity-90">{copiedColor}</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Slide-up Animation */}
      <footer className={`w-full mt-16 py-8 border-t transition-all duration-1000 delay-1500 ${
        isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/30'
      } backdrop-blur-md ${
        isLoaded 
          ? 'transform translate-y-0 opacity-100' 
          : 'transform translate-y-full opacity-0'
      }`}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className={`text-lg mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Made by KraaDev with Love
          </div>
          <div className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Extract colors • Create palettes • Design better • Export anywhere
          </div>
        </div>
      </footer>

      {/* Hidden canvas for PNG generation */}
      <canvas ref={downloadCanvasRef} className="hidden" />

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInScale {
          from { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
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
        
        @keyframes bounceIn {
          0% { 
            opacity: 0; 
            transform: scale(0.3) translateY(100px); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1) translateY(-10px); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        @keyframes bounceGentle {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          60% { 
            opacity: 1; 
            transform: translateY(-5px) scale(1.02); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes slideInFromBottom {
          from { 
            opacity: 0; 
            transform: translateY(100px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes modalSlideIn {
          from { 
            opacity: 0; 
            transform: translateY(-50px) scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes fadeOut {
          from { 
            opacity: 1; 
            transform: scale(1); 
          }
          to { 
            opacity: 0; 
            transform: scale(0.95); 
          }
        }
        
        @keyframes slideUpPage {
          from { 
            transform: translateY(0); 
          }
          to { 
            transform: translateY(-20px); 
          }
        }
        
        @keyframes slideDownPage {
          from { 
            transform: translateY(-20px); 
          }
          to { 
            transform: translateY(0); 
          }
        }
        
        .animate-bounce-gentle {
          animation: bounceGentle 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-modalSlideIn {
          animation: modalSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out;
        }
        
        .animate-slideUpPage {
          animation: slideUpPage 0.3s ease-out;
        }
        
        .animate-slideDownPage {
          animation: slideDownPage 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}