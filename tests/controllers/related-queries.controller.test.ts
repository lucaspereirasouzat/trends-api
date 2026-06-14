import { describe, it, expect, mock } from "bun:test";
import { createRelatedQueriesController } from "../../src/controllers/related-queries.controller";

describe("RelatedQueriesController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { related_queries: {} } }),
    };
    const app = createRelatedQueriesController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/related-queries?keyword=machine+learning")
    );
    const body = await response.json();

    expect(body).toEqual({ data: { related_queries: {} } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ keyword: "machine learning" });
  });

  it("returns error when keyword is missing", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ error: "keyword is required" }),
    };
    const app = createRelatedQueriesController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/related-queries")
    );
    const body = await response.json();

    expect(body).toEqual({ error: "keyword is required" });
  });
});
