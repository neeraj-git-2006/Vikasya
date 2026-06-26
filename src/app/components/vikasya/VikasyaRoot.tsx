import { useState, useEffect, type ReactElement } from "react";
import { VikasyaLanding } from "./VikasyaLanding";
import { VikasyaAuth } from "./VikasyaAuth";
import { AppShell } from "./AppShell";
import { VolunteerDashboard } from "./pages/VolunteerDashboard";
import { BeneficiaryDashboard } from "./pages/BeneficiaryDashboard";
import { OrgDashboard } from "./pages/OrgDashboard";
import { VolunteerMatching } from "./pages/VolunteerMatching";
import { SkillProgress } from "./pages/SkillProgress";
import { SupportRequest } from "./pages/SupportRequest";
import { ChatConnect } from "./pages/ChatConnect";
import { ImpactAnalytics } from "./pages/ImpactAnalytics";
import { Onboarding } from "./pages/Onboarding";
import { UserProfile } from "./pages/UserProfile";

export type Page =
  | "landing"
  | "auth"
  | "onboarding"
  | "volunteer-dashboard"
  | "beneficiary-dashboard"
  | "org-dashboard"
  | "matching"
  | "skills"
  | "support"
  | "chat"
  | "impact"
  | "profile";

export type UserType = "volunteer" | "beneficiary" | "org" | null;

export interface NavCtx {
  page: Page;
  userType: UserType;
  navigate: (p: Page) => void;
  logout: () => void;
}

export function VikasyaRoot() {
  const [page, setPage] = useState<Page>("landing");
  const [userType, setUserType] = useState<UserType>(() => {
    try {
      const stored = localStorage.getItem("vikasya_user");
      if (stored) {
        const u = JSON.parse(stored);
        return u.role;
      }
    } catch (e) {}
    return null;
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vikasya_user");
      if (stored) {
        const u = JSON.parse(stored);
        setUserType(u.role);
        
        const needsOnboarding = localStorage.getItem("vikasya_needs_onboarding") === "true";
        if (needsOnboarding && (u.role === "volunteer" || u.role === "org")) {
          setPage("onboarding");
        } else if (u.role === "volunteer") setPage("volunteer-dashboard");
        else if (u.role === "beneficiary") setPage("beneficiary-dashboard");
        else if (u.role === "org") setPage("org-dashboard");
      }
    } catch (e) {}
  }, []);

  const navigate = (p: Page) => setPage(p);

  const login = (type: UserType) => {
    setUserType(type);
    const needsOnboarding = localStorage.getItem("vikasya_needs_onboarding") === "true";
    if (needsOnboarding && (type === "volunteer" || type === "org")) {
      setPage("onboarding");
    } else if (type === "volunteer") {
      setPage("volunteer-dashboard");
    } else if (type === "beneficiary") {
      setPage("beneficiary-dashboard");
    } else {
      setPage("org-dashboard");
    }
  };

  const logout = () => {
    localStorage.removeItem("vikasya_token");
    localStorage.removeItem("vikasya_user");
    localStorage.removeItem("vikasya_needs_onboarding");
    setUserType(null);
    setPage("landing");
  };

  const ctx: NavCtx = { page, userType, navigate, logout };

  if (page === "landing") return <VikasyaLanding onGetStarted={() => setPage("auth")} onLogin={() => setPage("auth")} />;
  if (page === "auth") return <VikasyaAuth onLogin={login} onBack={() => setPage("landing")} />;
  if (page === "onboarding") return <Onboarding nav={ctx} />;

  const pageMap: Record<string, ReactElement> = {
    "volunteer-dashboard": <VolunteerDashboard nav={ctx} />,
    "beneficiary-dashboard": <BeneficiaryDashboard nav={ctx} />,
    "org-dashboard": <OrgDashboard nav={ctx} />,
    matching: <VolunteerMatching nav={ctx} />,
    skills: <SkillProgress nav={ctx} />,
    support: <SupportRequest nav={ctx} />,
    chat: <ChatConnect nav={ctx} />,
    impact: <ImpactAnalytics nav={ctx} />,
    profile: <UserProfile nav={ctx} />,
  };

  return <AppShell nav={ctx}>{pageMap[page] ?? <VolunteerDashboard nav={ctx} />}</AppShell>;
}
