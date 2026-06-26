import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Star, MapPin, Clock, BookOpen, CheckCircle, X, ChevronDown } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

const allVolunteers = [
  {
    id: 1, name: "Arjun Mehta", age: 28, location: "Mumbai", match: 97,
    skills: ["English", "JavaScript", "Communication"],
    availability: "Evenings & Weekends",
    experience: "2 yrs",
    rating: 4.9, reviews: 48,
    bio: "Software engineer passionate about education. Helped 8 people learn digital skills.",
    avatar: "A", color: "bg-sky-100 text-sky-700",
    verified: true,
  },
  {
    id: 2, name: "Dr. Lakshmi Rao", age: 44, location: "Bengaluru", match: 94,
    skills: ["Health Literacy", "Communication", "Kannada"],
    availability: "Weekday Mornings",
    experience: "5 yrs",
    rating: 5.0, reviews: 112,
    bio: "Retired physician helping seniors understand health, nutrition, and wellness.",
    avatar: "L", color: "bg-emerald-100 text-emerald-700",
    verified: true,
  },
  {
    id: 3, name: "Rahul Singh", age: 35, location: "Delhi", match: 91,
    skills: ["Finance", "Hindi", "Life Skills"],
    availability: "Weekends",
    experience: "3 yrs",
    rating: 4.7, reviews: 67,
    bio: "Financial advisor teaching budgeting and saving to underserved communities.",
    avatar: "R", color: "bg-violet-100 text-violet-700",
    verified: true,
  },
  {
    id: 4, name: "Priya Nair", age: 26, location: "Kochi", match: 88,
    skills: ["Drawing", "Crafts", "Malayalam", "Digital"],
    availability: "Flexible",
    experience: "1.5 yrs",
    rating: 4.8, reviews: 31,
    bio: "Graphic designer teaching art and digital creativity to children in orphanages.",
    avatar: "P", color: "bg-pink-100 text-pink-700",
    verified: false,
  },
  {
    id: 5, name: "Keerthi Reddy", age: 38, location: "Hyderabad", match: 85,
    skills: ["Yoga", "Telugu", "Wellness"],
    availability: "Mornings",
    experience: "4 yrs",
    rating: 4.9, reviews: 89,
    bio: "Certified yoga instructor helping elderly residents with mobility and mental wellness.",
    avatar: "K", color: "bg-orange-100 text-orange-700",
    verified: true,
  },
  {
    id: 6, name: "Sanjay Patel", age: 31, location: "Ahmedabad", match: 82,
    skills: ["Gujarati", "Cooking", "Life Skills"],
    availability: "Evenings",
    experience: "2 yrs",
    rating: 4.6, reviews: 22,
    bio: "Teaching practical life skills — cooking, household management, and financial basics.",
    avatar: "S", color: "bg-teal-100 text-teal-700",
    verified: false,
  },
];

const skillOptions = ["All Skills", "English", "Tech", "Finance", "Health", "Art", "Yoga", "Hindi"];
const locationOptions = ["All Locations", "Mumbai", "Bengaluru", "Delhi", "Kochi", "Hyderabad"];
const availOptions = ["Any Time", "Mornings", "Evenings", "Weekends", "Flexible"];

