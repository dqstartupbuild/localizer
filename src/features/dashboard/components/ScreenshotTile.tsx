import { Download } from "lucide-react";
import { type ScreenshotTile as ScreenshotTileType } from "~/features/dashboard/types/dashboardData";
import { PhoneScreenshotPreview } from "~/features/dashboard/components/PhoneScreenshotPreview";

type ScreenshotTileProps = {
  tile: ScreenshotTileType;
};

export function ScreenshotTile({ tile }: ScreenshotTileProps) {
  return (
    <article>
      <div className="relative">
        <PhoneScreenshotPreview variant={tile.previewVariant} />
        <button
          type="button"
          aria-label={`Download ${tile.screenName} ${tile.stateName} screenshot`}
          className="absolute right-2 bottom-2 flex size-7 items-center justify-center rounded-md bg-white text-[#111827] shadow-sm transition hover:bg-[#E8F6F3]"
        >
          <Download size={14} />
        </button>
      </div>
      <p className="mt-2 truncate text-[11px] font-medium text-[#111827]">
        {tile.stateName}
      </p>
    </article>
  );
}
