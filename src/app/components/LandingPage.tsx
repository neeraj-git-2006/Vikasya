import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Heart,
  Activity,
  Brain,
  Apple,
  Moon,
  Smile,
  ArrowRight,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function LandingPage() {
  const stats = [
    { value: "10K+", label: "Active Users", icon: Activity },
    { value: "85%", label: "Improved Wellness", icon: TrendingUp },
    { value: "Daily", label: "Health Insights", icon: Calendar },
  ];

  const features = [
    {
      icon: Activity,
      title: "Track Your Activity",
      description: "Monitor steps, exercise, and daily movement to stay active",
      color: "emerald",
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Track your mood and practice mindfulness for better mental health",
      color: "cyan",
    },
    {
      icon: Apple,
      title: "Nutrition Insights",
      description: "Make healthier food choices with personalized nutrition tips",
      color: "green",
    },
    {
      icon: Moon,
      title: "Sleep Quality",
      description: "Improve your rest with sleep tracking and optimization tips",
      color: "blue",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
              >
                <Heart className="w-5 h-5 text-emerald-600 fill-emerald-500" />
                <span className="text-sm font-medium text-gray-700">World Health Day 2026</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Your Health,
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Your Daily Choices
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Small daily decisions shape your health journey. Start tracking, learn insights, and
                build habits that transform your well-being.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/dashboard"
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-200 transition-all hover:scale-105"
                >
                  <span className="flex items-center gap-2 justify-center">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  to="/quiz"
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all border border-emerald-200 hover:border-emerald-400 hover:scale-105"
                >
                  Take Health Quiz
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1606372952197-19697804e569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRpdmVyc2UlMjBwZW9wbGUlMjB3ZWxsbmVzcyUyMHlvZ2F8ZW58MXx8fHwxNzc1NTM1NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Diverse people practicing wellness and yoga"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">12,847</div>
                    <div className="text-sm text-gray-600">Steps Today</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-cyan-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-100 rounded-xl">
                    <Heart className="w-6 h-6 text-cyan-600 fill-cyan-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">92</div>
                    <div className="text-sm text-gray-600">Health Score</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Better Health
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track, analyze, and improve your health with our comprehensive wellness tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="h-full p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About World Health Day */}
      <section id="about" className="py-20 bg-gradient-to-br from-emerald-600 to-cyan-600 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">April 7, 2026</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                About World Health Day
              </h2>
              <p className="text-emerald-50 text-lg leading-relaxed mb-6">
                Every year on April 7, World Health Day celebrates the founding of the World Health
                Organization and draws attention to global health priorities. This year's theme
                focuses on empowering individuals to make healthier daily choices.
              </p>
              <p className="text-emerald-50 text-lg leading-relaxed">
                Your daily decisions matter. From what you eat to how you move, sleep, and manage
                stress—every choice shapes your health. Join us in building healthier habits, one
                day at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <Smile className="w-8 h-8 mb-3" />
                  <h4 className="font-semibold mb-2">Mental Wellness</h4>
                  <p className="text-sm text-emerald-50">
                    Practice mindfulness and emotional well-being
                  </p>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <Apple className="w-8 h-8 mb-3" />
                  <h4 className="font-semibold mb-2">Nutrition</h4>
                  <p className="text-sm text-emerald-50">
                    Make informed food choices daily
                  </p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <Activity className="w-8 h-8 mb-3" />
                  <h4 className="font-semibold mb-2">Active Living</h4>
                  <p className="text-sm text-emerald-50">
                    Move your body every day
                  </p>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <Moon className="w-8 h-8 mb-3" />
                  <h4 className="font-semibold mb-2">Quality Sleep</h4>
                  <p className="text-sm text-emerald-50">
                    Rest and recover properly
                  </p>
                </div>
              </div>
            </motion.div>
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
          <div className="p-12 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100">
            <Target className="w-16 h-16 mx-auto mb-6 text-emerald-600" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your wellness journey today. Track your progress, build healthy habits, and
              discover your health potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <span className="flex items-center gap-2 justify-center">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/tips"
                className="px-8 py-4 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all border border-emerald-200 hover:border-emerald-400 hover:scale-105"
              >
                Explore Tips & Resources
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
