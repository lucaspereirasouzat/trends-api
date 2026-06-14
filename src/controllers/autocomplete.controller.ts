import { Elysia } from "elysia";
import type { AutocompleteUseCase } from "../use-cases/autocomplete.use-case";

export function createAutocompleteController(useCase: AutocompleteUseCase) {
  return new Elysia().get("/autocomplete", async ({ query }) => {
    return useCase.execute(query);
  });
}
