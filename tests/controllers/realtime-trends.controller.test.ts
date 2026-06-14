import { describe, it, expect, mock } from "bun:test";
import { createRealtimeTrendsController } from "../../src/controllers/realtime-trends.controller";

describe("RealtimeTrendsController", () => {
  it("delegates query to use-case with defaults", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { trendingStories: [] } }),
    };
    const app = createRealtimeTrendsController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/realtime-trends")
    );
    const body = await response.json();

    expect(body).toEqual({ data: { trendingStories: [] } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({});
  });

  it("passes geo and category params through", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: {} }),
    };
    const app = createRealtimeTrendsController(mockUseCase as any);

    await app.handle(
      new Request("http://localhost/realtime-trends?geo=BR&category=business")
    );

    expect(mockUseCase.execute).toHaveBeenCalledWith({ geo: "BR", category: "business" });
  });
});
