export async function requestText(origin, path) {
  const response = await fetch(`${origin}${path}`);
  return { response, text: await response.text() };
}
