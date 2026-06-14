import { describe, it, expect, mock } from "bun:test";
import { createRelatedTopicsController } from "../../src/controllers/related-topics.controller";

describe("RelatedTopicsController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { related_topics: {} } }),
    };
    const app = createRelatedTopicsController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/related-topics?keyword=chatgpt")
    );
    const body = await response.json();

    expect(body).toEqual({ data: { related_topics: {} } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ keyword: "chatgpt" });
  });

  it("returns error when keyword is missing", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ error: "keyword is required" }),
    };
    const app = createRelatedTopicsController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/related-topics")
    );
    const body = await response.json();

    expect(body).toEqual({ error: "keyword is required" });
  });
});
