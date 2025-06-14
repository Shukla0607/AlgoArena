import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Navigation from "../components/Navigation";
import LogoutConfirmation from "../components/LogoutConfirmation";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, logout, isAdmin } = useAuth();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutConfirmOpen(false);
    window.location.href = "/"; // Redirect to homepage after logout
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
    </div>
  );
};

export default Profile;
