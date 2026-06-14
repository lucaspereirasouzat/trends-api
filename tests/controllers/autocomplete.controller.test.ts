import { describe, it, expect, mock } from "bun:test";
import { createAutocompleteController } from "../../src/controllers/autocomplete.controller";

describe("AutocompleteController", () => {
  it("delegates query to use-case and returns result", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { suggestions: ["test"] } }),
    };
    const app = createAutocompleteController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/autocomplete?keyword=bitcoin")
    );
    const body = await response.json();

    expect(body).toEqual({ data: { suggestions: ["test"] } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ keyword: "bitcoin" });
  });

  it("returns error when keyword is missing", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ error: "keyword is required" }),
    };
    const app = createAutocompleteController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/autocomplete")
    );
    const body = await response.json();

    expect(body).toEqual({ error: "keyword is required" });
  });
});
