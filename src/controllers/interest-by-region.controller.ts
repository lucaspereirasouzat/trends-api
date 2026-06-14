import { Elysia } from "elysia";
import type { InterestByRegionUseCase } from "../use-cases/interest-by-region.use-case";

export function createInterestByRegionController(useCase: InterestByRegionUseCase) {
  return new Elysia().get("/interest-by-region", async ({ query }) => {
    return useCase.execute(query);
  });
}
