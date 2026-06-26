import { motion } from "motion/react";
import { useState } from "react";
import {
  Activity,
  Droplets,
  Moon,
  Smile,
  TrendingUp,
  Calendar,
  Heart,
  Award,
  Zap,
} from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const weeklyActivityData = [
    { day: "Mon", steps: 8234, calories: 320 },
    { day: "Tue", steps: 10521, calories: 425 },
    { day: "Wed", steps: 7845, calories: 298 },
    { day: "Thu", steps: 12847, calories: 512 },
    { day: "Fri", steps: 9234, calories: 367 },
    { day: "Sat", steps: 15234, calories: 598 },
    { day: "Sun", steps: 11234, calories: 445 },
  ];

  const moods = [
    { emoji: "😊", label: "Great", color: "emerald" },
    { emoji: "🙂", label: "Good", color: "cyan" },
    { emoji: "😐", label: "Okay", color: "yellow" },
    { emoji: "😔", label: "Low", color: "orange" },
  ];

  const dailyMetrics = [
    {
      icon: Activity,
      label: "Steps",
      current: 12847,
      goal: 10000,
      unit: "steps",
      color: "emerald",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      icon: Droplets,
      label: "Water",
      current: 6,
      goal: 8,
      unit: "glasses",
      color: "cyan",
      bgColor: "bg-cyan-100",
      textColor: "text-cyan-600",
    },
    {
      icon: Moon,
      label: "Sleep",
      current: 7.5,
      goal: 8,
      unit: "hours",
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
  ];

  const healthScore = 92;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Your Dashboard</h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-lg border border-emerald-100">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Tuesday, April 7, 2026</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">Track your daily health journey</p>
        </motion.div>

        {/* Health Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-8 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-3xl shadow-2xl text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6" />
                <span className="text-emerald-100">Overall Health Score</span>
              </div>
              <div className="text-6xl font-bold mb-2">{healthScore}</div>
              <div className="flex items-center gap-2 text-emerald-100 mb-6">
                <TrendingUp className="w-5 h-5" />
                <span>+5 points from last week</span>
              </div>
              <p className="text-emerald-50 leading-relaxed">
                Excellent progress! You're maintaining great health habits. Keep up the good work with
                your daily routines.
              </p>
            </div>

            <div className="flex justify-center">
              <CircularProgress
                value={healthScore}
                size={200}
                strokeWidth={12}
                color="white"
                trackColor="rgba(255,255,255,0.2)"
              />
            </div>
          </div>
        </motion.div>

        {/* Daily Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {dailyMetrics.map((metric, index) => {
            const percentage = (metric.current / metric.goal) * 100;
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${metric.bgColor} rounded-xl group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${metric.textColor}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {metric.current.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      of {metric.goal.toLocaleString()} {metric.unit}
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{metric.label}</span>
                    <span className={`font-semibold ${metric.textColor}`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percentage, 100)}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 rounded-full`}
                    />
                  </div>
                </div>

                {percentage >= 100 && (
                  <div className="flex items-center gap-2 text-sm text-emerald-600 mt-3">
                    <Zap className="w-4 h-4 fill-emerald-500" />
                    <span className="font-medium">Goal achieved!</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Activity className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Weekly Activity</h3>
                <p className="text-sm text-gray-600">Your step count this week</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyActivityData}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="steps"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorSteps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Mood Tracker */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-100 rounded-xl">
                <Smile className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Mood Tracker</h3>
                <p className="text-sm text-gray-600">How are you feeling today?</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {moods.map((mood) => (
                <motion.button
                  key={mood.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedMood === mood.label
                      ? `border-${mood.color}-500 bg-${mood.color}-50 shadow-lg`
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium text-gray-700">{mood.label}</div>
                </motion.button>
              ))}
            </div>

            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-200"
              >
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Mood logged!</span> Remember, acknowledging your
                  feelings is an important step toward mental wellness.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Active Days", value: "24", icon: Calendar, color: "emerald" },
            { label: "Calories Burned", value: "512", icon: Zap, color: "orange" },
            { label: "Streak", value: "7 days", icon: TrendingUp, color: "cyan" },
            { label: "Heart Points", value: "38", icon: Heart, color: "red" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100"
            >
              <stat.icon className={`w-6 h-6 text-${stat.color}-600 mb-2`} />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
