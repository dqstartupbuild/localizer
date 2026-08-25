import { createLocalizationWorkflowRoute } from "./createLocalizationWorkflowRoute.mjs";

export function runLocalizationRoute(options) {
  const phase = typeof options.phase === "string" ? options.phase : "inventory";
  console.log(JSON.stringify(createLocalizationWorkflowRoute(phase), null, 2));
}
