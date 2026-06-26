import { Outlet, NavLink } from "react-router";
import { Heart, Activity, Target, Brain, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/habits", label: "Habit Tracker" },
    { to: "/quiz", label: "Health Quiz" },
    { to: "/tips", label: "Tips & Resources" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-emerald-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Heart className="w-8 h-8 text-emerald-600 fill-emerald-500 group-hover:scale-110 transition-transform" />
                <Activity className="w-4 h-4 text-cyan-600 absolute -bottom-1 -right-1" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">World Health Day</div>
                <div className="text-xs text-emerald-600 -mt-1">Your Health, Your Daily Choices</div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                        : "text-gray-700 hover:bg-emerald-100/50 hover:text-emerald-700"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-emerald-100/50 transition-colors"
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
              className="md:hidden border-t border-emerald-100/50 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2 bg-white/90 backdrop-blur-xl">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-emerald-100/50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
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
      <footer className="mt-20 py-12 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 fill-white" />
                <span className="text-lg font-semibold">World Health Day 2026</span>
              </div>
              <p className="text-emerald-50 text-sm leading-relaxed">
                Your Health, Your Daily Choices. Small steps today lead to a healthier tomorrow.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-emerald-50">
                <li><a href="#about" className="hover:text-white transition-colors">About World Health Day</a></li>
                <li><a href="#mission" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#resources" className="hover:text-white transition-colors">Health Resources</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Health Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">Mental Health</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">Nutrition</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">Fitness</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">Sleep</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 text-center text-emerald-50 text-sm">
            <p>© 2026 World Health Day Initiative. Promoting health and wellness for all.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
