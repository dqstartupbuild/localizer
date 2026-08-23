import type { SidebarIconName } from "~/features/dashboard/components/SidebarNavItem";

type SidebarNavigationItem = {
  label: string;
  icon: SidebarIconName;
  href: string;
  matchPaths?: readonly string[];
};

export function createSidebarNavigationItems(
  activeProjectId: string | undefined,
  isLocalWorkspace: boolean,
): SidebarNavigationItem[] {
  const projectsItem: SidebarNavigationItem = {
    label: "Projects",
    icon: "folder",
    href: "/projects",
    matchPaths: ["/projects", "/projects/new"],
  };
  if (isLocalWorkspace && !activeProjectId) return [projectsItem];
  const projectHref = activeProjectId
    ? `/projects/${activeProjectId}`
    : "/projects";
  const connectedItems: SidebarNavigationItem[] = [
    projectsItem,
    { label: "Overview", icon: "overview", href: `${projectHref}/overview` },
    {
      label: "Localizations",
      icon: "languages",
      href: `${projectHref}/localizations`,
    },
    { label: "Activity", icon: "activity", href: `${projectHref}/activity` },
  ];
  if (isLocalWorkspace) return connectedItems;
  return [
    ...connectedItems.slice(0, 3),
    {
      label: "Screen Discovery",
      icon: "scan",
      href: `${projectHref}/screen-discovery`,
    },
    {
      label: "Screenshots",
      icon: "camera",
      href: `${projectHref}/screenshots`,
    },
    { label: "Metadata", icon: "file", href: `${projectHref}/metadata` },
    connectedItems[3]!,
    { label: "Settings", icon: "settings", href: "/settings" },
  ];
}
