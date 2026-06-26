import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Check, Plus, Trash2, TrendingUp, Flame } from "lucide-react";

interface Habit {
  id: number;
  name: string;
  category: string;
  icon: string;
  streak: number;
  completed: boolean[];
  color: string;
}

export function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Drink 8 glasses of water",
      category: "Hydration",
      icon: "💧",
      streak: 12,
      completed: [true, true, true, true, true, false, true],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "30 minutes exercise",
      category: "Fitness",
      icon: "🏃",
      streak: 8,
      completed: [true, true, false, true, true, true, false],
      color: "from-orange-500 to-red-500",
    },
    {
      id: 3,
      name: "7+ hours sleep",
      category: "Rest",
      icon: "😴",
      streak: 15,
      completed: [true, true, true, true, true, true, true],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      name: "Eat 5 servings of fruits/veggies",
      category: "Nutrition",
      icon: "🥗",
      streak: 5,
      completed: [true, true, false, false, true, true, true],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 5,
      name: "10 minutes meditation",
      category: "Mindfulness",
      icon: "🧘",
      streak: 10,
      completed: [true, true, true, true, false, true, true],
      color: "from-indigo-500 to-blue-500",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const toggleHabit = (habitId: number, dayIndex: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = [...habit.completed];
        newCompleted[dayIndex] = !newCompleted[dayIndex];
        
        // Update streak
        let newStreak = habit.streak;
        if (dayIndex === 6) { // Today
          if (newCompleted[dayIndex]) {
            newStreak = habit.streak + 1;
          } else {
            newStreak = 0;
          }
        }
        
        return { ...habit, completed: newCompleted, streak: newStreak };
      }
      return habit;
    }));
  };

  const deleteHabit = (habitId: number) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completed[6]).length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Habit Tracker</h1>
          <p className="text-gray-600">Build healthy routines, one day at a time</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Today's Progress</div>
                <div className="text-2xl font-bold text-gray-800">
                  {completedToday}/{totalHabits}
                </div>
              </div>
            </div>
            <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              ></motion.div>
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-2">{completionRate}% complete</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-orange-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Longest Streak</div>
                <div className="text-2xl font-bold text-gray-800">
                  {Math.max(...habits.map(h => h.streak))} days
                </div>
              </div>
            </div>
            <div className="text-xs text-orange-600 font-medium">Keep the fire burning! 🔥</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Active Habits</div>
                <div className="text-2xl font-bold text-gray-800">{totalHabits}</div>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="text-xs text-blue-600 font-medium hover:underline"
            >
              + Add new habit
            </button>
          </motion.div>
        </div>

        {/* Add Habit Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Habit</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Habit name..."
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="Category..."
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Add Habit
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Habits List */}
        <div className="space-y-4">
          <AnimatePresence>
            {habits.map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Habit Info */}
                  <div className="flex items-center gap-4 lg:w-80">
                    <div className={`w-14 h-14 bg-gradient-to-br ${habit.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {habit.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">{habit.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{habit.category}</span>
                        {habit.streak > 0 && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 rounded-full">
                            <Flame className="w-3 h-3 text-orange-600" />
                            <span className="text-xs font-bold text-orange-600">{habit.streak}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Week Tracker */}
                  <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                    {days.map((day, dayIndex) => (
                      <button
                        key={dayIndex}
                        onClick={() => toggleHabit(habit.id, dayIndex)}
                        className="flex-shrink-0"
                      >
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">{day}</div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                              habit.completed[dayIndex]
                                ? `bg-gradient-to-br ${habit.color} shadow-lg`
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                          >
                            {habit.completed[dayIndex] && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              >
                                <Check className="w-5 h-5 text-white" />
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="lg:opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Habit Button */}
        {!showAddForm && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setShowAddForm(true)}
            className="mt-6 w-full py-4 border-2 border-dashed border-emerald-300 rounded-2xl text-emerald-600 font-medium hover:border-emerald-400 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Habit
          </motion.button>
        )}

        {/* Motivational Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <h3 className="text-2xl font-bold mb-2">Remember: Progress, Not Perfection</h3>
            <p className="text-emerald-50">
              It takes an average of 66 days to form a new habit. Be patient with yourself and 
              celebrate small wins. Every checkmark is a step toward a healthier you! 🌟
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
