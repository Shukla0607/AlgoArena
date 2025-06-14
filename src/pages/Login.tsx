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
} from "lucide-react";
import { useAuth, UserRole } from "../contexts/AuthContext";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("general");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="h-screen bg-slate-900 flex overflow-hidden">
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

            <p className="text-lg text-white/80 mb-6 max-w-md">
              Where LeetCode's rigor meets Figma's elegance. Join thousands of
              developers mastering algorithms through visual learning.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/90">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span>500+ Curated Problems</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span>Visual Learning Paths</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span>Collaborative Debugging</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span>Progress Tracking</span>
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
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-slate-400 text-sm">
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
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-slate-600 bg-slate-800 hover:border-slate-500"
                      }`}
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
            <div className="space-y-2 mb-4">
              <button
                type="button"
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all duration-200 text-white"
              >
                <Github className="w-5 h-5" />
                <span>Continue with GitHub</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all duration-200 text-white"
              >
                <Chrome className="w-5 h-5" />
                <span>Continue with Google</span>
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
                className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
              >
                {isLoading
                  ? "Please wait..."
                  : isSignUp
                    ? "Create Account"
                    : "Sign In"}
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-slate-400 hover:text-violet-400 transition-colors"
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
