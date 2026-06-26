import { createBrowserRouter, Navigate } from "react-router";
import { VikasyaRoot } from "./components/vikasya/VikasyaRoot";
import { JeevaniRoot } from "./components/jeevani/JeevaniRoot";
import { JeevaniLanding } from "./components/jeevani/JeevaniLanding";
import { JeevaniDashboard } from "./components/jeevani/JeevaniDashboard";
import { DietPlanner } from "./components/jeevani/DietPlanner";
import { WhatIfSimulator } from "./components/jeevani/WhatIfSimulator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: VikasyaRoot,
  },
  {
    path: "/jeevani",
    Component: JeevaniRoot,
    children: [
      { index: true, Component: JeevaniLanding },
      { path: "dashboard", Component: JeevaniDashboard },
      { path: "planner", Component: DietPlanner },
      { path: "simulator", Component: WhatIfSimulator },
    ],
  },
  {
    // Catch-all: redirect any unknown path back to the landing page
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

