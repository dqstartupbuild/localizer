"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Camera,
  FilePenLine,
  Folder,
  Languages,
  LayoutDashboard,
  ScanSearch,
  Settings,
} from "lucide-react";

export type SidebarIconName =
  | "activity"
  | "camera"
  | "file"
  | "folder"
  | "languages"
  | "overview"
  | "scan"
  | "settings";

type SidebarNavItemProps = {
  label: string;
  icon: SidebarIconName;
  href: string;
  matchPaths?: readonly string[];
};

const sidebarIcons = {
  activity: Activity,
  camera: Camera,
  file: FilePenLine,
  folder: Folder,
  languages: Languages,
  overview: LayoutDashboard,
  scan: ScanSearch,
  settings: Settings,
};

export function SidebarNavItem({
  label,
  icon,
  href,
  matchPaths = [href],
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const Icon = sidebarIcons[icon];
  const active = matchPaths.some((path) => {
    if (path.endsWith("/*")) {
      return pathname.startsWith(path.slice(0, -1));
    }

    return pathname === path;
  });

  return (
    <Link
      href={href}
      className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm transition-colors ${
        active
          ? "font-semibold text-[#0E716A]"
          : "font-medium text-[#374151] hover:text-[#0E716A]"
      }`}
    >
      <Icon size={17} strokeWidth={2} />
      <span>{label}</span>
    </Link>
  );
}
