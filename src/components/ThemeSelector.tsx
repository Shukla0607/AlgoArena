import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ isOpen, onClose }) => {
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={onClose} />

          {/* Theme Selector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full right-0 mt-2 z-50 w-80 theme-card-bg border theme-border rounded-xl shadow-2xl p-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-violet-400" />
              <h3 className="text-white font-semibold">Choose Theme</h3>
            </div>

            <div className="space-y-3">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setTheme(theme.id);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                    currentTheme.id === theme.id
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Theme Preview */}
                      <div className="flex space-x-1">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.colors.bg }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                      </div>

                      <div className="text-left">
                        <div className="text-white font-medium">
                          {theme.name}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {theme.id === "dark" && "Default dark theme"}
                          {theme.id === "midnight" && "Deep blue variant"}
                          {theme.id === "forest" && "Nature inspired"}
                        </div>
                      </div>
                    </div>

                    {currentTheme.id === theme.id && (
                      <Check className="w-5 h-5 text-violet-400" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-600">
              <p className="text-slate-400 text-xs text-center">
                More themes coming soon!
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeSelector;
