import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, LayoutDashboard, Users, BookOpen, MessageSquare, BarChart3,
  HandHeart, Building2, Bell, Search, LogOut, Menu, X, ChevronRight,
  HelpCircle, Settings, Award, User
} from "lucide-react";
import type { NavCtx, Page } from "./VikasyaRoot";

interface Props {
  nav: NavCtx;
  children: React.ReactNode;
}

const volunteerNav = [
  { icon: LayoutDashboard, label: "Dashboard", page: "volunteer-dashboard" as Page },
  { icon: Users, label: "My Matches", page: "matching" as Page },
  { icon: BookOpen, label: "Skills I Teach", page: "skills" as Page },
  { icon: MessageSquare, label: "Messages", page: "chat" as Page },
  { icon: BarChart3, label: "Impact", page: "impact" as Page },
];

const beneficiaryNav = [
  { icon: LayoutDashboard, label: "Dashboard", page: "beneficiary-dashboard" as Page },
  { icon: BookOpen, label: "My Learning", page: "skills" as Page },
  { icon: HandHeart, label: "Support Requests", page: "support" as Page },
  { icon: MessageSquare, label: "My Companion", page: "chat" as Page },
  { icon: BarChart3, label: "My Progress", page: "impact" as Page },
];

const orgNav = [
  { icon: LayoutDashboard, label: "Dashboard", page: "org-dashboard" as Page },
  { icon: Users, label: "Volunteer Roster", page: "matching" as Page },
  { icon: Building2, label: "Programs", page: "skills" as Page },
  { icon: HelpCircle, label: "Support Requests", page: "support" as Page },
  { icon: MessageSquare, label: "Messages", page: "chat" as Page },
  { icon: BarChart3, label: "Analytics", page: "impact" as Page },
];

const navLabels: Record<string, string> = {
  volunteer: "Volunteer",
  beneficiary: "Learner",
  org: "Organization",
};

const avatarColors: Record<string, string> = {
  volunteer: "bg-sky-100 text-sky-700",
  beneficiary: "bg-emerald-100 text-emerald-700",
  org: "bg-violet-100 text-violet-700",
};

const mockUser: Record<string, { name: string; sub: string }> = {
  volunteer: { name: "Arjun Mehta", sub: "Mumbai, Maharashtra" },
  beneficiary: { name: "Kamala Devi", sub: "Ananda Old Age Home" },
  org: { name: "Grace Foundation", sub: "Kochi, Kerala" },
};

