import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { dashboardData } from "~/server/data/dashboardData";

export const dashboardRouter = createTRPCRouter({
  summary: publicProcedure.query(() => dashboardData),
});
