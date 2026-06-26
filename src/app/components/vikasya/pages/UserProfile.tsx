import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera, Upload, Check, Edit3, MapPin, Mail, User, Shield,
  BookOpen, Heart, Star, Award, ChevronRight, X, Save, Sparkles
} from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

const avatarPresets = [
  { id: 1, url: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&auto=format", label: "Professional" },
  { id: 2, url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&auto=format", label: "Casual" },
  { id: 3, url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format", label: "Warm" },
  { id: 4, url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format", label: "Friendly" },
  { id: 5, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format", label: "Mentor" },
  { id: 6, url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&auto=format", label: "Leader" },
];

const roleLabels: Record<string, string> = {
  volunteer: "Volunteer",
  beneficiary: "Learner / Beneficiary",
  org: "Organization",
};

const roleColors: Record<string, string> = {
  volunteer: "bg-sky-100 text-sky-700",
  beneficiary: "bg-emerald-100 text-emerald-700",
  org: "bg-violet-100 text-violet-700",
};

interface Props {
  nav: NavCtx;
}

export function UserProfile({ nav }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("vikasya_user");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { name: "User", email: "", role: "volunteer", org: "", sub: "", bio: "", city: "", profilePic: "" };
  });

  const [form, setForm] = useState({
    name: user.name || "",
    city: user.city || user.sub || "",
    bio: user.bio || "",
    skills: user.skills || "",
    customPicUrl: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("vikasya_user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setForm({
        name: u.name || "",
        city: u.city || u.sub || "",
        bio: u.bio || "",
        skills: u.skills || "",
        customPicUrl: "",
      });
    }
  }, []);

  const saveToStorage = (updates: Record<string, any>) => {
    const updated = { ...user, ...updates };
    localStorage.setItem("vikasya_user", JSON.stringify(updated));
    setUser(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      saveToStorage({ profilePic: base64 });
      setShowAvatarPicker(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (url: string) => {
    saveToStorage({ profilePic: url });
    setShowAvatarPicker(false);
  };

  const handleSaveProfile = () => {
    if (!form.name.trim()) return;
    saveToStorage({
      name: form.name.trim(),
      city: form.city.trim(),
      sub: form.city.trim(),
      bio: form.bio.trim(),
      skills: form.skills.trim(),
    });
    setIsEditing(false);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleApplyUrl = () => {
    if (form.customPicUrl.trim()) {
      saveToStorage({ profilePic: form.customPicUrl.trim() });
      setShowAvatarPicker(false);
    }
  };

  const userType = user.role || "volunteer";
  const displayName = user.name || "User";
  const avatarColors: Record<string, string> = {
    volunteer: "bg-sky-100 text-sky-700",
    beneficiary: "bg-emerald-100 text-emerald-700",
    org: "bg-violet-100 text-violet-700",
  };

  const stats = userType === "volunteer"
    ? [
        { label: "Hours Given", value: "47", icon: Award },
        { label: "People Helped", value: "8", icon: Heart },
        { label: "Skills Shared", value: "12", icon: BookOpen },
        { label: "Avg Rating", value: "4.9 ⭐", icon: Star },
      ]
    : userType === "beneficiary"
    ? [
        { label: "Modules Done", value: "5", icon: BookOpen },
        { label: "Skills Learned", value: "3", icon: Sparkles },
        { label: "Streak", value: "8 days", icon: Award },
        { label: "Companions", value: "2", icon: Heart },
      ]
    : [
        { label: "Members", value: "68", icon: User },
        { label: "Volunteers", value: "24", icon: Heart },
        { label: "Programs", value: "7", icon: BookOpen },
        { label: "Hours Given", value: "342", icon: Award },
      ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Save Toast */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Check className="w-4 h-4" /> Profile saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cover + Avatar */}
      <div className="relative bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
        {/* Cover banner */}
        <div className="h-32 bg-gradient-to-r from-sky-500 via-sky-400 to-violet-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600/80 to-violet-500/60" />
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="w-20 h-20 text-white" />
          </div>
        </div>

        {/* Avatar area */}
        <div className="px-8 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-5">
            <div className="relative">
              <div className={`w-20 h-20 rounded-2xl border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-2xl font-bold ${!user.profilePic ? avatarColors[userType] : "bg-white"}`}>
                {user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>{displayName.charAt(0)}</span>
                )}
              </div>
              <button
                onClick={() => setShowAvatarPicker(true)}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground border border-border px-4 py-2 rounded-xl hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-1.5 text-sm font-semibold bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-foreground border border-border px-4 py-2 rounded-xl hover:bg-muted transition-colors"
                >
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <div>
            {isEditing ? (
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="font-[Plus_Jakarta_Sans] text-2xl font-bold text-foreground bg-transparent border-b-2 border-primary focus:outline-none w-full mb-1"
                placeholder="Your name"
              />
            ) : (
              <h1 className="font-[Plus_Jakarta_Sans] text-2xl font-bold text-foreground">{displayName}</h1>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${roleColors[userType]}`}>
                {roleLabels[userType]}
              </span>
              {(user.org || user.sub) && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> {user.org || user.sub}
                </span>
              )}
              {isEditing ? (
                <div className="flex items-center gap-1.5 flex-1 min-w-32">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    placeholder="City, State"
                    className="text-sm text-muted-foreground bg-transparent border-b border-border focus:outline-none focus:border-primary"
                  />
                </div>
              ) : (
                user.city || user.sub ? (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {user.city || user.sub}
                  </span>
                ) : null
              )}
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </span>
            </div>

            <div className="mt-4">
              {isEditing ? (
                <textarea
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  rows={2}
                  placeholder="Write a short bio about yourself — what drives you, what you love teaching..."
                  className="w-full text-sm text-muted-foreground bg-muted/40 border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {user.bio || "No bio added yet. Click Edit Profile to introduce yourself!"}
                </p>
              )}
            </div>
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
            className="bg-white rounded-2xl border border-border p-5 text-center"
          >
            <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-2">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="font-[Plus_Jakarta_Sans] text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Skills & Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Skills & Expertise
          </h2>
          {isEditing ? (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Skills (comma separated)</label>
              <input
                value={form.skills}
                onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
                placeholder="e.g. English Teaching, Digital Skills, Yoga, Finance"
                className="w-full text-sm bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(user.skills || "Communication, Empathy, Learning").split(",").map((s: string) => (
                <span key={s} className="text-xs bg-sky-50 text-sky-700 font-semibold px-3 py-1.5 rounded-xl border border-sky-100">
                  {s.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Account Details
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Role</span>
              <span className="font-semibold text-foreground">{roleLabels[userType]}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span className="font-semibold text-foreground text-xs">{user.email || "—"}</span>
            </div>
            {user.org && (
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Organization</span>
                <span className="font-semibold text-foreground">{user.org}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-semibold text-foreground">June 2025</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border flex gap-3">
            <button
              onClick={() => nav.navigate("matching")}
              className="flex-1 text-xs font-semibold text-primary bg-sky-50 py-2.5 rounded-xl hover:bg-sky-100 transition-colors flex items-center justify-center gap-1.5"
            >
              {userType === "volunteer" ? "My Matches" : "Find Volunteers"} <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => nav.navigate("chat")}
              className="flex-1 text-xs font-semibold text-foreground bg-muted py-2.5 rounded-xl hover:bg-muted/80 transition-colors flex items-center justify-center gap-1.5"
            >
              Messages <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {showAvatarPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowAvatarPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-[Plus_Jakarta_Sans] font-bold text-foreground">Change Profile Picture</h3>
                <button onClick={() => setShowAvatarPicker(false)} className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Upload from device */}
              <div className="mb-5">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-primary/40 bg-sky-50/50 text-primary font-semibold text-sm py-3 rounded-2xl hover:bg-sky-50 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Upload from Device
                </button>
              </div>

              {/* Preset avatars */}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Choose an Avatar</p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {avatarPresets.map(av => (
                  <button
                    key={av.id}
                    onClick={() => handleSelectPreset(av.url)}
                    className="relative group overflow-hidden rounded-2xl border-2 border-border hover:border-primary transition-all"
                  >
                    <img src={av.url} alt={av.label} className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold transition-opacity">{av.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Image URL */}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Or paste an image URL</p>
              <div className="flex gap-2">
                <input
                  value={form.customPicUrl}
                  onChange={e => setForm(f => ({ ...f, customPicUrl: e.target.value }))}
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 text-sm bg-background border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  onClick={handleApplyUrl}
                  className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
