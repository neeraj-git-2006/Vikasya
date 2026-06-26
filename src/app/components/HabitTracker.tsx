import { motion } from "motion/react";
import { useState } from "react";
import {
  Check,
  Circle,
  Droplets,
  Apple,
  Dumbbell,
  Moon,
  Book,
  Heart,
  Sun,
  Coffee,
  Salad,
  Wind,
  Plus,
  TrendingUp,
} from "lucide-react";

interface Habit {
  id: string;
  name: string;
  icon: any;
  color: string;
  streak: number;
  completed: boolean;
  category: string;
}

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Drink 8 glasses of water",
      icon: Droplets,
      color: "cyan",
      streak: 7,
      completed: true,
      category: "Nutrition",
    },
    {
      id: "2",
      name: "Eat 5 servings of fruits & veggies",
      icon: Apple,
      color: "green",
      streak: 5,
      completed: true,
      category: "Nutrition",
    },
    {
      id: "3",
      name: "Exercise for 30 minutes",
      icon: Dumbbell,
      color: "orange",
      streak: 4,
      completed: false,
      category: "Fitness",
    },
    {
      id: "4",
      name: "Get 8 hours of sleep",
      icon: Moon,
      color: "blue",
      streak: 6,
      completed: true,
      category: "Rest",
    },
    {
      id: "5",
      name: "Read for 20 minutes",
      icon: Book,
      color: "purple",
      streak: 3,
      completed: false,
      category: "Mental Health",
    },
    {
      id: "6",
      name: "Practice meditation",
      icon: Wind,
      color: "teal",
      streak: 8,
      completed: false,
      category: "Mental Health",
    },
    {
      id: "7",
      name: "Eat a healthy breakfast",
      icon: Coffee,
      color: "amber",
      streak: 7,
      completed: true,
      category: "Nutrition",
    },
    {
      id: "8",
      name: "Take a mindful break",
      icon: Sun,
      color: "yellow",
      streak: 2,
      completed: false,
      category: "Mental Health",
    },
  ]);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const completionPercentage = Math.round((completedCount / habits.length) * 100);

  const categories = ["All", "Nutrition", "Fitness", "Rest", "Mental Health"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredHabits =
    activeCategory === "All"
      ? habits
      : habits.filter((h) => h.category === activeCategory);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Habit Tracker</h1>
          <p className="text-gray-600 text-lg">
            Build consistency and track your daily health habits
          </p>
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-8 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-3xl shadow-2xl text-white"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-emerald-100 mb-2">Today's Progress</div>
              <div className="text-5xl font-bold mb-2">
                {completedCount}/{habits.length}
              </div>
              <div className="text-emerald-100">habits completed</div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <svg className="transform -rotate-90" width="120" height="120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="white"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 314 }}
                    animate={{
                      strokeDashoffset: 314 - (314 * completionPercentage) / 100,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ strokeDasharray: 314 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{completionPercentage}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-lg font-semibold">Longest Streaks</span>
                </div>
                <div className="space-y-2">
                  {habits
                    .sort((a, b) => b.streak - a.streak)
                    .slice(0, 3)
                    .map((habit) => (
                      <div
                        key={habit.id}
                        className="flex items-center gap-2 text-emerald-100"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span className="text-sm">
                          {habit.name.substring(0, 20)}... {habit.streak} days
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-white/70 text-gray-700 hover:bg-white border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Habits Grid */}
        <div className="grid gap-4 mb-6">
          {filteredHabits.map((habit, index) => {
            const Icon = habit.icon;
            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`group p-6 rounded-2xl shadow-lg border-2 transition-all cursor-pointer ${
                  habit.completed
                    ? `bg-${habit.color}-50 border-${habit.color}-300`
                    : "bg-white/70 border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      habit.completed
                        ? `bg-${habit.color}-500 border-${habit.color}-500`
                        : "border-gray-300 bg-white group-hover:border-emerald-400"
                    }`}
                  >
                    {habit.completed ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </motion.div>

                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 p-3 rounded-xl ${
                      habit.completed
                        ? `bg-${habit.color}-100`
                        : "bg-gray-100 group-hover:bg-emerald-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        habit.completed
                          ? `text-${habit.color}-600`
                          : "text-gray-600"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3
                      className={`text-lg font-semibold mb-1 ${
                        habit.completed
                          ? "text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {habit.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          habit.completed
                            ? `bg-${habit.color}-100 text-${habit.color}-700`
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {habit.category}
                      </span>
                    </div>
                  </div>

                  {/* Streak */}
                  <div className="flex-shrink-0 text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart
                        className={`w-5 h-5 ${
                          habit.completed
                            ? `text-${habit.color}-500 fill-${habit.color}-400`
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-2xl font-bold text-gray-900">
                        {habit.streak}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">day streak</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add New Habit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-dashed border-gray-300 hover:border-emerald-400 transition-all group"
        >
          <div className="flex items-center justify-center gap-3 text-gray-600 group-hover:text-emerald-600">
            <div className="p-3 bg-gray-100 group-hover:bg-emerald-100 rounded-xl transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-lg font-semibold">Add New Habit</span>
          </div>
        </motion.button>

        {/* Motivational Message */}
        {completedCount === habits.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl shadow-2xl text-white text-center"
          >
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Perfect Day!</h3>
            <p className="text-emerald-50">
              You've completed all your habits today. Keep up the amazing work!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
