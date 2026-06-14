import { describe, it, expect, mock } from "bun:test";
import { RelatedQueriesUseCase } from "../../src/use-cases/related-queries.use-case";
import type { GoogleTrendsGateway } from "../../src/gateway/google-trends.gateway";

function createMockGateway(): GoogleTrendsGateway {
  return {
    autoComplete: mock().mockResolvedValue({}),
    interestOverTime: mock().mockResolvedValue({}),
    interestByRegion: mock().mockResolvedValue({}),
    relatedQueries: mock().mockResolvedValue({ related_queries: { rising: [], top: [] } }),
    relatedTopics: mock().mockResolvedValue({}),
    realTimeTrends: mock().mockResolvedValue({}),
    dailyTrends: mock().mockResolvedValue({}),
  };
}

describe("RelatedQueriesUseCase", () => {
  it("returns error when keyword is missing", async () => {
    const gateway = createMockGateway();
    const useCase = new RelatedQueriesUseCase(gateway);

    const result = await useCase.execute({});

    expect(result).toEqual({ error: "keyword is required" });
  });

  it("calls gateway and returns data on valid keyword", async () => {
    const gateway = createMockGateway();
    const useCase = new RelatedQueriesUseCase(gateway);

    const result = await useCase.execute({ keyword: "machine learning" });

    expect(result).toEqual({ data: { related_queries: { rising: [], top: [] } } });
    expect(gateway.relatedQueries).toHaveBeenCalledWith({ keyword: "machine learning" });
  });

  it("passes optional params when provided", async () => {
    const gateway = createMockGateway();
    const useCase = new RelatedQueriesUseCase(gateway);

    await useCase.execute({
      keyword: "python",
      startTime: "2024-01-01",
      endTime: "2024-12-31",
      geo: "BR",
    });

    const call = (gateway.relatedQueries as ReturnType<typeof mock>).mock.calls[0]![0];
    expect(call.keyword).toBe("python");
    expect(call.geo).toBe("BR");
    expect(call.startTime).toBeInstanceOf(Date);
    expect(call.endTime).toBeInstanceOf(Date);
  });
});
