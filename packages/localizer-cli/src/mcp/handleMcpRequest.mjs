import { createLocalizationAudit } from "../createLocalizationAudit.mjs";
import { createLocalizationWorkflowRoute } from "../createLocalizationWorkflowRoute.mjs";
import { runNativeAnalyzer } from "../runNativeAnalyzer.mjs";
import { createFullLocalizationTask } from "./createFullLocalizationTask.mjs";
import { createMcpError } from "./createMcpError.mjs";
import { createMcpResponse } from "./createMcpResponse.mjs";
import { createMcpTextContent } from "./createMcpTextContent.mjs";
import { getMcpProject } from "./getMcpProject.mjs";
import { getMcpTools } from "./getMcpTools.mjs";
import { inspectXcodeLocalization } from "./inspectXcodeLocalization.mjs";
import { saveMcpTranslations } from "./saveMcpTranslations.mjs";

export async function handleMcpRequest(root, request) {
  if (request?.jsonrpc !== "2.0" || typeof request.method !== "string")
    return createMcpError(
      request?.id ?? null,
      -32600,
      "Invalid JSON-RPC request.",
    );
  if (request.method === "initialize")
    return createMcpResponse(request.id, {
      protocolVersion: request.params?.protocolVersion ?? "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "localizer", version: "0.1.0" },
    });
  if (request.method === "notifications/initialized") return null;
  if (request.method === "tools/list")
    return createMcpResponse(request.id, { tools: getMcpTools() });
  if (request.method !== "tools/call")
    return createMcpError(request.id ?? null, -32601, "Method not found.");
  if (request.params?.name === "scan_localization_sources")
    return createMcpResponse(
      request.id,
      createMcpTextContent({
        ...(await runNativeAnalyzer(root)),
        completeness: "partial",
        warning:
          "This scan is an inventory of supported source patterns, not a full-localization certificate.",
      }),
    );
  if (request.params?.name === "get_localization_workflow_route")
    return createMcpResponse(
      request.id,
      createMcpTextContent(
        createLocalizationWorkflowRoute(request.params.arguments?.phase),
      ),
    );
  if (request.params?.name === "get_localization_project")
    return createMcpResponse(
      request.id,
      createMcpTextContent(await getMcpProject(root)),
    );
  if (request.params?.name === "save_localization_translations")
    return createMcpResponse(
      request.id,
      createMcpTextContent(
        await saveMcpTranslations(root, request.params.arguments),
      ),
    );
  const xcode = await inspectXcodeLocalization(root);
  if (request.params?.name === "inspect_xcode_localization")
    return createMcpResponse(request.id, createMcpTextContent(xcode));
  if (request.params?.name === "audit_localization_readiness")
    return createMcpResponse(
      request.id,
      createMcpTextContent(
        createLocalizationAudit(await runNativeAnalyzer(root), xcode),
      ),
    );
  if (request.params?.name === "get_full_localization_task")
    return createMcpResponse(
      request.id,
      createMcpTextContent(createFullLocalizationTask(root, xcode)),
    );
  return createMcpError(request.id, -32602, "Unknown tool name.");
}
