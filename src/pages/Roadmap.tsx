import React from "react";
import { motion } from "framer-motion";
import { Map, ArrowRight, Lock, CheckCircle, Circle } from "lucide-react";
import Navigation from "../components/Navigation";

const Roadmap = () => {
  const learningPaths = [
    {
      id: 1,
      title: "Arrays & Hashing",
      description: "Master the fundamentals of arrays and hash tables",
      problems: 15,
      completed: 8,
      difficulty: "Beginner",
      unlocked: true,
      color: "from-green-400 to-emerald-400",
    },
    {
      id: 2,
      title: "Two Pointers",
      description: "Learn efficient array traversal techniques",
      problems: 12,
      completed: 5,
      difficulty: "Beginner",
      unlocked: true,
      color: "from-blue-400 to-cyan",
    },
    {
      id: 3,
      title: "Sliding Window",
      description: "Optimize substring and subarray problems",
      problems: 10,
      completed: 2,
      difficulty: "Intermediate",
      unlocked: true,
      color: "from-purple-400 to-pink-400",
    },
    {
      id: 4,
      title: "Stack & Queues",
      description: "Master LIFO and FIFO data structures",
      problems: 14,
      completed: 0,
      difficulty: "Intermediate",
      unlocked: false,
      color: "from-highlight to-orange-400",
    },
    {
      id: 5,
      title: "Binary Search",
      description: "Efficient searching in sorted arrays",
      problems: 18,
      completed: 0,
      difficulty: "Intermediate",
      unlocked: false,
      color: "from-red-400 to-pink-500",
    },
    {
      id: 6,
      title: "Linked Lists",
      description: "Dynamic data structure fundamentals",
      problems: 16,
      completed: 0,
      difficulty: "Intermediate",
      unlocked: false,
      color: "from-indigo-400 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learning{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Follow our curated learning paths to master algorithms and data
              structures step by step
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-slate-800 border border-slate-600 rounded-xl p-6 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  3/6
                </div>
                <div className="text-slate-300">Paths Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  15
                </div>
                <div className="text-light/70">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  85
                </div>
                <div className="text-light/70">Total Problems</div>
              </div>
            </div>
          </motion.div>

          {/* Learning Paths */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative bg-slate-800 border border-slate-600 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  path.unlocked
                    ? "hover:border-violet-500 hover:bg-slate-700"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Lock indicator for locked paths */}
                {!path.unlocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-light/40" />
                  </div>
                )}

                {/* Path Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${path.color} rounded-xl mb-4`}
                >
                  <Map className="w-8 h-8 text-white" />
                </div>

                {/* Path Info */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {path.title}
                </h3>
                <p className="text-slate-300 mb-4">{path.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                    <span>Progress</span>
                    <span className="text-white">
                      {path.completed}/{path.problems}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 bg-gradient-to-r ${path.color} rounded-full transition-all duration-300`}
                      style={{
                        width: `${(path.completed / path.problems) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full">
                    {path.difficulty}
                  </span>

                  {path.unlocked ? (
                    <ArrowRight className="w-5 h-5 text-violet-400" />
                  ) : (
                    <div className="text-slate-500 text-sm">
                      Complete previous paths
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-light mb-4">
                More Paths Coming Soon
              </h3>
              <p className="text-light/70 mb-6">
                Advanced topics like Dynamic Programming, Graph Algorithms, and
                System Design are in development
              </p>
              <div className="inline-flex items-center space-x-2 text-cyan">
                <Circle className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Dynamic Programming</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
