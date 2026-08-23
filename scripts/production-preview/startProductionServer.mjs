import { spawn } from "node:child_process";

export function startProductionServer(port) {
  return spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "--port", String(port)],
    { env: { ...process.env, NODE_ENV: "production" }, stdio: "ignore" },
  );
}
