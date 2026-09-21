import { Elysia } from "elysia";
import type { StoredDailyTrendsController } from "../controllers/stored-daily-trends.controller";

export function storedDailyTrendsRoute(
  controller: StoredDailyTrendsController,
) {
  return new Elysia().get("/daily-trends/stored", ({ query }) =>
    controller.handle({ geo: query.geo, trendDate: query.trendDate ?? "" }),
  );
}
