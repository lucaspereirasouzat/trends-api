import { Elysia } from "elysia";
import type { RealtimeTrendsUseCase } from "../use-cases/realtime-trends.use-case";

export function createRealtimeTrendsController(useCase: RealtimeTrendsUseCase) {
  return new Elysia().get("/realtime-trends", async ({ query }) => {
    return useCase.execute(query);
  });
}
