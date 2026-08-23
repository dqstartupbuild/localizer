"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateProjectForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  async function createProject(formData: FormData) {
    setPending(true);
    setError(null);
    const response = await fetch("/api/localizer/v1/projects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        sourceLocale: formData.get("sourceLocale"),
        locales: formData
          .getAll("locales")
          .filter((locale): locale is string => typeof locale === "string"),
      }),
    });
    const body: unknown = await response.json();
    const errorMessage =
      typeof body === "object" &&
      body &&
      "error" in body &&
      typeof body.error === "object" &&
      body.error &&
      "message" in body.error &&
      typeof body.error.message === "string"
        ? body.error.message
        : "Could not create the project.";
    if (!response.ok) {
      setError(errorMessage);
      setPending(false);
      return;
    }
    const projectId =
      typeof body === "object" &&
      body &&
      "project" in body &&
      typeof body.project === "object" &&
      body.project &&
      "id" in body.project &&
      typeof body.project.id === "string"
        ? body.project.id
        : null;
    if (!projectId) {
      setError("The server returned an invalid project.");
      setPending(false);
      return;
    }
    router.push(`/projects/${projectId}/overview`);
  }
  return (
    <form action={createProject} className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-[#111827]">App name</span>
        <input
          required
          name="name"
          placeholder="My iOS app"
          className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-sm outline-none focus:border-[#08766F]"
        />
        <span className="mt-2 block text-xs text-[#6B7280]">
          This name is only used in the dashboard. It will not be translated.
        </span>
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-[#111827]">
          Original language
        </span>
        <select
          name="sourceLocale"
          defaultValue="en-US"
          className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-3 text-sm"
        >
          <option value="en-US">English (United States)</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-[#111827]">
          Translation languages
        </span>
        <select
          name="locales"
          defaultValue={["es-ES"]}
          multiple
          size={4}
          className="mt-2 w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
        >
          <option value="es-ES">Spanish (Spain)</option>
          <option value="fr-FR">French (France)</option>
          <option value="de-DE">German (Germany)</option>
          <option value="ja-JP">Japanese</option>
        </select>
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        disabled={pending}
        className="rounded-md bg-[#08766F] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Creating…" : "Create project"}
      </button>
    </form>
  );
}
