import { spawn } from "node:child_process";

export function startDevelopmentServer(port, dataDirectory) {
  return spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev", "--port", String(port)],
    {
      env: {
        ...process.env,
        LOCALIZER_DATA_DIR: dataDirectory,
        NODE_ENV: "development",
      },
      stdio: "ignore",
    },
  );
}
