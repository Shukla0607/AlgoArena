import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Clock,
  Trophy,
  CheckCircle,
  Circle,
  Star,
  ArrowRight,
  Target,
  Flame,
} from "lucide-react";
import Navigation from "../components/Navigation";
import { problems } from "../data/problems";

const Problems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [activeProgressSection, setActiveProgressSection] = useState("Medium");

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const topics = [
    "All",
    "Array",
    "String",
    "Hash Table",
    "Dynamic Programming",
    "Tree",
    "Graph",
    "Sorting",
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Medium":
        return "text-highlight bg-highlight/10 border-highlight/20";
      case "Hard":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-light/60 bg-slate/10 border-slate/20";
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.number.toString().includes(searchTerm.trim());
    const matchesDifficulty =
      selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
    const matchesTopic =
      selectedTopic === "All" || problem.topic === selectedTopic;

    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  return (
    <div className="min-h-screen theme-bg">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Problem{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Arena
              </span>
            </h1>
            <p className="text-xl text-white">
              Master algorithms through carefully curated challenges
            </p>
          </motion.div>

          {/* Progress Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              {
                label: "Total Solved",
                value: "12",
                total: "150",
                color: "from-green-400 to-emerald-400",
                description: "Overall progress",
                icon: Trophy,
              },
              {
                label: "Easy Problems",
                value: "8",
                total: "50",
                color: "from-green-400 to-green-500",
                description: "Beginner friendly",
                icon: Circle,
              },
              {
                label: "Medium Problems",
                value: "3",
                total: "75",
                color: "from-yellow-400 to-orange-400",
                description: "Intermediate challenges",
                icon: Target,
              },
              {
                label: "Hard Problems",
                value: "1",
                total: "25",
                color: "from-red-400 to-pink-400",
                description: "Expert level",
                icon: Flame,
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              const percentage =
                (parseInt(stat.value) / parseInt(stat.total)) * 100;

              return (
                <div
                  key={stat.label}
                  className="theme-card-bg border theme-border rounded-xl p-6 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">
                        {stat.label}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-3xl font-bold text-white">
                        {stat.value}
                      </span>
                      <span className="text-slate-400 text-lg">
                        / {stat.total}
                      </span>
                      <span className="text-sm font-medium text-slate-300 ml-auto">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">
                      {stat.description}
                    </p>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500 relative`}
                        style={{ width: `${percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>

                    {/* Mini milestones */}
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0</span>
                      <span>{Math.round(parseInt(stat.total) * 0.25)}</span>
                      <span>{Math.round(parseInt(stat.total) * 0.5)}</span>
                      <span>{Math.round(parseInt(stat.total) * 0.75)}</span>
                      <span>{stat.total}</span>
                    </div>
                  </div>

                  {/* Achievement Indicator */}
                  {percentage >= 25 && (
                    <div className="mt-3 flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">
                        {percentage >= 75
                          ? "Expert"
                          : percentage >= 50
                            ? "Intermediate"
                            : "Progressing"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Detailed Medium Problems Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="theme-card-bg border theme-border rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Medium Problems Progress
                  </h3>
                  <p className="text-slate-400">
                    Intermediate challenges to level up your skills
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">3/75</div>
                <div className="text-sm text-slate-400">4% Complete</div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  category: "Arrays & Strings",
                  solved: 2,
                  total: 25,
                  color: "from-blue-400 to-blue-500",
                },
                {
                  category: "Trees & Graphs",
                  solved: 1,
                  total: 30,
                  color: "from-green-400 to-green-500",
                },
                {
                  category: "Dynamic Programming",
                  solved: 0,
                  total: 20,
                  color: "from-purple-400 to-purple-500",
                },
              ].map((cat, idx) => {
                const catPercentage = (cat.solved / cat.total) * 100;
                return (
                  <div
                    key={cat.category}
                    className="bg-slate-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium text-sm">
                        {cat.category}
                      </span>
                      <span className="text-slate-400 text-xs">
                        {cat.solved}/{cat.total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 bg-gradient-to-r ${cat.color} rounded-full transition-all duration-300`}
                        style={{ width: `${catPercentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {Math.round(catPercentage)}% complete
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Weekly Progress */}
            <div className="border-t border-slate-600 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">
                  This Week's Progress
                </span>
                <span className="text-green-400 text-sm font-medium">
                  +2 solved
                </span>
              </div>
              <div className="flex space-x-1">
                {[true, true, false, false, false, false, false].map(
                  (solved, day) => (
                    <div
                      key={day}
                      className={`flex-1 h-2 rounded ${
                        solved ? "bg-green-400" : "bg-slate-700"
                      }`}
                      title={`Day ${day + 1}`}
                    />
                  ),
                )}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light/40" />
                <input
                  type="text"
                  placeholder="Search problems by title, number, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-500 rounded-xl text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-light/40" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Filter */}
              <div>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Problems List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() =>
                  (window.location.href = `/problems/${problem.id}`)
                }
                className="group bg-slate-800 border border-slate-600 hover:border-violet-500 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-slate-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Status Icon */}
                    <div className="mt-1">
                      {problem.solved ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-light/30" />
                      )}
                    </div>

                    {/* Problem Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-mono text-slate-400 bg-slate-700 px-2 py-1 rounded">
                          #{problem.number}
                        </span>
                        <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                          {problem.title}
                        </h3>
                        <span
                          className={`px-3 py-1 border rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}
                        >
                          {problem.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-slate-700 text-slate-200 text-xs font-medium rounded-full border border-slate-600">
                          {problem.topic}
                        </span>
                      </div>

                      <p className="text-slate-300 mb-3 max-w-2xl">
                        {problem.description}
                      </p>

                      <div className="flex items-center space-x-6 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{problem.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{problem.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-cyan" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProblems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-light/40" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No problems found
              </h3>
              <p className="text-slate-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problems;
