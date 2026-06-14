import { Elysia } from "elysia";
import type { RelatedQueriesController } from "../controllers/related-queries.controller";

export function relatedQueriesRoute(controller: RelatedQueriesController) {
  return new Elysia().get("/related-queries", async ({ query }) => {
    return controller.handle(query);
  });
}
