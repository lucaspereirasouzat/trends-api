import { describe, it, expect, mock } from "bun:test";
import { DailyTrendsController } from "../../src/controllers/daily-trends.controller";

describe("DailyTrendsController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { trendingSearchesDays: [] } }),
    };
    const controller = new DailyTrendsController(mockUseCase as any);

    const result = await controller.handle({ geo: "US" });

    expect(result).toEqual({ data: { trendingSearchesDays: [] } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ geo: "US" });
  });

  it("passes trendDate param through", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: {} }),
    };
    const controller = new DailyTrendsController(mockUseCase as any);

    await controller.handle({ geo: "BR", trendDate: "2024-12-25" });

    expect(mockUseCase.execute).toHaveBeenCalledWith({ geo: "BR", trendDate: "2024-12-25" });
  });
});
