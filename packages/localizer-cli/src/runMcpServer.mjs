import { createInterface } from "node:readline";
import { handleMcpRequest } from "./mcp/handleMcpRequest.mjs";

export async function runMcpServer(root) {
  const input = createInterface({ input: process.stdin, crlfDelay: Infinity });
  for await (const line of input) {
    if (!line.trim()) continue;
    let request;
    try {
      request = JSON.parse(line);
    } catch {
      process.stdout.write(
        `${JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error." } })}\n`,
      );
      continue;
    }
    const response = await handleMcpRequest(root, request);
    if (response) process.stdout.write(`${JSON.stringify(response)}\n`);
  }
}
