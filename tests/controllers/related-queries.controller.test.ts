import { describe, it, expect, mock } from "bun:test";
import { RelatedQueriesController } from "../../src/controllers/related-queries.controller";

describe("RelatedQueriesController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { related_queries: {} } }),
    };
    const controller = new RelatedQueriesController(mockUseCase as any);

    const result = await controller.handle({ keyword: "machine learning" });

    expect(result).toEqual({ data: { related_queries: {} } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ keyword: "machine learning" });
  });

  it("returns error when keyword is missing", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ error: "keyword is required" }),
    };
    const controller = new RelatedQueriesController(mockUseCase as any);

    const result = await controller.handle({});

    expect(result).toEqual({ error: "keyword is required" });
  });
});
