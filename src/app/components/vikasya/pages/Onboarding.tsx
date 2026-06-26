import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Users, Building2, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, BookOpen, GraduationCap, Users2, ShieldAlert } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";
import { supabase, isSupabaseConfigured } from "../../../../utils/supabase";

interface Props {
  nav: NavCtx;
}

const serviceTypes = [
  "Teaching a Subject (Math, Science, etc.)",
  "English Communication & Speaking",
  "Basic Digital Skills (Mobile, UPI, WhatsApp)",
  "Emotional Companionship & Listening",
  "Career Mentorship & Resume Writing",
  "Art, Music, or Recreational Activities",
  "Legal or Financial Counseling",
  "Physical Fitness or Yoga instruction"
];

const audiences = [
  "School Students (K-10)",
  "High School Students (11-12)",
  "College Students & Job Seekers",
  "Elderly Residents (Old Age Homes)",
  "Underserved Neighborhood Kids",
  "People with Disabilities"
];

const focusAreas = [
  "Helping an Orphanage / Children Home",
  "Helping an Old Age Home",
  "Conducting Local Community Programs",
  "Providing Skill Training for Women",
  "Delivering Cleanliness & Health Campaigns",
  "Empowering Underprivileged Youth"
];

export function Onboarding({ nav }: Props) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"volunteer" | "org">("volunteer");
  
  // Volunteer Step 2 Form State
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  
  // Org Step 2 Form State
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Authenticated User Info
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("vikasya_user");
    const token = localStorage.getItem("vikasya_token");
    
    if (!token || !storedUser) {
      nav.navigate("auth");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Auto-select role based on user account role
      if (parsedUser.role === "org") {
        setRole("org");
      } else {
        setRole("volunteer");
      }
    } catch (e) {
      nav.navigate("auth");
    }
  }, [nav]);

  const handleAudienceToggle = (aud: string) => {
    setSelectedAudiences(prev =>
      prev.includes(aud) ? prev.filter(a => a !== aud) : [...prev, aud]
    );
  };

  const handleFocusToggle = (area: string) => {
    setSelectedFocusAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    } else {
      nav.navigate("landing");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validations
    if (role === "volunteer") {
      if (selectedAudiences.length === 0) {
        setError("Please select at least one target audience.");
        setLoading(false);
        return;
      }
      if (!description.trim()) {
        setError("Please share a brief description of how you want to help.");
        setLoading(false);
        return;
      }
    } else {
      if (selectedFocusAreas.length === 0) {
        setError("Please select at least one organization focus area.");
        setLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem("vikasya_token");

      if (isSupabaseConfigured && supabase && user?.id) {
        // Direct Supabase Writes
        if (role === "volunteer") {
          const { error: insertError } = await supabase
            .from("volunteer_profiles")
            .insert([{
              user_id: user.id,
              service_type: serviceType,
              target_audience: selectedAudiences,
              description: description.trim()
            }]);

          if (insertError) throw insertError;
        } else {
          const { error: insertError } = await supabase
            .from("organization_profiles")
            .insert([{
              user_id: user.id,
              focus_areas: selectedFocusAreas
            }]);

          if (insertError) throw insertError;
        }
      } else {
        // Local SQLite Fallback via Server Endpoints
        const endpoint = role === "volunteer" ? "/api/onboarding/volunteer" : "/api/onboarding/org";
        const payload = role === "volunteer" 
          ? { serviceType, targetAudience: selectedAudiences, description: description.trim() }
          : { focusAreas: selectedFocusAreas };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.error || "Failed to submit onboarding details");
        }
      }

      // Success
      setSuccess(true);
      localStorage.removeItem("vikasya_needs_onboarding");
      
      // Update local storage user profile to trigger dashboard redirect
      const updatedUser = { ...user, onboarded: true };
      localStorage.setItem("vikasya_user", JSON.stringify(updatedUser));

      setTimeout(() => {
        if (role === "volunteer") {
          nav.navigate("volunteer-dashboard");
        } else {
          nav.navigate("org-dashboard");
        }
      }, 1500);

    } catch (err: any) {
      setError(err.message || "Something went wrong while saving your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-[Nunito]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-2xl rounded-3xl p-8 md:p-12 relative z-10">
        
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-[Plus_Jakarta_Sans] font-bold text-lg text-foreground">
              Vikasya<span className="text-primary">Connect</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-500">
            <span>Step {step} of 2</span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1" />
            <span className="text-primary">{step === 1 ? "Role selection" : "Details"}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold text-slate-800 mb-2">Onboarding Completed!</h2>
              <p className="text-slate-500">Connecting you to your personal impact dashboard...</p>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Getting Started
                </span>
                <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold text-foreground tracking-tight mb-2">
                  Welcome, {user?.name || "Friend"}!
                </h1>
                <p className="text-slate-500">
                  Please select your participation role to customize your connection profile.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Volunteer Card */}
                <button
                  type="button"
                  onClick={() => setRole("volunteer")}
                  disabled={user?.role === "org"}
                  className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
                    role === "volunteer"
                      ? "border-primary bg-sky-50/20 shadow-lg shadow-sky-100"
                      : "border-slate-200 bg-white hover:border-slate-300 opacity-70"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4 text-sky-600 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-[Plus_Jakarta_Sans] font-bold text-lg text-slate-800 mb-1.5">
                    Individual Volunteer
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Teach languages, offer professional skills, or volunteer for companionship calls to make a real difference in someone's life.
                  </p>
                  {user?.role === "org" && (
                    <div className="absolute inset-0 bg-slate-100/80 flex items-center justify-center p-4">
                      <p className="text-xs text-slate-600 font-bold text-center flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-md">
                        <ShieldAlert className="w-4 h-4 text-amber-500" /> Matches organization registration
                      </p>
                    </div>
                  )}
                </button>

                {/* Organization Card */}
                <button
                  type="button"
                  onClick={() => setRole("org")}
                  disabled={user?.role === "volunteer" || user?.role === "beneficiary"}
                  className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
                    role === "org"
                      ? "border-primary bg-sky-50/20 shadow-lg shadow-sky-100"
                      : "border-slate-200 bg-white hover:border-slate-300 opacity-70"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4 text-violet-600 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-[Plus_Jakarta_Sans] font-bold text-lg text-slate-800 mb-1.5">
                    We are an Organization
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We represent a school, orphanage, non-profit, or old age home seeking coordinate volunteer support programs.
                  </p>
                  {(user?.role === "volunteer" || user?.role === "beneficiary") && (
                    <div className="absolute inset-0 bg-slate-100/80 flex items-center justify-center p-4">
                      <p className="text-xs text-slate-600 font-bold text-center flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-md">
                        <ShieldAlert className="w-4 h-4 text-amber-500" /> Matches individual registration
                      </p>
                    </div>
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-sky-200"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="font-[Plus_Jakarta_Sans] text-2xl font-extrabold text-foreground mb-1.5">
                  {role === "volunteer" ? "Volunteer Preferences" : "Organization Programs"}
                </h2>
                <p className="text-slate-500 text-xs">
                  Fill in the details below to finish setting up your profile connections.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {role === "volunteer" ? (
                  <>
                    {/* Service Type Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" /> Primary Skill / Service Type
                      </label>
                      <select
                        value={serviceType}
                        onChange={e => setServiceType(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer font-semibold text-slate-700"
                      >
                        {serviceTypes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Target Audience Checkboxes */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Users2 className="w-4 h-4 text-primary" /> Target Audience (Select all that apply)
                      </label>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {audiences.map(aud => {
                          const checked = selectedAudiences.includes(aud);
                          return (
                            <button
                              key={aud}
                              type="button"
                              onClick={() => handleAudienceToggle(aud)}
                              className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                                checked
                                  ? "border-primary bg-sky-50/20 text-primary font-bold"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                              }`}
                            >
                              <span>{aud}</span>
                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ${
                                checked ? "border-primary bg-primary text-white" : "border-slate-300 bg-white"
                              }`}>
                                {checked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" /> About Your Experience / Vision
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="I want to teach basic smartphone skills to seniors so they feel connected, and have 2 hours per week available..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Organization Focus Areas */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" /> Program Focus Areas (Select all that apply)
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {focusAreas.map(area => {
                          const checked = selectedFocusAreas.includes(area);
                          return (
                            <button
                              key={area}
                              type="button"
                              onClick={() => handleFocusToggle(area)}
                              className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                                checked
                                  ? "border-primary bg-sky-50/20 text-primary font-bold"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                              }`}
                            >
                              <span>{area}</span>
                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ${
                                checked ? "border-primary bg-primary text-white" : "border-slate-300 bg-white"
                              }`}>
                                {checked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-xl border border-rose-100 font-semibold">
                    {error}
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-sky-200 disabled:opacity-50 text-sm cursor-pointer"
                  >
                    {loading ? "Saving Details..." : "Complete Profile"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
