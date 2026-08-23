export function getPublicAction() {
  const isLocalEnvironment =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

  return isLocalEnvironment
    ? { href: "/projects", label: "Open dashboard" }
    : { href: "/support", label: "Run Localizer locally" };
}
