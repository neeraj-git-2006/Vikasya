import { Outlet, NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Activity, Home, Calendar, Beaker, Menu, X, Zap } from "lucide-react";

export function JeevaniRoot() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/jeevani", label: "Home", icon: Home },
    { to: "/jeevani/dashboard", label: "Dashboard", icon: Activity },
    { to: "/jeevani/planner", label: "Diet Planner", icon: Calendar },
    { to: "/jeevani/simulator", label: "What If", icon: Beaker },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/jeevani" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <Zap className="w-6 h-6 text-slate-950 fill-slate-950" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">Jeevani</div>
                <div className="text-xs text-emerald-400 -mt-1">Smart Health Companion</div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `group px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20"
                          : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-emerald-500/20 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2 bg-slate-950/90 backdrop-blur-xl">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-400 shadow-lg"
                            : "text-slate-300 hover:bg-slate-800/50"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400 text-sm">
            <p>Jeevani © 2026 - Your Smart Health Companion for Diabetes Management</p>
            <p className="mt-2 text-xs text-slate-500">
              Empowering healthier choices through real-time insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
