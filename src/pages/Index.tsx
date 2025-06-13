import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Users,
  Trophy,
  Sparkles,
  Play,
  GitBranch,
} from "lucide-react";
import Navigation from "../components/Navigation";

const Index = () => {
  const features = [
    {
      icon: Code,
      title: "Zen Coding Interface",
      description:
        "Monaco-powered IDE with glassmorphism design, syntax highlighting, and focus mode.",
      color: "from-cyan to-blue-400",
    },
    {
      icon: GitBranch,
      title: "Visual Learning Paths",
      description:
        "Interactive roadmaps that guide you through arrays, trees, graphs, and dynamic programming.",
      color: "from-highlight to-orange-400",
    },
    {
      icon: Users,
      title: "Debug Together",
      description:
        "Simulated multiplayer debugging with real-time collaboration features.",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description:
        "Visual progress rings, streaks, and achievements stored locally.",
      color: "from-green-400 to-emerald-400",
    },
  ];

  const stats = [
    { number: "500+", label: "Coding Problems" },
    { number: "50+", label: "Learning Paths" },
    { number: "10k+", label: "Simulated Users" },
    { number: "95%", label: "Visual Experience" },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary-light" />
                <span className="text-primary-light font-medium">
                  Frontend-First Coding Platform
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
                Code in the{" "}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  Arena
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Where LeetCode meets Figma. An immersive, design-led coding
                experience that transforms how you learn algorithms and data
                structures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                to="/problems"
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light px-8 py-4 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-primary/25"
              >
                <Play className="w-5 h-5" />
                <span>Start Coding</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/roadmap"
                className="inline-flex items-center space-x-2 bg-card-bg border border-card-border px-8 py-4 rounded-xl font-semibold text-text-primary hover:bg-card-bg/80 transition-all duration-200"
              >
                <GitBranch className="w-5 h-5" />
                <span>Explore Roadmap</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative bg-card-bg border border-card-border rounded-2xl p-1 shadow-2xl">
              <div className="bg-darker-bg rounded-xl p-6">
                {/* Mock Editor Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-light/60 text-sm font-mono">
                      two-sum.py
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-muted text-sm">
                    <span>Python</span>
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Mock Code */}
                <div className="font-mono text-sm space-y-2">
                  <div className="text-primary">
                    def <span className="text-accent">twoSum</span>(
                    <span className="text-secondary">nums</span>,{" "}
                    <span className="text-secondary">target</span>):
                  </div>
                  <div className="pl-4 text-text-secondary">
                    <span className="text-secondary">hashmap</span> = {}
                  </div>
                  <div className="pl-4 text-primary">
                    for <span className="text-secondary">i</span>,{" "}
                    <span className="text-secondary">num</span> in{" "}
                    <span className="text-accent">enumerate</span>(
                    <span className="text-secondary">nums</span>):
                  </div>
                  <div className="pl-8 text-text-secondary">
                    <span className="text-secondary">complement</span> ={" "}
                    <span className="text-secondary">target</span> -{" "}
                    <span className="text-secondary">num</span>
                  </div>
                  <div className="pl-8 text-primary">
                    if <span className="text-secondary">complement</span> in{" "}
                    <span className="text-secondary">hashmap</span>:
                  </div>
                  <div className="pl-12 text-primary">
                    return [<span className="text-secondary">hashmap</span>[
                    <span className="text-secondary">complement</span>],{" "}
                    <span className="text-secondary">i</span>]
                  </div>
                  <div className="pl-8 text-text-secondary">
                    <span className="text-secondary">hashmap</span>[
                    <span className="text-secondary">num</span>] ={" "}
                    <span className="text-secondary">i</span>
                    <span className="ml-2 bg-secondary text-white px-1 rounded text-xs animate-cursor-blink">
                      |
                    </span>
                  </div>
                </div>

                {/* Mock Test Results */}
                <div className="mt-6 pt-4 border-t border-slate/20">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-success">✓ All tests passed</span>
                      <span className="text-text-muted">Runtime: 52ms</span>
                      <span className="text-text-muted">Memory: 15.2MB</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-accent text-xs">Optimal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Reimagining{" "}
              <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                Code Practice
              </span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Every feature designed with intention. Every interaction crafted
              for flow. This is coding practice, elevated.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-card-bg border border-card-border rounded-2xl p-8 hover:border-primary transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary-light transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-text-secondary text-lg leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-primary-light" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card-bg border border-card-border rounded-2xl p-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Ready to step into the Arena?
            </h3>
            <p className="text-xl text-text-secondary mb-8">
              Join thousands of developers mastering algorithms through
              beautiful, intentional design.
            </p>
            <Link
              to="/problems"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light px-8 py-4 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-primary/25"
            >
              <Code className="w-5 h-5" />
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
              AlgoArena
            </span>
          </div>
          <p className="text-text-muted">
            Frontend-first coding practice platform. Built with React, Tailwind
            CSS, and Monaco Editor.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
