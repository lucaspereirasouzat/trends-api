import { Elysia } from "elysia";
import type { RelatedTopicsUseCase } from "../use-cases/related-topics.use-case";

export function createRelatedTopicsController(useCase: RelatedTopicsUseCase) {
  return new Elysia().get("/related-topics", async ({ query }) => {
    return useCase.execute(query);
  });
}
