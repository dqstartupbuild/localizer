import { type ReactNode } from "react";

type EmptyStatePanelProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyStatePanel({
  title,
  description,
  action,
}: EmptyStatePanelProps) {
  return (
    <section className="rounded-lg border border-dashed border-[#D1D5DB] bg-white p-6 text-center">
      <h2 className="text-base font-semibold text-[#111827]">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#6B7280]">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </section>
  );
}
