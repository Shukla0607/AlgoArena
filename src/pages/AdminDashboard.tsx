import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Code,
  BarChart3,
  Settings,
  Shield,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
} from "lucide-react";
import Navigation from "../components/Navigation";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const stats = [
    {
      label: "Total Users",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Problems",
      value: "150",
      change: "+3",
      icon: Code,
      color: "from-violet-500 to-purple-500",
    },
    {
      label: "Active Sessions",
      value: "834",
      change: "+8.2%",
      icon: BarChart3,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "System Status",
      value: "Healthy",
      change: "99.9%",
      icon: Shield,
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "general",
      status: "active",
      joined: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "general",
      status: "active",
      joined: "5 hours ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "general",
      status: "inactive",
      joined: "1 day ago",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      role: "general",
      status: "active",
      joined: "2 days ago",
    },
  ];

  const recentProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      submissions: 1234,
      success: "87%",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      submissions: 987,
      success: "72%",
    },
    {
      id: 3,
      title: "Longest Substring",
      difficulty: "Medium",
      submissions: 756,
      success: "65%",
    },
    {
      id: 4,
      title: "Median Arrays",
      difficulty: "Hard",
      submissions: 234,
      success: "23%",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "problems", label: "Problems", icon: Code },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "Hard":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-slate-400 bg-slate-400/10";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-slate-400">Welcome back, {user?.name}</p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-slate-800 p-1 rounded-xl border border-slate-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-violet-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800 border border-slate-700 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-green-400 text-sm font-medium">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-slate-400 text-sm">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Users */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      Recent Users
                    </h3>
                    <button className="text-violet-400 hover:text-violet-300 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {user.name}
                            </div>
                            <div className="text-slate-400 text-sm">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              user.status === "active"
                                ? "text-green-400 bg-green-400/10"
                                : "text-slate-400 bg-slate-400/10"
                            }`}
                          >
                            {user.status}
                          </div>
                          <div className="text-slate-400 text-xs mt-1">
                            {user.joined}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem Stats */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      Problem Analytics
                    </h3>
                    <button className="text-violet-400 hover:text-violet-300 transition-colors">
                      <BarChart3 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentProblems.map((problem) => (
                      <div
                        key={problem.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-slate-400 font-mono text-sm">
                            #{problem.id}
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {problem.title}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}
                              >
                                {problem.difficulty}
                              </span>
                              <span className="text-slate-400 text-xs">
                                {problem.submissions} submissions
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {problem.success}
                          </div>
                          <div className="text-slate-400 text-xs">
                            success rate
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Search and Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl text-white transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>

              {/* Users Table */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700">
                      <tr>
                        <th className="text-left py-4 px-6 text-slate-300 font-medium">
                          User
                        </th>
                        <th className="text-left py-4 px-6 text-slate-300 font-medium">
                          Role
                        </th>
                        <th className="text-left py-4 px-6 text-slate-300 font-medium">
                          Status
                        </th>
                        <th className="text-left py-4 px-6 text-slate-300 font-medium">
                          Joined
                        </th>
                        <th className="text-left py-4 px-6 text-slate-300 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-t border-slate-700">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-xs">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-white font-medium">
                                  {user.name}
                                </div>
                                <div className="text-slate-400 text-sm">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-slate-300 capitalize">
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.status === "active"
                                  ? "text-green-400 bg-green-400/10"
                                  : "text-slate-400 bg-slate-400/10"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-400">
                            {user.joined}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-slate-400 hover:text-violet-400 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "problems" && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="text-center py-16">
                <Code className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Problem Management
                </h3>
                <p className="text-slate-400 mb-6">
                  Create, edit, and manage coding problems
                </p>
                <button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl text-white transition-colors">
                  Add New Problem
                </button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="text-center py-16">
                <Settings className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  System Settings
                </h3>
                <p className="text-slate-400">
                  Configure platform settings and preferences
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
