import { Elysia } from "elysia";
import type { InterestOverTimeUseCase } from "../use-cases/interest-over-time.use-case";

export function createInterestOverTimeController(useCase: InterestOverTimeUseCase) {
  return new Elysia().get("/interest-over-time", async ({ query }) => {
    return useCase.execute(query);
  });
}
