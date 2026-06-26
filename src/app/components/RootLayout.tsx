import { Outlet, NavLink } from "react-router";
import { Heart, LayoutDashboard, ListChecks, Brain, Lightbulb, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Heart },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/habits", label: "Habits", icon: ListChecks },
    { path: "/quiz", label: "Health Quiz", icon: Brain },
    { path: "/tips", label: "Tips", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-emerald-800">World Health Day</div>
                <div className="text-xs text-emerald-600">Your Health, Your Choices</div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-emerald-700" />
              ) : (
                <Menu className="w-6 h-6 text-emerald-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-emerald-100 bg-white/90 backdrop-blur-md"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-gray-600 hover:bg-emerald-50"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-r from-emerald-900 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 fill-white" />
                <span className="font-bold">World Health Day 2026</span>
              </div>
              <p className="text-emerald-100 text-sm">
                Empowering individuals to make healthier daily choices for a better future.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-emerald-100">
                <li><a href="#" className="hover:text-white transition-colors">About WHO</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Get Involved</h3>
              <p className="text-emerald-100 text-sm mb-4">
                Join millions worldwide in celebrating World Health Day.
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                  Share
                </button>
                <button className="px-4 py-2 bg-white text-emerald-900 hover:bg-emerald-50 rounded-lg text-sm font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-700 text-center text-sm text-emerald-200">
            <p>© 2026 World Health Day. Celebrating health and wellness globally.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
