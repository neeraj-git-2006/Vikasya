import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Beaker,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Flame,
  X,
  RotateCcw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  glycemicIndex: number;
  impact: "low" | "moderate" | "high";
  carbs: number;
}

const foods: FoodItem[] = [
  // High GI
  { id: "white-rice", name: "White Rice", emoji: "🍚", glycemicIndex: 89, impact: "high", carbs: 52 },
  { id: "white-bread", name: "White Bread", emoji: "🍞", glycemicIndex: 75, impact: "high", carbs: 49 },
  { id: "potato", name: "Potato", emoji: "🥔", glycemicIndex: 78, impact: "high", carbs: 37 },
  { id: "soda", name: "Soda", emoji: "🥤", glycemicIndex: 95, impact: "high", carbs: 39 },
  
  // Moderate GI
  { id: "brown-rice", name: "Brown Rice", emoji: "🌾", glycemicIndex: 68, impact: "moderate", carbs: 45 },
  { id: "sweet-potato", name: "Sweet Potato", emoji: "🍠", glycemicIndex: 63, impact: "moderate", carbs: 27 },
  { id: "banana", name: "Banana", emoji: "🍌", glycemicIndex: 62, impact: "moderate", carbs: 27 },
  
  // Low GI
  { id: "quinoa", name: "Quinoa", emoji: "🌿", glycemicIndex: 53, impact: "low", carbs: 21 },
  { id: "lentils", name: "Lentils", emoji: "🫘", glycemicIndex: 32, impact: "low", carbs: 20 },
  { id: "broccoli", name: "Broccoli", emoji: "🥦", glycemicIndex: 10, impact: "low", carbs: 7 },
  { id: "berries", name: "Berries", emoji: "🫐", glycemicIndex: 40, impact: "low", carbs: 14 },
];

interface DraggableFoodProps {
  food: FoodItem;
}

function DraggableFood({ food }: DraggableFoodProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FOOD",
    item: food,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`cursor-move p-4 rounded-xl border-2 transition-all ${
        isDragging ? "opacity-50" : "opacity-100"
      } ${
        food.impact === "high"
          ? "border-red-500/30 bg-red-500/10 hover:bg-red-500/20"
          : food.impact === "moderate"
          ? "border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20"
          : "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
      }`}
    >
      <div className="text-3xl mb-2 text-center">{food.emoji}</div>
      <div className="text-sm font-medium text-white text-center mb-1">{food.name}</div>
      <div className="flex items-center justify-center gap-2 text-xs">
        <span className="text-slate-400">GI: {food.glycemicIndex}</span>
      </div>
    </motion.div>
  );
}

interface DropZoneProps {
  title: string;
  food: FoodItem | null;
  onDrop: (food: FoodItem) => void;
  onRemove: () => void;
  variant: "original" | "alternative";
}

