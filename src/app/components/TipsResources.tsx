import { motion } from "motion/react";
import { useState } from "react";
import {
  Brain,
  Activity,
  Apple,
  Heart,
  Moon,
  Smile,
  Lightbulb,
  BookOpen,
  Video,
  Headphones,
  Download,
  ExternalLink,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TipsResources() {
  const [activeTab, setActiveTab] = useState<"tips" | "resources">("tips");

  const tips = [
    {
      category: "Mental Health",
      icon: Brain,
      color: "purple",
      image: "https://images.unsplash.com/photo-1764192114257-ae9ecf97eb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3MlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzU1MjM4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Practice Mindful Breathing",
      description:
        "Take 5 minutes daily to focus on your breath. This simple practice can reduce stress and improve mental clarity.",
      tips: [
        "Find a quiet space and sit comfortably",
        "Close your eyes and breathe naturally",
        "Focus on the sensation of breathing",
        "When your mind wanders, gently return focus",
      ],
    },
    {
      category: "Fitness",
      icon: Activity,
      color: "orange",
      image: "https://images.unsplash.com/photo-1773681823208-7f3657c0688f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXhlcmNpc2UlMjBydW5uaW5nfGVufDF8fHx8MTc3NTUzNTY2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Move More Throughout the Day",
      description:
        "Small bursts of activity add up. Aim for 30 minutes of moderate exercise daily to boost energy and health.",
      tips: [
        "Take the stairs instead of the elevator",
        "Walk during phone calls or breaks",
        "Do stretches every hour while sitting",
        "Try a 10-minute morning workout routine",
      ],
    },
    {
      category: "Nutrition",
      icon: Apple,
      color: "green",
      image: "https://images.unsplash.com/photo-1720287333640-b127188999e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbGlmZXN0eWxlJTIwdmVnZXRhYmxlcyUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NzU1MzU2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Eat the Rainbow",
      description:
        "Colorful fruits and vegetables provide essential nutrients. Aim for at least 5 servings of different colors daily.",
      tips: [
        "Plan meals around vegetables, not meat",
        "Keep healthy snacks readily available",
        "Drink water before each meal",
        "Prepare meals at home when possible",
      ],
    },
    {
      category: "Sleep",
      icon: Moon,
      color: "blue",
      image: "https://images.unsplash.com/photo-1758273239813-cecda76c6c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlcCUyMHJlc3QlMjBwZWFjZWZ1bCUyMGJlZHJvb218ZW58MXx8fHwxNzc1NTM1NjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Create a Sleep Sanctuary",
      description:
        "Quality sleep is essential for health. Establish a relaxing bedtime routine and optimize your sleep environment.",
      tips: [
        "Keep your bedroom cool and dark",
        "Avoid screens 1 hour before bed",
        "Maintain a consistent sleep schedule",
        "Try relaxation techniques like reading",
      ],
    },
    {
      category: "Wellness",
      icon: Heart,
      color: "rose",
      image: "https://images.unsplash.com/photo-1642339800099-921df1a0a958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYnJlYWtmYXN0JTIwc21vb3RoaWUlMjBib3dsfGVufDF8fHx8MTc3NTUzNTY2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Start Your Day Right",
      description:
        "Morning routines set the tone for your day. Incorporate healthy habits to boost mood and productivity.",
      tips: [
        "Drink a glass of water upon waking",
        "Eat a nutritious breakfast within an hour",
        "Do 5 minutes of stretching or yoga",
        "Practice gratitude or positive affirmations",
      ],
    },
    {
      category: "Mindfulness",
      icon: Smile,
      color: "cyan",
      image: "https://images.unsplash.com/photo-1606372952197-19697804e569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRpdmVyc2UlMjBwZW9wbGUlMjB3ZWxsbmVzcyUyMHlvZ2F8ZW58MXx8fHwxNzc1NTM1NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Connect with Others",
      description:
        "Social connections are vital for mental health. Make time to nurture relationships and build community.",
      tips: [
        "Schedule regular catch-ups with friends",
        "Join a group or club with shared interests",
        "Volunteer in your community",
        "Practice active listening in conversations",
      ],
    },
  ];

  const resources = [
    {
      type: "Guide",
      icon: BookOpen,
      title: "Complete Guide to Mindful Eating",
      description: "Learn how to develop a healthier relationship with food",
      color: "emerald",
      format: "PDF",
    },
    {
      type: "Video Course",
      icon: Video,
      title: "30-Day Fitness Challenge",
      description: "Progressive workouts designed for all fitness levels",
      color: "orange",
      format: "Video",
    },
    {
      type: "Meditation",
      icon: Headphones,
      title: "Guided Meditation Series",
      description: "10-minute daily meditations for stress reduction",
      color: "purple",
      format: "Audio",
    },
    {
      type: "Worksheet",
      icon: Download,
      title: "Sleep Hygiene Tracker",
      description: "Track and optimize your sleep patterns",
      color: "blue",
      format: "PDF",
    },
    {
      type: "Guide",
      icon: BookOpen,
      title: "Nutrition Basics for Beginners",
      description: "Essential nutrition information and meal planning tips",
      color: "green",
      format: "PDF",
    },
    {
      type: "Workshop",
      icon: Lightbulb,
      title: "Stress Management Toolkit",
      description: "Practical strategies for managing daily stress",
      color: "cyan",
      format: "Interactive",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Tips & Resources
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover expert advice and resources to support your wellness journey
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveTab("tips")}
            className={`px-8 py-3 rounded-full transition-all ${
              activeTab === "tips"
                ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-xl"
                : "bg-white/70 text-gray-700 hover:bg-white border border-gray-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Well-being Tips
            </span>
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-8 py-3 rounded-full transition-all ${
              activeTab === "resources"
                ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-xl"
                : "bg-white/70 text-gray-700 hover:bg-white border border-gray-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Resources
            </span>
          </button>
        </motion.div>

        {/* Tips Section */}
        {activeTab === "tips" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 bg-${tip.color}-500 text-white rounded-full text-sm font-medium`}
                      >
                        <Icon className="w-4 h-4" />
                        {tip.category}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {tip.description}
                    </p>

                    {/* Tips List */}
                    <div className="space-y-2">
                      {tip.tips.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-${tip.color}-500 mt-1.5 flex-shrink-0`}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Resources Section */}
        {activeTab === "resources" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 bg-${resource.color}-100 rounded-xl group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 text-${resource.color}-600`} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-medium text-${resource.color}-600 uppercase tracking-wide`}
                        >
                          {resource.type}
                        </span>
                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                          {resource.format}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {resource.description}
                  </p>

                  <button
                    className={`w-full px-4 py-3 bg-gradient-to-r from-${resource.color}-500 to-${resource.color}-600 text-white rounded-xl hover:shadow-lg transition-all group-hover:scale-105`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Access Resource
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-3xl shadow-2xl text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Heart className="w-8 h-8 fill-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Need Personalized Guidance?
            </h2>
            <p className="text-emerald-50 text-lg mb-8 leading-relaxed">
              Our health experts are here to help you create a customized wellness plan
              tailored to your unique needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105">
                <span className="flex items-center gap-2 justify-center">
                  Talk to an Expert
                  <ExternalLink className="w-5 h-5" />
                </span>
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-white/50 hover:bg-white/30 transition-all hover:scale-105">
                Browse More Resources
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Mental Health", icon: Brain, count: "15+ guides" },
            { label: "Fitness", icon: Activity, count: "20+ videos" },
            { label: "Nutrition", icon: Apple, count: "25+ recipes" },
            { label: "Wellness", icon: Heart, count: "30+ articles" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all cursor-pointer"
            >
              <item.icon className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <div className="font-semibold text-gray-900 mb-1">{item.label}</div>
              <div className="text-xs text-gray-600">{item.count}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
