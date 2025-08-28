import { CursorInfo, rgbToHex } from '../lib/colorUtils';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorTooltipProps {
  cursorInfo: CursorInfo | null;
  isDarkMode: boolean;
}

const ColorTooltip = ({ cursorInfo, isDarkMode }: ColorTooltipProps) => {
  return (
    <AnimatePresence>
      {cursorInfo && cursorInfo.show && (
        <motion.div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: cursorInfo.x,
            top: cursorInfo.y - 10,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.2
          }}
        >
          <motion.div 
            className={`rounded-xl shadow-2xl p-4 border-2 backdrop-blur-md ${
              isDarkMode 
                ? 'bg-gray-800/90 border-gray-600 text-white' 
                : 'bg-white/90 border-gray-200 text-gray-800'
            }`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-inner"
                style={{ backgroundColor: `rgb(${cursorInfo.color.join(',')})` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              />
              <div className="text-sm">
                <motion.div 
                  className="font-bold text-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                >
                  {cursorInfo.name}
                </motion.div>
                <motion.div 
                  className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.2 }}
                >
                  RGB({cursorInfo.color.join(', ')})
                </motion.div>
                <motion.div 
                  className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.2 }}
                >
                  {rgbToHex(cursorInfo.color[0], cursorInfo.color[1], cursorInfo.color[2])}
                </motion.div>
              </div>
            </div>
            <motion.div 
              className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 ${
                isDarkMode 
                  ? 'border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800'
                  : 'border-l-4 border-r-4 border-t-4 border-transparent border-t-white'
              }`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.2 }}
            ></motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColorTooltip;
