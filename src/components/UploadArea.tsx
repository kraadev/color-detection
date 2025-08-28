interface UploadAreaProps {
  isDarkMode: boolean;
  dragActive: boolean;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const UploadArea = ({ isDarkMode, dragActive, onDrag, onDrop, onFileChange, fileInputRef }: UploadAreaProps) => (
  <div className={`w-full max-w-2xl mb-8 rounded-3xl shadow-2xl transition-all duration-500 ${
    isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg'
  }`}>
    <div
      className={`relative transition-all duration-300 p-8 ${
        dragActive ? 'scale-105' : 'hover:scale-102'
      }`}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
    >
      <label className={`cursor-pointer block p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${
        dragActive 
          ? 'border-blue-500 bg-blue-50/50 scale-105' 
          : isDarkMode
            ? 'border-gray-600 hover:border-blue-400 hover:bg-gray-700/30'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
      }`}>
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">📸</div>
          <div className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            {dragActive ? 'Drop your image here!' : 'Upload or drag an image'}
          </div>
          <div className={`text-lg transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Supports JPG, PNG, GIF formats • Auto-optimized for performance
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="block" // Temporarily make it visible for testing
        />
      </label>
    </div>
  </div>
);

export default UploadArea;
