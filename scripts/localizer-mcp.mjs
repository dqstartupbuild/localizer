import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { handleMcpRequest } from "../packages/localizer-cli/src/mcp/handleMcpRequest.mjs";

const root = await mkdtemp(join(tmpdir(), "localizer-mcp-"));
try {
  await mkdir(join(root, "Example.xcodeproj"));
  await mkdir(join(root, "Localizer", "Generated"), { recursive: true });
  await writeFile(
    join(root, "Localizer", "Generated", "Localizable.xcstrings"),
    "{}",
  );
  await writeFile(
    join(root, "Example.xcodeproj", "project.pbxproj"),
    `A1B2C3D4 /* Localizable.xcstrings */ = {isa = PBXFileReference; path = Localizable.xcstrings; };\nE5F6A7B8 /* Localizable.xcstrings in Resources */ = {isa = PBXBuildFile; fileRef = A1B2C3D4 /* Localizable.xcstrings */; };\nfiles = (\nE5F6A7B8 /* Localizable.xcstrings in Resources */,\n);`,
  );
  await writeFile(
    join(root, "ExampleView.swift"),
    [
      "import SwiftUI",
      'Text("Welcome")',
      'TextField("Your name", text: $name)',
      'let title = String(localized: "Settings")',
      'let existing = NSLocalizedString("Save", comment: "")',
      'Text("Hello, \\(name)")',
    ].join("\n"),
  );
  const initialize = await handleMcpRequest(root, {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: { protocolVersion: "2024-11-05" },
  });
  assert.equal(initialize.result.serverInfo.name, "localizer");
  const tools = await handleMcpRequest(root, {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list",
  });
  assert.equal(tools.result.tools.length, 7);
  const route = await handleMcpRequest(root, {
    jsonrpc: "2.0",
    id: 21,
    method: "tools/call",
    params: {
      name: "get_localization_workflow_route",
      arguments: { phase: "translate" },
    },
  });
  assert.equal(JSON.parse(route.result.content[0].text).recommendedTool, "mcp");
  const scan = await handleMcpRequest(root, {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: { name: "scan_localization_sources" },
  });
  const inventory = JSON.parse(scan.result.content[0].text);
  assert.deepEqual(inventory.strings.map((item) => item.sourceText).sort(), [
    "Save",
    "Settings",
    "Welcome",
    "Your name",
  ]);
  const inspection = await handleMcpRequest(root, {
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: { name: "inspect_xcode_localization" },
  });
  const xcode = JSON.parse(inspection.result.content[0].text);
  assert.deepEqual(xcode.projectFiles, ["Example.xcodeproj/project.pbxproj"]);
  assert.equal(
    xcode.catalogIntegration[0].presentInAnyResourcesBuildPhase,
    true,
  );
  const audit = await handleMcpRequest(root, {
    jsonrpc: "2.0",
    id: 5,
    method: "tools/call",
    params: { name: "audit_localization_readiness" },
  });
  const readiness = JSON.parse(audit.result.content[0].text);
  assert.equal(readiness.status, "action_required");
  assert.equal(readiness.dynamicLocalizableCallCount, 1);
  const task = await handleMcpRequest(root, {
    jsonrpc: "2.0",
    id: 6,
    method: "tools/call",
    params: { name: "get_full_localization_task" },
  });
  assert.equal(JSON.parse(task.result.content[0].text).agentWorkflow.length, 6);
  console.log("Localizer MCP contract passed.");
} finally {
  await rm(root, { recursive: true, force: true });
}
