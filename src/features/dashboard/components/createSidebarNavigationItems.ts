import type { SidebarIconName } from "~/features/dashboard/components/SidebarNavItem";
type SidebarNavigationItem = {
  label: string;
  icon: SidebarIconName;
  href: string;
  matchPaths?: readonly string[];
};

export function createSidebarNavigationItems(
  activeProjectId: string | undefined,
): SidebarNavigationItem[] {
  const projectsItem: SidebarNavigationItem = {
    label: "Projects",
    icon: "folder",
    href: "/projects",
    matchPaths: ["/projects", "/projects/new"],
  };
  if (!activeProjectId) return [projectsItem];
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
  return connectedItems;
}
