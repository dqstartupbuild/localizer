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

export type OverviewStat = {
  label: string;
  value: string;
  detail: string;
  tone: "teal" | "gold" | "slate";
};

export type LocaleOption = {
  code: string;
  name: string;
  enabled: boolean;
  completion: number;
};

export type SetupStep = {
  title: string;
  description: string;
  status: "Complete" | "Current" | "Waiting";
};

export type StateCandidate = {
  id: string;
  screenName: string;
  stateName: string;
  setupStrategy:
    | "navigation_only"
    | "launch_argument"
    | "generated_preview_host";
  confidence: number;
  selected: boolean;
};

export type ActivityEvent = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "Complete" | "Running" | "Waiting" | "Failed";
};

export type BuildSetting = {
  label: string;
  value: string;
  description: string;
};

export type DashboardData = {
  projects: ProjectSummary[];
  planUsages: PlanUsage[];
  user: UserSummary;
  overviewStats: OverviewStat[];
  supportedLocales: LocaleOption[];
  setupSteps: SetupStep[];
  localizationTabs: LocalizationTab[];
  localizationRows: LocalizationRow[];
  screenStats: ScreenDiscoveryStat[];
  screenCandidates: ScreenCandidate[];
  stateCandidates: StateCandidate[];
  screenshotGroups: ScreenshotGroup[];
  metadataFields: MetadataField[];
  activityEvents: ActivityEvent[];
  buildSettings: BuildSetting[];
  workflowSteps: WorkflowStep[];
};
