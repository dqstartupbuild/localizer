import { type DashboardData } from "~/features/dashboard/types/dashboardData";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ProgressBar } from "~/features/dashboard/components/ProgressBar";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

type SettingsPageProps = {
  dashboard: DashboardData;
};

export function SettingsPage({ dashboard }: SettingsPageProps) {
  return (
    <AppShell dashboardMode="local">
      <PageHeader
        title="Settings"
        description="Control project locales, protected terms, generated resource behavior, and build-time generation defaults."
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(420px,0.7fr)]">
        <Panel title="Locales">
          <div className="grid gap-3 md:grid-cols-2">
            {dashboard.supportedLocales.map((locale) => (
              <label
                key={locale.code}
                className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] p-3"
              >
                <input
                  type="checkbox"
                  defaultChecked={locale.enabled}
                  className="size-4 accent-[#08766F]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#111827]">
                    {locale.name}
                  </span>
                  <span className="text-xs text-[#6B7280]">{locale.code}</span>
                  <span className="mt-2 block">
                    <ProgressBar
                      value={locale.enabled ? locale.completion : 0}
                    />
                  </span>
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4">
            <ToolbarButton variant="primary">Save Locales</ToolbarButton>
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel title="Build Generation">
            <div className="space-y-3">
              {dashboard.buildSettings.map((setting) => (
                <div
                  key={setting.label}
                  className="rounded-lg border border-[#E5E7EB] p-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold text-[#111827]">
                      {setting.label}
                    </h2>
                    <span className="text-xs font-semibold text-[#08766F]">
                      {setting.value}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    {setting.description}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Protected Terms">
            <textarea
              rows={8}
              defaultValue={
                "Calisthenics Guppy\nGuppy Pro\nSpider-Man\nApple Watch"
              }
              className="w-full resize-none rounded-md border border-[#E5E7EB] bg-white p-3 text-sm leading-6 text-[#111827] outline-none focus:border-[#08766F]"
            />
            <div className="mt-4">
              <ToolbarButton variant="primary">Save Terms</ToolbarButton>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
