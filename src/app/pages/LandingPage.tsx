import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Heart, Activity, Brain, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function LandingPage() {
  const stats = [
    { label: "Daily Choices", value: "100+", icon: Activity },
    { label: "Health Impact", value: "365 Days", icon: Heart },
    { label: "Better Habits", value: "Transform", icon: Brain },
  ];

  const features = [
    {
      title: "Track Your Journey",
      description: "Monitor daily activities, sleep, hydration, and mood in one beautiful dashboard.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Build Better Habits",
      description: "Create and maintain healthy routines with our interactive habit tracker.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Discover Your Health Age",
      description: "Take our interactive quiz to understand your wellness journey better.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                World Health Day 2026
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Your Health,
                </span>
                <br />
                <span className="text-gray-800">Your Daily Choices</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Small daily decisions create lasting change. Discover how your everyday choices
                shape your health and wellbeing with our interactive tools and insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-medium shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/quiz">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-full font-medium hover:bg-emerald-50 transition-all"
                  >
                    Take Health Quiz
                  </motion.button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="font-bold text-2xl text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1767611118479-3f3a8704c8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjB5b2dhfGVufDF8fHx8MTc3NTUzNTE4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Wellness and meditation"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Health Score</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      85/100
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Everything You Need for a Healthier Life
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to help you understand and improve your daily health choices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About World Health Day */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1617293378985-d7fae23773b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwZml0bmVzcyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3NTUzNTE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Diverse people exercising"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                About World Health Day
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Celebrated annually on April 7th, World Health Day is a global health awareness day
                that brings attention to important health issues affecting people worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                This year's theme, <span className="font-bold text-emerald-600">"Your Health, Your Daily Choices"</span>,
                emphasizes the power of small, everyday decisions in shaping our long-term wellbeing.
                Every choice matters—from what you eat to how you move, sleep, and manage stress.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Raise Awareness</h4>
                    <p className="text-gray-600">Understanding how daily choices impact long-term health</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Empower Action</h4>
                    <p className="text-gray-600">Tools and resources to make healthier decisions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Build Community</h4>
                    <p className="text-gray-600">Global movement towards better health for all</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-12 text-center overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Start Making Better Choices Today
              </h2>
              <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
                Join thousands of people taking control of their health, one choice at a time.
                Your journey to wellness begins now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-emerald-600 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    View Your Dashboard
                  </motion.button>
                </Link>
                <Link to="/habits">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white rounded-full font-bold hover:bg-white/20 transition-all"
                  >
                    Track Your Habits
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
