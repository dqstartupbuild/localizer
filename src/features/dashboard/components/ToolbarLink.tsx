import Link from "next/link";
import { type ReactNode } from "react";

type ToolbarLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "dark";
};

const variantClasses = {
  primary: "border-[#08766F] bg-[#08766F] text-white hover:bg-[#0D7D75]",
  secondary: "border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F7F9F8]",
  dark: "border-[#111827] bg-[#111827] text-white hover:bg-[#1F2937]",
};

export function ToolbarLink({
  href,
  children,
  icon,
  variant = "secondary",
}: ToolbarLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-medium transition ${variantClasses[variant]}`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
