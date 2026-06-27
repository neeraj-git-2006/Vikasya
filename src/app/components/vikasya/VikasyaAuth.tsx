import { useState } from "react";
import { Heart, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import type { UserType } from "./VikasyaRoot";
import { supabase, isSupabaseConfigured } from "../../../utils/supabase";

interface Props {
  onLogin: (type: UserType) => void;
  onBack: () => void;
  preselectedRole?: "volunteer" | "beneficiary" | "org";
}



export function VikasyaAuth({ onLogin, onBack, preselectedRole = "volunteer" }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserType>(preselectedRole);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", org: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        if (isLogin) {
          // Direct Supabase Auth SignIn
          const { data, error: authError } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
          });

          if (authError) throw authError;
          if (!data.user) throw new Error("No user returned from authentication.");

          // Fetch user profile details from public users table
          // Non-fatal: falls back to auth metadata if table not set up yet
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          const loggedInUser = {
            id: data.user.id,
            email: data.user.email,
            name: profile?.name || data.user.user_metadata?.name || form.email.split('@')[0],
            role: profile?.role || 'volunteer',
            org: profile?.org || null,
          };

          localStorage.setItem('vikasya_token', data.session?.access_token || '');
          localStorage.setItem('vikasya_user', JSON.stringify(loggedInUser));

          onLogin(loggedInUser.role as UserType);
        } else {
          // Direct Supabase Auth SignUp
          if (!form.name) {
            throw new Error("Full name is required.");
          }
          if (selectedRole === 'org' && !form.org) {
            throw new Error("Organization name is required.");
          }

          const { data, error: authError } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: {
              data: {
                name: form.name,
                role: selectedRole,
              }
            }
          });

          if (authError) throw authError;
          if (!data.user) throw new Error("Registration failed.");

          // Insert user profile record in public users table
          // Non-fatal: if table doesn't exist or RLS blocks it, auth still works
          const { error: insertError } = await supabase
            .from('users')
            .insert([{
              id: data.user.id,
              name: form.name,
              email: form.email,
              role: selectedRole,
              org: selectedRole === 'org' ? form.org : null
            }]);

          if (insertError) {
            console.warn('Profile insert failed (run Supabase schema setup):', insertError.message);
          }

          const loggedInUser = {
            id: data.user.id,
            email: form.email,
            name: form.name,
            role: selectedRole,
            org: selectedRole === 'org' ? form.org : null,
          };

          localStorage.setItem('vikasya_token', data.session?.access_token || 'dummy-token');
          localStorage.setItem('vikasya_user', JSON.stringify(loggedInUser));

          // Set first-time onboarding flag so VikasyaRoot navigates accordingly
          if (selectedRole === 'volunteer' || selectedRole === 'org') {
            localStorage.setItem('vikasya_needs_onboarding', 'true');
          }

          onLogin(selectedRole);
        }
      } else {
        // Fallback to local server API endpoints (SQLite)
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const payload = isLogin 
          ? { email: form.email, password: form.password }
          : { email: form.email, password: form.password, name: form.name, role: selectedRole, org: form.org };

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        // Guard against Vercel returning an HTML error page instead of JSON
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          throw new Error(`Server error (${response.status}): API is not available. Please ensure the backend is deployed and configured correctly.`);
        }

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.error || 'Something went wrong');
        }

        localStorage.setItem('vikasya_token', resData.token);
        localStorage.setItem('vikasya_user', JSON.stringify(resData.user));

        if (!isLogin && (selectedRole === 'volunteer' || selectedRole === 'org')) {
          localStorage.setItem('vikasya_needs_onboarding', 'true');
        }

        onLogin(resData.user.role);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex font-[Nunito]">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-sky-300/20 rounded-full blur-2xl" />
        </div>
        <div className="relative">
          <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-[Plus_Jakarta_Sans] font-bold text-xl text-white">VikasyaConnect</span>
          </div>
          <h2 className="font-[Plus_Jakarta_Sans] text-4xl font-bold text-white leading-tight mb-4">
            Every skill you share<br />changes a life.
          </h2>
          <p className="text-sky-100 text-base leading-relaxed max-w-sm">
            Join thousands of volunteers building real connections with elderly people, children, and underserved communities across India.
          </p>
        </div>
        <div className="relative space-y-4">
          {[
            { name: "Arjun Mehta", role: "Teaching English to 3 children", time: "2 hrs/week" },
            { name: "Dr. Lakshmi Rao", role: "Mentoring career skills", time: "4 hrs/week" },
          ].map((v) => (
            <div key={v.name} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
                  {v.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{v.name}</p>
                  <p className="text-sky-200 text-xs">{v.role}</p>
                </div>
                <span className="text-xs text-sky-300 bg-white/10 px-2 py-1 rounded-lg">{v.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-white">
        <div className="max-w-md w-full mx-auto">
          <button onClick={onBack} className="lg:hidden flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {isSupabaseConfigured ? "Supabase Connected" : "Local Database Mode"}
            </span>
            <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-extrabold text-foreground tracking-tight mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin 
                ? "Sign in to continue matching and making an impact" 
                : "Join the platform to share skills or find community support"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Priya Sharma"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                {!isLogin && selectedRole === "org" && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Organization Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Grace Foundation"
                      required
                      value={form.org}
                      onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 text-xs bg-rose-50 text-rose-600 rounded-xl border border-rose-100 font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-sky-200 mt-2 disabled:opacity-50 text-sm"
            >
              {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="text-primary font-bold hover:underline">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
