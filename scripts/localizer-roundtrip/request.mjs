export async function request(apiUrl, path, options) {
  const response = await fetch(`${apiUrl}${path}`, options);
  const body = await response.json();
  return { response, body };
}
