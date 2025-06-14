import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  // If not authenticated at all, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center px-6"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-slate-400 mb-8">
            You need to be logged in to access this page. Please sign in to
            continue.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl text-white font-medium transition-colors"
            >
              Go to Login
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // If admin required but user is not admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center px-6"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-400 mb-8">
            You don't have permission to access this page. Administrator
            privileges required.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl text-white font-medium transition-colors"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // User is authenticated and has appropriate permissions
  return <>{children}</>;
};

export default ProtectedRoute;