export function AppShell({ nav, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [clearedNotifications, setClearedNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const userType = nav.userType ?? "volunteer";
  const navItems = userType === "volunteer" ? volunteerNav : userType === "beneficiary" ? beneficiaryNav : orgNav;

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (q.includes("volunteer") || q.includes("match") || q.includes("skill")) {
        nav.navigate("matching");
      } else if (q.includes("message") || q.includes("chat") || q.includes("connect")) {
        nav.navigate("chat");
      } else if (q.includes("impact") || q.includes("analytics") || q.includes("stat")) {
        nav.navigate("impact");
      } else if (q.includes("support") || q.includes("request") || q.includes("help")) {
        nav.navigate("support");
      } else if (q.includes("learn") || q.includes("progress") || q.includes("course")) {
        nav.navigate("skills");
      } else if (q.includes("profile") || q.includes("account")) {
        nav.navigate("profile");
      } else {
        nav.navigate("matching");
      }
      setSearchQuery("");
    }
  };

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("vikasya_user");
      if (stored) {
        const u = JSON.parse(stored);
        return {
          name: u.name || mockUser[userType]?.name || "User",
          sub: u.org || u.city || u.sub || mockUser[userType]?.sub || "Vikasya Member",
          profilePic: u.profilePic || null,
        };
      }
    } catch (e) {}
    return { ...mockUser[userType] || { name: "User", sub: "" }, profilePic: null };
  });

  // Re-read user from storage whenever the page changes (e.g., after profile edits)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("vikasya_user");
      if (stored) {
        const u = JSON.parse(stored);
        setCurrentUser({
          name: u.name || mockUser[userType]?.name || "User",
          sub: u.org || u.city || u.sub || mockUser[userType]?.sub || "Vikasya Member",
          profilePic: u.profilePic || null,
        });
      }
    } catch (e) {}
  }, [nav.page]);

  const user = currentUser;

  const allNotifications = {
    volunteer: [
      { id: 1, title: "New Match", desc: "Sister Priya matched you with Kamala Devi for English.", time: "2 hrs ago", navTo: "matching" as Page },
      { id: 2, title: "Session Scheduled", desc: "Kamala Devi scheduled a session for Today 4 PM.", time: "4 hrs ago", navTo: "chat" as Page },
      { id: 3, title: "Welcome!", desc: "Welcome to Vikasya Connect! Complete your skills profile to get matches.", time: "1 day ago", navTo: "skills" as Page },
    ],
    beneficiary: [
      { id: 1, title: "Match Accepted", desc: "Arjun Mehta accepted your request for Digital Skill Learning.", time: "1 hr ago", navTo: "matching" as Page },
      { id: 2, title: "New Connection", desc: "You are matched! Arjun Mehta ↔ Kamala Devi", time: "2 hrs ago", navTo: "support" as Page },
      { id: 3, title: "Welcome!", desc: "Welcome to Vikasya Connect! Go to Support Requests to ask for help.", time: "1 day ago", navTo: "support" as Page },
    ],
    org: [
      { id: 1, title: "New Registration", desc: "Priya Nair registered as a new Volunteer in Kochi.", time: "10 mins ago", navTo: "matching" as Page },
      { id: 2, title: "Support Request", desc: "Kamala Devi submitted a new support request for companionship.", time: "1 hr ago", navTo: "support" as Page },
      { id: 3, title: "Daily summary", desc: "4 new volunteer connections were created today.", time: "5 hrs ago", navTo: "impact" as Page },
    ]
  };

  const userNotifications = clearedNotifications ? [] : (allNotifications[userType as keyof typeof allNotifications] || []);

  const handleClearAll = () => {
    setClearedNotifications(true);
    setUnreadNotifications(false);
  };

  const handleNotificationClick = (targetPage: Page) => {
    setNotificationsOpen(false);
    setClearedNotifications(false);
    nav.navigate(targetPage);
  };

  const AvatarDisplay = ({ size = "sm" }: { size?: "sm" | "md" }) => {
    const dim = size === "sm" ? "w-9 h-9" : "w-9 h-9";
    if (user.profilePic) {
      return (
        <img
          src={user.profilePic}
          alt={user.name}
          className={`${dim} rounded-full object-cover border-2 border-white shadow-sm`}
        />
      );
    }
    return (
      <div className={`${dim} rounded-full ${avatarColors[userType]} flex items-center justify-center font-semibold text-sm`}>
        {user.name.charAt(0)}
      </div>
    );
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
          <Heart className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="font-[Plus_Jakarta_Sans] font-bold text-base text-foreground">
          Vikasya<span className="text-primary">Connect</span>
        </span>
      </div>

      {/* User card — clickable to profile */}
      <div className="px-4 py-4 border-b border-border">
        <button
          onClick={() => { nav.navigate("profile"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 p-3 rounded-xl ${avatarColors[userType]} hover:opacity-90 transition-all text-left`}
        >
          {user.profilePic ? (
            <img src={user.profilePic} alt={user.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0 border-2 border-white/40" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center font-[Plus_Jakarta_Sans] font-bold text-sm flex-shrink-0">
              {user.name.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs opacity-70 truncate">{navLabels[userType]}</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = nav.page === item.page;
          return (
            <button
              key={item.page}
              onClick={() => { nav.navigate(item.page); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-white shadow-sm shadow-sky-200"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        <button
          onClick={() => { nav.navigate("profile"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            nav.page === "profile"
              ? "bg-primary text-white shadow-sm shadow-sky-200"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <User className="w-4 h-4" /> My Profile
        </button>
        <button
          onClick={() => { nav.navigate("profile"); setSidebarOpen(false); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          <Settings className="w-4 h-4" /> Settings
        </button>
        <button
          onClick={nav.logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 transition-all"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex font-[Nunito]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-border flex-shrink-0 fixed h-full z-30">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/30 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-border z-50"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-border px-4 lg:px-8 h-16 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search volunteers, skills, programs..."
              className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto relative">
            {/* Bell icon */}
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setUnreadNotifications(false);
              }}
              className="relative p-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-border shadow-xl p-4 z-50 mt-1 origin-top-right"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
                      <h4 className="font-[Plus_Jakarta_Sans] font-bold text-sm text-foreground">
                        Notifications {userNotifications.length > 0 && <span className="text-xs text-primary ml-1">({userNotifications.length})</span>}
                      </h4>
                      {userNotifications.length > 0 && (
                        <button
                          onClick={handleClearAll}
                          className="text-xs text-primary font-semibold hover:underline"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="space-y-1 max-h-72 overflow-y-auto">
                      {userNotifications.length === 0 ? (
                        <div className="text-center py-8">
                          <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">No notifications</p>
                        </div>
                      ) : (
                        userNotifications.map(n => (
                          <button
                            key={n.id}
                            onClick={() => handleNotificationClick(n.navTo)}
                            className="w-full p-2.5 rounded-xl hover:bg-secondary/60 transition-colors text-left group"
                          >
                            <div className="flex items-start gap-2.5">
                              <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-foreground">{n.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.desc}</p>
                                <span className="text-[10px] text-muted-foreground mt-1 block">{n.time}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/0 group-hover:text-muted-foreground flex-shrink-0 transition-colors" />
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Profile avatar button */}
            <button
              onClick={() => nav.navigate("profile")}
              className="hover:ring-2 hover:ring-primary/30 rounded-full transition-all"
              title="Go to Profile"
            >
              <AvatarDisplay size="sm" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <motion.main
          key={nav.page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
