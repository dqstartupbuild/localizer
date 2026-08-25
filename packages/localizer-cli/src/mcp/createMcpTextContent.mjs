export function createMcpTextContent(value) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}
