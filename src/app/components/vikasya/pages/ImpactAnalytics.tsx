import { useState } from "react";
import { motion } from "motion/react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Users, Heart, BookOpen, Clock, TrendingUp, MapPin, Award } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

const volunteerGrowth = [
  { month: "Jan", volunteers: 4200, beneficiaries: 18000 },
  { month: "Feb", volunteers: 5100, beneficiaries: 21000 },
  { month: "Mar", volunteers: 6800, beneficiaries: 26000 },
  { month: "Apr", volunteers: 8200, beneficiaries: 31000 },
  { month: "May", volunteers: 10500, beneficiaries: 38000 },
  { month: "Jun", volunteers: 12400, beneficiaries: 45200 },
];

const skillsByCategory = [
  { category: "Digital Skills", sessions: 3420 },
  { category: "Communication", sessions: 2680 },
  { category: "Life Skills", sessions: 1920 },
  { category: "Career", sessions: 1240 },
  { category: "Health", sessions: 980 },
  { category: "Creative", sessions: 760 },
];

const supportTypes = [
  { name: "Skill Learning", value: 42, color: "#0284C7" },
  { name: "Companionship", value: 28, color: "#38BDF8" },
  { name: "Emotional Support", value: 18, color: "#10B981" },
  { name: "Career Guidance", value: 8, color: "#F59E0B" },
  { name: "Other", value: 4, color: "#8B5CF6" },
];

const topCities = [
  { city: "Mumbai", volunteers: 2800, impact: 9400 },
  { city: "Bengaluru", volunteers: 2100, impact: 7200 },
  { city: "Delhi", volunteers: 1900, impact: 6500 },
  { city: "Kochi", volunteers: 1400, impact: 4800 },
  { city: "Hyderabad", volunteers: 1200, impact: 4100 },
  { city: "Chennai", volunteers: 980, impact: 3400 },
];

const stories = [
  {
    name: "Kamala Devi, 74",
    story: "Started with zero digital knowledge. Now video calls her granddaughter in Canada every Sunday.",
    category: "Digital Independence",
    org: "Ananda Home, Bengaluru",
    emoji: "📱",
  },
  {
    name: "Aryan, 14",
    story: "Learned Python basics from volunteer mentor. Won first prize at school science fair with his project.",
    category: "Career Readiness",
    org: "Udayan Orphanage, Delhi",
    emoji: "💻",
  },
  {
    name: "Sunita Sharma, 67",
    story: "Overcame loneliness after losing her husband. Now leads a weekly WhatsApp group for 20 seniors.",
    category: "Companionship",
    org: "Silver Pines, Chennai",
    emoji: "❤️",
  },
];

const bigStats = [
  { label: "Total Volunteers", value: "12,400", change: "+2,100 this month", icon: Users, color: "text-sky-600 bg-sky-50" },
  { label: "Lives Touched", value: "45,200", change: "+7,200 this month", icon: Heart, color: "text-rose-500 bg-rose-50" },
  { label: "Skill Sessions", value: "11,000+", change: "+1,800 this month", icon: BookOpen, color: "text-emerald-600 bg-emerald-50" },
  { label: "Volunteer Hours", value: "82,400", change: "+14,000 this month", icon: Clock, color: "text-amber-600 bg-amber-50" },
];

export function ImpactAnalytics({ nav }: { nav: NavCtx }) {
  const [period, setPeriod] = useState<"6m" | "1y" | "all">("6m");

  const displayData = period === "6m" 
    ? volunteerGrowth 
    : period === "1y" 
    ? [
        { month: "Jul", volunteers: 2100, beneficiaries: 8200 },
        { month: "Aug", volunteers: 3200, beneficiaries: 12400 },
        { month: "Sep", volunteers: 4100, beneficiaries: 16000 },
        { month: "Oct", volunteers: 5800, beneficiaries: 22000 },
        { month: "Nov", volunteers: 7900, beneficiaries: 30000 },
        { month: "Dec", volunteers: 9800, beneficiaries: 37000 },
        ...volunteerGrowth,
      ] 
    : [
        { month: "Q1'24", volunteers: 800, beneficiaries: 3200 },
        { month: "Q2'24", volunteers: 1400, beneficiaries: 5600 },
        { month: "Q3'24", volunteers: 2200, beneficiaries: 8800 },
        { month: "Q4'24", volunteers: 3800, beneficiaries: 14200 },
        { month: "Q1'25", volunteers: 5600, beneficiaries: 20000 },
        { month: "Q2'25", volunteers: 9200, beneficiaries: 34000 },
        { month: "Jun'25", volunteers: 12400, beneficiaries: 45200 },
      ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-bold text-foreground">Impact Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time metrics showing Vikasya Connect's community impact</p>
        </div>
        <div className="flex bg-white border border-border rounded-xl overflow-hidden">
          {(["6m", "1y", "all"] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                period === p ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "6m" ? "6 Months" : p === "1y" ? "1 Year" : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {/* Big stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {bigStats.map((s, i) => (
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
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {s.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-6">Volunteer & Beneficiary Growth</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={displayData}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284C7" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="benGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(14,165,233,0.08)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid rgba(14,165,233,0.2)", fontSize: 12 }}
                formatter={(v: number) => v.toLocaleString()}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="beneficiaries" name="Beneficiaries" stroke="#38BDF8" strokeWidth={2} fill="url(#benGrad)" />
              <Area type="monotone" dataKey="volunteers" name="Volunteers" stroke="#0284C7" strokeWidth={2} fill="url(#volGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-6">Sessions by Skill Category</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={skillsByCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(14,165,233,0.08)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 11, fill: "#64748B" }} width={100} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid rgba(14,165,233,0.2)", fontSize: 12 }} />
              <Bar dataKey="sessions" name="Sessions" fill="#0284C7" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Donut */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-6">Support Types</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={supportTypes} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {supportTypes.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid rgba(14,165,233,0.2)", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {supportTypes.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-semibold text-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* City table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Impact by City
          </h2>
          <div className="space-y-3">
            {topCities.map((c, i) => (
              <div key={c.city} className="flex items-center gap-4">
                <span className="w-5 text-sm font-bold text-muted-foreground flex-shrink-0">{i + 1}</span>
                <span className="text-sm font-semibold text-foreground w-24 flex-shrink-0">{c.city}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{c.volunteers.toLocaleString()} volunteers</span>
                    <span>{c.impact.toLocaleString()} people helped</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(c.volunteers / 2800) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stories */}
      <div>
        <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-5 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" /> Stories of Impact
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-border p-5"
            >
              <div className="text-3xl mb-3">{s.emoji}</div>
              <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{s.story}"</p>
              <p className="text-sm font-semibold text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.org}</p>
              <span className="inline-block mt-2 text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-md">{s.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
