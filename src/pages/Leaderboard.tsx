import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp, User } from "lucide-react";
import Navigation from "../components/Navigation";

const Leaderboard = () => {
  const topUsers = [
    {
      rank: 1,
      name: "Sarah Chen",
      score: 2847,
      solved: 156,
      streak: 23,
      avatar: "S",
      color: "from-yellow-400 to-orange-400",
    },
    {
      rank: 2,
      name: "Mike Rodriguez",
      score: 2654,
      solved: 142,
      streak: 18,
      avatar: "M",
      color: "from-slate-400 to-slate-500",
    },
    {
      rank: 3,
      name: "Emily Johnson",
      score: 2543,
      solved: 138,
      streak: 15,
      avatar: "E",
      color: "from-orange-400 to-red-400",
    },
    {
      rank: 4,
      name: "Alex Thompson",
      score: 2234,
      solved: 98,
      streak: 7,
      avatar: "A",
      color: "from-cyan to-blue-400",
    },
    {
      rank: 5,
      name: "David Kim",
      score: 2187,
      solved: 94,
      streak: 12,
      avatar: "D",
      color: "from-purple-400 to-pink-400",
    },
    {
      rank: 6,
      name: "Lisa Wang",
      score: 2098,
      solved: 89,
      streak: 9,
      avatar: "L",
      color: "from-green-400 to-emerald-400",
    },
    {
      rank: 7,
      name: "James Wilson",
      score: 1987,
      solved: 85,
      streak: 6,
      avatar: "J",
      color: "from-indigo-400 to-purple-400",
    },
    {
      rank: 8,
      name: "Maria Garcia",
      score: 1876,
      solved: 81,
      streak: 11,
      avatar: "M",
      color: "from-pink-400 to-rose-400",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-light/60 font-bold text-lg">#{rank}</span>;
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "h-32";
      case 2:
        return "h-24";
      case 3:
        return "h-20";
      default:
        return "h-16";
    }
  };

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
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
              Global{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p className="text-xl text-light/70">
              See how you rank against coding enthusiasts worldwide
            </p>
          </motion.div>

          {/* Podium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-end justify-center space-x-4 mb-12"
          >
            {topUsers.slice(0, 3).map((user, index) => {
              const positions = [1, 0, 2]; // Center first place
              const actualIndex = positions[index];
              const actualUser = topUsers[actualIndex];

              return (
                <div key={actualUser.rank} className="text-center">
                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${actualUser.color} flex items-center justify-center text-white text-xl font-bold`}
                  >
                    {actualUser.avatar}
                  </div>

                  {/* Name */}
                  <div className="text-light font-semibold mb-2">
                    {actualUser.name}
                  </div>

                  {/* Podium */}
                  <div
                    className={`${getPodiumHeight(actualUser.rank)} bg-gradient-to-t ${actualUser.color} rounded-t-lg flex flex-col items-center justify-center px-6 mb-2`}
                  >
                    <div className="text-white text-2xl font-bold mb-1">
                      {actualUser.rank}
                    </div>
                    <div className="text-white/80 text-sm">
                      {actualUser.score} pts
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-light/60 text-sm">
                    {actualUser.solved} solved
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              {
                label: "Your Rank",
                value: "#47",
                icon: Trophy,
                color: "from-cyan to-blue-400",
              },
              {
                label: "Your Score",
                value: "1,543",
                icon: TrendingUp,
                color: "from-green-400 to-emerald-400",
              },
              {
                label: "Problems Solved",
                value: "85",
                icon: Medal,
                color: "from-purple-400 to-pink-400",
              },
              {
                label: "Current Streak",
                value: "7 days",
                icon: Crown,
                color: "from-highlight to-orange-400",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-slate/20 backdrop-blur-sm border border-slate/30 rounded-xl p-4 text-center"
                >
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg mb-2`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-light mb-1">
                    {stat.value}
                  </div>
                  <div className="text-light/60 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>

          {/* Full Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-slate/20 backdrop-blur-sm border border-slate/30 rounded-xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate/30">
              <h3 className="text-xl font-bold text-light">Top Performers</h3>
            </div>

            <div className="divide-y divide-slate/20">
              {topUsers.map((user, index) => (
                <div
                  key={user.rank}
                  className="p-6 hover:bg-slate/10 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(user.rank)}
                      </div>

                      {/* Avatar & Info */}
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${user.color} flex items-center justify-center text-white font-bold`}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <div className="text-light font-semibold">
                            {user.name}
                          </div>
                          <div className="text-light/60 text-sm">
                            {user.solved} problems solved
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-8 text-right">
                      <div>
                        <div className="text-light font-bold">
                          {user.score.toLocaleString()}
                        </div>
                        <div className="text-light/60 text-sm">Score</div>
                      </div>
                      <div>
                        <div className="text-light font-bold">
                          {user.streak}
                        </div>
                        <div className="text-light/60 text-sm">Day Streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Your Position */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-cyan/20 to-blue-400/20 border border-cyan/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12">
                  <span className="text-cyan font-bold text-lg">#47</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan to-blue-400 flex items-center justify-center text-white font-bold">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-light font-semibold">
                      Alex Johnson (You)
                    </div>
                    <div className="text-light/60 text-sm">
                      85 problems solved
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8 text-right">
                <div>
                  <div className="text-light font-bold">1,543</div>
                  <div className="text-light/60 text-sm">Score</div>
                </div>
                <div>
                  <div className="text-light font-bold">7</div>
                  <div className="text-light/60 text-sm">Day Streak</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
