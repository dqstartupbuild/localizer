import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { assertDevelopmentDashboardData } from "~/server/api/assertDevelopmentDashboardData";
import { dashboardData } from "~/server/data/dashboardData";

export const dashboardRouter = createTRPCRouter({
  summary: publicProcedure.query(() => {
    assertDevelopmentDashboardData();
    return dashboardData;
  }),
});
