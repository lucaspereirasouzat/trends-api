import { describe, expect, it, mock } from "bun:test";
import { RelatedTopicsController } from "../../src/controllers/related-topics.controller";

describe("RelatedTopicsController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { related_topics: {} } }),
    };
    const controller = new RelatedTopicsController(mockUseCase as any);

    const result = await controller.handle({ keyword: "chatgpt" });

    expect(result).toEqual({ data: { related_topics: {} } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ keyword: "chatgpt" });
  });

  it("returns error when keyword is missing", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ error: "keyword is required" }),
    };
    const controller = new RelatedTopicsController(mockUseCase as any);

    const result = await controller.handle({});

    expect(result).toEqual({ error: "keyword is required" });
  });
});
