import { motion } from "motion/react";
import { BookOpen, Heart, MessageSquare, Award, ChevronRight, CheckCircle, Clock, Star, PlayCircle } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

const learningPath = [
  { title: "Computer Basics", status: "done", progress: 100 },
  { title: "Using the Internet", status: "done", progress: 100 },
  { title: "WhatsApp & Calling", status: "current", progress: 65 },
  { title: "Digital Payments", status: "locked", progress: 0 },
  { title: "Digital Independence", status: "locked", progress: 0 },
];

const modules = [
  { title: "Making Video Calls", duration: "15 min", done: true },
  { title: "Sending Voice Messages", duration: "12 min", done: true },
  { title: "Creating WhatsApp Groups", duration: "18 min", done: false, current: true },
  { title: "Sharing Photos & Videos", duration: "20 min", done: false },
  { title: "Privacy & Safety Settings", duration: "25 min", done: false },
];

const companion = {
  name: "Priya Sharma",
  role: "Volunteer, Software Engineer",
  nextSession: "Today at 4:00 PM",
  sessions: 12,
  rating: 5,
  avatar: "P",
  streak: 8,
};

const badges = [
  { title: "First Lesson", icon: "🌱", earned: true },
  { title: "Week Streak", icon: "🔥", earned: true },
  { title: "Digital Beginner", icon: "💻", earned: true },
  { title: "Voice Call Pro", icon: "📱", earned: false },
  { title: "Payment Ready", icon: "💳", earned: false },
];

export function BeneficiaryDashboard({ nav }: { nav: NavCtx }) {
  const user = (() => {
    try {
      const stored = localStorage.getItem("vikasya_user");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { name: "Kamala Devi" };
  })();

  const completedModules = modules.filter(m => m.done).length;
  const totalModules = modules.length;
  const progressPct = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground">Welcome back 🙏</p>
        <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-bold text-foreground mt-1">{user.name}</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          You are <span className="text-primary font-semibold">65% through</span> WhatsApp & Calling. Keep going!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learning Path */}
        <div className="lg:col-span-2 space-y-6">
          {/* Path visualization */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Your Digital Journey
            </h2>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-5">
                {learningPath.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex items-center gap-4"
                  >
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === "done" ? "bg-emerald-500 text-white" :
                      step.status === "current" ? "bg-primary text-white ring-4 ring-primary/20" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {step.status === "done" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : step.status === "current" ? (
                        <BookOpen className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-semibold ${step.status === "locked" ? "text-muted-foreground" : "text-foreground"}`}>
                          {step.title}
                        </p>
                        <span className="text-xs text-muted-foreground">{step.progress}%</span>
                      </div>
                      {step.progress > 0 && (
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${step.status === "done" ? "bg-emerald-500" : "bg-primary"}`}
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Current module list */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground">
                WhatsApp & Calling — Modules
              </h2>
              <span className="text-xs text-muted-foreground">{completedModules}/{totalModules} done</span>
            </div>
            <div className="space-y-3">
              {modules.map((m) => (
                <div
                  key={m.title}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    m.current ? "bg-sky-50 border border-primary/20" : "hover:bg-muted/30"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    m.done ? "bg-emerald-100 text-emerald-600" : m.current ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {m.done ? <CheckCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${m.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{m.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {m.duration}</p>
                  </div>
                  {m.current && (
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded-lg font-medium">Continue</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Companion card */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" /> My Companion
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-[Plus_Jakarta_Sans] font-bold">
                {companion.avatar}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{companion.name}</p>
                <p className="text-xs text-muted-foreground">{companion.role}</p>
                <div className="flex mt-0.5">
                  {Array.from({ length: companion.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-sky-50 rounded-xl p-3 mb-4">
              <p className="text-xs text-muted-foreground">Next Session</p>
              <p className="text-sm font-semibold text-primary">{companion.nextSession}</p>
            </div>
            <div className="flex gap-3 text-center text-xs">
              <div className="flex-1 bg-muted rounded-xl py-2">
                <p className="font-bold text-foreground text-base">{companion.sessions}</p>
                <p className="text-muted-foreground">Sessions</p>
              </div>
              <div className="flex-1 bg-muted rounded-xl py-2">
                <p className="font-bold text-foreground text-base">{companion.streak}</p>
                <p className="text-muted-foreground">Day streak</p>
              </div>
            </div>
            <button onClick={() => nav.navigate("chat")} className="w-full mt-4 bg-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" /> Send Message
            </button>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> My Badges
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {badges.map((b) => (
                <div key={b.title} className={`flex flex-col items-center gap-1 ${!b.earned && "opacity-30"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${b.earned ? "bg-amber-50" : "bg-muted"}`}>
                    {b.icon}
                  </div>
                  <p className="text-xs text-muted-foreground text-center leading-tight">{b.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
