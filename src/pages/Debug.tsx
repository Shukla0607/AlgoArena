import React from "react";
import { motion } from "framer-motion";
import { Users, Play, MessageCircle, Code, Sparkles } from "lucide-react";
import Navigation from "../components/Navigation";

const Debug = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-slate-900">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">Coming Soon</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Debug{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              Experience the future of collaborative coding. Real-time pair
              programming with visual feedback and shared problem-solving.
            </p>
          </motion.div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: Users,
                title: "Real-time Collaboration",
                description:
                  "See your partner's cursor, selections, and changes in real-time as you code together.",
                color: "from-purple-400 to-pink-400",
              },
              {
                icon: MessageCircle,
                title: "Integrated Chat",
                description:
                  "Discuss approaches, share insights, and brainstorm solutions without leaving the editor.",
                color: "from-cyan to-blue-400",
              },
              {
                icon: Code,
                title: "Shared Code Execution",
                description:
                  "Run tests together and see results simultaneously. Perfect for debugging and optimization.",
                color: "from-highlight to-orange-400",
              },
              {
                icon: Play,
                title: "Session Recording",
                description:
                  "Record your collaboration sessions to review problem-solving approaches later.",
                color: "from-green-400 to-emerald-400",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-slate/20 backdrop-blur-sm border border-slate/30 rounded-xl p-6"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-light mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-light/70">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Mock Interface Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate/20 backdrop-blur-sm border border-slate/30 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-light mb-6">
              Preview: Collaborative Interface
            </h3>

            <div className="bg-midnight/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <span className="text-light/80 text-sm">Alex (You)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      S
                    </div>
                    <span className="text-light/80 text-sm">Sarah</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-cyan rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-cyan rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Connected</span>
                </div>
              </div>

              <div className="border border-slate/30 rounded-lg p-4 bg-midnight/30">
                <div className="text-light/60 text-sm mb-2">two-sum.py</div>
                <div className="font-mono text-sm space-y-1">
                  <div className="text-purple-400">
                    def <span className="text-highlight">twoSum</span>(
                    <span className="text-cyan">nums</span>,{" "}
                    <span className="text-cyan">target</span>):
                  </div>
                  <div className="pl-4 text-light/80 relative">
                    <span className="text-cyan">hashmap</span> = {}
                    <div className="absolute -left-2 top-0 w-1 h-5 bg-purple-400 rounded animate-pulse"></div>
                  </div>
                  <div className="pl-4 text-purple-400 relative">
                    for <span className="text-cyan">i</span>,{" "}
                    <span className="text-cyan">num</span> in{" "}
                    <span className="text-highlight">enumerate</span>(
                    <span className="text-cyan">nums</span>):
                    <div className="absolute -left-2 top-0 w-1 h-5 bg-cyan rounded animate-pulse"></div>
                  </div>
                  <div className="pl-8 text-light/80">
                    <span className="text-cyan">complement</span> ={" "}
                    <span className="text-cyan">target</span> -{" "}
                    <span className="text-cyan">num</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-light/50 text-sm">
                This is a simulation of the collaborative interface that will be
                available soon
              </div>
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-slate/20 to-slate/5 backdrop-blur-xl border border-slate/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-light mb-4">
                Be the first to know
              </h3>
              <p className="text-light/70 mb-6">
                Get notified when Debug Together launches with exclusive early
                access
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-midnight/50 border border-slate/30 rounded-xl text-light placeholder-light/40 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-200">
                  Notify Me
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Debug;
