import { Elysia } from "elysia";
import type { AutocompleteController } from "../controllers/autocomplete.controller";

export function autocompleteRoute(controller: AutocompleteController) {
  return new Elysia().get("/autocomplete", async ({ query }) => {
    return controller.handle(query);
  });
}
