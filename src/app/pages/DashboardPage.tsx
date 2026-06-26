import { motion } from "motion/react";
import { useState } from "react";
import { Activity, Droplet, Moon, Smile, TrendingUp, Heart, Footprints } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";

export function DashboardPage() {
  const [healthScore] = useState(85);

  const activityData = [
    { day: "Mon", steps: 8234, water: 7, sleep: 7.5 },
    { day: "Tue", steps: 10521, water: 8, sleep: 6.8 },
    { day: "Wed", steps: 7890, water: 6, sleep: 7.2 },
    { day: "Thu", steps: 12340, water: 9, sleep: 8.1 },
    { day: "Fri", steps: 9876, water: 8, sleep: 7.0 },
    { day: "Sat", steps: 15234, water: 10, sleep: 8.5 },
    { day: "Sun", steps: 6543, water: 7, sleep: 9.0 },
  ];

  const healthScoreData = [
    { name: "Score", value: healthScore, fill: "#10b981 " },
  ];

  const moodData = [
    { mood: "😊", label: "Great", count: 12 },
    { mood: "🙂", label: "Good", count: 8 },
    { mood: "😐", label: "Okay", count: 5 },
    { mood: "😔", label: "Low", count: 2 },
  ];

  const todayStats = {
    steps: 8234,
    stepsGoal: 10000,
    water: 6,
    waterGoal: 8,
    sleep: 7.2,
    sleepGoal: 8,
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Health Dashboard</h1>
          <p className="text-gray-600">Track your daily wellness journey</p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Health Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-emerald-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Health Score</h2>
              </div>

              <div className="relative h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    data={healthScoreData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      minAngle={15}
                      background={{ fill: "#f0fdf4" }}
                      clockWise
                      dataKey="value"
                      cornerRadius={10}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {healthScore}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">out of 100</div>
                  <div className="mt-3 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    Excellent
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-700">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+5 points this week</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Keep up the great work!</p>
              </div>
            </div>
          </motion.div>

          {/* Today's Activity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-emerald-100"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">Today's Activity</h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Steps */}
              <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Footprints className="w-8 h-8 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {Math.round((todayStats.steps / todayStats.stepsGoal) * 100)}%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {todayStats.steps.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    of {todayStats.stepsGoal.toLocaleString()} steps
                  </div>
                  <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(todayStats.steps / todayStats.stepsGoal) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>

              {/* Water */}
              <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Droplet className="w-8 h-8 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">
                      {Math.round((todayStats.water / todayStats.waterGoal) * 100)}%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {todayStats.water} glasses
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    of {todayStats.waterGoal} glasses
                  </div>
                  <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(todayStats.water / todayStats.waterGoal) * 100}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>

              {/* Sleep */}
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Moon className="w-8 h-8 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">
                      {Math.round((todayStats.sleep / todayStats.sleepGoal) * 100)}%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {todayStats.sleep}h
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    of {todayStats.sleepGoal}h sleep
                  </div>
                  <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(todayStats.sleep / todayStats.sleepGoal) * 100}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Weekly Steps Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-emerald-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Weekly Activity Trends</h2>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-gray-600">Last 7 days</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #d1fae5",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="steps"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#stepsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Mood Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-emerald-100"
          >
            <div className="flex items-center gap-2 mb-6">
              <Smile className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-800">Mood This Month</h2>
            </div>

            <div className="space-y-4">
              {moodData.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-3xl">{item.mood}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm text-gray-600">{item.count} days</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / 27) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Great!</span> You've had mostly positive moods this month. 
                Keep it up! 🌟
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Keep Your Streak Going!</h3>
          <p className="text-emerald-50 mb-6">
            You're doing great! Make today count with these quick actions.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-medium transition-all">
              Log Activity
            </button>
            <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-medium transition-all">
              Add Water Intake
            </button>
            <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-medium transition-all">
              Record Mood
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
