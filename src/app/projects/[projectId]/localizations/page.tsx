import { notFound } from "next/navigation";
import { AppShell } from "~/features/dashboard/components/AppShell";
import { PageHeader } from "~/features/dashboard/components/PageHeader";
import { Panel } from "~/features/dashboard/components/Panel";
import { TranslationEditor } from "~/features/dashboard/components/TranslationEditor";
import { LocaleSelector } from "~/features/dashboard/components/LocaleSelector";
import { LocalizationStatus } from "~/features/dashboard/components/LocalizationStatus";
import { getProject } from "~/server/localizer/services/getProject";
import { requireDevelopmentWorkspace } from "~/server/localizer/services/requireDevelopmentWorkspace";
import { ProductionPreviewLocalizationsPage } from "~/features/dashboard/pages/ProductionPreviewLocalizationsPage";
import { getProductionPreviewProject } from "~/server/localizer/preview/getProductionPreviewProject";
import { resolveDashboardWorkspace } from "~/server/localizer/workspace/resolveDashboardWorkspace";

export const dynamic = "force-dynamic";

export default async function LocalizationsRoute({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const projectId = (await params).projectId;
  if (resolveDashboardWorkspace().mode === "public-preview") {
    const project = getProductionPreviewProject(projectId);
    if (!project) notFound();
    return <ProductionPreviewLocalizationsPage project={project} />;
  }
  requireDevelopmentWorkspace();
  const project = await getProject(projectId);
  if (!project) notFound();
  const targetLocales = project.locales.filter(
    (item) => item !== project.sourceLocale,
  );
  const requestedLocale = (await searchParams).locale;
  const locale = targetLocales.includes(requestedLocale ?? "")
    ? requestedLocale
    : targetLocales[0];
  const strings = project.strings;
  return (
    <AppShell dashboardMode="local" activeProjectId={project.id}>
      <PageHeader
        eyebrow={project.name}
        title="Translations"
        description={
          locale
            ? `Edit the ${locale} translations here. When you are done, run sync inside your iOS project.`
            : "Add a translation language before editing translations."
        }
        actions={
          locale ? (
            <LocaleSelector locales={targetLocales} value={locale} />
          ) : undefined
        }
      />
      <div className="space-y-4">
        {!project.analysis ? (
          <Panel title="Waiting for app text">
            <p className="text-sm text-[#6B7280]">
              Run the project&apos;s setup command inside your iOS project. The
              text Localizer finds will appear here.
            </p>
          </Panel>
        ) : null}
        {strings.map((source, index) => (
          <Panel key={source.stableKey} title={`App text ${index + 1}`}>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.7fr)]">
              <div>
                <p className="text-sm font-semibold break-words text-[#111827]">
                  {source.sourceText}
                </p>
                <p className="mt-2 text-xs text-[#6B7280]">
                  Key: {source.stableKey}
                </p>
                <p className="mt-2 text-xs break-words text-[#6B7280]">
                  Found in{" "}
                  {source.occurrences
                    .map((item) => `${item.file}:${item.line}`)
                    .join(", ")}
                </p>
                <div className="mt-2">
                  <LocalizationStatus
                    status={
                      source.stale
                        ? "stale"
                        : (source.translations.find(
                            (item) => item.locale === locale,
                          )?.status ?? "missing")
                    }
                  />
                </div>
              </div>
              {locale && !source.stale ? (
                <TranslationEditor
                  key={`${source.stableKey}:${locale}`}
                  projectId={project.id}
                  stableKey={source.stableKey}
                  locale={locale}
                  initialValue={
                    source.translations.find((item) => item.locale === locale)
                      ?.value ?? ""
                  }
                  revision={project.revision}
                  status={
                    source.translations.find((item) => item.locale === locale)
                      ?.status
                  }
                />
              ) : null}
            </div>
          </Panel>
        ))}
        {project.analysis &&
        strings.filter((source) => !source.stale).length === 0 ? (
          <Panel title="No supported strings found">
            <p className="text-sm text-[#6B7280]">
              The built-in scan only finds common SwiftUI text. If your app
              stores text another way, run <code>analyze --manifest</code> with
              a manifest file.
            </p>
          </Panel>
        ) : null}
      </div>
    </AppShell>
  );
}
