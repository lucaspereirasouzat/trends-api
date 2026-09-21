import { describe, expect, it, mock } from "bun:test";
import { AutocompleteController } from "../../src/controllers/autocomplete.controller";

describe("AutocompleteController", () => {
  it("delegates query to use-case and returns result", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { suggestions: ["test"] } }),
    };
    const controller = new AutocompleteController(mockUseCase as any);

    const result = await controller.handle({ keyword: "bitcoin" });

    expect(result).toEqual({ data: { suggestions: ["test"] } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ keyword: "bitcoin" });
  });

  it("returns error when keyword is missing", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ error: "keyword is required" }),
    };
    const controller = new AutocompleteController(mockUseCase as any);

    const result = await controller.handle({});

    expect(result).toEqual({ error: "keyword is required" });
  });
});
