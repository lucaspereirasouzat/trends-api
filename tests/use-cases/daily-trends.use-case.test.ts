import { describe, it, expect, mock } from "bun:test";
import { DailyTrendsUseCase } from "../../src/use-cases/daily-trends.use-case";
import type { GoogleTrendsGateway } from "../../src/gateway/google-trends.gateway";

function createMockGateway(): GoogleTrendsGateway {
  return {
    autoComplete: mock().mockResolvedValue({}),
    interestOverTime: mock().mockResolvedValue({}),
    interestByRegion: mock().mockResolvedValue({}),
    relatedQueries: mock().mockResolvedValue({}),
    relatedTopics: mock().mockResolvedValue({}),
    realTimeTrends: mock().mockResolvedValue({}),
    dailyTrends: mock().mockResolvedValue({ default: { trendingSearchesDays: [] } }),
  };
}

describe("DailyTrendsUseCase", () => {
  it("applies default geo=US", async () => {
    const gateway = createMockGateway();
    const useCase = new DailyTrendsUseCase(gateway);

    await useCase.execute({});

    expect(gateway.dailyTrends).toHaveBeenCalledWith({ geo: "US" });
  });

  it("overrides geo with provided value", async () => {
    const gateway = createMockGateway();
    const useCase = new DailyTrendsUseCase(gateway);

    await useCase.execute({ geo: "BR" });

    expect(gateway.dailyTrends).toHaveBeenCalledWith({ geo: "BR" });
  });

  it("converts trendDate string to Date object", async () => {
    const gateway = createMockGateway();
    const useCase = new DailyTrendsUseCase(gateway);

    await useCase.execute({ trendDate: "2024-12-25" });

    const call = (gateway.dailyTrends as ReturnType<typeof mock>).mock.calls[0]![0];
    expect(call.trendDate).toBeInstanceOf(Date);
    expect(call.geo).toBe("US");
  });

  it("returns data from gateway", async () => {
    const gateway = createMockGateway();
    const useCase = new DailyTrendsUseCase(gateway);

    const result = await useCase.execute({});

    expect(result).toEqual({ data: { default: { trendingSearchesDays: [] } } });
  });
});
