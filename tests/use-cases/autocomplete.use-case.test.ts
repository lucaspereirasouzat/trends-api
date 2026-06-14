import { describe, it, expect, mock } from "bun:test";
import { AutocompleteUseCase } from "../../src/use-cases/autocomplete.use-case";
import type { GoogleTrendsGateway } from "../../src/gateway/google-trends.gateway";

function createMockGateway(): GoogleTrendsGateway {
  return {
    autoComplete: mock().mockResolvedValue({ suggestions: ["test1", "test2"] }),
    interestOverTime: mock().mockResolvedValue({}),
    interestByRegion: mock().mockResolvedValue({}),
    relatedQueries: mock().mockResolvedValue({}),
    relatedTopics: mock().mockResolvedValue({}),
    realTimeTrends: mock().mockResolvedValue({}),
    dailyTrends: mock().mockResolvedValue({}),
  };
}

describe("AutocompleteUseCase", () => {
  it("returns error when keyword is missing", async () => {
    const gateway = createMockGateway();
    const useCase = new AutocompleteUseCase(gateway);

    const result = await useCase.execute({});

    expect(result).toEqual({ error: "keyword is required" });
  });

  it("returns error when keyword is empty string", async () => {
    const gateway = createMockGateway();
    const useCase = new AutocompleteUseCase(gateway);

    const result = await useCase.execute({ keyword: "" });

    expect(result).toEqual({ error: "keyword is required" });
  });

  it("calls gateway and returns data on valid keyword", async () => {
    const gateway = createMockGateway();
    const useCase = new AutocompleteUseCase(gateway);

    const result = await useCase.execute({ keyword: "bitcoin" });

    expect(result).toEqual({ data: { suggestions: ["test1", "test2"] } });
    expect(gateway.autoComplete).toHaveBeenCalledWith({ keyword: "bitcoin" });
  });
});
