import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, CheckCircle, Clock, Award, Lock, PlayCircle, ChevronRight, TrendingUp, Star } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

const paths = [
  {
    id: "digital",
    title: "Digital Independence",
    icon: "💻",
    color: "bg-sky-50 border-sky-200 text-sky-700",
    activeColor: "bg-sky-500",
    progress: 65,
    enrolled: 14,
    modules: 8,
    completed: 5,
  },
  {
    id: "communication",
    title: "Communication Skills",
    icon: "🗣️",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    activeColor: "bg-emerald-500",
    progress: 40,
    enrolled: 22,
    modules: 6,
    completed: 2,
  },
  {
    id: "career",
    title: "Career Readiness",
    icon: "🚀",
    color: "bg-violet-50 border-violet-200 text-violet-700",
    activeColor: "bg-violet-500",
    progress: 0,
    enrolled: 8,
    modules: 10,
    completed: 0,
    locked: true,
  },
  {
    id: "life",
    title: "Life Skills",
    icon: "🌱",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    activeColor: "bg-amber-500",
    progress: 80,
    enrolled: 18,
    modules: 5,
    completed: 4,
  },
];

const digitalModules = [
  { title: "Introduction to Smartphones", duration: "20 min", status: "done", score: 95 },
  { title: "Making & Receiving Calls", duration: "15 min", status: "done", score: 88 },
  { title: "SMS and Messaging Apps", duration: "18 min", status: "done", score: 92 },
  { title: "Using the Internet Safely", duration: "25 min", status: "done", score: 85 },
  { title: "WhatsApp — Basics", duration: "22 min", status: "done", score: 90 },
  { title: "WhatsApp — Groups & Calls", duration: "20 min", status: "current", score: null },
  { title: "UPI & Digital Payments", duration: "30 min", status: "locked", score: null },
  { title: "Video Calls & Online Safety", duration: "28 min", status: "locked", score: null },
];

const achievements = [
  { title: "Fast Learner", desc: "Completed 3 modules in one day", icon: "⚡", earned: true },
  { title: "Perfect Score", desc: "100% on any quiz", icon: "🎯", earned: true },
  { title: "Week Warrior", desc: "7-day learning streak", icon: "🔥", earned: true },
  { title: "Digital Graduate", desc: "Complete Digital Independence path", icon: "🎓", earned: false },
  { title: "Mentor Approved", desc: "Get 5-star feedback from volunteer", icon: "⭐", earned: true },
  { title: "Community Hero", desc: "Help 3 peers with their learning", icon: "🦸", earned: false },
];

export function SkillProgress({ nav }: { nav: NavCtx }) {
  const [activePath, setActivePath] = useState("digital");
  const active = paths.find(p => p.id === activePath)!;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-bold text-foreground">Skill Development Journey</h1>
        <p className="text-muted-foreground mt-1 text-sm">Track your progress across all learning paths</p>
      </div>

      {/* Path selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {paths.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => !p.locked && setActivePath(p.id)}
            className={`text-left p-5 rounded-2xl border-2 transition-all ${
              p.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${activePath === p.id ? "border-primary bg-sky-50" : `${p.color} border-opacity-60`}`}
          >
            <div className="text-2xl mb-3">{p.icon}</div>
            <p className="font-[Plus_Jakarta_Sans] font-semibold text-foreground text-sm mb-2">{p.title}</p>
            {p.locked ? (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="w-3.5 h-3.5" /> Unlock after Communication
              </div>
            ) : (
              <>
                <div className="h-1.5 bg-white rounded-full overflow-hidden mb-1.5">
                  <div className={`h-full rounded-full ${p.activeColor}`} style={{ width: `${p.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{p.completed}/{p.modules} modules · {p.progress}%</p>
              </>
            )}
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Modules */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground">{active.title}</h2>
                <p className="text-sm text-muted-foreground">{active.completed} of {active.modules} modules completed</p>
              </div>
              <div className="text-right">
                <p className="font-[Plus_Jakarta_Sans] text-2xl font-bold text-primary">{active.progress}%</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-muted rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${active.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            <div className="space-y-3">
              {digitalModules.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                    m.status === "current" ? "bg-sky-50 border border-primary/20" :
                    m.status === "done" ? "hover:bg-muted/30" : "opacity-50"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    m.status === "done" ? "bg-emerald-100 text-emerald-600" :
                    m.status === "current" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {m.status === "done" ? <CheckCircle className="w-4 h-4" /> :
                     m.status === "current" ? <PlayCircle className="w-4 h-4" /> :
                     <Lock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${m.status === "locked" ? "text-muted-foreground" : "text-foreground"}`}>{m.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {m.duration}
                    </p>
                  </div>
                  {m.score !== null && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{m.score}%</span>
                  )}
                  {m.status === "current" && (
                    <button onClick={() => nav.navigate("skills")} className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1">
                      Continue <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Stats + Achievements */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Learning Stats
            </h2>
            <div className="space-y-3">
              {[
                { label: "Total Hours", value: "18.5 hrs" },
                { label: "Quizzes Completed", value: "12 / 15" },
                { label: "Average Score", value: "90%" },
                { label: "Current Streak", value: "8 days 🔥" },
                { label: "Members Helped", value: "3 peers" },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="text-sm font-semibold text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((a) => (
                <div key={a.title} className={`flex items-center gap-3 ${!a.earned && "opacity-40"}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${a.earned ? "bg-amber-50" : "bg-muted"}`}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  {a.earned && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
