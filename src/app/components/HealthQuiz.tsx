import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Activity,
  Apple,
  Moon,
  Smile,
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: { value: number; label: string; icon?: any }[];
  category: string;
}

export function HealthQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "How many days per week do you exercise for at least 30 minutes?",
      options: [
        { value: 0, label: "0-1 days", icon: Activity },
        { value: 1, label: "2-3 days", icon: Activity },
        { value: 2, label: "4-5 days", icon: Activity },
        { value: 3, label: "6-7 days", icon: Activity },
      ],
      category: "Physical Activity",
    },
    {
      id: 2,
      question: "How would you rate your daily nutrition?",
      options: [
        { value: 0, label: "Poor - mostly processed foods", icon: Apple },
        { value: 1, label: "Fair - some healthy choices", icon: Apple },
        { value: 2, label: "Good - balanced meals", icon: Apple },
        { value: 3, label: "Excellent - very nutritious", icon: Apple },
      ],
      category: "Nutrition",
    },
    {
      id: 3,
      question: "How many hours of sleep do you typically get per night?",
      options: [
        { value: 0, label: "Less than 5 hours", icon: Moon },
        { value: 1, label: "5-6 hours", icon: Moon },
        { value: 2, label: "7-8 hours", icon: Moon },
        { value: 3, label: "8+ hours", icon: Moon },
      ],
      category: "Sleep",
    },
    {
      id: 4,
      question: "How often do you experience stress or anxiety?",
      options: [
        { value: 0, label: "Very often - daily", icon: Smile },
        { value: 1, label: "Often - few times a week", icon: Smile },
        { value: 2, label: "Sometimes - weekly", icon: Smile },
        { value: 3, label: "Rarely - very low stress", icon: Smile },
      ],
      category: "Mental Health",
    },
    {
      id: 5,
      question: "How much water do you drink daily?",
      options: [
        { value: 0, label: "Less than 3 glasses", icon: Activity },
        { value: 1, label: "3-5 glasses", icon: Activity },
        { value: 2, label: "6-8 glasses", icon: Activity },
        { value: 3, label: "8+ glasses", icon: Activity },
      ],
      category: "Hydration",
    },
    {
      id: 6,
      question: "Do you practice any form of mindfulness or meditation?",
      options: [
        { value: 0, label: "Never", icon: Smile },
        { value: 1, label: "Rarely", icon: Smile },
        { value: 2, label: "Sometimes - weekly", icon: Smile },
        { value: 3, label: "Daily practice", icon: Smile },
      ],
      category: "Mental Wellness",
    },
    {
      id: 7,
      question: "How would you describe your overall energy levels?",
      options: [
        { value: 0, label: "Very low - always tired", icon: TrendingUp },
        { value: 1, label: "Below average", icon: TrendingUp },
        { value: 2, label: "Good - generally energetic", icon: TrendingUp },
        { value: 3, label: "Excellent - very high energy", icon: TrendingUp },
      ],
      category: "Energy",
    },
  ];

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const calculateHealthAge = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 3;
    const scorePercentage = (totalScore / maxScore) * 100;

    // Health age calculation (simplified)
    const actualAge = 30; // This would come from user input
    let healthAge = actualAge;

    if (scorePercentage >= 85) healthAge = actualAge - 10;
    else if (scorePercentage >= 70) healthAge = actualAge - 5;
    else if (scorePercentage >= 50) healthAge = actualAge;
    else if (scorePercentage >= 30) healthAge = actualAge + 5;
    else healthAge = actualAge + 10;

    return { healthAge, actualAge, scorePercentage: Math.round(scorePercentage) };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-lg mb-4">
            <Heart className="w-5 h-5 text-emerald-600 fill-emerald-500" />
            <span className="text-sm font-medium text-gray-700">Health Assessment</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            What's Your Health Age?
          </h1>
          <p className="text-gray-600 text-lg">
            Answer these questions to discover your health age
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-emerald-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="mb-8 p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100"
              >
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                    {questions[currentQuestion].category}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {questions[currentQuestion].question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = answers[currentQuestion] === option.value;
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 shadow-lg"
                            : "border-gray-200 bg-white hover:border-emerald-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-500"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 bg-white rounded-full"
                              />
                            )}
                          </div>
                          <span
                            className={`flex-grow ${
                              isSelected
                                ? "text-gray-900 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  className="flex-1 px-6 py-4 bg-white/70 text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2 justify-center">
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                  </span>
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === undefined}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2 justify-center">
                    {currentQuestion === questions.length - 1
                      ? "See Results"
                      : "Next"}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Results Card */}
              <div className="p-8 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-3xl shadow-2xl text-white text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                >
                  <Heart className="w-10 h-10 fill-white" />
                </motion.div>

                <h2 className="text-3xl font-bold mb-2">Your Health Age</h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-7xl font-bold mb-2"
                >
                  {calculateHealthAge().healthAge}
                </motion.div>
                <p className="text-emerald-100 text-lg mb-6">
                  Your actual age: {calculateHealthAge().actualAge}
                </p>

                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">
                    Health Score: {calculateHealthAge().scorePercentage}%
                  </span>
                </div>
              </div>

              {/* Recommendations */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        What You're Doing Well
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {Object.entries(answers)
                          .filter(([_, value]) => value >= 2)
                          .slice(0, 3)
                          .map(([key]) => (
                            <li key={key}>
                              ✓ {questions[parseInt(key)].category}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Areas to Improve
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {Object.entries(answers)
                          .filter(([_, value]) => value < 2)
                          .slice(0, 3)
                          .map(([key]) => (
                            <li key={key}>
                              • {questions[parseInt(key)].category}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalized Tips */}
              <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Personalized Health Tips
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Activity className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Increase Physical Activity
                      </h4>
                      <p className="text-sm text-gray-600">
                        Aim for at least 150 minutes of moderate exercise per week
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <Moon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Optimize Your Sleep
                      </h4>
                      <p className="text-sm text-gray-600">
                        Establish a consistent sleep schedule for 7-9 hours nightly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Apple className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Improve Nutrition
                      </h4>
                      <p className="text-sm text-gray-600">
                        Focus on whole foods, fruits, vegetables, and lean proteins
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetQuiz}
                  className="flex-1 px-6 py-4 bg-white/70 text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-gray-300"
                >
                  Retake Quiz
                </button>
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                  Start Your Health Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
