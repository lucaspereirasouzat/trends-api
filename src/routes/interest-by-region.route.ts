import { Elysia } from "elysia";
import type { InterestByRegionController } from "../controllers/interest-by-region.controller";

export function interestByRegionRoute(controller: InterestByRegionController) {
  return new Elysia().get("/interest-by-region", async ({ query }) => {
    return controller.handle(query);
  });
}
