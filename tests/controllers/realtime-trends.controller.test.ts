import { describe, it, expect, mock } from "bun:test";
import { RealtimeTrendsController } from "../../src/controllers/realtime-trends.controller";

describe("RealtimeTrendsController", () => {
  it("delegates query to use-case with empty query", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { trendingStories: [] } }),
    };
    const controller = new RealtimeTrendsController(mockUseCase as any);

    const result = await controller.handle({});

    expect(result).toEqual({ data: { trendingStories: [] } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({});
  });

  it("passes geo and category params through", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: {} }),
    };
    const controller = new RealtimeTrendsController(mockUseCase as any);

    await controller.handle({ geo: "BR", category: "business" });

    expect(mockUseCase.execute).toHaveBeenCalledWith({ geo: "BR", category: "business" });
  });
});
