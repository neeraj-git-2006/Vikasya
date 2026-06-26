import { motion } from "motion/react";
import { Users, BookOpen, Clock, TrendingUp, Plus, ChevronRight, CheckCircle, AlertCircle, Building2, BarChart3 } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

const stats = [
  { label: "Total Members", value: "68", icon: Users, color: "text-sky-600 bg-sky-50", change: "+5 this month" },
  { label: "Active Volunteers", value: "24", icon: Users, color: "text-violet-600 bg-violet-50", change: "4 new joined" },
  { label: "Active Programs", value: "7", icon: BookOpen, color: "text-emerald-600 bg-emerald-50", change: "2 enrolling" },
  { label: "Hours Contributed", value: "342", icon: Clock, color: "text-amber-600 bg-amber-50", change: "this month" },
];

const programs = [
  { title: "Digital Literacy for Seniors", members: 14, volunteers: 6, status: "active", progress: 68, color: "bg-sky-50 border-sky-200" },
  { title: "English Speaking for Children", members: 22, volunteers: 8, status: "active", progress: 45, color: "bg-emerald-50 border-emerald-200" },
  { title: "Life Skills Workshop", members: 18, volunteers: 5, status: "active", progress: 82, color: "bg-violet-50 border-violet-200" },
  { title: "Financial Literacy Basics", members: 12, volunteers: 4, status: "enrolling", progress: 10, color: "bg-amber-50 border-amber-200" },
];

const volunteers = [
  { name: "Arjun Mehta", skills: "English, Tech", hours: 47, rating: 4.9, status: "active" },
  { name: "Dr. Lakshmi Rao", skills: "Health, Communication", hours: 38, rating: 5.0, status: "active" },
  { name: "Rahul Singh", skills: "Finance, Life Skills", hours: 29, rating: 4.7, status: "active" },
  { name: "Priya Nair", skills: "Digital, Art", hours: 22, rating: 4.8, status: "active" },
  { name: "Keerthi Reddy", skills: "Yoga, Wellness", hours: 18, rating: 4.9, status: "on leave" },
];

const requests = [
  { member: "Gopalan Nair, 81", type: "Companion Support", urgency: "high", date: "Today" },
  { member: "3 children (Group)", type: "Coding for Beginners", urgency: "medium", date: "Yesterday" },
  { member: "Sunita Sharma, 72", type: "Digital Banking Help", urgency: "low", date: "2 days ago" },
];

const urgencyColor = { high: "bg-rose-100 text-rose-700", medium: "bg-amber-100 text-amber-700", low: "bg-sky-100 text-sky-700" };

export function OrgDashboard({ nav }: { nav: NavCtx }) {
  const user = (() => {
    try {
      const stored = localStorage.getItem("vikasya_user");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { name: "Grace Foundation", org: "Grace Foundation" };
  })();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Organization Dashboard</p>
          <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-bold text-foreground mt-1">{user.org || user.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Registered NGO · Member since Jan 2024</p>
        </div>
        <button onClick={() => nav.navigate("support")} className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-sky-100">
          <Plus className="w-4 h-4" /> Post New Requirement
        </button>
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
        {/* Programs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground">Active Programs</h2>
              <button onClick={() => nav.navigate("skills")} className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                Manage all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-4">
              {programs.map((p) => (
                <div key={p.title} className={`border rounded-xl p-4 ${p.color}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {p.members} members · {p.volunteers} volunteers
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                      p.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/60 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{p.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer roster */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground">Volunteer Roster</h2>
              <button onClick={() => nav.navigate("matching")} className="text-xs text-primary font-semibold hover:underline">Find more</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left pb-3 font-semibold">Name</th>
                    <th className="text-left pb-3 font-semibold">Skills</th>
                    <th className="text-center pb-3 font-semibold">Hours</th>
                    <th className="text-center pb-3 font-semibold">Rating</th>
                    <th className="text-center pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {volunteers.map((v) => (
                    <tr key={v.name} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold">
                            {v.name.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground text-xs">{v.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{v.skills}</td>
                      <td className="py-3 text-center text-xs font-semibold text-foreground">{v.hours}</td>
                      <td className="py-3 text-center text-xs font-semibold text-amber-600">{v.rating} ⭐</td>
                      <td className="py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Pending requests */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border p-5">
            <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Pending Requests
            </h2>
            <div className="space-y-3">
              {requests.map((r, i) => (
                <div key={i} className="border border-border rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-semibold text-foreground">{r.member}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${urgencyColor[r.urgency as keyof typeof urgencyColor]}`}>
                      {r.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.type}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.date}</p>
                  <button onClick={() => nav.navigate("matching")} className="mt-2 w-full text-xs bg-primary/10 text-primary font-semibold py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Assign Volunteer
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => nav.navigate("support")} className="w-full mt-3 text-xs text-muted-foreground hover:text-primary text-center">
              View all requests →
            </button>
          </div>

          <div className="bg-primary rounded-2xl p-5 text-white">
            <BarChart3 className="w-8 h-8 text-white/60 mb-3" />
            <p className="font-[Plus_Jakarta_Sans] font-bold text-lg mb-1">Monthly Report Ready</p>
            <p className="text-sky-100 text-sm mb-4">June 2025 — 342 hrs, 68 members, 24 volunteers</p>
            <button onClick={() => nav.navigate("impact")} className="w-full bg-white/20 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-white/30 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