export function VolunteerMatching({ nav }: { nav: NavCtx }) {
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("All Skills");
  const [location, setLocation] = useState("All Locations");
  const [avail, setAvail] = useState("Any Time");
  const [volunteers, setVolunteers] = useState<any[]>(allVolunteers);
  const [selected, setSelected] = useState<any | null>(null);
  const [connected, setConnected] = useState<number[]>([]);

  const handleConnect = async (vId: number, vName: string) => {
    try {
      const token = localStorage.getItem('vikasya_token');
      await fetch('/api/matches/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify({
          type: "Connection Request",
          description: `Connection request sent to volunteer ${vName}`,
          urgency: "medium",
          availability: "Flexible",
          language: "English"
        })
      });
      setConnected(c => c.includes(vId) ? c : [...c, vId]);
    } catch (e) {
      console.error("Error making connection request", e);
    }
  };

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('/api/matches');
        const data = await response.json();
        if (response.ok && data.volunteers) {
          const richVolunteers = data.volunteers.map((dbVol: any) => {
            const staticVol = allVolunteers.find(v => v.name.toLowerCase() === dbVol.name.toLowerCase());
            if (staticVol) {
              return { ...staticVol, id: dbVol.id };
            }
            return {
              id: dbVol.id,
              name: dbVol.name,
              age: 28,
              location: "Bengaluru",
              match: 90,
              skills: ["Digital Skills", "English"],
              availability: "Flexible",
              experience: "2 yrs",
              rating: 4.8,
              reviews: 12,
              bio: `Volunteer passionate about sharing skills and helping communities. Registered as ${dbVol.name}.`,
              avatar: dbVol.name.charAt(0),
              color: "bg-sky-100 text-sky-700",
              verified: false
            };
          });
          setVolunteers(richVolunteers);
        }
      } catch (err) {
        console.error("Error fetching volunteers:", err);
      }
    };
    fetchVolunteers();
  }, []);

  const filtered = volunteers.filter(v =>
    (search === "" || v.name.toLowerCase().includes(search.toLowerCase()) || v.skills.some((s: string) => s.toLowerCase().includes(search.toLowerCase()))) &&
    (skill === "All Skills" || v.skills.some((s: string) => s.toLowerCase().includes(skill.toLowerCase()))) &&
    (location === "All Locations" || v.location === location) &&
    (avail === "Any Time" || v.availability.toLowerCase().includes(avail.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-bold text-foreground">Volunteer Matching</h1>
        <p className="text-muted-foreground mt-1 text-sm">Find the perfect volunteer based on skills, location, and availability</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border p-5">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or skill..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          {[
            { label: "Skill", value: skill, options: skillOptions, set: setSkill },
            { label: "Location", value: location, options: locationOptions, set: setLocation },
            { label: "Availability", value: avail, options: availOptions, set: setAvail },
          ].map(f => (
            <div key={f.label} className="relative">
              <select
                value={f.value}
                onChange={e => f.set(e.target.value)}
                className="appearance-none bg-background border border-border rounded-xl px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
              >
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          ))}
          <span className="text-sm text-muted-foreground ml-auto">{filtered.length} volunteers found</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Volunteer grid */}
        <div className="flex-1 grid md:grid-cols-2 xl:grid-cols-3 gap-4 content-start">
          {filtered.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(v)}
              className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-md hover:shadow-sky-100 ${
                selected?.id === v.id ? "border-primary shadow-md shadow-sky-100" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${v.color} flex items-center justify-center font-[Plus_Jakarta_Sans] font-bold text-lg flex-shrink-0`}>
                    {v.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-foreground text-sm">{v.name}</p>
                      {v.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {v.location}
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-xl">{v.match}%</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{v.bio}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {v.skills.map((s: string) => (
                  <span key={s} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-md">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {v.availability}</span>
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" /> {v.rating} ({v.reviews})
                </span>
              </div>
              <button
                onClick={e => { e.stopPropagation(); handleConnect(v.id, v.name); }}
                className={`w-full mt-3 text-sm font-semibold py-2 rounded-xl transition-colors ${
                  connected.includes(v.id)
                    ? "bg-emerald-100 text-emerald-700 cursor-default"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {connected.includes(v.id) ? "✓ Request Sent" : "Send Request"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden xl:block w-72 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <p className="font-[Plus_Jakarta_Sans] font-semibold text-sm text-foreground">Volunteer Profile</p>
                  <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-muted text-muted-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className={`w-16 h-16 rounded-2xl ${selected.color} flex items-center justify-center font-[Plus_Jakarta_Sans] font-bold text-2xl mx-auto mb-3`}>
                  {selected.avatar}
                </div>
                <div className="text-center mb-5">
                  <p className="font-semibold text-foreground">{selected.name}</p>
                  <p className="text-sm text-muted-foreground">{selected.age} yrs · {selected.location}</p>
                  <div className="flex justify-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(selected.rating) ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({selected.reviews})</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Bio</p>
                    <p className="text-foreground text-xs leading-relaxed">{selected.bio}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {selected.skills.map((s: string) => <span key={s} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-md">{s}</span>)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted rounded-xl p-2.5">
                      <p className="text-muted-foreground">Experience</p>
                      <p className="font-semibold text-foreground">{selected.experience}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-2.5">
                      <p className="text-muted-foreground">Availability</p>
                      <p className="font-semibold text-foreground text-xs leading-tight">{selected.availability}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleConnect(selected.id, selected.name)}
                  className={`w-full mt-5 font-semibold py-3 rounded-xl transition-colors text-sm ${
                    connected.includes(selected.id)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-sky-200"
                  }`}
                >
                  {connected.includes(selected.id) ? "✓ Request Sent" : "Send Connection Request"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
