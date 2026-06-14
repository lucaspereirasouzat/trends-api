import { Elysia } from "elysia";
import type { DailyTrendsController } from "../controllers/daily-trends.controller";

export function dailyTrendsRoute(controller: DailyTrendsController) {
  return new Elysia().get("/daily-trends", async ({ query }) => {
    return controller.handle(query);
  });
}
