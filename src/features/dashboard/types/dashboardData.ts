export type MetricTone = "teal" | "gold";

export type ProjectMetric = {
  label: string;
  value: number;
  tone: MetricTone;
};

export type ProjectSummary = {
  id: string;
  name: string;
  appType: string;
  localeCount: number;
  updatedAgo: string;
  logoVariant: "calisthenics" | "tweet" | "sleep";
  selected: boolean;
  metrics: ProjectMetric[];
};

export type PlanUsage = {
  label: string;
  value: string;
  percentage: number;
};

export type UserSummary = {
  initials: string;
  name: string;
  email: string;
};

export type LocalizationTab = {
  label: string;
  count?: number;
  active: boolean;
};

export type LocalizationRow = {
  keyName: string;
  sourceText: string;
  translatedText: string;
  status: "Approved" | "Edited";
  source: string;
};

export type ScreenDiscoveryStat = {
  label: string;
  value: number;
};

export type ScreenCandidate = {
  id: string;
  name: string;
  description: string;
  status: "Selected" | "Excluded";
  confidence: number;
  selected: boolean;
  previewVariant: "home" | "workout" | "onboarding" | "progress" | "debug";
};

export type ScreenshotTile = {
  id: string;
  screenName: string;
  stateName: string;
  previewVariant: "home" | "workout" | "progress";
};

export type ScreenshotGroup = {
  title: string;
  tiles: ScreenshotTile[];
};

export type MetadataField = {
  label: string;
  sourceLocale: string;
  targetLocale: string;
  sourceValue: string;
  targetValue: string;
  status: "Approved";
};

export type WorkflowStep = {
  id: string;
  title: string;
  description: string;
  icon: "folder" | "scan" | "review" | "camera" | "edit" | "export";
};

export type DashboardData = {
  projects: ProjectSummary[];
  planUsages: PlanUsage[];
  user: UserSummary;
  localizationTabs: LocalizationTab[];
  localizationRows: LocalizationRow[];
  screenStats: ScreenDiscoveryStat[];
  screenCandidates: ScreenCandidate[];
  screenshotGroups: ScreenshotGroup[];
  metadataFields: MetadataField[];
  workflowSteps: WorkflowStep[];
};
