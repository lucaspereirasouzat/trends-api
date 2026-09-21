import { describe, expect, it, mock } from "bun:test";
import type { GoogleTrendsGateway } from "../../src/gateway/google-trends.gateway";
import { RelatedTopicsUseCase } from "../../src/use-cases/related-topics.use-case";

function createMockGateway(): GoogleTrendsGateway {
  return {
    autoComplete: mock().mockResolvedValue({}),
    interestOverTime: mock().mockResolvedValue({}),
    interestByRegion: mock().mockResolvedValue({}),
    relatedQueries: mock().mockResolvedValue({}),
    relatedTopics: mock().mockResolvedValue({
      related_topics: { rising: [], top: [] },
    }),
    realTimeTrends: mock().mockResolvedValue({}),
    dailyTrends: mock().mockResolvedValue({}),
  };
}

describe("RelatedTopicsUseCase", () => {
  it("returns error when keyword is missing", async () => {
    const gateway = createMockGateway();
    const useCase = new RelatedTopicsUseCase(gateway);

    const result = await useCase.execute({});

    expect(result).toEqual({ error: "keyword is required" });
  });

  it("calls gateway and returns data on valid keyword", async () => {
    const gateway = createMockGateway();
    const useCase = new RelatedTopicsUseCase(gateway);

    const result = await useCase.execute({ keyword: "chatgpt" });

    expect(result).toEqual({
      data: { related_topics: { rising: [], top: [] } },
    });
    expect(gateway.relatedTopics).toHaveBeenCalledWith({ keyword: "chatgpt" });
  });

  it("passes optional params when provided", async () => {
    const gateway = createMockGateway();
    const useCase = new RelatedTopicsUseCase(gateway);

    await useCase.execute({
      keyword: "ai",
      startTime: "2024-01-01",
      endTime: "2024-12-31",
      geo: "BR",
    });

    const call = (gateway.relatedTopics as ReturnType<typeof mock>).mock
      .calls[0]![0];
    expect(call.keyword).toBe("ai");
    expect(call.geo).toBe("BR");
    expect(call.startTime).toBeInstanceOf(Date);
  });
});
