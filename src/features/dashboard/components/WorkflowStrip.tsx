import { ArrowRight } from "lucide-react";
import { type WorkflowStep } from "~/features/dashboard/types/dashboardData";
import { WorkflowStepItem } from "~/features/dashboard/components/WorkflowStepItem";

type WorkflowStripProps = {
  steps: WorkflowStep[];
};

export function WorkflowStrip({ steps }: WorkflowStripProps) {
  return (
    <section className="rounded-lg border border-[#E5E7EB] bg-white p-4">
      <div className="grid gap-4 xl:grid-cols-[150px_1fr]">
        <div>
          <h2 className="text-base font-semibold text-[#111827]">
            Localization Workflow
          </h2>
        </div>
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto xl:overflow-hidden">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex shrink-0 items-center gap-2 xl:min-w-0 xl:flex-1 xl:shrink"
            >
              <WorkflowStepItem step={step} />
              {index < steps.length - 1 ? (
                <ArrowRight size={17} className="shrink-0 text-[#6B7280]" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
