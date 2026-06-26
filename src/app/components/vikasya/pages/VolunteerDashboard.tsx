import { motion } from "motion/react";
import { Clock, Users, BookOpen, Star, CalendarDays, ChevronRight, TrendingUp, Award, MessageSquare } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

const stats = [
  { label: "Hours This Month", value: "47", icon: Clock, color: "bg-sky-50 text-sky-600", change: "+12%" },
  { label: "People Supported", value: "8", icon: Users, color: "bg-emerald-50 text-emerald-600", change: "+3 new" },
  { label: "Skills Shared", value: "12", icon: BookOpen, color: "bg-violet-50 text-violet-600", change: "5 topics" },
  { label: "Avg. Rating", value: "4.9", icon: Star, color: "bg-amber-50 text-amber-600", change: "128 reviews" },
];

const sessions = [
  { name: "Kamala Devi", topic: "Smartphone Basics", time: "Today, 4:00 PM", org: "Ananda Home", avatar: "K", color: "bg-orange-100 text-orange-700" },
  { name: "Rohan & Kavya", topic: "English Conversation", time: "Tomorrow, 10:00 AM", org: "Udayan Orphanage", avatar: "R", color: "bg-blue-100 text-blue-700" },
  { name: "Shantabai Patil", topic: "Digital Banking", time: "Thu, 3:30 PM", org: "Seva Trust", avatar: "S", color: "bg-green-100 text-green-700" },
];

const matches = [
  { name: "Gopalan Nair, 81", need: "Needs companion for daily conversations", match: 97, org: "Silver Pines, Chennai", tags: ["Tamil", "Evening"] },
  { name: "Ananya, 12", need: "Wants to learn basic coding", match: 94, org: "Bal Sahyog, Delhi", tags: ["Hindi", "Weekends"] },
  { name: "Suresh Kumar, 68", need: "Help with WhatsApp and calling family", match: 91, org: "Vrudh Ashram, Pune", tags: ["Marathi", "Morning"] },
];

const activity = [
  { text: "Kamala Devi completed Module 2 of Smartphone Basics", time: "2 hrs ago", type: "achievement" },
  { text: "New support request matches your profile — Bal Sahyog, Delhi", time: "5 hrs ago", type: "match" },
  { text: "You earned the '10 Hours Badge' this week", time: "Yesterday", type: "badge" },
  { text: "Rohan scored 100% in English vocabulary quiz", time: "2 days ago", type: "achievement" },
];

export function VolunteerDashboard({ nav }: { nav: NavCtx }) {
  const user = (() => {
    try {
      const stored = localStorage.getItem("vikasya_user");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { name: "Arjun Mehta" };
  })();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good afternoon ☀️</p>
          <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-bold text-foreground mt-1">{user.name}</h1>
          <p className="text-muted-foreground mt-1 text-sm">You have <span className="text-primary font-semibold">3 sessions</span> this week. Keep it up!</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-2.5">
          <Award className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-xs text-amber-600 font-medium">Current Streak</p>
            <p className="font-[Plus_Jakarta_Sans] font-bold text-amber-700">14 Days</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-border"
          >
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="font-[Plus_Jakarta_Sans] text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {s.change}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" /> Upcoming Sessions
            </h2>
            <button onClick={() => nav.navigate("chat")} className="text-xs text-primary font-semibold hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center font-[Plus_Jakarta_Sans] font-bold text-sm flex-shrink-0`}>
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.topic} · {s.org}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-primary">{s.time}</p>
                  <button onClick={() => nav.navigate("chat")} className="text-xs text-muted-foreground hover:text-foreground mt-0.5 flex items-center gap-1 ml-auto">
                    <MessageSquare className="w-3 h-3" /> Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  a.type === "achievement" ? "bg-emerald-400" : a.type === "match" ? "bg-primary" : "bg-amber-400"
                }`} />
                <div>
                  <p className="text-xs text-foreground leading-relaxed">{a.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Matches */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground">Suggested Matches for You</h2>
          <button onClick={() => nav.navigate("matching")} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
            See all matches <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {matches.map((m) => (
            <div key={m.name} className="border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center font-semibold text-sky-700 text-sm">
                  {m.name.charAt(0)}
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-lg">{m.match}% match</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.need}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.org}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {m.tags.map(t => (
                  <span key={t} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-md">{t}</span>
                ))}
              </div>
              <button onClick={() => nav.navigate("matching")} className="w-full mt-3 bg-primary/10 text-primary text-xs font-semibold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
