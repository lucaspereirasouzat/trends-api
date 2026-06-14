import { describe, it, expect, mock } from "bun:test";
import { InterestByRegionUseCase } from "../../src/use-cases/interest-by-region.use-case";
import type { GoogleTrendsGateway } from "../../src/gateway/google-trends.gateway";

function createMockGateway(): GoogleTrendsGateway {
  return {
    autoComplete: mock().mockResolvedValue({}),
    interestOverTime: mock().mockResolvedValue({}),
    interestByRegion: mock().mockResolvedValue({ interest_by_region: [] }),
    relatedQueries: mock().mockResolvedValue({}),
    relatedTopics: mock().mockResolvedValue({}),
    realTimeTrends: mock().mockResolvedValue({}),
    dailyTrends: mock().mockResolvedValue({}),
  };
}

describe("InterestByRegionUseCase", () => {
  it("returns error when keyword is missing", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestByRegionUseCase(gateway);

    const result = await useCase.execute({});

    expect(result).toEqual({ error: "keyword is required" });
  });

  it("does NOT split comma-separated keywords into array", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestByRegionUseCase(gateway);

    await useCase.execute({ keyword: "pizza,burger" });

    expect(gateway.interestByRegion).toHaveBeenCalledWith({
      keyword: "pizza,burger",
    });
  });

  it("passes resolution as-is", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestByRegionUseCase(gateway);

    await useCase.execute({ keyword: "restaurant", geo: "US-CA", resolution: "CITY" });

    expect(gateway.interestByRegion).toHaveBeenCalledWith({
      keyword: "restaurant",
      geo: "US-CA",
      resolution: "CITY",
    });
  });

  it("converts startTime and endTime to Date objects", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestByRegionUseCase(gateway);

    await useCase.execute({
      keyword: "coffee",
      startTime: "2024-01-01",
      endTime: "2024-12-31",
    });

    const call = (gateway.interestByRegion as ReturnType<typeof mock>).mock.calls[0]![0];
    expect(call.startTime).toBeInstanceOf(Date);
    expect(call.endTime).toBeInstanceOf(Date);
  });
});
