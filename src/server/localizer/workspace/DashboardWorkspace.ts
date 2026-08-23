import type { DashboardMode } from "~/features/dashboard/types/DashboardMode";

export type DashboardWorkspace = {
  mode: DashboardMode;
  label: "Local workspace" | "Public preview";
};
