import { Globe2 } from "lucide-react";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-full bg-[#08766F] text-white">
        <Globe2 size={19} strokeWidth={2.2} />
      </div>
      <div>
        <div className="text-xl font-semibold text-[#111827]">Localizer</div>
        <p className="text-xs text-[#6B7280]">
          Localize your app in 5 minutes.
        </p>
      </div>
    </div>
  );
}
