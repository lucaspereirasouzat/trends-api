import { Elysia } from "elysia";
import type { DailyTrendsUseCase } from "../use-cases/daily-trends.use-case";

export function createDailyTrendsController(useCase: DailyTrendsUseCase) {
  return new Elysia().get("/daily-trends", async ({ query }) => {
    return useCase.execute(query);
  });
}
