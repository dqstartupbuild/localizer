import {
  Camera,
  Edit3,
  FolderPlus,
  Languages,
  ScanSearch,
  Upload,
} from "lucide-react";
import { type WorkflowStep } from "~/features/dashboard/types/dashboardData";

type WorkflowStepItemProps = {
  step: WorkflowStep;
};

const workflowIcons = {
  folder: FolderPlus,
  scan: ScanSearch,
  review: Languages,
  camera: Camera,
  edit: Edit3,
  export: Upload,
};

export function WorkflowStepItem({ step }: WorkflowStepItemProps) {
  const Icon = workflowIcons[step.icon];

  return (
    <div className="flex min-w-[128px] items-center gap-2 xl:min-w-0">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F6F3] text-[#08766F]">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-xs font-semibold text-[#111827]">
          {step.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#6B7280]">
          {step.description}
        </p>
      </div>
    </div>
  );
}
