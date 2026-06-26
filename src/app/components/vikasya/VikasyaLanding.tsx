import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { supabase } from "../../../utils/supabase";
import {
  Heart, Users, BookOpen, Star, ArrowRight, MapPin,
  CheckCircle, Sparkles, ChevronRight, Globe, Shield
} from "lucide-react";

interface Props {
  onGetStarted: () => void;
  onLogin: () => void;
}



const features = [
  {
    icon: Sparkles,
    title: "Smart Volunteer Matching",
    desc: "AI-powered pairing based on skills, location, availability, and emotional compatibility. Find the right connection in minutes.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: BookOpen,
    title: "Skill Development Journey",
    desc: "Structured learning paths from digital literacy to career skills. Track progress milestone by milestone.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Heart,
    title: "Companion Connect",
    desc: "Regular check-ins, meaningful conversations, and emotional support that reduces loneliness and builds confidence.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Globe,
    title: "Impact Analytics",
    desc: "Real-time dashboards for organizations to track volunteer hours, skills shared, and community growth.",
    color: "bg-amber-50 text-amber-600",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create Your Profile",
    desc: "Share your skills, availability, and what kind of support you want to give or receive.",
  },
  {
    step: "02",
    title: "Get Matched",
    desc: "Our algorithm finds the best connections based on compatibility, location, and mutual goals.",
  },
  {
    step: "03",
    title: "Start Growing Together",
    desc: "Meet virtually or in person, track progress, and celebrate every milestone together.",
  },
];

const testimonials = [
  {
    quote: "Through Vikasya Connect, I learned to use a smartphone at 74. Now I video call my grandchildren every Sunday. This changed my life.",
    name: "Kamala Devi, 74",
    role: "Resident, Ananda Old Age Home, Bengaluru",
    img: "https://images.unsplash.com/photo-1556157382-97eda2f9e946?w=80&h=80&fit=crop&auto=format",
    rating: 5,
  },
  {
    quote: "I teach English every Saturday to three kids at a local orphanage. Watching them speak with confidence gives me a purpose I never had at my corporate job.",
    name: "Arjun Mehta, 28",
    role: "Volunteer Software Engineer, Mumbai",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    rating: 5,
  },
  {
    quote: "We registered 40 elderly members and within a month had 23 volunteers matched. The platform practically runs itself.",
    name: "Sister Priya Thomas",
    role: "Director, Grace Foundation, Kochi",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
    rating: 5,
  },
];

const orgs = [
  "HelpAge India", "SOS Children's Villages", "Samarthanam Trust",
  "Udayan Care", "Robin Hood Army", "Teach For India",
];

