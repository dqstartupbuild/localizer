export async function waitForProductionPreview(origin) {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${origin}/projects`);
      if (response.ok) return;
    } catch {
      // The production server may not be listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Timed out waiting for the production preview server.");
}
