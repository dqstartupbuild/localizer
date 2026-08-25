export function createMcpError(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}
