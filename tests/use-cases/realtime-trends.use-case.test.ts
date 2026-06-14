import { describe, it, expect, mock } from "bun:test";
import { RealtimeTrendsUseCase } from "../../src/use-cases/realtime-trends.use-case";
import type { GoogleTrendsGateway } from "../../src/gateway/google-trends.gateway";

function createMockGateway(): GoogleTrendsGateway {
  return {
    autoComplete: mock().mockResolvedValue({}),
    interestOverTime: mock().mockResolvedValue({}),
    interestByRegion: mock().mockResolvedValue({}),
    relatedQueries: mock().mockResolvedValue({}),
    relatedTopics: mock().mockResolvedValue({}),
    realTimeTrends: mock().mockResolvedValue({ storySummaries: { trendingStories: [] } }),
    dailyTrends: mock().mockResolvedValue({}),
  };
}

describe("RealtimeTrendsUseCase", () => {
  it("applies default geo=US and category=all", async () => {
    const gateway = createMockGateway();
    const useCase = new RealtimeTrendsUseCase(gateway);

    await useCase.execute({});

    expect(gateway.realTimeTrends).toHaveBeenCalledWith({ geo: "US", category: "all" });
  });

  it("overrides defaults with provided values", async () => {
    const gateway = createMockGateway();
    const useCase = new RealtimeTrendsUseCase(gateway);

    await useCase.execute({ geo: "BR", category: "business" });

    expect(gateway.realTimeTrends).toHaveBeenCalledWith({ geo: "BR", category: "business" });
  });

  it("returns data from gateway", async () => {
    const gateway = createMockGateway();
    const useCase = new RealtimeTrendsUseCase(gateway);

    const result = await useCase.execute({});

    expect(result).toEqual({ data: { storySummaries: { trendingStories: [] } } });
  });
});
