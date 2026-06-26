import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Plus,
  X,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Clock,
  Utensils,
  ChevronRight,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  glycemicIndex: number;
  impact: "low" | "moderate" | "high";
  carbs: number;
  category: string;
}

const foodDatabase: FoodItem[] = [
  // Low GI
  { id: "1", name: "Quinoa", emoji: "🌾", glycemicIndex: 53, impact: "low", carbs: 21, category: "Grains" },
  { id: "2", name: "Oats", emoji: "🥣", glycemicIndex: 55, impact: "low", carbs: 27, category: "Grains" },
  { id: "3", name: "Lentils", emoji: "🫘", glycemicIndex: 32, impact: "low", carbs: 20, category: "Legumes" },
  { id: "4", name: "Chickpeas", emoji: "🫘", glycemicIndex: 28, impact: "low", carbs: 27, category: "Legumes" },
  { id: "5", name: "Broccoli", emoji: "🥦", glycemicIndex: 10, impact: "low", carbs: 7, category: "Vegetables" },
  { id: "6", name: "Spinach", emoji: "🥬", glycemicIndex: 15, impact: "low", carbs: 4, category: "Vegetables" },
  { id: "7", name: "Berries", emoji: "🫐", glycemicIndex: 40, impact: "low", carbs: 14, category: "Fruits" },
  { id: "8", name: "Apple", emoji: "🍎", glycemicIndex: 36, impact: "low", carbs: 25, category: "Fruits" },
  
  // Moderate GI
  { id: "9", name: "Brown Rice", emoji: "🍚", glycemicIndex: 68, impact: "moderate", carbs: 45, category: "Grains" },
  { id: "10", name: "Sweet Potato", emoji: "🍠", glycemicIndex: 63, impact: "moderate", carbs: 27, category: "Vegetables" },
  { id: "11", name: "Banana", emoji: "🍌", glycemicIndex: 62, impact: "moderate", carbs: 27, category: "Fruits" },
  { id: "12", name: "Whole Wheat", emoji: "🍞", glycemicIndex: 69, impact: "moderate", carbs: 43, category: "Grains" },
  
  // High GI
  { id: "13", name: "White Rice", emoji: "🍚", glycemicIndex: 89, impact: "high", carbs: 52, category: "Grains" },
  { id: "14", name: "White Bread", emoji: "🍞", glycemicIndex: 75, impact: "high", carbs: 49, category: "Grains" },
  { id: "15", name: "Potato", emoji: "🥔", glycemicIndex: 78, impact: "high", carbs: 37, category: "Vegetables" },
  { id: "16", name: "Watermelon", emoji: "🍉", glycemicIndex: 76, impact: "high", carbs: 8, category: "Fruits" },
];

