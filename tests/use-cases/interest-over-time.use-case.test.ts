import { describe, expect, it, mock } from "bun:test";
import type { GoogleTrendsGateway } from "../../src/gateway/google-trends.gateway";
import { InterestOverTimeUseCase } from "../../src/use-cases/interest-over-time.use-case";

function createMockGateway(): GoogleTrendsGateway {
  return {
    autoComplete: mock().mockResolvedValue({}),
    interestOverTime: mock().mockResolvedValue({
      interest_over_time: { date: [] },
    }),
    interestByRegion: mock().mockResolvedValue({}),
    relatedQueries: mock().mockResolvedValue({}),
    relatedTopics: mock().mockResolvedValue({}),
    realTimeTrends: mock().mockResolvedValue({}),
    dailyTrends: mock().mockResolvedValue({}),
  };
}

describe("InterestOverTimeUseCase", () => {
  it("returns error when keyword is missing", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    const result = await useCase.execute({});

    expect(result).toEqual({ error: "keyword is required" });
  });

  it("passes single keyword as string", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    await useCase.execute({ keyword: "bitcoin" });

    expect(gateway.interestOverTime).toHaveBeenCalledWith({
      keyword: "bitcoin",
    });
  });

  it("splits comma-separated keywords into array", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    await useCase.execute({ keyword: "bitcoin,ethereum,dogecoin" });

    expect(gateway.interestOverTime).toHaveBeenCalledWith({
      keyword: ["bitcoin", "ethereum", "dogecoin"],
    });
  });

  it("converts startTime and endTime to Date objects", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    await useCase.execute({
      keyword: "bitcoin",
      startTime: "2024-01-01",
      endTime: "2024-12-31",
    });

    const call = (gateway.interestOverTime as ReturnType<typeof mock>).mock
      .calls[0]![0];
    expect(call.startTime).toBeInstanceOf(Date);
    expect(call.endTime).toBeInstanceOf(Date);
  });

  it("converts granularTimeResolution string 'true' to boolean true", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    await useCase.execute({
      keyword: "bitcoin",
      granularTimeResolution: "true",
    });

    expect(gateway.interestOverTime).toHaveBeenCalledWith({
      keyword: "bitcoin",
      granularTimeResolution: true,
    });
  });

  it("converts granularTimeResolution non-'true' string to boolean false", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    await useCase.execute({
      keyword: "bitcoin",
      granularTimeResolution: "false",
    });

    expect(gateway.interestOverTime).toHaveBeenCalledWith({
      keyword: "bitcoin",
      granularTimeResolution: false,
    });
  });

  it("omits optional params when not provided", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    await useCase.execute({ keyword: "bitcoin" });

    const call = (gateway.interestOverTime as ReturnType<typeof mock>).mock
      .calls[0]![0];
    expect(call).toEqual({ keyword: "bitcoin" });
  });

  it("passes property to gateway when provided", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    await useCase.execute({ keyword: "bitcoin", property: "youtube" });

    expect(gateway.interestOverTime).toHaveBeenCalledWith({
      keyword: "bitcoin",
      property: "youtube",
    });
  });

  it("omits property when not provided", async () => {
    const gateway = createMockGateway();
    const useCase = new InterestOverTimeUseCase(gateway);

    await useCase.execute({ keyword: "bitcoin" });

    const call = (gateway.interestOverTime as ReturnType<typeof mock>).mock
      .calls[0]![0];
    expect(call.property).toBeUndefined();
  });
});
