import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  Github,
  Chrome,
  User,
  Shield,
  Users,
  ArrowLeft,
  Code,
  AlertCircle,
  Sparkles,
  Map,
  Terminal,
  Palette,
} from "lucide-react";
import { useAuth, UserRole } from "../contexts/AuthContext";
import { googleAuth } from "../lib/googleAuth";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("general");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const googleUser = await googleAuth.signInWithPopup();
      const success = await loginWithGoogle(googleUser, selectedRole);

      if (success) {
        const from = (location.state as any)?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError("Failed to authenticate with Google. Please try again.");
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      setError(
        error.message || "Google authentication failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Mock signup logic - in real app, would create new user
        console.log("Signing up", {
          email,
          password,
          name,
          role: selectedRole,
        });
        // For demo, auto-login after signup
        const success = await login(email, password, selectedRole);
        if (success) {
          const from = (location.state as any)?.from?.pathname || "/";
          navigate(from, { replace: true });
        }
      } else {
        // Login logic
        const success = await login(email, password, selectedRole);
        if (success) {
          const from = (location.state as any)?.from?.pathname || "/";
          navigate(from, { replace: true });
        } else {
          setError(
            "Invalid credentials. Try admin@algoarena.com / admin123 for admin or any email for general user.",
          );
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      value: "general" as UserRole,
      label: "General User",
      icon: Users,
      description: "Access problems, practice, and compete",
      color: "from-cyan-500 to-blue-500",
    },
    {
      value: "admin" as UserRole,
      label: "Administrator",
      icon: Shield,
      description: "Manage platform, users, and problems",
      color: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <div className="h-screen theme-bg flex overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">AlgoArena</div>
            </Link>

            <h1 className="text-3xl xl:text-4xl font-bold text-white mb-4">
              Master Algorithms in the{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Arena
              </span>
            </h1>

            <div className="max-w-md overflow-y-auto max-h-[calc(100vh-200px)] pr-4 custom-scrollbar">
              <p className="text-lg text-white/80 mb-6">
                Where LeetCode's rigor meets Figma's elegance. A frontend-first
                coding practice platform designed for modern developers.
              </p>

              {/* Project Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-cyan-300" />
                  Project Overview
                </h3>
                <p className="text-sm text-white/70 mb-4 leading-relaxed">
                  AlgoArena is a comprehensive coding practice platform that
                  reimagines how developers learn algorithms and data
                  structures. Built with a frontend-first approach, it combines
                  the systematic problem-solving of LeetCode with the visual
                  elegance and collaborative features of modern design tools.
                </p>
                <div className="bg-white/10 rounded-lg p-3 mb-4">
                  <p className="text-xs text-white/80">
                    <strong>Vision:</strong> Create an immersive coding
                    environment where learning algorithms feels intuitive,
                    collaborative, and visually engaging.
                  </p>
                </div>
              </div>

              {/* Core Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-cyan-300" />
                  Core Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-white/90">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Zen Coding Interface</div>
                      <div className="text-xs text-white/60">
                        Monaco Editor with glassmorphism design, syntax
                        highlighting, and distraction-free focus mode
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-white/90">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Visual Learning Paths</div>
                      <div className="text-xs text-white/60">
                        Interactive roadmaps guiding through Arrays, Trees,
                        Graphs, and Dynamic Programming
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-white/90">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Debug Together</div>
                      <div className="text-xs text-white/60">
                        Real-time collaborative debugging with live cursors,
                        voice/video, and shared workspaces
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-white/90">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Smart Progress Tracking</div>
                      <div className="text-xs text-white/60">
                        Visual progress rings, streak tracking, and achievement
                        system
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-white/90">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">AI-Powered Assistant</div>
                      <div className="text-xs text-white/60">
                        Context-aware hints, algorithm explanations, and
                        intelligent code reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Sections */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Map className="w-5 h-5 mr-2 text-cyan-300" />
                  Platform Sections
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      🧩 Problems Arena
                    </div>
                    <div className="text-xs text-white/60">
                      500+ curated problems with difficulty filtering, progress
                      tracking, and detailed solutions
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      ⚡ Practice Playground
                    </div>
                    <div className="text-xs text-white/60">
                      Free-form coding environment with instant execution and
                      multi-language support
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      🗺️ Learning Roadmap
                    </div>
                    <div className="text-xs text-white/60">
                      Structured learning paths with unlock system and progress
                      visualization
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      👥 Debug Together
                    </div>
                    <div className="text-xs text-white/60">
                      Collaborative debugging sessions with real-time code
                      sharing and communication
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      👤 Smart Profile
                    </div>
                    <div className="text-xs text-white/60">
                      Comprehensive dashboard with achievements, statistics, and
                      coding activity
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      🏆 Leaderboard
                    </div>
                    <div className="text-xs text-white/60">
                      Global rankings with competitive elements and community
                      recognition
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-cyan-300" />
                  Tech Stack
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-white mb-2">
                      Frontend Architecture
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["React 18", "TypeScript", "Vite", "Tailwind CSS"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-white mb-2">
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
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-white mb-2">
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
                          className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-white mb-2">
                      Development Tools
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["ESLint", "Prettier", "Git", "VS Code"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Philosophy */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-cyan-300" />
                  Design Philosophy
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      🎨 Glassmorphism + Neumorphism
                    </div>
                    <div className="text-xs text-white/60">
                      Modern design language with translucent surfaces and
                      subtle depth
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      🌗 Dynamic Theming
                    </div>
                    <div className="text-xs text-white/60">
                      Dark Mode, Midnight Blue, and Forest Green themes with
                      seamless switching
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="font-medium text-white text-sm mb-1">
                      📱 Responsive Design
                    </div>
                    <div className="text-xs text-white/60">
                      Mobile-first approach ensuring optimal experience across
                      all devices
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-cyan-400/20 rounded-full blur-lg" />
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-purple-400/30 rounded-full blur-md" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-8 overflow-y-auto">
        <div className="w-full max-w-md mx-auto my-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                AlgoArena
              </div>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back to Home */}
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-slate-300 text-base">
                {isSignUp
                  ? "Join the community and start your coding journey"
                  : "Sign in to continue your algorithm mastery"}
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {isSignUp ? "Account Type" : "Login As"}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedRole === role.value
                          ? "border-theme-primary bg-theme-primary/10"
                          : "theme-border theme-card-bg hover:opacity-80"
                      }`}
                      style={{
                        borderColor:
                          selectedRole === role.value
                            ? "var(--theme-primary)"
                            : "var(--theme-card-border)",
                        backgroundColor:
                          selectedRole === role.value
                            ? "var(--theme-primary)1A"
                            : "var(--theme-card-bg)",
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${role.color}`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">
                            {role.label}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {role.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Demo Credentials Info */}
            {!isSignUp && (
              <div className="mb-4 p-3 bg-slate-800 rounded-xl border border-slate-600">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-2">
                      Demo Credentials
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>
                        <strong>Admin:</strong> admin@algoarena.com / admin123
                      </div>
                      <div>
                        <strong>General:</strong> Any email / any password
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <div className="text-sm text-red-400">{error}</div>
                </div>
              </div>
            )}

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                className="flex items-center justify-center space-x-2 px-3 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all duration-200 text-white"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </button>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 px-3 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Chrome className="w-5 h-5" />
                <span className="text-sm">{isLoading ? "..." : "Google"}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-slate-400">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      placeholder="Enter your full name"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-violet-500/25 border border-violet-500"
              >
                <span className="text-white font-bold text-base">
                  {isLoading
                    ? "Please wait..."
                    : isSignUp
                      ? "Create Account"
                      : "Sign In"}
                </span>
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-slate-300 hover:text-white transition-colors font-medium"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