export function DietPlanner() {
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [timelapseMinutes, setTimelapseMinutes] = useState(60);

  const categories = ["All", "Grains", "Vegetables", "Fruits", "Legumes"];

  const addFood = (food: FoodItem) => {
    setSelectedFoods([...selectedFoods, food]);
  };

  const removeFood = (foodId: string, index: number) => {
    setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
  };

  // Calculate total impact
  const totalCarbs = selectedFoods.reduce((sum, food) => sum + food.carbs, 0);
  const avgGI = selectedFoods.length > 0
    ? selectedFoods.reduce((sum, food) => sum + food.glycemicIndex, 0) / selectedFoods.length
    : 0;

  const overallImpact = avgGI > 70 ? "high" : avgGI > 55 ? "moderate" : "low";

  // Generate glucose prediction
  const generateGlucoseData = () => {
    const baseGlucose = 100;
    const spike = avgGI * 0.8;
    const maxTime = timelapseMinutes;
    
    const data = [];
    for (let i = 0; i <= maxTime; i += 15) {
      let glucose = baseGlucose;
      
      if (i <= 45) {
        glucose = baseGlucose + (spike * (i / 45));
      } else if (i <= 90) {
        glucose = baseGlucose + spike - (spike * 0.3 * ((i - 45) / 45));
      } else {
        glucose = baseGlucose + spike * 0.7 - (spike * 0.7 * ((i - 90) / (maxTime - 90)));
      }
      
      data.push({
        time: `${i}m`,
        glucose: Math.round(glucose),
        minutes: i,
      });
    }
    return data;
  };

  const glucoseData = generateGlucoseData();

  // Background color based on impact
  const bgGradient =
    overallImpact === "high"
      ? "from-red-950/50 via-slate-900 to-slate-950"
      : overallImpact === "moderate"
      ? "from-yellow-950/30 via-slate-900 to-slate-950"
      : "from-emerald-950/50 via-slate-900 to-slate-950";

  const filteredFoods =
    activeCategory === "All"
      ? foodDatabase
      : foodDatabase.filter((f) => f.category === activeCategory);

  return (
    <motion.div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-all duration-1000 bg-gradient-to-br ${bgGradient}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Diet Planner</h1>
          <p className="text-slate-400 text-lg">
            Add foods and see real-time glucose impact
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left - Food Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl" />
            <div className="relative p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">Select Foods</h2>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "text-slate-400 hover:text-white bg-slate-800/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Food Grid */}
              <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredFoods.map((food) => (
                  <motion.button
                    key={food.id}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addFood(food)}
                    className={`group p-4 rounded-xl border-2 transition-all ${
                      food.impact === "low"
                        ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50"
                        : food.impact === "moderate"
                        ? "border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 hover:border-yellow-500/50"
                        : "border-red-500/30 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/50"
                    }`}
                  >
                    <div className="text-4xl mb-2">{food.emoji}</div>
                    <div className="text-sm font-medium text-white mb-1">{food.name}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">GI: {food.glycemicIndex}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          food.impact === "low"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : food.impact === "moderate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {food.impact}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Live Preview Plate */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className={`absolute inset-0 rounded-2xl blur-xl ${
              overallImpact === "high"
                ? "bg-red-500/20"
                : overallImpact === "moderate"
                ? "bg-yellow-500/20"
                : "bg-emerald-500/10"
            }`} />
            <div className="relative p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  Your Plate
                </h2>
                {selectedFoods.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      overallImpact === "high"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : overallImpact === "moderate"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {overallImpact} impact
                  </motion.div>
                )}
              </div>

              {/* Selected Foods */}
              <div className="min-h-[200px] mb-4">
                {selectedFoods.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                    Add foods to see the impact
                  </div>
                ) : (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {selectedFoods.map((food, index) => (
                        <motion.div
                          key={`${food.id}-${index}`}
                          initial={{ opacity: 0, x: 20, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -20, scale: 0.8 }}
                          whileHover={{ x: -5 }}
                          className={`flex items-center justify-between p-3 rounded-xl border ${
                            food.impact === "low"
                              ? "border-emerald-500/30 bg-emerald-500/10"
                              : food.impact === "moderate"
                              ? "border-yellow-500/30 bg-yellow-500/10"
                              : "border-red-500/30 bg-red-500/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{food.emoji}</span>
                            <div>
                              <div className="text-sm font-medium text-white">{food.name}</div>
                              <div className="text-xs text-slate-400">
                                {food.carbs}g carbs · GI {food.glycemicIndex}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFood(food.id, index)}
                            className="p-1 hover:bg-red-500/20 rounded-lg transition-colors group"
                          >
                            <X className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Summary */}
              {selectedFoods.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                >
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Total Carbs</div>
                    <div className="text-2xl font-bold text-white">{totalCarbs}g</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Avg GI</div>
                    <div className="text-2xl font-bold text-white">{Math.round(avgGI)}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Glucose Impact Graph */}
        {selectedFoods.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8"
          >
            <div className={`absolute inset-0 rounded-2xl blur-xl ${
              overallImpact === "high"
                ? "bg-red-500/20"
                : overallImpact === "moderate"
                ? "bg-yellow-500/20"
                : "bg-emerald-500/20"
            }`} />
            <div className="relative p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Live Glucose Prediction
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    See how your meal affects blood sugar over time
                  </p>
                </div>

                {/* Time Lapse Slider */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Time Range</div>
                    <select
                      value={timelapseMinutes}
                      onChange={(e) => setTimelapseMinutes(Number(e.target.value))}
                      className="bg-slate-800 text-white px-3 py-1 rounded-lg text-sm border border-slate-700 focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={180}>3 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={glucoseData}>
                  <defs>
                    <linearGradient id="glucoseGradientLive" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={
                          overallImpact === "high"
                            ? "#ef4444"
                            : overallImpact === "moderate"
                            ? "#eab308"
                            : "#10b981"
                        }
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={
                          overallImpact === "high"
                            ? "#ef4444"
                            : overallImpact === "moderate"
                            ? "#eab308"
                            : "#10b981"
                        }
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[80, 200]} />
                  <ReferenceLine y={100} stroke="#6366f1" strokeDasharray="5 5" label="Target" />
                  <ReferenceLine y={140} stroke="#ef4444" strokeDasharray="3 3" label="High" />
                  <Area
                    type="monotone"
                    dataKey="glucose"
                    stroke={
                      overallImpact === "high"
                        ? "#ef4444"
                        : overallImpact === "moderate"
                        ? "#eab308"
                        : "#10b981"
                    }
                    strokeWidth={3}
                    fill="url(#glucoseGradientLive)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Impact Alert */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`mt-6 p-4 rounded-xl border-2 ${
                  overallImpact === "high"
                    ? "border-red-500/30 bg-red-500/10"
                    : overallImpact === "moderate"
                    ? "border-yellow-500/30 bg-yellow-500/10"
                    : "border-emerald-500/30 bg-emerald-500/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  {overallImpact === "high" ? (
                    <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  ) : overallImpact === "moderate" ? (
                    <Sparkles className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-grow">
                    <div
                      className={`font-semibold mb-2 ${
                        overallImpact === "high"
                          ? "text-red-400"
                          : overallImpact === "moderate"
                          ? "text-yellow-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {overallImpact === "high"
                        ? "⚠️ High Glycemic Impact Detected"
                        : overallImpact === "moderate"
                        ? "⚡ Moderate Impact - Consider Improvements"
                        : "✅ Excellent Choice for Blood Sugar Control"}
                    </div>
                    <div className="text-sm text-slate-300 mb-3">
                      {overallImpact === "high"
                        ? "This meal may cause a significant glucose spike. Consider these healthier alternatives:"
                        : overallImpact === "moderate"
                        ? "Good choice, but you can optimize further:"
                        : "This meal supports stable blood sugar levels. Great work!"}
                    </div>

                    {overallImpact !== "low" && (
                      <div className="flex flex-wrap gap-2">
                        {foodDatabase
                          .filter((f) => f.impact === "low")
                          .slice(0, 3)
                          .map((food) => (
                            <motion.button
                              key={food.id}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => addFood(food)}
                              className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm text-emerald-400 hover:bg-emerald-500/20 transition-all"
                            >
                              <span>{food.emoji}</span>
                              <span>{food.name}</span>
                              <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </motion.div>
  );
}
