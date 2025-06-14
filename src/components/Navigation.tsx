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
  Shield,
  LogOut,
  ChevronDown,
} from "lucide-react";
import LoginModal from "./LoginModal";
import ThemeSelector from "./ThemeSelector";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  const navItems = [
    { name: "Problems", href: "/problems", icon: Code },
    { name: "Practice", href: "/practice", icon: Terminal },
    { name: "Roadmap", href: "/roadmap", icon: Map },
    // Protected items - only show when authenticated
    ...(isAuthenticated
      ? [
          { name: "Debug Together", href: "/debug", icon: Users },
          { name: "Profile", href: "/profile", icon: User },
          { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
        ]
      : []),
    ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: Shield }] : []),
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

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="hidden md:flex items-center space-x-3 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200 text-white border border-slate-600 shadow-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.avatar || user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{user?.name}</div>
                      <div className="text-xs text-slate-400 capitalize">
                        {user?.role}
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-600 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-slate-600">
                        <div className="text-sm font-medium text-white">
                          {user?.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {user?.email}
                        </div>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-xl transition-all duration-200 text-white border border-violet-500 shadow-lg"
                >
                  <span className="text-sm font-medium">Login</span>
                </button>
              )}
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
            className="md:hidden absolute top-20 left-0 right-0 bg-dark-bg/95 backdrop-blur-md border-b border-card-border pb-4"
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
