import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Brain,
  Activity,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";

export function JeevaniLanding() {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  const foods = [
    { name: "White Rice", impact: "high", spike: 180, color: "red" },
    { name: "Brown Rice", impact: "moderate", spike: 120, color: "yellow" },
    { name: "Quinoa", impact: "low", spike: 90, color: "green" },
  ];

  const generateGraphData = (spike: number) => {
    return [
      { time: "0m", glucose: 100 },
      { time: "15m", glucose: 100 + spike * 0.3 },
      { time: "30m", glucose: 100 + spike * 0.7 },
      { time: "45m", glucose: 100 + spike },
      { time: "60m", glucose: 100 + spike * 0.9 },
      { time: "90m", glucose: 100 + spike * 0.6 },
      { time: "120m", glucose: 100 + spike * 0.3 },
    ];
  };

  const features = [
    {
      icon: Zap,
      title: "Real-Time Impact",
      description: "See instant glucose predictions before you eat",
      color: "emerald",
    },
    {
      icon: Brain,
      title: "Smart Recommendations",
      description: "AI-powered food swaps for better choices",
      color: "cyan",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Visualize your health journey with animated insights",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Stay Protected",
      description: "Smart warnings keep you safe from risky foods",
      color: "purple",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Interactive Demo */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 mb-6"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">AI-Powered Health Companion</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Don't Guess.
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  See the Impact.
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Jeevani shows you exactly how every food choice affects your blood sugar—before you eat it.
                Make informed decisions with real-time glucose predictions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/jeevani/planner"
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-full shadow-xl shadow-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/60 transition-all hover:scale-105 font-semibold"
                >
                  <span className="flex items-center gap-2 justify-center">
                    Start Your Smart Diet
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  to="/jeevani/simulator"
                  className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white rounded-full shadow-lg hover:shadow-xl transition-all border border-emerald-500/30 hover:border-emerald-500/50 hover:scale-105 font-semibold"
                >
                  Try the Simulator
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>No login required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Instant feedback</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-3xl" />
                
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">
                    Interactive Demo: Select a Food
                  </h3>

                  {/* Food Selection */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {foods.map((food) => (
                      <motion.button
                        key={food.name}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedFood(food.name)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedFood === food.name
                            ? `border-${food.color}-500 bg-${food.color}-500/20 shadow-lg shadow-${food.color}-500/30`
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">
                            {food.name === "White Rice" ? "🍚" : food.name === "Brown Rice" ? "🌾" : "🌿"}
                          </div>
                          <div className="text-sm font-medium text-white mb-1">{food.name}</div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full inline-block ${
                              food.impact === "high"
                                ? "bg-red-500/20 text-red-400"
                                : food.impact === "moderate"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {food.impact}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Glucose Graph */}
                  <motion.div
                    key={selectedFood}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    {selectedFood ? (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-slate-400">Predicted Glucose Level</span>
                          <span className="text-sm font-semibold text-emerald-400">
                            Peak: {100 + foods.find((f) => f.name === selectedFood)!.spike} mg/dL
                          </span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={generateGraphData(foods.find((f) => f.name === selectedFood)!.spike)}>
                            <defs>
                              <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                  offset="5%"
                                  stopColor={
                                    foods.find((f) => f.name === selectedFood)!.color === "red"
                                      ? "#ef4444"
                                      : foods.find((f) => f.name === selectedFood)!.color === "yellow"
                                      ? "#eab308"
                                      : "#10b981"
                                  }
                                  stopOpacity={0.3}
                                />
                                <stop
                                  offset="95%"
                                  stopColor={
                                    foods.find((f) => f.name === selectedFood)!.color === "red"
                                      ? "#ef4444"
                                      : foods.find((f) => f.name === selectedFood)!.color === "yellow"
                                      ? "#eab308"
                                      : "#10b981"
                                  }
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Area
                              type="monotone"
                              dataKey="glucose"
                              stroke={
                                foods.find((f) => f.name === selectedFood)!.color === "red"
                                  ? "#ef4444"
                                  : foods.find((f) => f.name === selectedFood)!.color === "yellow"
                                  ? "#eab308"
                                  : "#10b981"
                              }
                              strokeWidth={3}
                              fill="url(#glucoseGradient)"
                              animationDuration={1500}
                            />
                          </AreaChart>
                        </ResponsiveContainer>

                        {/* Impact Warning/Success */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`mt-4 p-3 rounded-xl border-2 ${
                            foods.find((f) => f.name === selectedFood)!.impact === "high"
                              ? "border-red-500/30 bg-red-500/10"
                              : foods.find((f) => f.name === selectedFood)!.impact === "moderate"
                              ? "border-yellow-500/30 bg-yellow-500/10"
                              : "border-green-500/30 bg-green-500/10"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {foods.find((f) => f.name === selectedFood)!.impact === "high" ? (
                              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div
                                className={`font-medium mb-1 ${
                                  foods.find((f) => f.name === selectedFood)!.impact === "high"
                                    ? "text-red-400"
                                    : foods.find((f) => f.name === selectedFood)!.impact === "moderate"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                                }`}
                              >
                                {foods.find((f) => f.name === selectedFood)!.impact === "high"
                                  ? "High Glycemic Impact"
                                  : foods.find((f) => f.name === selectedFood)!.impact === "moderate"
                                  ? "Moderate Impact"
                                  : "Great Choice!"}
                              </div>
                              <div className="text-xs text-slate-400">
                                {foods.find((f) => f.name === selectedFood)!.impact === "high"
                                  ? "Consider switching to brown rice or quinoa for better control"
                                  : foods.find((f) => f.name === selectedFood)!.impact === "moderate"
                                  ? "Good choice, but quinoa offers even better control"
                                  : "Perfect for maintaining stable blood sugar levels"}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="h-[280px] flex items-center justify-center text-slate-500 text-sm">
                        Select a food to see the glucose impact
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 px-4 py-2 bg-emerald-500 text-slate-950 rounded-full shadow-xl shadow-emerald-500/50 font-semibold text-sm"
              >
                ⚡ Instant Predictions
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Powered by
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Smart Technology
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Advanced features designed to keep you healthy and informed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative h-full p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                    <div className={`inline-flex p-4 bg-${feature.color}-500/10 border border-${feature.color}-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative p-12 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
            <div className="relative">
              <Zap className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Take Control?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands managing diabetes smarter with real-time insights and AI-powered recommendations.
              </p>
              <Link
                to="/jeevani/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-full shadow-xl shadow-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/60 transition-all hover:scale-105 font-semibold"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
