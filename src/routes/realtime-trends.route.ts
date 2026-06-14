import { Elysia } from "elysia";
import type { RealtimeTrendsController } from "../controllers/realtime-trends.controller";

export function realtimeTrendsRoute(controller: RealtimeTrendsController) {
  return new Elysia().get("/realtime-trends", async ({ query }) => {
    return controller.handle(query);
  });
}
