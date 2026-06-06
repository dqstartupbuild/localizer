import { type ReactNode } from "react";

type PanelProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  toolbar?: ReactNode;
};

export function Panel({ title, eyebrow, children, toolbar }: PanelProps) {
  return (
    <section className="min-w-0 rounded-lg border border-[#E5E7EB] bg-white">
      <div className="flex min-h-14 items-start justify-between gap-4 border-b border-[#E5E7EB] px-4 py-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-[#111827]">{title}</h2>
          {eyebrow ? (
            <p className="mt-1 truncate text-xs text-[#6B7280]">{eyebrow}</p>
          ) : null}
        </div>
        {toolbar ? <div className="shrink-0">{toolbar}</div> : null}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
