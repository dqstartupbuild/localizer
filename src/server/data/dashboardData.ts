import { type DashboardData } from "~/features/dashboard/types/dashboardData";

export const dashboardData: DashboardData = {
  projects: [
    {
      id: "calisthenics-guppy",
      name: "Calisthenics Guppy",
      appType: "iOS App",
      localeCount: 12,
      updatedAgo: "2h ago",
      logoVariant: "calisthenics",
      selected: true,
      metrics: [
        { label: "Translations", value: 98, tone: "teal" },
        { label: "Screenshots", value: 96, tone: "teal" },
        { label: "Metadata", value: 100, tone: "teal" },
      ],
    },
    {
      id: "tweet-dump",
      name: "Tweet Dump",
      appType: "iOS App",
      localeCount: 8,
      updatedAgo: "1d ago",
      logoVariant: "tweet",
      selected: false,
      metrics: [
        { label: "Translations", value: 87, tone: "teal" },
        { label: "Screenshots", value: 72, tone: "gold" },
        { label: "Metadata", value: 100, tone: "teal" },
      ],
    },
    {
      id: "sleep-tracker",
      name: "Sleep Tracker",
      appType: "iOS App",
      localeCount: 6,
      updatedAgo: "3d ago",
      logoVariant: "sleep",
      selected: false,
      metrics: [
        { label: "Translations", value: 91, tone: "teal" },
        { label: "Screenshots", value: 83, tone: "teal" },
        { label: "Metadata", value: 75, tone: "gold" },
      ],
    },
  ],
  planUsages: [
    { label: "Translations", value: "248,320 / 500,000", percentage: 50 },
    { label: "Screenshots", value: "1,250 / 5,000", percentage: 25 },
  ],
  user: {
    initials: "JD",
    name: "John Doe",
    email: "john@doe.dev",
  },
  overviewStats: [
    {
      label: "Translations",
      value: "1,210 / 1,234",
      detail: "24 strings need review",
      tone: "teal",
    },
    {
      label: "Selected Screens",
      value: "10",
      detail: "6 excluded from screenshot runs",
      tone: "teal",
    },
    {
      label: "Screenshot Matrix",
      value: "90 captures",
      detail: "9 locales across selected states",
      tone: "gold",
    },
    {
      label: "Last Analysis",
      value: "2h ago",
      detail: "CLI v0.1.0, Xcode 17",
      tone: "slate",
    },
  ],
  supportedLocales: [
    { code: "en-US", name: "English", enabled: true, completion: 100 },
    { code: "es-ES", name: "Spanish", enabled: true, completion: 98 },
    { code: "fr-FR", name: "French", enabled: true, completion: 94 },
    { code: "de-DE", name: "German", enabled: true, completion: 91 },
    { code: "it-IT", name: "Italian", enabled: true, completion: 88 },
    { code: "ja-JP", name: "Japanese", enabled: true, completion: 83 },
    { code: "ko-KR", name: "Korean", enabled: false, completion: 0 },
    { code: "pt-BR", name: "Portuguese", enabled: false, completion: 0 },
    {
      code: "zh-Hans",
      name: "Chinese Simplified",
      enabled: false,
      completion: 0,
    },
  ],
  setupSteps: [
    {
      title: "Project created",
      description: "Calisthenics Guppy is connected to this workspace.",
      status: "Complete",
    },
    {
      title: "Install CLI",
      description: "Run npx localizer init inside the iOS app repository.",
      status: "Complete",
    },
    {
      title: "Review screens",
      description: "Confirm screenshot screens and states before generation.",
      status: "Current",
    },
    {
      title: "Generate assets",
      description: "Create translations, resources, metadata, and screenshots.",
      status: "Waiting",
    },
  ],
  localizationTabs: [
    { label: "All Strings", active: true },
    { label: "Needs Review", count: 32, active: false },
    { label: "Untranslated", count: 12, active: false },
    { label: "Overrides", count: 24, active: false },
  ],
  localizationRows: [
    {
      keyName: "welcome_back_title",
      sourceText: "Welcome back",
      translatedText: "Bienvenido de nuevo",
      status: "Approved",
      source: "HomeView.swift:42",
    },
    {
      keyName: "start_workout_button",
      sourceText: "Start Workout",
      translatedText: "Comenzar entrenamiento",
      status: "Approved",
      source: "WorkoutView.swift:88",
    },
    {
      keyName: "no_workouts_title",
      sourceText: "No Workouts Yet",
      translatedText: "Aun no hay entrenamientos",
      status: "Edited",
      source: "EmptyStateView.swift:23",
    },
    {
      keyName: "premium_upgrade_title",
      sourceText: "Unlock Your Potential",
      translatedText: "Desbloquea tu potencial",
      status: "Edited",
      source: "PremiumView.swift:15",
    },
    {
      keyName: "continue_button",
      sourceText: "Continue",
      translatedText: "Continuar",
      status: "Approved",
      source: "Common.swift:12",
    },
    {
      keyName: "cancel_button",
      sourceText: "Cancel",
      translatedText: "Cancelar",
      status: "Approved",
      source: "Common.swift:13",
    },
  ],
  screenStats: [
    { label: "Detected Screens", value: 24 },
    { label: "Selected", value: 10 },
    { label: "Excluded", value: 6 },
  ],
  screenCandidates: [
    {
      id: "home-view",
      name: "HomeView",
      description: "Main dashboard with today's overview and quick actions.",
      status: "Selected",
      confidence: 99,
      selected: true,
      previewVariant: "home",
    },
    {
      id: "workout-detail-view",
      name: "WorkoutDetailView",
      description: "Detailed view for a specific workout.",
      status: "Selected",
      confidence: 93,
      selected: true,
      previewVariant: "workout",
    },
    {
      id: "onboarding-view",
      name: "OnboardingView",
      description: "Introduction flow for new users.",
      status: "Excluded",
      confidence: 60,
      selected: false,
      previewVariant: "onboarding",
    },
    {
      id: "progress-view",
      name: "ProgressView",
      description: "User progress and statistics.",
      status: "Selected",
      confidence: 90,
      selected: true,
      previewVariant: "progress",
    },
    {
      id: "debug-view",
      name: "DebugView",
      description: "Internal debug and testing tools.",
      status: "Excluded",
      confidence: 20,
      selected: false,
      previewVariant: "debug",
    },
  ],
  stateCandidates: [
    {
      id: "home-default-state",
      screenName: "Home",
      stateName: "Default",
      setupStrategy: "navigation_only",
      confidence: 96,
      selected: true,
    },
    {
      id: "home-no-data-state",
      screenName: "Home",
      stateName: "No Data",
      setupStrategy: "launch_argument",
      confidence: 88,
      selected: true,
    },
    {
      id: "progress-active-state",
      screenName: "Progress",
      stateName: "Active User",
      setupStrategy: "generated_preview_host",
      confidence: 84,
      selected: true,
    },
    {
      id: "workout-completed-state",
      screenName: "Workout Detail",
      stateName: "Completed",
      setupStrategy: "launch_argument",
      confidence: 90,
      selected: true,
    },
    {
      id: "debug-internal-state",
      screenName: "DebugView",
      stateName: "Internal Tools",
      setupStrategy: "navigation_only",
      confidence: 22,
      selected: false,
    },
  ],
  screenshotGroups: [
    {
      title: "Home",
      tiles: [
        {
          id: "home-default",
          screenName: "Home",
          stateName: "Default",
          previewVariant: "home",
        },
        {
          id: "home-no-data",
          screenName: "Home",
          stateName: "No Data",
          previewVariant: "home",
        },
        {
          id: "home-active-user",
          screenName: "Home",
          stateName: "Active User",
          previewVariant: "home",
        },
      ],
    },
    {
      title: "Workout Detail",
      tiles: [
        {
          id: "workout-default",
          screenName: "Workout Detail",
          stateName: "Default",
          previewVariant: "workout",
        },
        {
          id: "workout-timer-running",
          screenName: "Workout Detail",
          stateName: "Timer Running",
          previewVariant: "workout",
        },
        {
          id: "workout-completed",
          screenName: "Workout Detail",
          stateName: "Completed",
          previewVariant: "progress",
        },
      ],
    },
  ],
  metadataFields: [
    {
      label: "Subtitle",
      sourceLocale: "English (en)",
      targetLocale: "French (fr)",
      sourceValue: "The ultimate calisthenics training app",
      targetValue: "L'application ultime pour l'entrainement au poids du corps",
      status: "Approved",
    },
    {
      label: "Description",
      sourceLocale: "English (en)",
      targetLocale: "French (fr)",
      sourceValue:
        "Build strength, get fit, and achieve your goals with personalized calisthenics workouts. No equipment needed.",
      targetValue:
        "Developpez votre force, ameliorez votre forme et atteignez vos objectifs grace a des entrainements de calisthenics personnalises. Aucun equipement requis.",
      status: "Approved",
    },
    {
      label: "Keywords",
      sourceLocale: "English (en)",
      targetLocale: "French (fr)",
      sourceValue: "calisthenics, workout, fitness, home workout, bodyweight",
      targetValue:
        "calisthenics, entrainement, fitness, entrainement a domicile, poids du corps",
      status: "Approved",
    },
    {
      label: "Promotional Text",
      sourceLocale: "English (en)",
      targetLocale: "French (fr)",
      sourceValue: "NEW: Advanced progress tracking and custom workout plans!",
      targetValue:
        "NOUVEAU : suivi avance des progres et plans d'entrainement personnalises !",
      status: "Approved",
    },
  ],
  activityEvents: [
    {
      id: "analysis-complete",
      title: "Localization analysis completed",
      description:
        "Found 1,234 user-facing strings, 24 screen candidates, and 18 likely states.",
      timestamp: "2h ago",
      status: "Complete",
    },
    {
      id: "translations-complete",
      title: "Machine translations generated",
      description:
        "Created missing Spanish, French, German, Italian, and Japanese values without touching manual overrides.",
      timestamp: "1h ago",
      status: "Complete",
    },
    {
      id: "screens-waiting",
      title: "Screen review waiting",
      description:
        "Screenshot generation is paused until selected screens and states are confirmed.",
      timestamp: "Now",
      status: "Waiting",
    },
    {
      id: "metadata-ready",
      title: "Metadata localization ready",
      description:
        "App Store subtitle, description, keywords, and promotional text are ready for review.",
      timestamp: "18m ago",
      status: "Complete",
    },
  ],
  buildSettings: [
    {
      label: "Resource format",
      value: "String Catalog",
      description: "Generate Localizable.xcstrings for modern Xcode projects.",
    },
    {
      label: "Build generation",
      value: "Local cache",
      description:
        "Normal builds use .localizer/translations-cache.json without network access.",
    },
    {
      label: "Generated files",
      value: "Committed",
      description:
        "Generated resources and typed accessors are committed for clean checkouts.",
    },
    {
      label: "Protected terms",
      value: "12 terms",
      description:
        "App name, brand terms, and product names stay untranslated.",
    },
  ],
  workflowSteps: [
    {
      id: "add-project",
      title: "1. Add Project",
      description: "Create a new project and connect your app",
      icon: "folder",
    },
    {
      id: "analyze",
      title: "2. Analyze",
      description: "Localizer scans your app and finds everything",
      icon: "scan",
    },
    {
      id: "review",
      title: "3. Review",
      description: "Review screens, states, and select locales",
      icon: "review",
    },
    {
      id: "generate",
      title: "4. Generate",
      description: "Translate and capture screenshots",
      icon: "camera",
    },
    {
      id: "edit",
      title: "5. Review & Edit",
      description: "Review everything and make any edits",
      icon: "edit",
    },
    {
      id: "export",
      title: "6. Export & Deploy",
      description: "Build and ship your localized app",
      icon: "export",
    },
  ],
};
