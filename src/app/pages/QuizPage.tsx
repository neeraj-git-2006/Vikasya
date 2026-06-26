import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Award, TrendingUp, AlertCircle, Heart } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: { text: string; score: number }[];
}

export function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "How many hours of sleep do you get on average per night?",
      options: [
        { text: "Less than 5 hours", score: 0 },
        { text: "5-6 hours", score: 5 },
        { text: "7-8 hours", score: 10 },
        { text: "More than 8 hours", score: 8 },
      ],
    },
    {
      id: 2,
      question: "How often do you engage in physical activity or exercise?",
      options: [
        { text: "Rarely or never", score: 0 },
        { text: "1-2 times per week", score: 5 },
        { text: "3-4 times per week", score: 8 },
        { text: "5+ times per week", score: 10 },
      ],
    },
    {
      id: 3,
      question: "How would you describe your daily diet?",
      options: [
        { text: "Mostly processed/fast food", score: 0 },
        { text: "Mix of healthy and unhealthy", score: 5 },
        { text: "Balanced with occasional treats", score: 8 },
        { text: "Very healthy and balanced", score: 10 },
      ],
    },
    {
      id: 4,
      question: "How much water do you drink daily?",
      options: [
        { text: "Less than 4 glasses", score: 0 },
        { text: "4-6 glasses", score: 5 },
        { text: "6-8 glasses", score: 8 },
        { text: "More than 8 glasses", score: 10 },
      ],
    },
    {
      id: 5,
      question: "How do you manage stress in your daily life?",
      options: [
        { text: "I don't manage it well", score: 0 },
        { text: "I try but struggle", score: 4 },
        { text: "I have some coping strategies", score: 7 },
        { text: "I manage stress effectively", score: 10 },
      ],
    },
    {
      id: 6,
      question: "How often do you take breaks from screens (phone, computer, TV)?",
      options: [
        { text: "Rarely", score: 0 },
        { text: "Occasionally", score: 4 },
        { text: "Regularly throughout the day", score: 8 },
        { text: "I practice digital detox daily", score: 10 },
      ],
    },
    {
      id: 7,
      question: "How connected do you feel to friends and family?",
      options: [
        { text: "Very isolated", score: 0 },
        { text: "Somewhat connected", score: 5 },
        { text: "Well connected", score: 8 },
        { text: "Very connected with strong support", score: 10 },
      ],
    },
    {
      id: 8,
      question: "Do you have regular health check-ups?",
      options: [
        { text: "Never", score: 0 },
        { text: "Only when sick", score: 3 },
        { text: "Every few years", score: 6 },
        { text: "Annual check-ups", score: 10 },
      ],
    },
  ];

  const selectAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 10;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    // Calculate health age based on score
    const baseAge = 30; // Assumed biological age
    const ageDifference = Math.round((100 - percentage) / 5);
    const healthAge = baseAge + ageDifference;

    return { totalScore, percentage, healthAge, baseAge };
  };

  const getHealthCategory = (percentage: number) => {
    if (percentage >= 80) return { label: "Excellent", color: "from-green-500 to-emerald-500", icon: "🌟" };
    if (percentage >= 60) return { label: "Good", color: "from-blue-500 to-cyan-500", icon: "👍" };
    if (percentage >= 40) return { label: "Fair", color: "from-yellow-500 to-orange-500", icon: "⚠️" };
    return { label: "Needs Improvement", color: "from-red-500 to-pink-500", icon: "🔔" };
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const results = calculateResults();
    const category = getHealthCategory(results.percentage);

    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-emerald-100"
          >
            {/* Results Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Health Assessment</h2>
              <p className="text-gray-600">Here's what we discovered about your wellness journey</p>
            </div>

            {/* Health Age Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`relative bg-gradient-to-br ${category.color} rounded-3xl p-8 text-white mb-8 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-2">Your Health Age</h3>
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="text-6xl font-bold">{results.healthAge}</div>
                  <div className="text-xl">years</div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  {results.healthAge < results.baseAge ? (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      <span>
                        {results.baseAge - results.healthAge} years younger than your biological age!
                      </span>
                    </>
                  ) : results.healthAge > results.baseAge ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>
                        Room for improvement to match your biological age
                      </span>
                    </>
                  ) : (
                    <span>Matches your biological age</span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Score Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-emerald-50 rounded-2xl p-6"
              >
                <h4 className="text-sm font-medium text-emerald-700 mb-2">Overall Score</h4>
                <div className="text-4xl font-bold text-emerald-900 mb-2">{results.percentage}%</div>
                <div className="text-sm text-emerald-600">{category.label} Health Status</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-blue-50 rounded-2xl p-6"
              >
                <h4 className="text-sm font-medium text-blue-700 mb-2">Total Points</h4>
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  {results.totalScore}/{questions.length * 10}
                </div>
                <div className="text-sm text-blue-600">Based on {questions.length} health factors</div>
              </motion.div>
            </div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8"
            >
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-600" />
                Personalized Recommendations
              </h4>
              <ul className="space-y-3">
                {results.percentage < 100 && (
                  <>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Track your daily habits to identify areas for improvement</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Focus on one habit at a time for sustainable change</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>Explore our tips section for practical wellness advice</span>
                    </li>
                  </>
                )}
                {results.percentage >= 80 && (
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-600 mt-1">✓</span>
                    <span>Maintain your excellent habits and inspire others!</span>
                  </li>
                )}
              </ul>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={restartQuiz}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="flex-1 px-6 py-3 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-all"
              >
                View Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">What's Your Health Age?</h1>
          <p className="text-gray-600">Answer 8 quick questions to discover your wellness score</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-emerald-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
            ></motion.div>
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-emerald-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => selectAnswer(option.score)}
                  className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
                    answers[currentQuestion] === option.score
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-lg"
                      : "bg-white hover:bg-emerald-50 text-gray-800 border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        answers[currentQuestion] === option.score
                          ? "border-white bg-white"
                          : "border-gray-300"
                      }`}
                    >
                      {answers[currentQuestion] === option.score && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-emerald-500 rounded-full"
                        ></motion.div>
                      )}
                    </div>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between mt-8"
        >
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentQuestion === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={answers[currentQuestion] === undefined}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              answers[currentQuestion] === undefined
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg"
            }`}
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
