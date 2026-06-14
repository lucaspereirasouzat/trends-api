import { describe, it, expect, mock } from "bun:test";
import { createDailyTrendsController } from "../../src/controllers/daily-trends.controller";

describe("DailyTrendsController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { trendingSearchesDays: [] } }),
    };
    const app = createDailyTrendsController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/daily-trends?geo=US")
    );
    const body = await response.json();

    expect(body).toEqual({ data: { trendingSearchesDays: [] } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ geo: "US" });
  });

  it("passes trendDate param through", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: {} }),
    };
    const app = createDailyTrendsController(mockUseCase as any);

    await app.handle(
      new Request("http://localhost/daily-trends?geo=BR&trendDate=2024-12-25")
    );

    expect(mockUseCase.execute).toHaveBeenCalledWith({ geo: "BR", trendDate: "2024-12-25" });
  });
});