export function VikasyaLanding({ onGetStarted, onLogin }: Props) {
  const [liveStats, setLiveStats] = useState([
    { value: "12,400+", label: "Active Volunteers", icon: Users },
    { value: "45,200", label: "Lives Touched", icon: Heart },
    { value: "230+", label: "Skills Shared", icon: BookOpen },
    { value: "95", label: "Cities Covered", icon: MapPin },
  ]);
  const [latestMatch, setLatestMatch] = useState("Priya ↔ Kamala Devi");
  const [volunteerCount, setVolunteerCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/stats/impact')
      .then(res => res.json())
      .then(data => {
        if (data && data.activeVolunteers) {
          setLiveStats([
            { value: data.activeVolunteers, label: "Active Volunteers", icon: Users },
            { value: data.livesTouched, label: "Lives Touched", icon: Heart },
            { value: data.skillsShared, label: "Skills Shared", icon: BookOpen },
            { value: "95", label: "Cities Covered", icon: MapPin },
          ]);
        }
      })
      .catch(err => console.error('Error fetching dynamic stats:', err));

    fetch('/api/matches')
      .then(res => res.json())
      .then(data => {
        if (data && data.connections && data.connections.length > 0) {
          const latest = data.connections[data.connections.length - 1];
          setLatestMatch(`${latest.volunteer_name} ↔ ${latest.beneficiary_name}`);
        }
      })
      .catch(err => console.error('Error fetching dynamic matches:', err));

    const fetchVolunteerCountFromApi = () => {
      fetch('/api/matches')
        .then(res => res.json())
        .then(data => {
          if (data && data.volunteers) {
            setVolunteerCount(data.volunteers.length);
          }
        })
        .catch(err => console.error('Error fetching volunteer count from API:', err));
    };

    if (supabase) {
      supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'volunteer')
        .then(
          ({ count, error }) => {
            if (!error && count !== null) {
              setVolunteerCount(count);
            } else {
              fetchVolunteerCountFromApi();
            }
          },
          (err) => {
            console.error('Error fetching volunteer count from supabase:', err);
            fetchVolunteerCountFromApi();
          }
        );
    } else {
      fetchVolunteerCountFromApi();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background font-[Nunito]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-[Plus_Jakarta_Sans] font-700 text-lg text-foreground tracking-tight">
              Vikasya<span className="text-primary">Connect</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
            <a href="#orgs" className="hover:text-primary transition-colors">Organizations</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onLogin} className="text-sm font-semibold text-primary hover:underline px-3 py-1.5">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              India's Human Support Network
            </span>
            <h1 className="font-[Plus_Jakarta_Sans] text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Connect Hearts.<br />
              <span className="text-primary">Build Futures.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Vikasya Connect bridges volunteers with elderly people, children in orphanages, and underserved communities — for skill building, companionship, and lasting change.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-sky-200"
              >
                Start Volunteering <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 bg-white text-foreground font-semibold px-7 py-3.5 rounded-xl border border-border hover:bg-secondary/50 transition-colors"
              >
                I Need Support <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {["photo-1573497019940-1c28c88b4f3e", "photo-1507003211169-0a1dd7228f2d", "photo-1494790108377-be9c29b29330", "photo-1539571696357-5a69c17a67c6"].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&auto=format`}
                    alt="Volunteer"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover bg-sky-100"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {volunteerCount === 0 || volunteerCount === null ? (
                  <span className="font-semibold text-foreground">Be the first volunteer to make a difference!</span>
                ) : (
                  <>
                    <span className="font-semibold text-foreground">{volunteerCount} {volunteerCount === 1 ? 'volunteer' : 'volunteers'}</span> already making a difference
                  </>
                )}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-200/50">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&h=500&fit=crop&auto=format"
                alt="Volunteers helping community members"
                className="w-full h-96 object-cover bg-sky-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
            </div>
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-12 bg-white rounded-2xl shadow-lg shadow-sky-100 p-4 flex items-center gap-3 border border-border"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">New Match!</p>
                <p className="text-xs text-muted-foreground">{latestMatch}</p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-6 bottom-16 bg-white rounded-2xl shadow-lg shadow-sky-100 p-4 border border-border"
            >
              <p className="text-xs text-muted-foreground mb-1">Skills Taught Today</p>
              <p className="text-2xl font-[Plus_Jakarta_Sans] font-bold text-primary">147</p>
              <p className="text-xs text-emerald-600 font-medium">↑ 23% this week</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-y border-border" id="impact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {liveStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-[Plus_Jakarta_Sans] text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Platform Features</span>
            <h2 className="font-[Plus_Jakarta_Sans] text-4xl font-bold text-foreground mt-2 mb-4">
              Everything you need to make an impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From intelligent matching to structured learning paths, Vikasya Connect provides every tool volunteers and organizations need.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg hover:shadow-sky-100 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white px-6" id="how">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Simple & Powerful</span>
            <h2 className="font-[Plus_Jakarta_Sans] text-4xl font-bold text-foreground mt-2">How it Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-border" />
            {howItWorks.map((h, i) => (
              <motion.div
                key={h.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-sky-50 border-2 border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <span className="font-[Plus_Jakarta_Sans] text-xl font-bold text-primary">{h.step}</span>
                </div>
                <h3 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground text-lg mb-3">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Real Stories</span>
            <h2 className="font-[Plus_Jakarta_Sans] text-4xl font-bold text-foreground mt-2">Lives Changed</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border"
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-sky-100" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Orgs */}
      <section className="py-16 bg-white border-y border-border" id="orgs">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium">Trusted by India's leading social organizations</p>
          <div className="flex flex-wrap justify-center gap-6">
            {orgs.map((org) => (
              <div key={org} className="bg-sky-50 text-sky-700 font-semibold text-sm px-5 py-2.5 rounded-xl border border-sky-100">
                {org}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-300/20 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <Shield className="w-12 h-12 text-white/60 mx-auto mb-4" />
          <h2 className="font-[Plus_Jakarta_Sans] text-4xl font-bold text-white mb-4">
            Every hour you give changes a life
          </h2>
          <p className="text-sky-100 text-lg mb-8 leading-relaxed">
            Join 12,400 volunteers across India who are teaching, mentoring, and connecting with people who need them most.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-sky-50 transition-colors shadow-lg"
            >
              Become a Volunteer
            </button>
            <button
              onClick={onGetStarted}
              className="bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              Register Organization
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0C1A2E] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-[Plus_Jakarta_Sans] font-bold text-white">
              Vikasya<span className="text-sky-400">Connect</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 text-center">
            Built with care for India's communities · © 2025 Vikasya Connect
          </p>
          <div className="flex gap-5 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
