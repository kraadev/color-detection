const ColorLogo = () => (
  <div className="w-10 h-10 relative">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g className="transform-origin-center animate-spin" style={{ animation: 'spin 20s linear infinite' }}>
        <path d="M 50 10 A 40 40 0 0 1 78.28 21.72 L 65.86 34.14 A 20 20 0 0 0 50 30 Z" fill="#FFD700" />
        <path d="M 78.28 21.72 A 40 40 0 0 1 89.28 50 L 70 50 A 20 20 0 0 0 65.86 34.14 Z" fill="#32CD32" />
        <path d="M 89.28 50 A 40 40 0 0 1 78.28 78.28 L 65.86 65.86 A 20 20 0 0 0 70 50 Z" fill="#20B2AA" />
        <path d="M 78.28 78.28 A 40 40 0 0 1 50 90 L 50 70 A 20 20 0 0 0 65.86 65.86 Z" fill="#4169E1" />
        <path d="M 50 90 A 40 40 0 0 1 21.72 78.28 L 34.14 65.86 A 20 20 0 0 0 50 70 Z" fill="#8A2BE2" />
        <path d="M 21.72 78.28 A 40 40 0 0 1 10.72 50 L 30 50 A 20 20 0 0 0 34.14 65.86 Z" fill="#DC143C" />
        <path d="M 10.72 50 A 40 40 0 0 1 21.72 21.72 L 34.14 34.14 A 20 20 0 0 0 30 50 Z" fill="#FF4500" />
        <path d="M 21.72 21.72 A 40 40 0 0 1 50 10 L 50 30 A 20 20 0 0 0 34.14 34.14 Z" fill="#FF8C00" />
      </g>
      <circle cx="50" cy="50" r="25" fill="white" />
      <path d="M 50 25 A 12.5 12.5 0 0 1 50 50 A 6.25 6.25 0 0 1 50 62.5 A 12.5 12.5 0 0 1 50 75 A 25 25 0 0 0 50 25" fill="#8A2BE2" />
      <circle cx="50" cy="37.5" r="3" fill="white" />
      <circle cx="50" cy="62.5" r="3" fill="#8A2BE2" />
    </svg>
  </div>
);

export default ColorLogo;
