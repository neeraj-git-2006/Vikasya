import { motion } from "motion/react";
import { useState } from "react";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Flame,
  Award,
  Target,
  Zap,
  Heart,
  Droplet,
  Moon,
  Apple,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { CircularHealthMeter } from "./CircularHealthMeter";

export function JeevaniDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<"day" | "week" | "month">("week");

  const glucoseData = [
    { time: "6am", glucose: 95, target: 100 },
    { time: "9am", glucose: 120, target: 100 },
    { time: "12pm", glucose: 140, target: 100 },
    { time: "3pm", glucose: 110, target: 100 },
    { time: "6pm", glucose: 130, target: 100 },
    { time: "9pm", glucose: 105, target: 100 },
  ];

  const weeklyTrend = [
    { day: "Mon", avg: 115, meals: 4 },
    { day: "Tue", avg: 108, meals: 4 },
    { day: "Wed", avg: 122, meals: 5 },
    { day: "Thu", avg: 105, meals: 4 },
    { day: "Fri", avg: 118, meals: 4 },
    { day: "Sat", avg: 110, meals: 3 },
    { day: "Sun", avg: 112, meals: 4 },
  ];

  const healthScore = 87;
  const streak = 12;
  const level = "Controlled";

  const metrics = [
    {
      icon: Droplet,
      label: "Avg Glucose",
      value: "112",
      unit: "mg/dL",
      trend: "down",
      change: "-5%",
      color: "emerald",
      bgGlow: "emerald",
    },
    {
      icon: Apple,
      label: "Meals Logged",
      value: "28",
      unit: "this week",
      trend: "up",
      change: "+12%",
      color: "cyan",
      bgGlow: "cyan",
    },
    {
      icon: Target,
      label: "In Range",
      value: "84%",
      unit: "of time",
      trend: "up",
      change: "+8%",
      color: "blue",
      bgGlow: "blue",
    },
    {
      icon: Moon,
      label: "Sleep Quality",
      value: "7.5",
      unit: "hours",
      trend: "up",
      change: "+0.5h",
      color: "purple",
      bgGlow: "purple",
    },
  ];

  const achievements = [
    { icon: "🎯", title: "Perfect Week", desc: "7 days in range", unlocked: true },
    { icon: "🔥", title: "12-Day Streak", desc: "Keep it going!", unlocked: true },
    { icon: "⭐", title: "Glucose Master", desc: "30 days controlled", unlocked: false },
    { icon: "💪", title: "Consistency Pro", desc: "100 meals logged", unlocked: true },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Your Health Dashboard</h1>
          <p className="text-slate-400 text-lg">Real-time insights into your glucose management</p>
        </motion.div>

        {/* Health Score Card - Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
          <div className="relative p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            
            <div className="relative grid md:grid-cols-3 gap-8 items-center">
              {/* Left - Health Score */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">Health Score</span>
                </div>
                <div className="text-6xl font-bold text-white mb-2">{healthScore}</div>
                <div className="flex items-center gap-2 text-emerald-400 mb-4">
                  <TrendingUp className="w-5 h-5" />
                  <span>+3 points this week</span>
                </div>
                <div className="text-slate-400">
                  You're in the <span className="text-emerald-400 font-semibold">{level}</span> zone
                </div>
              </div>

              {/* Center - Circular Meter */}
              <div className="flex justify-center">
                <CircularHealthMeter value={healthScore} size={220} />
              </div>

              {/* Right - Streak & Level */}
              <div className="space-y-4">
                {/* Streak */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Flame className="w-10 h-10 text-orange-400" />
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-orange-400/50 blur-xl rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{streak}</div>
                      <div className="text-sm text-orange-400">Day Streak 🔥</div>
                    </div>
                  </div>
                </motion.div>

                {/* Level Progress */}
                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Level Progress</span>
                    <span className="text-sm text-cyan-400 font-semibold">87/100</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "87%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                    />
                  </div>
                  <div className="text-xs text-slate-500">13 points to Glucose Master</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-${metric.bgGlow}-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                <div className="relative p-6 bg-slate-900/70 backdrop-blur-sm rounded-2xl border border-slate-700 group-hover:border-emerald-500/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${metric.color}-500/10 border border-${metric.color}-500/20 rounded-xl group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${metric.color}-400`} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      metric.trend === "up" 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      <TrendIcon className="w-3 h-3" />
                      {metric.change}
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-slate-400 mb-1">{metric.unit}</div>
                  <div className="text-xs text-slate-500">{metric.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Glucose Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl" />
            <div className="relative p-6 bg-slate-900/70 backdrop-blur-sm rounded-2xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Today's Glucose</h3>
                  <p className="text-sm text-slate-400">Real-time tracking</p>
                </div>
                <div className="flex gap-2">
                  {["day", "week", "month"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedTimeRange(range as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedTimeRange === range
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={glucoseData}>
                  <defs>
                    <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#6366f1"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="glucose"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#glucoseGrad)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weekly Trend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl" />
            <div className="relative p-6 bg-slate-900/70 backdrop-blur-sm rounded-2xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-1">Weekly Average</h3>
              <p className="text-sm text-slate-400 mb-6">Glucose trends</p>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(6, 182, 212, 0.3)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ fill: "#06b6d4", r: 5 }}
                    activeDot={{ r: 8 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-xl" />
          <div className="relative p-6 bg-slate-900/70 backdrop-blur-sm rounded-2xl border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    achievement.unlocked
                      ? "border-emerald-500/30 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                      : "border-slate-700 bg-slate-800/50 opacity-50"
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <div className="text-sm font-semibold text-white mb-1">{achievement.title}</div>
                  <div className="text-xs text-slate-400">{achievement.desc}</div>
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs"
                    >
                      <Zap className="w-3 h-3" />
                      Unlocked
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
