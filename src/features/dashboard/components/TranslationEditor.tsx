"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TranslationEditorProps = {
  projectId: string;
  stableKey: string;
  locale: string;
  initialValue: string;
  revision: number;
  status?: "approved" | "needs_review";
};

export function TranslationEditor({
  projectId,
  stableKey,
  locale,
  initialValue,
  revision,
  status,
}: TranslationEditorProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  async function save() {
    setPending(true);
    setMessage(null);
    const response = await fetch(
      `/api/localizer/v1/projects/${projectId}/translations/${encodeURIComponent(stableKey)}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ expectedRevision: revision, locale, value }),
      },
    );
    const body: unknown = await response.json();
    setPending(false);
    const errorMessage =
      typeof body === "object" &&
      body &&
      "error" in body &&
      typeof body.error === "object" &&
      body.error &&
      "message" in body.error &&
      typeof body.error.message === "string"
        ? body.error.message
        : "Could not save this translation.";
    if (!response.ok) {
      setMessage(errorMessage);
      return;
    }
    setMessage("Saved. Run localizer sync to write the String Catalog.");
    router.refresh();
  }
  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-xs font-medium text-[#6B7280]">
          {locale} translation
        </span>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={4}
          className="mt-2 w-full resize-none rounded-md border border-[#E5E7EB] bg-white p-3 text-sm leading-6 outline-none focus:border-[#08766F]"
        />
      </label>
      {status === "needs_review" ? (
        <p className="text-xs text-[#8A5A13]">
          The source text changed. Saving this value approves it for the new
          source text.
        </p>
      ) : null}
      {message ? <p className="text-xs text-[#456a66]">{message}</p> : null}
      <button
        onClick={save}
        disabled={pending || !value.trim()}
        className="rounded-md bg-[#08766F] px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save translation"}
      </button>
    </div>
  );
}
