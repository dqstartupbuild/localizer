export async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  if (response.status === 304) return { response, data: null };
  const data = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(
      data?.error?.message ?? `Request failed with ${response.status}.`,
    );
  return { response, data };
}
