export function createMcpResponse(id, result) {
  return { jsonrpc: "2.0", id, result };
}
