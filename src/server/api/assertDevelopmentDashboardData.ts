import { TRPCError } from "@trpc/server";
import { resolveLocalWorkspace } from "~/server/localizer/identity/resolveLocalWorkspace";

export function assertDevelopmentDashboardData() {
  if (!resolveLocalWorkspace()) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message:
        "Dashboard prototype data is available only in local development.",
    });
  }
}
