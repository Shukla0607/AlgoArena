import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Code } from "lucide-react";
import Navigation from "../components/Navigation";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-slate-900">
      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* 404 Animation */}
              <div className="relative mb-8">
                <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan to-highlight bg-clip-text text-transparent">
                  404
                </div>
                <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-slate/10">
                  404
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-light mb-6">
                Page Not Found
              </h1>

              <p className="text-xl text-light/70 max-w-2xl mx-auto mb-8">
                Looks like this code path doesn't exist in our algorithm arena.
                Let's get you back to solving problems!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                to="/"
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-cyan to-highlight px-8 py-4 rounded-xl font-semibold text-midnight hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan/25"
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center space-x-2 bg-slate/20 backdrop-blur-sm border border-slate/30 px-8 py-4 rounded-xl font-semibold text-light hover:bg-slate/30 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            </motion.div>

            {/* Floating Code Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="bg-slate/20 backdrop-blur-sm border border-slate/30 rounded-xl p-8 max-w-2xl mx-auto">
                <div className="text-left font-mono text-sm text-light/70">
                  <div className="text-purple-400 mb-2">
                    <span className="text-cyan">function</span>{" "}
                    <span className="text-highlight">findPage</span>(
                    <span className="text-cyan">url</span>) {"{"}
                  </div>
                  <div className="pl-4 mb-2">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-cyan">routes</span> ={" "}
                    <span className="text-green-400">getAllRoutes()</span>;
                  </div>
                  <div className="pl-4 mb-2">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-cyan">match</span> ={" "}
                    <span className="text-cyan">routes</span>.
                    <span className="text-green-400">find</span>(
                    <span className="text-cyan">route</span> =&gt;{" "}
                    <span className="text-cyan">route</span>.
                    <span className="text-highlight">path</span> ==={" "}
                    <span className="text-cyan">url</span>);
                  </div>
                  <div className="pl-4 mb-2">
                    <span className="text-purple-400">return</span>{" "}
                    <span className="text-cyan">match</span> ||{" "}
                    <span className="text-red-400">null</span>; {"// "}
                    <span className="text-light/50">Oops! 404</span>
                  </div>
                  <div className="text-purple-400">{"}"}</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan/20 to-highlight/20 rounded-full blur-xl animate-float"></div>
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <h3 className="text-xl font-semibold text-light mb-6">
                Popular Destinations
              </h3>
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { name: "Problems", href: "/problems", icon: Code },
                  { name: "Roadmap", href: "/roadmap", icon: ArrowLeft },
                  { name: "Profile", href: "/profile", icon: Home },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="flex items-center space-x-2 bg-slate/20 backdrop-blur-sm border border-slate/30 hover:border-cyan/30 px-4 py-3 rounded-xl text-light hover:text-cyan transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
