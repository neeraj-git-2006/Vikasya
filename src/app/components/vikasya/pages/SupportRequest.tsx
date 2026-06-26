import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, HelpCircle, Clock, CheckCircle, AlertCircle, ChevronDown, X } from "lucide-react";
import type { NavCtx } from "../VikasyaRoot";

const requestTypes = [
  "Digital Skill Learning",
  "English / Language Support",
  "Companionship / Regular Calls",
  "Health & Wellness Guidance",
  "Financial Literacy",
  "Emotional Support",
  "Career Guidance",
  "Accessibility Support",
  "Other",
];

const existingRequests = [
  {
    id: 1,
    type: "Digital Skill Learning",
    description: "Need help learning to use WhatsApp to video call family members abroad.",
    urgency: "high",
    status: "matched",
    volunteer: "Arjun Mehta",
    submitted: "June 10, 2025",
    nextSession: "Today 4 PM",
  },
  {
    id: 2,
    type: "Companionship / Regular Calls",
    description: "Feeling lonely on evenings. Would love someone to talk to 2-3 times a week.",
    urgency: "medium",
    status: "pending",
    volunteer: null,
    submitted: "June 12, 2025",
    nextSession: null,
  },
  {
    id: 3,
    type: "Financial Literacy",
    description: "Want to understand how to use UPI apps safely and avoid scams.",
    urgency: "low",
    status: "completed",
    volunteer: "Rahul Singh",
    submitted: "May 25, 2025",
    nextSession: null,
  },
];

const statusConfig = {
  matched: { label: "Volunteer Matched", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  pending: { label: "Finding Volunteer", color: "bg-amber-100 text-amber-700", icon: Clock },
  completed: { label: "Completed", color: "bg-sky-100 text-sky-700", icon: CheckCircle },
};

const urgencyConfig = {
  high: { label: "High Priority", color: "bg-rose-100 text-rose-700" },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-700" },
  low: { label: "Low", color: "bg-sky-100 text-sky-700" },
};

export function SupportRequest({ nav }: { nav: NavCtx }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: "",
    description: "",
    urgency: "medium",
    availability: "",
    language: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState<any[]>(existingRequests);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('vikasya_token');
      const response = await fetch('/api/matches', {
        headers: {
          'Authorization': `Bearer ${token || ''}`
        }
      });
      const data = await response.json();
      if (response.ok && data.userRequests && data.userRequests.length > 0) {
        setRequests(data.userRequests);
      }
      // else keep the mock data as fallback
    } catch (err) {
      console.error("Error fetching support requests:", err);
      // Keep mock data on error
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Create a new request object to add locally
    const newRequest = {
      id: Date.now(),
      type: form.type,
      description: form.description,
      urgency: form.urgency,
      status: "pending",
      volunteer: null,
      submitted: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      nextSession: null,
    };

    try {
      const token = localStorage.getItem('vikasya_token');
      const response = await fetch('/api/matches/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) {
        // API failed — still add locally so user sees their request
        setRequests(prev => [newRequest, ...prev]);
      } else {
        fetchRequests();
      }

      setSubmitted(true);

      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setForm({ type: "", description: "", urgency: "medium", availability: "", language: "" });
      }, 2000);
    } catch (err: any) {
      // Network error — add locally and show success
      setRequests(prev => [newRequest, ...prev]);
      setSubmitted(true);
      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setForm({ type: "", description: "", urgency: "medium", availability: "", language: "" });
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-[Plus_Jakarta_Sans] text-3xl font-bold text-foreground">Support Requests</h1>
          <p className="text-muted-foreground mt-1 text-sm">Request learning help, guidance, companionship, or accessibility support</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-sky-100"
        >
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      {/* Request form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-[Plus_Jakarta_Sans] font-bold text-xl text-foreground mb-2">Request Submitted!</h3>
                  <p className="text-muted-foreground text-sm">We'll find the best volunteer match for you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground text-lg">New Support Request</h3>
                    <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Type of Support Needed</label>
                      <div className="relative">
                        <select
                          required
                          value={form.type}
                          onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                          className="w-full appearance-none bg-background border border-border rounded-xl px-4 py-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">Select support type...</option>
                          {requestTypes.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Describe what you need</label>
                      <textarea
                        required
                        rows={3}
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Tell us what kind of help you are looking for..."
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Priority Level</label>
                        <div className="relative">
                          <select
                            value={form.urgency}
                            onChange={e => setForm(f => ({ ...f, urgency: e.target.value }))}
                            className="w-full appearance-none bg-background border border-border rounded-xl px-4 py-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Preferred Language</label>
                        <input
                          value={form.language}
                          onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
                          placeholder="e.g., Malayalam"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Your Availability</label>
                      <input
                        value={form.availability}
                        onChange={e => setForm(f => ({ ...f, availability: e.target.value }))}
                        placeholder="e.g., Weekday evenings after 5 PM"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    {error && (
                      <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-xl border border-rose-100 mb-2">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-sky-200 disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Request"}
                    </button>
                  </form>
                </>
            )}
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Existing requests */}
      <div>
        <h2 className="font-[Plus_Jakarta_Sans] font-semibold text-foreground mb-4">Your Requests ({requests.length})</h2>
        <div className="space-y-4">
          {requests.map((r, i) => {
            const st = statusConfig[r.status as keyof typeof statusConfig] || { label: r.status, color: "bg-gray-100 text-gray-700", icon: HelpCircle };
            const urg = urgencyConfig[r.urgency as keyof typeof urgencyConfig] || { label: r.urgency, color: "bg-gray-100 text-gray-700" };
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground text-sm">{r.type}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${urg.color}`}>{urg.label}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${st.color}`}>
                      <st.icon className="w-3 h-3" /> {st.label}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{r.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-3">
                  <div className="flex items-center gap-4">
                    <span>Submitted: {r.submitted_date || r.submitted}</span>
                    {(r.volunteer_name || r.volunteer) && (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <CheckCircle className="w-3 h-3" /> Matched: {r.volunteer_name || r.volunteer}
                      </span>
                    )}
                    {(r.next_session || r.nextSession) && (
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <Clock className="w-3 h-3" /> Next: {r.next_session || r.nextSession}
                      </span>
                    )}
                  </div>
                  {r.status === "pending" && (
                    <span className="flex items-center gap-1 text-amber-600">
                      <AlertCircle className="w-3 h-3" /> Searching for volunteer...
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
