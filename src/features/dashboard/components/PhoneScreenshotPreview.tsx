import { type ScreenshotTile } from "~/features/dashboard/types/dashboardData";

type PhoneScreenshotPreviewProps = {
  variant: ScreenshotTile["previewVariant"];
};

const accentClasses = {
  home: "bg-[#0F8F86]",
  workout: "bg-[#F2C94C]",
  progress: "bg-[#34D399]",
};

export function PhoneScreenshotPreview({
  variant,
}: PhoneScreenshotPreviewProps) {
  const isWorkout = variant !== "home";

  return (
    <div className="relative aspect-[1.52/1] overflow-hidden rounded-md bg-[#111827] p-3 text-white">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-2 w-16 rounded-full bg-white/25" />
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/30" />
        </div>
      </div>
      {isWorkout ? (
        <div className="flex h-[70%] items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-full border-4 border-[#374151]">
            <span
              className={`flex size-12 items-center justify-center rounded-full ${accentClasses[variant]} text-sm font-semibold text-[#111827]`}
            >
              30
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className={`aspect-square rounded-md ${
                index % 5 === 0 ? accentClasses[variant] : "bg-white/18"
              }`}
            />
          ))}
        </div>
      )}
      <div className="absolute right-3 bottom-2 left-3 h-1 rounded-full bg-white/15" />
    </div>
  );
}
