import type { DashboardData } from "~/features/dashboard/types/dashboardData";

export function createLocalDashboard(): DashboardData {
  return {
    projects: [],
    planUsages: [],
    user: {
      initials: "LW",
      name: "Local workspace",
      email: "No sign-in required in development",
    },
    overviewStats: [],
    supportedLocales: [],
    setupSteps: [],
    localizationTabs: [],
    localizationRows: [],
    screenStats: [],
    screenCandidates: [],
    stateCandidates: [],
    screenshotGroups: [],
    metadataFields: [],
    activityEvents: [],
    buildSettings: [],
    workflowSteps: [],
  };
}