function DropZone({ title, food, onDrop, onRemove, variant }: DropZoneProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FOOD",
    drop: (item: FoodItem) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative min-h-[200px] p-6 rounded-2xl border-2 border-dashed transition-all ${
        isOver
          ? "border-emerald-500 bg-emerald-500/10 scale-105"
          : food
          ? "border-slate-600 bg-slate-800/50"
          : "border-slate-700 bg-slate-900/30"
      }`}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-xs text-slate-400">Drag a food item here</p>
      </div>

      <AnimatePresence>
        {food ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            <div
              className={`p-6 rounded-xl border-2 ${
                food.impact === "high"
                  ? "border-red-500/40 bg-red-500/20"
                  : food.impact === "moderate"
                  ? "border-yellow-500/40 bg-yellow-500/20"
                  : "border-emerald-500/40 bg-emerald-500/20"
              }`}
            >
              <button
                onClick={onRemove}
                className="absolute -top-2 -right-2 p-1 bg-slate-800 rounded-full border border-slate-600 hover:bg-red-500/20 hover:border-red-500 transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>

              <div className="text-5xl mb-3 text-center">{food.emoji}</div>
              <div className="text-center">
                <div className="font-semibold text-white mb-2">{food.name}</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-slate-900/50 rounded-lg">
                    <div className="text-xs text-slate-400">GI</div>
                    <div className="font-semibold text-white">{food.glycemicIndex}</div>
                  </div>
                  <div className="p-2 bg-slate-900/50 rounded-lg">
                    <div className="text-xs text-slate-400">Carbs</div>
                    <div className="font-semibold text-white">{food.carbs}g</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-32 flex items-center justify-center text-slate-500 text-sm">
            Drop food here
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SimulatorContent() {
  const [originalFood, setOriginalFood] = useState<FoodItem | null>(null);
  const [alternativeFood, setAlternativeFood] = useState<FoodItem | null>(null);

  const reset = () => {
    setOriginalFood(null);
    setAlternativeFood(null);
  };

  const generateGlucoseData = (food: FoodItem | null) => {
    if (!food) return [];

    const baseGlucose = 100;
    const spike = food.glycemicIndex * 0.8;

    return [
      { time: "0m", glucose: baseGlucose },
      { time: "15m", glucose: baseGlucose + spike * 0.3 },
      { time: "30m", glucose: baseGlucose + spike * 0.7 },
      { time: "45m", glucose: baseGlucose + spike },
      { time: "60m", glucose: baseGlucose + spike * 0.9 },
      { time: "90m", glucose: baseGlucose + spike * 0.6 },
      { time: "120m", glucose: baseGlucose + spike * 0.3 },
    ];
  };

  const comparisonData = () => {
    const times = ["0m", "15m", "30m", "45m", "60m", "90m", "120m"];
    const original = generateGlucoseData(originalFood);
    const alternative = generateGlucoseData(alternativeFood);

    return times.map((time, i) => ({
      time,
      original: original[i]?.glucose || 100,
      alternative: alternative[i]?.glucose || 100,
    }));
  };

  const calculateDifference = () => {
    if (!originalFood || !alternativeFood) return null;

    const originalPeak = 100 + originalFood.glycemicIndex * 0.8;
    const alternativePeak = 100 + alternativeFood.glycemicIndex * 0.8;
    const difference = originalPeak - alternativePeak;

    return {
      difference: Math.abs(Math.round(difference)),
      isBetter: difference > 0,
      percentImprovement: Math.round((difference / originalPeak) * 100),
    };
  };

  const stats = calculateDifference();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-4">
            <Beaker className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Interactive Simulator</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What If Simulator
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Compare food choices and see the real-time glucose impact difference
          </p>
        </motion.div>

        {/* Food Bank */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-xl" />
          <div className="relative p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Food Bank</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {foods.map((food) => (
                <DraggableFood key={food.id} food={food} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comparison Zones */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DropZone
              title="Your Current Choice"
              food={originalFood}
              onDrop={setOriginalFood}
              onRemove={() => setOriginalFood(null)}
              variant="original"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DropZone
              title="Alternative Option"
              food={alternativeFood}
              onDrop={setAlternativeFood}
              onRemove={() => setAlternativeFood(null)}
              variant="alternative"
            />
          </motion.div>
        </div>

        {/* Comparison Results */}
        {originalFood && alternativeFood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Comparison */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl" />
                <div className="relative p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-emerald-500/30 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stats?.isBetter ? "-" : "+"}
                    {stats?.difference}
                  </div>
                  <div className="text-sm text-slate-400">mg/dL Difference</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className={`absolute inset-0 ${stats?.isBetter ? "bg-emerald-500/20" : "bg-red-500/20"} rounded-2xl blur-xl`} />
                <div className={`relative p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border ${stats?.isBetter ? "border-emerald-500/30" : "border-red-500/30"} text-center`}>
                  {stats?.isBetter ? (
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-400" />
                  )}
                  <div className="text-3xl font-bold text-white mb-1">
                    {Math.abs(stats?.percentImprovement || 0)}%
                  </div>
                  <div className="text-sm text-slate-400">
                    {stats?.isBetter ? "Improvement" : "Increase"}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-xl" />
                <div className="relative p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-orange-500/30 text-center">
                  <Flame className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {originalFood.carbs - alternativeFood.carbs > 0 ? "-" : "+"}
                    {Math.abs(originalFood.carbs - alternativeFood.carbs)}g
                  </div>
                  <div className="text-sm text-slate-400">Carbs Difference</div>
                </div>
              </motion.div>
            </div>

            {/* Graph Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl" />
              <div className="relative p-6 bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      Glucose Impact Comparison
                    </h3>
                    <p className="text-sm text-slate-400">
                      See the difference over 2 hours
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg hover:bg-slate-800 transition-all border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={comparisonData()}>
                    <defs>
                      <linearGradient id="originalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="alternativeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={[80, 200]} />
                    <ReferenceLine y={100} stroke="#6366f1" strokeDasharray="5 5" label="Target" />
                    <ReferenceLine y={140} stroke="#ef4444" strokeDasharray="3 3" label="High" />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="original"
                      stroke="#ef4444"
                      strokeWidth={3}
                      fill="url(#originalGrad)"
                      name={originalFood.name}
                      animationDuration={1500}
                    />
                    <Area
                      type="monotone"
                      dataKey="alternative"
                      stroke="#10b981"
                      strokeWidth={3}
                      fill="url(#alternativeGrad)"
                      name={alternativeFood.name}
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`p-6 rounded-2xl border-2 ${
                stats?.isBetter
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : "border-red-500/30 bg-red-500/10"
              }`}
            >
              <div className="flex items-start gap-4">
                {stats?.isBetter ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                )}
                <div>
                  <h4
                    className={`text-lg font-semibold mb-2 ${
                      stats?.isBetter ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stats?.isBetter
                      ? `✅ Great swap! Choose ${alternativeFood.name}`
                      : `⚠️ ${originalFood.name} is actually better`}
                  </h4>
                  <p className="text-slate-300 mb-3">
                    {stats?.isBetter
                      ? `Switching to ${alternativeFood.name} reduces your glucose spike by ${stats.difference} mg/dL (${stats.percentImprovement}% improvement). This helps maintain better blood sugar control.`
                      : `The alternative option causes a ${Math.abs(stats.percentImprovement)}% higher glucose spike. Stick with ${originalFood.name} for better control.`}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-slate-400">
                      Impact difference: {stats.difference} mg/dL over 2 hours
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function WhatIfSimulator() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SimulatorContent />
    </DndProvider>
  );
}
