export function getMcpTools() {
  return [
    {
      name: "get_localization_workflow_route",
      description:
        "Return the lowest-token tool for a localization phase. Call this only when the agent cannot use `localizer route --phase …` locally; it does not scan the app.",
      inputSchema: {
        type: "object",
        properties: {
          phase: {
            type: "string",
            enum: ["setup", "inventory", "translate", "resolve", "certify"],
          },
        },
      },
    },
    {
      name: "scan_localization_sources",
      description:
        "Read the current app source and return every string Localizer can safely import today. This is an inventory, not proof that the app is fully localized.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "inspect_xcode_localization",
      description:
        "Inspect Xcode project files and string catalogs. Use this before changing catalog ownership or target membership.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "audit_localization_readiness",
      description:
        "Return action-required source and Xcode integration findings. It never reports an arbitrary app as 100% localized automatically.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "get_localization_project",
      description:
        "Read the connected project, source strings, approved translations, enabled locales, and current revision before preparing a translation batch.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "save_localization_translations",
      description:
        "Atomically save an agent-reviewed batch of translations. The expected revision must match get_localization_project so concurrent edits cannot be overwritten.",
      inputSchema: {
        type: "object",
        required: ["expectedRevision", "translations"],
        properties: {
          expectedRevision: { type: "integer", minimum: 0 },
          translations: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["stableKey", "locale", "value"],
              properties: {
                stableKey: { type: "string" },
                locale: { type: "string" },
                value: { type: "string" },
              },
            },
          },
        },
      },
    },
    {
      name: "get_full_localization_task",
      description:
        "Return a source-change checklist for an agent to make this app fully localizable, including SwiftUI, UIKit, pluralization, interpolation, resources, and validation.",
      inputSchema: { type: "object", properties: {} },
    },
  ];
}
