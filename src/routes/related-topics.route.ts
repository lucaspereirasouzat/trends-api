import { Elysia } from "elysia";
import type { RelatedTopicsController } from "../controllers/related-topics.controller";

export function relatedTopicsRoute(controller: RelatedTopicsController) {
  return new Elysia().get("/related-topics", async ({ query }) => {
    return controller.handle(query);
  });
}
