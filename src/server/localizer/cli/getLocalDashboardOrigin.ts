const localHostPattern = /^(?:localhost|127\.0\.0\.1|\[::1\])(?::(\d{1,5}))?$/;

export function getLocalDashboardOrigin(requestHeaders: Headers) {
  const host = requestHeaders.get("host");
  const match = host?.match(localHostPattern);
  const port = match?.[1] ? Number(match[1]) : null;
  if (match && (port === null || (port >= 1 && port <= 65_535))) {
    return `http://${host}`;
  }
  return "http://127.0.0.1:3000";
}
