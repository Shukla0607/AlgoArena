import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Trophy,
  Calendar,
  Download,
  Github,
  Linkedin,
  Target,
  Flame,
  LogOut,
  Settings,
  Shield,
  BookOpen,
  Code,
  Sparkles,
  Map,
  Terminal,
  Palette,
  X,
  Copy,
  Check,
} from "lucide-react";
import Navigation from "../components/Navigation";
import LogoutConfirmation from "../components/LogoutConfirmation";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, logout, isAdmin } = useAuth();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutConfirmOpen(false);
    window.location.href = "/"; // Redirect to homepage after logout
  };

  const copyReadme = async () => {
    const readmeContent = `# AlgoArena

## Project Overview

AlgoArena is a comprehensive coding practice platform that reimagines how developers learn algorithms and data structures. Built with a frontend-first approach, it combines the systematic problem-solving of LeetCode with the visual elegance and collaborative features of modern design tools.

**Vision:** Create an immersive coding environment where learning algorithms feels intuitive, collaborative, and visually engaging.

## Core Features

🎨 **Zen Coding Interface** - Monaco Editor with glassmorphism design, syntax highlighting, and distraction-free focus mode

🗺️ **Visual Learning Paths** - Interactive roadmaps guiding through Arrays, Trees, Graphs, and Dynamic Programming

👥 **Debug Together** - Real-time collaborative debugging with live cursors, voice/video, and shared workspaces

📊 **Smart Progress Tracking** - Visual progress rings, streak tracking, and achievement system

🤖 **AI-Powered Assistant** - Context-aware hints, algorithm explanations, and intelligent code reviews

🎯 **Role-Based Access** - Admin and general user roles with appropriate permissions and features

## Platform Sections

🧩 **Problems Arena** - 500+ curated problems with difficulty filtering, progress tracking, and detailed solutions

⚡ **Practice Playground** - Free-form coding environment with instant execution and multi-language support

🗺️ **Learning Roadmap** - Structured learning paths with unlock system and progress visualization

👥 **Debug Together** - Collaborative debugging sessions with real-time code sharing and communication

👤 **Smart Profile** - Comprehensive dashboard with achievements, statistics, and coding activity

🏆 **Leaderboard** - Global rankings with competitive elements and community recognition

## Tech Stack

### Frontend Architecture
- React 18
- TypeScript
- Vite
- Tailwind CSS

### UI & Animation
- Framer Motion
- Radix UI
- Lucide Icons
- Monaco Editor

### Authentication & State
- Google OAuth
- React Context
- Local Storage
- React Router

### Development Tools
- ESLint
- Prettier
- Git
- VS Code

## Design Philosophy

🎨 **Glassmorphism + Neumorphism** - Modern design language with translucent surfaces and subtle depth

🌗 **Dynamic Theming** - Dark Mode, Midnight Blue, and Forest Green themes with seamless switching

📱 **Responsive Design** - Mobile-first approach ensuring optimal experience across all devices

---

Built with ❤️ for the coding community`;

    try {
      await navigator.clipboard.writeText(readmeContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-tr from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {user?.avatar || user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center border-4 border-slate-900">
                  <span className="text-slate-900 text-xs font-bold">12</span>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">
                    {user?.name || "User"}
                  </h1>
                  {isAdmin && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full">
                      <Shield className="w-4 h-4 text-violet-400" />
                      <span className="text-violet-400 text-sm font-medium">
                        Admin
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-white mb-2">{user?.email}</p>
                <p className="text-slate-300 mb-4">
                  Algorithm Enthusiast • Problem Solver
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined March 2024</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>85 problems solved</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>7 day streak</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3">
                <button className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200">
                  <Download className="w-4 h-4" />
                  <span>Export Resume</span>
                </button>

                <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200">
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={() => setReadmeOpen(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-blue-500"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>README</span>
                </button>

                <button
                  onClick={() => setLogoutConfirmOpen(true)}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-red-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>

                <div className="flex space-x-2 mt-4">
                  <button className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition-all duration-200">
                    <Github className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition-all duration-200">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Progress Overview */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Progress Overview
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Easy",
                      solved: 35,
                      total: 50,
                      color: "from-green-400 to-emerald-400",
                    },
                    {
                      label: "Medium",
                      solved: 40,
                      total: 75,
                      color: "from-highlight to-orange-400",
                    },
                    {
                      label: "Hard",
                      solved: 10,
                      total: 25,
                      color: "from-red-400 to-pink-400",
                    },
                    {
                      label: "Total",
                      solved: 85,
                      total: 150,
                      color: "from-cyan to-blue-400",
                    },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className={`w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r ${stat.color} p-1`}
                      >
                        <div className="w-full h-full bg-midnight rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-lg font-bold text-light">
                              {stat.solved}
                            </div>
                            <div className="text-xs text-light/60">
                              /{stat.total}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-light/70 text-sm font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Recent Activity
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      problem: "Two Sum",
                      status: "Solved",
                      time: "2 hours ago",
                      difficulty: "Easy",
                    },
                    {
                      problem: "Valid Parentheses",
                      status: "Solved",
                      time: "1 day ago",
                      difficulty: "Easy",
                    },
                    {
                      problem: "Longest Substring",
                      status: "Attempted",
                      time: "2 days ago",
                      difficulty: "Medium",
                    },
                    {
                      problem: "Merge Two Lists",
                      status: "Solved",
                      time: "3 days ago",
                      difficulty: "Easy",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-slate/20 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${activity.status === "Solved" ? "bg-green-400" : "bg-yellow-400"}`}
                        ></div>
                        <div>
                          <div className="text-white font-medium">
                            {activity.problem}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            activity.difficulty === "Easy"
                              ? "bg-green-400/20 text-green-400"
                              : activity.difficulty === "Medium"
                                ? "bg-yellow-400/20 text-yellow-400"
                                : "bg-red-400/20 text-red-400"
                          }`}
                        >
                          {activity.difficulty}
                        </span>
                        <span className="text-slate-300 text-sm">
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Achievements */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Achievements
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "First Steps",
                      description: "Solved your first problem",
                      earned: true,
                    },
                    {
                      title: "Speed Demon",
                      description: "Solved 5 problems in one day",
                      earned: true,
                    },
                    {
                      title: "Array Master",
                      description: "Completed Arrays track",
                      earned: true,
                    },
                    {
                      title: "Consistency",
                      description: "Maintain 7-day streak",
                      earned: false,
                    },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.earned ? "bg-cyan/10" : "bg-slate/10"}`}
                    >
                      <Trophy
                        className={`w-8 h-8 ${achievement.earned ? "text-cyan" : "text-light/30"}`}
                      />
                      <div>
                        <div
                          className={`font-medium ${achievement.earned ? "text-light" : "text-light/50"}`}
                        >
                          {achievement.title}
                        </div>
                        <div className="text-light/60 text-sm">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Streak */}
              <div className="bg-gradient-to-br from-orange-400/20 to-red-400/20 border border-orange-400/30 rounded-xl p-6">
                <div className="text-center">
                  <Flame className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    7
                  </div>
                  <div className="text-light/80 font-medium">Day Streak</div>
                  <div className="text-light/60 text-sm mt-2">
                    Keep it up! 3 more for next milestone
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <LogoutConfirmation
        isOpen={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={handleLogout}
        userName={user?.name}
      />

      {/* README Modal */}
      <AnimatePresence>
        {readmeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadmeOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      AlgoArena README
                    </h2>
                    <p className="text-slate-400">
                      Complete Project Documentation
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyReadme}
                    className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700 border border-slate-600"
                  >
                    {copySuccess ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-medium">Copy</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setReadmeOpen(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
                {/* Project Overview */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-cyan-400" />
                    Project Overview
                  </h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    AlgoArena is a comprehensive coding practice platform that
                    reimagines how developers learn algorithms and data
                    structures. Built with a frontend-first approach, it
                    combines the systematic problem-solving of LeetCode with the
                    visual elegance and collaborative features of modern design
                    tools.
                  </p>
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 mb-4">
                    <p className="text-slate-300">
                      <strong className="text-white">Vision:</strong> Create an
                      immersive coding environment where learning algorithms
                      feels intuitive, collaborative, and visually engaging.
                    </p>
                  </div>
                </div>

                {/* Core Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
                    Core Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🎨 Zen Coding Interface
                      </div>
                      <div className="text-sm text-slate-300">
                        Monaco Editor with glassmorphism design, syntax
                        highlighting, and distraction-free focus mode
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🗺️ Visual Learning Paths
                      </div>
                      <div className="text-sm text-slate-300">
                        Interactive roadmaps guiding through Arrays, Trees,
                        Graphs, and Dynamic Programming
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        👥 Debug Together
                      </div>
                      <div className="text-sm text-slate-300">
                        Real-time collaborative debugging with live cursors,
                        voice/video, and shared workspaces
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        📊 Smart Progress Tracking
                      </div>
                      <div className="text-sm text-slate-300">
                        Visual progress rings, streak tracking, and achievement
                        system
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🤖 AI-Powered Assistant
                      </div>
                      <div className="text-sm text-slate-300">
                        Context-aware hints, algorithm explanations, and
                        intelligent code reviews
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🎯 Role-Based Access
                      </div>
                      <div className="text-sm text-slate-300">
                        Admin and general user roles with appropriate
                        permissions and features
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Sections */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Map className="w-5 h-5 mr-2 text-cyan-400" />
                    Platform Sections
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🧩 Problems Arena
                      </div>
                      <div className="text-sm text-slate-300">
                        500+ curated problems with difficulty filtering,
                        progress tracking, and detailed solutions
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        ⚡ Practice Playground
                      </div>
                      <div className="text-sm text-slate-300">
                        Free-form coding environment with instant execution and
                        multi-language support
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🗺️ Learning Roadmap
                      </div>
                      <div className="text-sm text-slate-300">
                        Structured learning paths with unlock system and
                        progress visualization
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        👥 Debug Together
                      </div>
                      <div className="text-sm text-slate-300">
                        Collaborative debugging sessions with real-time code
                        sharing and communication
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        👤 Smart Profile
                      </div>
                      <div className="text-sm text-slate-300">
                        Comprehensive dashboard with achievements, statistics,
                        and coding activity
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🏆 Leaderboard
                      </div>
                      <div className="text-sm text-slate-300">
                        Global rankings with competitive elements and community
                        recognition
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Terminal className="w-5 h-5 mr-2 text-cyan-400" />
                    Tech Stack
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-white mb-3">
                        Frontend Architecture
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["React 18", "TypeScript", "Vite", "Tailwind CSS"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-white mb-3">
                        UI & Animation
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Framer Motion",
                          "Radix UI",
                          "Lucide Icons",
                          "Monaco Editor",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-white mb-3">
                        Authentication & State
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Google OAuth",
                          "React Context",
                          "Local Storage",
                          "React Router",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-white mb-3">
                        Development Tools
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["ESLint", "Prettier", "Git", "VS Code"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Design Philosophy */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-cyan-400" />
                    Design Philosophy
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🎨 Glassmorphism + Neumorphism
                      </div>
                      <div className="text-sm text-slate-300">
                        Modern design language with translucent surfaces and
                        subtle depth
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        🌗 Dynamic Theming
                      </div>
                      <div className="text-sm text-slate-300">
                        Dark Mode, Midnight Blue, and Forest Green themes with
                        seamless switching
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                      <div className="font-semibold text-white mb-2">
                        📱 Responsive Design
                      </div>
                      <div className="text-sm text-slate-300">
                        Mobile-first approach ensuring optimal experience across
                        all devices
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
