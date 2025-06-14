import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Code,
  Map,
  Users,
  User,
  Trophy,
  Terminal,
} from "lucide-react";
import LoginModal from "./LoginModal";
import ThemeSelector from "./ThemeSelector";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const location = useLocation();

  const navItems = [
    { name: "Problems", href: "/problems", icon: Code },
    { name: "Practice", href: "/practice", icon: Terminal },
    { name: "Roadmap", href: "/roadmap", icon: Map },
    { name: "Debug Together", href: "/debug", icon: Users },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-md border-b border-card-border h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse shadow-sm"></div>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              AlgoArena
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-violet-500/20 text-violet-200 border border-violet-500/50 shadow-lg"
                      : "text-slate-200 hover:text-white hover:bg-slate-700/80 hover:shadow-md"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={() => setThemeOpen(!themeOpen)}
                  className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200 text-slate-200 hover:text-white border border-slate-600 shadow-md"
                >
                  <div className="w-4 h-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"></div>
                  <span className="text-sm font-medium">Theme</span>
                </button>

                <ThemeSelector
                  isOpen={themeOpen}
                  onClose={() => setThemeOpen(false)}
                />
              </div>

              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-xl transition-all duration-200 text-white border border-violet-500 shadow-lg"
              >
                <span className="text-sm font-medium">Login</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-200 hover:text-white"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-violet-500/20 text-violet-200 border border-violet-500/50"
                        : "text-slate-200 hover:text-white hover:bg-slate-700/80"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default Navigation;
