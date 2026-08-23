import { Terminal } from "lucide-react";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { ToolbarButton } from "~/features/dashboard/components/ToolbarButton";

export function NewProjectPage() {
  return (
    <AppShell dashboardMode="local">
      <PageHeader
        title="Create Project"
        description="Create the Localizer project first, then run the CLI inside the iOS app repository to connect source analysis and generated resources."
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(360px,0.55fr)]">
        <Panel title="Project Details">
          <form className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-[#111827]">
                App Name
              </span>
              <input
                defaultValue="Calisthenics Guppy"
                className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#08766F]"
              />
              <span className="mt-2 block text-xs text-[#6B7280]">
                The app name is never translated.
              </span>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#111827]">
                Source Locale
              </span>
              <select className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#08766F]">
                <option>English (en-US)</option>
              </select>
            </label>
            <ToolbarButton variant="primary">Create Project</ToolbarButton>
          </form>
        </Panel>
        <Panel title="CLI Setup">
          <div className="rounded-lg bg-[#111827] p-4 text-white">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Terminal size={16} />
              Run inside your iOS app
            </div>
            <code className="block rounded-md bg-black/20 p-3 text-sm">
              npx localizer init
            </code>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#6B7280]">
            The CLI analyzes SwiftUI views, UIKit controllers, user-facing text,
            screen states, and screenshot candidates locally before uploading a
            normalized manifest.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
