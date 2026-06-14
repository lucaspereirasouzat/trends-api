import { Elysia } from "elysia";
import type { InterestOverTimeController } from "../controllers/interest-over-time.controller";

export function interestOverTimeRoute(controller: InterestOverTimeController) {
  return new Elysia().get("/interest-over-time", async ({ query }) => {
    return controller.handle(query);
  });
}
