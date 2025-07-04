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
  Grid3X3,
  Play,
  Users,
  BarChart3,
  Zap,
  Monitor,
} from "lucide-react";
import Navigation from "../components/Navigation";
import LogoutConfirmation from "../components/LogoutConfirmation";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, logout, isAdmin } = useAuth();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [sectionsOverviewOpen, setSectionsOverviewOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutConfirmOpen(false);
    window.location.href = "/"; // Redirect to homepage after logout
  };

  const copyReadme = () => {
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

    // Fallback copy method that works in iframe environments
    const textArea = document.createElement("textarea");
    textArea.value = readmeContent;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    } finally {
      document.body.removeChild(textArea);
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

      {/* Floating Red Button - Section Overview */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        onClick={() => setSectionsOverviewOpen(true)}
        className="fixed bottom-6 right-28 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-red-500/30 transition-all duration-300 flex items-center justify-center z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ zIndex: 50 }}
      >
        <Grid3X3 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      </motion.button>

      {/* Sections Overview Modal */}
      <AnimatePresence>
        {sectionsOverviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSectionsOverviewOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Grid3X3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Platform Sections
                    </h2>
                    <p className="text-slate-400">
                      Complete overview of AlgoArena
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSectionsOverviewOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* 1. Home Page Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => (window.location.href = "/")}
                  >
                    <div className="h-48 bg-slate-900 p-2 relative flex flex-col">
                      {/* Navbar simulation */}
                      <div className="h-5 bg-slate-800 border border-slate-600 rounded mb-2 flex items-center justify-between px-2">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mr-1"></div>
                          <div className="text-xs text-white font-bold">
                            AlgoArena
                          </div>
                        </div>
                        <div className="flex space-x-2 text-xs text-white">
                          <span>Problems</span>
                          <span>Practice</span>
                          <span>Login</span>
                        </div>
                      </div>
                      {/* Hero section simulation */}
                      <div className="flex-1 flex flex-col justify-center text-center px-2">
                        <div className="text-xs font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent mb-1">
                          Master Algorithms with Elegance
                        </div>
                        <div className="text-xs text-slate-300 mb-1">
                          Where LeetCode meets Figma
                        </div>
                        <div className="text-xs text-slate-400 mb-2">
                          Practice • Learn • Grow
                        </div>
                        <div className="flex justify-center space-x-1 mb-2">
                          <div className="px-2 py-1 bg-cyan-500 rounded text-xs text-white font-medium">
                            Get Started
                          </div>
                          <div className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-xs text-white">
                            Learn More
                          </div>
                        </div>
                      </div>
                      {/* Features grid simulation - scrollable */}
                      <div className="h-16 overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-3 gap-1 px-1">
                          <div className="bg-slate-700 rounded p-1 text-center min-h-12">
                            <div className="text-xs text-cyan-400 mb-0.5">
                              🎨
                            </div>
                            <div className="text-xs text-white font-medium">
                              Beautiful Design
                            </div>
                          </div>
                          <div className="bg-slate-700 rounded p-1 text-center min-h-12">
                            <div className="text-xs text-purple-400 mb-0.5">
                              ⚡
                            </div>
                            <div className="text-xs text-white font-medium">
                              Lightning Fast
                            </div>
                          </div>
                          <div className="bg-slate-700 rounded p-1 text-center min-h-12">
                            <div className="text-xs text-green-400 mb-0.5">
                              🚀
                            </div>
                            <div className="text-xs text-white font-medium">
                              Modern Stack
                            </div>
                          </div>
                          <div className="bg-slate-700 rounded p-1 text-center min-h-12">
                            <div className="text-xs text-yellow-400 mb-0.5">
                              🧩
                            </div>
                            <div className="text-xs text-white font-medium">
                              500+ Problems
                            </div>
                          </div>
                          <div className="bg-slate-700 rounded p-1 text-center min-h-12">
                            <div className="text-xs text-orange-400 mb-0.5">
                              👥
                            </div>
                            <div className="text-xs text-white font-medium">
                              Collaborate
                            </div>
                          </div>
                          <div className="bg-slate-700 rounded p-1 text-center min-h-12">
                            <div className="text-xs text-blue-400 mb-0.5">
                              📊
                            </div>
                            <div className="text-xs text-white font-medium">
                              Track Progress
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">
                        Home Page
                      </h3>
                      <p className="text-xs text-slate-400">
                        Landing page with hero section
                      </p>
                    </div>
                  </motion.div>

                  {/* 2. Login Page Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => (window.location.href = "/login")}
                  >
                    <div className="h-48 bg-slate-900 p-2 relative">
                      {/* Split screen login simulation */}
                      <div className="grid grid-cols-2 h-full gap-1">
                        {/* Left side - branding */}
                        <div className="bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded p-2">
                          <div className="w-4 h-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded mb-1"></div>
                          <div className="text-xs text-white font-bold mb-1">
                            AlgoArena
                          </div>
                          <div className="text-xs text-white/70 mb-1">
                            Where coding
                          </div>
                          <div className="text-xs text-white/70 mb-1">
                            meets elegance
                          </div>
                          <div className="text-xs text-white/50">
                            Practice • Learn • Grow
                          </div>
                        </div>
                        {/* Right side - login form */}
                        <div className="bg-slate-800 rounded p-2">
                          <div className="text-xs text-white font-semibold mb-2">
                            Welcome Back
                          </div>
                          <div className="space-y-1">
                            <div className="bg-slate-700 rounded p-1">
                              <div className="text-xs text-slate-400">
                                Email
                              </div>
                            </div>
                            <div className="bg-slate-700 rounded p-1">
                              <div className="text-xs text-slate-400">
                                Password
                              </div>
                            </div>
                            <div className="bg-blue-500 rounded p-1 text-center">
                              <div className="text-xs text-white font-medium">
                                Sign In
                              </div>
                            </div>
                            <div className="bg-red-500/20 border border-red-500 rounded p-1 text-center">
                              <div className="text-xs text-red-400">Google</div>
                            </div>
                            <div className="flex gap-1">
                              <div className="bg-slate-700 rounded p-1 flex-1 text-center">
                                <div className="text-xs text-slate-300">
                                  Admin
                                </div>
                              </div>
                              <div className="bg-slate-700 rounded p-1 flex-1 text-center">
                                <div className="text-xs text-slate-300">
                                  User
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">
                        Login Page
                      </h3>
                      <p className="text-xs text-slate-400">
                        Authentication with role selection
                      </p>
                    </div>
                  </motion.div>

                  {/* 3. Themes Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="h-48 bg-slate-900 p-2 relative flex flex-col">
                      {/* Theme selector header */}
                      <div className="text-center mb-2">
                        <div className="text-xs font-bold text-white mb-1">
                          🎨 Theme Selector
                        </div>
                        <div className="text-xs text-slate-400">
                          Personalize your experience
                        </div>
                      </div>
                      {/* Theme cards - perfectly aligned */}
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="bg-slate-800 border-2 border-cyan-500 rounded p-2 text-center">
                          <div className="text-xs text-white font-semibold mb-1">
                            Dark Mode
                          </div>
                          <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded mb-1"></div>
                          <div className="flex justify-center">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          </div>
                        </div>
                        <div className="bg-blue-900 border border-blue-600 rounded p-2 text-center">
                          <div className="text-xs text-blue-300 font-semibold mb-1">
                            Midnight
                          </div>
                          <div className="h-4 bg-gradient-to-r from-blue-800 to-blue-700 rounded mb-1"></div>
                          <div className="flex justify-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full border border-blue-300"></div>
                          </div>
                        </div>
                        <div className="bg-green-900 border border-green-600 rounded p-2 text-center">
                          <div className="text-xs text-green-300 font-semibold mb-1">
                            Forest
                          </div>
                          <div className="h-4 bg-gradient-to-r from-green-800 to-green-700 rounded mb-1"></div>
                          <div className="flex justify-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full border border-green-300"></div>
                          </div>
                        </div>
                      </div>
                      {/* Theme indicators */}
                      <div className="flex justify-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      </div>
                      {/* Preview area - scrollable */}
                      <div className="flex-1 bg-slate-800 border border-slate-600 rounded p-2">
                        <div className="text-xs text-slate-300 mb-1 font-semibold">
                          Live Preview:
                        </div>
                        <div className="h-12 overflow-y-auto custom-scrollbar">
                          <div className="bg-slate-700 rounded p-1 mb-1">
                            <div className="w-full h-1 bg-cyan-400 rounded mb-0.5"></div>
                            <div className="w-3/4 h-1 bg-slate-500 rounded mb-0.5"></div>
                            <div className="w-1/2 h-1 bg-slate-500 rounded"></div>
                          </div>
                          <div className="bg-slate-700 rounded p-1">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-cyan-400 rounded"></div>
                              <div className="w-2 h-2 bg-purple-400 rounded"></div>
                              <div className="w-2 h-2 bg-green-400 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">Themes</h3>
                      <p className="text-xs text-slate-400">
                        Dynamic theme selection
                      </p>
                    </div>
                  </motion.div>

                  {/* 4. Problems Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => (window.location.href = "/problems")}
                  >
                    <div className="h-48 bg-slate-900 p-2 relative">
                      {/* Problems header */}
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-bold text-cyan-400">
                          Problems Arena
                        </div>
                        <div className="text-xs text-slate-400">Search...</div>
                      </div>
                      {/* Progress cards */}
                      <div className="grid grid-cols-4 gap-1 mb-2">
                        <div className="bg-slate-700 rounded p-1 text-center">
                          <div className="text-xs text-cyan-400 font-bold">
                            85
                          </div>
                          <div className="text-xs text-cyan-400">Total</div>
                          <div className="w-full h-1 bg-cyan-400 rounded mt-1"></div>
                        </div>
                        <div className="bg-slate-700 rounded p-1 text-center">
                          <div className="text-xs text-green-400 font-bold">
                            35
                          </div>
                          <div className="text-xs text-green-400">Easy</div>
                          <div className="w-3/4 h-1 bg-green-400 rounded mt-1"></div>
                        </div>
                        <div className="bg-slate-700 rounded p-1 text-center">
                          <div className="text-xs text-yellow-400 font-bold">
                            40
                          </div>
                          <div className="text-xs text-yellow-400">Med</div>
                          <div className="w-2/3 h-1 bg-yellow-400 rounded mt-1"></div>
                        </div>
                        <div className="bg-slate-700 rounded p-1 text-center">
                          <div className="text-xs text-red-400 font-bold">
                            10
                          </div>
                          <div className="text-xs text-red-400">Hard</div>
                          <div className="w-1/3 h-1 bg-red-400 rounded mt-1"></div>
                        </div>
                      </div>
                      {/* Problem items */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between bg-slate-800 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-1 h-4 bg-green-400 rounded"></div>
                            <div className="text-xs text-white">1. Two Sum</div>
                          </div>
                          <div className="px-1 bg-green-400/20 text-green-400 rounded text-xs">
                            Easy
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-slate-800 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-1 h-4 bg-green-400 rounded"></div>
                            <div className="text-xs text-white">
                              2. Valid Parentheses
                            </div>
                          </div>
                          <div className="px-1 bg-green-400/20 text-green-400 rounded text-xs">
                            Easy
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-slate-800 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-1 h-4 bg-slate-600 rounded"></div>
                            <div className="text-xs text-slate-400">
                              3. Longest Substring
                            </div>
                          </div>
                          <div className="px-1 bg-yellow-400/20 text-yellow-400 rounded text-xs">
                            Med
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-slate-800 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-1 h-4 bg-slate-600 rounded"></div>
                            <div className="text-xs text-slate-400">
                              4. Median Arrays
                            </div>
                          </div>
                          <div className="px-1 bg-red-400/20 text-red-400 rounded text-xs">
                            Hard
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">Problems</h3>
                      <p className="text-xs text-slate-400">
                        Coding challenges with filtering
                      </p>
                    </div>
                  </motion.div>

                  {/* 5. Practice Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => (window.location.href = "/practice")}
                  >
                    <div className="h-48 bg-slate-900 p-2 relative flex flex-col">
                      {/* Monaco editor simulation */}
                      <div className="flex-1 border border-slate-600 rounded bg-slate-900 flex flex-col">
                        {/* Editor header */}
                        <div className="bg-slate-800 border-b border-slate-600 p-1 flex items-center justify-between">
                          <div className="flex space-x-1 text-xs">
                            <div className="px-2 py-0.5 bg-purple-500 text-white rounded font-medium">
                              main.js
                            </div>
                            <div className="px-1 py-0.5 bg-slate-700 text-slate-400 rounded">
                              +
                            </div>
                          </div>
                          <div className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-medium">
                            ▶ Run
                          </div>
                        </div>
                        {/* Code area - scrollable */}
                        <div className="flex-1 p-1 text-xs font-mono overflow-y-auto custom-scrollbar">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-1">
                              <span className="text-slate-500 w-3 text-right">
                                1
                              </span>
                              <span className="text-blue-400">function</span>
                              <span className="text-yellow-400">twoSum</span>
                              <span className="text-white">
                                (nums, target) {"{"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 ml-4">
                              <span className="text-slate-500 w-3 text-right">
                                2
                              </span>
                              <span className="text-blue-400">for</span>
                              <span className="text-white">(</span>
                              <span className="text-blue-400">let</span>
                              <span className="text-white">i = </span>
                              <span className="text-green-400">0</span>
                              <span className="text-white">
                                ; i &lt; nums.length; i++) {"{"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 ml-8">
                              <span className="text-slate-500 w-3 text-right">
                                3
                              </span>
                              <span className="text-blue-400">for</span>
                              <span className="text-white">(</span>
                              <span className="text-blue-400">let</span>
                              <span className="text-white">j = i + </span>
                              <span className="text-green-400">1</span>
                              <span className="text-white">
                                ; j &lt; nums.length; j++) {"{"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 ml-12">
                              <span className="text-slate-500 w-3 text-right">
                                4
                              </span>
                              <span className="text-blue-400">if</span>
                              <span className="text-white">
                                (nums[i] + nums[j] === target) {"{"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 ml-16">
                              <span className="text-slate-500 w-3 text-right">
                                5
                              </span>
                              <span className="text-blue-400">return</span>
                              <span className="text-white">[i, j];</span>
                            </div>
                            <div className="flex items-center space-x-1 ml-12">
                              <span className="text-slate-500 w-3 text-right">
                                6
                              </span>
                              <span className="text-white">{"}"}</span>
                            </div>
                            <div className="flex items-center space-x-1 ml-8">
                              <span className="text-slate-500 w-3 text-right">
                                7
                              </span>
                              <span className="text-white">{"}"}</span>
                            </div>
                            <div className="flex items-center space-x-1 ml-4">
                              <span className="text-slate-500 w-3 text-right">
                                8
                              </span>
                              <span className="text-white">{"}"}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-slate-500 w-3 text-right">
                                9
                              </span>
                              <span className="text-white">{"}"}</span>
                            </div>
                          </div>
                        </div>
                        {/* Output panel */}
                        <div className="bg-slate-800 border-t border-slate-600 p-1">
                          <div className="text-xs text-green-400 font-medium">
                            ✓ Output: [0, 1]
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">Practice</h3>
                      <p className="text-xs text-slate-400">
                        Code playground with execution
                      </p>
                    </div>
                  </motion.div>

                  {/* 6. Roadmap Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => (window.location.href = "/roadmap")}
                  >
                    <div className="h-48 bg-slate-900 p-2 relative">
                      {/* Roadmap header */}
                      <div className="text-center mb-2">
                        <div className="text-xs font-bold text-emerald-400">
                          Learning Roadmap
                        </div>
                        <div className="text-xs text-slate-400">
                          Master algorithms step by step
                        </div>
                      </div>
                      {/* Learning path cards */}
                      <div className="space-y-1">
                        <div className="bg-emerald-500/20 border border-emerald-500 rounded p-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs text-emerald-300 font-semibold">
                              Arrays & Strings
                            </div>
                            <div className="w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                              <div className="text-xs text-slate-900">✓</div>
                            </div>
                          </div>
                          <div className="text-xs text-emerald-400 mb-1">
                            15/15 Complete
                          </div>
                          <div className="w-full h-1 bg-emerald-400 rounded"></div>
                        </div>
                        <div className="bg-yellow-500/20 border border-yellow-500 rounded p-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs text-yellow-300 font-semibold">
                              Trees & Graphs
                            </div>
                            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                              <div className="text-xs text-slate-900">8</div>
                            </div>
                          </div>
                          <div className="text-xs text-yellow-400 mb-1">
                            8/12 In Progress
                          </div>
                          <div className="w-2/3 h-1 bg-yellow-400 rounded"></div>
                        </div>
                        <div className="bg-slate-700 border border-slate-600 rounded p-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs text-slate-400 font-semibold">
                              Dynamic Programming
                            </div>
                            <div className="w-4 h-4 bg-slate-600 rounded-full border-2 border-slate-500 flex items-center justify-center">
                              <div className="text-xs text-slate-400">🔒</div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 mb-1">
                            0/10 Locked
                          </div>
                          <div className="w-1/4 h-1 bg-slate-600 rounded"></div>
                        </div>
                        <div className="bg-slate-700 border border-slate-600 rounded p-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs text-slate-400 font-semibold">
                              Advanced Topics
                            </div>
                            <div className="w-4 h-4 bg-slate-600 rounded-full border-2 border-slate-500 flex items-center justify-center">
                              <div className="text-xs text-slate-400">🔒</div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 mb-1">
                            0/8 Locked
                          </div>
                          <div className="w-0 h-1 bg-slate-600 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">Roadmap</h3>
                      <p className="text-xs text-slate-400">
                        Learning paths with progress
                      </p>
                    </div>
                  </motion.div>

                  {/* 7. Debug Together Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => (window.location.href = "/debug-together")}
                  >
                    <div className="h-48 bg-slate-900 p-2 relative flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2 bg-slate-800 rounded p-1">
                        <div className="text-xs font-bold text-orange-400">
                          🐛 Debug Session #1
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="text-xs text-slate-400 font-medium">
                            3 active
                          </div>
                        </div>
                      </div>
                      {/* Main interface */}
                      <div className="flex-1 grid grid-cols-5 gap-2">
                        {/* Code editor */}
                        <div className="col-span-3 border border-slate-600 rounded bg-slate-900 flex flex-col">
                          <div className="bg-slate-800 border-b border-slate-600 p-1 flex items-center justify-between">
                            <div className="text-xs text-slate-400 font-medium">
                              main.cpp
                            </div>
                            <div className="flex -space-x-1">
                              <div className="w-3 h-3 bg-orange-400 rounded-full border border-slate-800"></div>
                              <div className="w-3 h-3 bg-blue-400 rounded-full border border-slate-800"></div>
                              <div className="w-3 h-3 bg-green-400 rounded-full border border-slate-800"></div>
                            </div>
                          </div>
                          <div className="flex-1 p-1 text-xs font-mono overflow-y-auto custom-scrollbar">
                            <div className="space-y-0.5">
                              <div className="flex items-center space-x-1">
                                <span className="text-slate-500 w-3">1</span>
                                <span className="text-blue-400">#include</span>
                                <span className="text-green-400">
                                  &lt;iostream&gt;
                                </span>
                                <div className="w-0.5 h-3 bg-orange-400 ml-1"></div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-slate-500 w-3">2</span>
                                <span className="text-blue-400">using</span>
                                <span className="text-white">
                                  namespace std;
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-slate-500 w-3">3</span>
                                <span className="text-blue-400">int</span>
                                <span className="text-yellow-400">main</span>
                                <span className="text-white">() {"{"}</span>
                                <div className="w-0.5 h-3 bg-blue-400 ml-1"></div>
                              </div>
                              <div className="flex items-center space-x-1 ml-4">
                                <span className="text-slate-500 w-3">4</span>
                                <span className="text-white">
                                  cout &lt;&lt;
                                </span>
                                <span className="text-green-400">
                                  "Hello World!"
                                </span>
                                <span className="text-white">;</span>
                              </div>
                              <div className="flex items-center space-x-1 ml-4">
                                <span className="text-slate-500 w-3">5</span>
                                <span className="text-blue-400">return</span>
                                <span className="text-green-400">0</span>
                                <span className="text-white">;</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-slate-500 w-3">6</span>
                                <span className="text-white">{"}"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Video chat and messages */}
                        <div className="col-span-2 flex flex-col space-y-1">
                          <div className="bg-slate-800 border border-slate-600 rounded p-1">
                            <div className="text-xs text-slate-400 mb-1 font-medium">
                              Video Chat
                            </div>
                            <div className="grid grid-cols-2 gap-0.5">
                              <div className="bg-orange-400/20 rounded aspect-square flex items-center justify-center">
                                <div className="text-xs text-orange-300 font-bold">
                                  A
                                </div>
                              </div>
                              <div className="bg-blue-400/20 rounded aspect-square flex items-center justify-center">
                                <div className="text-xs text-blue-300 font-bold">
                                  S
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 bg-slate-800 border border-slate-600 rounded p-1">
                            <div className="text-xs text-slate-400 mb-1 font-medium">
                              Live Chat
                            </div>
                            <div className="h-12 overflow-y-auto custom-scrollbar space-y-0.5">
                              <div className="text-xs">
                                <span className="text-orange-400 font-medium">
                                  Alex:
                                </span>
                                <span className="text-slate-300">
                                  {" "}
                                  Found the bug!
                                </span>
                              </div>
                              <div className="text-xs">
                                <span className="text-blue-400 font-medium">
                                  Sam:
                                </span>
                                <span className="text-slate-300">
                                  {" "}
                                  Where exactly?
                                </span>
                              </div>
                              <div className="text-xs">
                                <span className="text-green-400 font-medium">
                                  You:
                                </span>
                                <span className="text-slate-300">
                                  {" "}
                                  Line 4 missing semicolon
                                </span>
                              </div>
                              <div className="text-xs">
                                <span className="text-orange-400 font-medium">
                                  Alex:
                                </span>
                                <span className="text-slate-300">
                                  {" "}
                                  Good catch! 👍
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">
                        Debug Together
                      </h3>
                      <p className="text-xs text-slate-400">
                        Collaborative debugging sessions
                      </p>
                    </div>
                  </motion.div>

                  {/* 8. Profile Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => (window.location.href = "/profile")}
                  >
                    <div className="h-48 bg-slate-900 p-2 relative">
                      {/* Profile header */}
                      <div className="bg-slate-800 border border-slate-700 rounded p-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              S
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-bold text-white">
                              Saurabh Shukla
                            </div>
                            <div className="text-xs text-slate-400">
                              saurabh@email.com
                            </div>
                            <div className="text-xs text-slate-300">
                              Algorithm Enthusiast
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-cyan-400 font-bold">
                              Level 12
                            </div>
                            <div className="text-xs text-slate-400">
                              7 day streak
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats section */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-800 border border-slate-700 rounded p-2">
                          <div className="text-xs font-semibold text-white mb-1">
                            Progress Overview
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            <div className="text-center">
                              <div className="w-4 h-4 rounded-full bg-cyan-400 mx-auto mb-1 flex items-center justify-center">
                                <span className="text-xs text-slate-900 font-bold">
                                  85
                                </span>
                              </div>
                              <div className="text-xs text-cyan-400">Total</div>
                            </div>
                            <div className="text-center">
                              <div className="w-4 h-4 rounded-full bg-green-400 mx-auto mb-1 flex items-center justify-center">
                                <span className="text-xs text-slate-900 font-bold">
                                  35
                                </span>
                              </div>
                              <div className="text-xs text-green-400">Easy</div>
                            </div>
                            <div className="text-center">
                              <div className="w-4 h-4 rounded-full bg-yellow-400 mx-auto mb-1 flex items-center justify-center">
                                <span className="text-xs text-slate-900 font-bold">
                                  40
                                </span>
                              </div>
                              <div className="text-xs text-yellow-400">Med</div>
                            </div>
                            <div className="text-center">
                              <div className="w-4 h-4 rounded-full bg-red-400 mx-auto mb-1 flex items-center justify-center">
                                <span className="text-xs text-slate-900 font-bold">
                                  10
                                </span>
                              </div>
                              <div className="text-xs text-red-400">Hard</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-800 border border-slate-700 rounded p-2">
                          <div className="text-xs font-semibold text-white mb-1">
                            Achievements
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded"></div>
                              <div className="text-xs text-white">
                                First Steps
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded"></div>
                              <div className="text-xs text-white">
                                Speed Demon
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded"></div>
                              <div className="text-xs text-white">
                                Array Master
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-slate-600 rounded"></div>
                              <div className="text-xs text-slate-500">
                                Consistency
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">Profile</h3>
                      <p className="text-xs text-slate-400">
                        User dashboard and statistics
                      </p>
                    </div>
                  </motion.div>

                  {/* 9. Leaderboard Screenshot */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => (window.location.href = "/leaderboard")}
                  >
                    <div className="h-48 bg-slate-900 p-2 relative flex flex-col">
                      {/* Leaderboard header */}
                      <div className="text-center mb-2">
                        <div className="text-xs font-bold text-yellow-400 mb-1">
                          🏆 Global Leaderboard
                        </div>
                        <div className="flex justify-center space-x-1 text-xs">
                          <div className="px-2 py-0.5 bg-slate-700 rounded font-medium">
                            All Time
                          </div>
                          <div className="px-2 py-0.5 bg-yellow-500 text-slate-900 rounded font-medium">
                            Weekly
                          </div>
                          <div className="px-2 py-0.5 bg-slate-700 rounded font-medium">
                            Monthly
                          </div>
                        </div>
                      </div>

                      {/* Top 3 podium */}
                      <div className="flex justify-center items-end space-x-2 mb-2">
                        <div className="text-center">
                          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center mb-1">
                            <span className="text-xs text-slate-900 font-bold">
                              2
                            </span>
                          </div>
                          <div className="text-xs text-gray-300 font-medium">
                            Alice
                          </div>
                          <div className="text-xs text-gray-400">2,150 pts</div>
                          <div className="w-6 h-6 bg-gray-400 mx-auto"></div>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mb-1">
                            <span className="text-xs text-slate-900 font-bold">
                              1
                            </span>
                          </div>
                          <div className="text-xs text-yellow-300 font-medium">
                            CodeMaster
                          </div>
                          <div className="text-xs text-yellow-400">
                            2,500 pts
                          </div>
                          <div className="w-6 h-8 bg-yellow-400 mx-auto"></div>
                        </div>
                        <div className="text-center">
                          <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center mb-1">
                            <span className="text-xs text-slate-900 font-bold">
                              3
                            </span>
                          </div>
                          <div className="text-xs text-orange-300 font-medium">
                            DevPro
                          </div>
                          <div className="text-xs text-orange-400">
                            1,980 pts
                          </div>
                          <div className="w-6 h-4 bg-orange-400 mx-auto"></div>
                        </div>
                      </div>

                      {/* Ranking list - scrollable */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-0.5">
                        <div className="flex items-center justify-between bg-cyan-500/20 border border-cyan-500 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-cyan-400 font-bold">
                              #42
                            </div>
                            <div className="text-xs text-cyan-300 font-medium">
                              You (Saurabh)
                            </div>
                          </div>
                          <div className="text-xs text-cyan-400 font-bold">
                            1,250 pts
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-slate-800 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-slate-400 font-bold">
                              #43
                            </div>
                            <div className="text-xs text-slate-300">
                              TechGuru
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            1,240 pts
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-slate-800 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-slate-400 font-bold">
                              #44
                            </div>
                            <div className="text-xs text-slate-300">
                              PyExpert
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            1,230 pts
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-slate-800 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-slate-400 font-bold">
                              #45
                            </div>
                            <div className="text-xs text-slate-300">
                              JSNinja
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            1,220 pts
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-slate-800 rounded p-1">
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-slate-400 font-bold">
                              #46
                            </div>
                            <div className="text-xs text-slate-300">
                              DataScientist
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            1,210 pts
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-800">
                      <h3 className="text-sm font-bold text-white">
                        Leaderboard
                      </h3>
                      <p className="text-xs text-slate-400">
                        Rankings and competition
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Navigation Hint */}
                <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-center">
                  <p className="text-slate-400 text-sm">
                    Visual overview of all platform sections • Click any card to
                    navigate
                  </p>
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
