import { Elysia } from "elysia";
import type { RelatedQueriesUseCase } from "../use-cases/related-queries.use-case";

export function createRelatedQueriesController(useCase: RelatedQueriesUseCase) {
  return new Elysia().get("/related-queries", async ({ query }) => {
    return useCase.execute(query);
  });
}
