import { beforeEach, describe, expect, it, mock } from "bun:test";

const mockAutoComplete = mock();
const mockInterestOverTime = mock();
const mockInterestByRegion = mock();
const mockRelatedQueries = mock();
const mockRelatedTopics = mock();
const mockRealTimeTrends = mock();
const mockDailyTrends = mock();

mock.module("google-trends-api", () => ({
  default: {
    autoComplete: mockAutoComplete,
    interestOverTime: mockInterestOverTime,
    interestByRegion: mockInterestByRegion,
    relatedQueries: mockRelatedQueries,
    relatedTopics: mockRelatedTopics,
    realTimeTrends: mockRealTimeTrends,
    dailyTrends: mockDailyTrends,
  },
}));

import { GoogleTrendsGatewayImpl } from "../../src/gateway/google-trends.gateway";

describe("GoogleTrendsGatewayImpl", () => {
  let gateway: GoogleTrendsGatewayImpl;

  beforeEach(() => {
    gateway = new GoogleTrendsGatewayImpl();
    mockAutoComplete.mockReset();
    mockInterestOverTime.mockReset();
    mockInterestByRegion.mockReset();
    mockRelatedQueries.mockReset();
    mockRelatedTopics.mockReset();
    mockRealTimeTrends.mockReset();
    mockDailyTrends.mockReset();
  });

  it("autoComplete parses JSON result", async () => {
    const expected = { default: { topic: { mid: "/m/024030" } } };
    mockAutoComplete.mockResolvedValue(JSON.stringify(expected));

    const result = await gateway.autoComplete({ keyword: "bitcoin" });

    expect(result).toEqual(expected);
    expect(mockAutoComplete).toHaveBeenCalledWith({ keyword: "bitcoin" });
  });

  it("interestOverTime parses JSON result", async () => {
    const expected = { interest_over_time: { date: [], value: [] } };
    mockInterestOverTime.mockResolvedValue(JSON.stringify(expected));

    const result = await gateway.interestOverTime({ keyword: "bitcoin" });

    expect(result).toEqual(expected);
  });

  it("interestByRegion parses JSON result", async () => {
    const expected = { interest_by_region: [{ geo: "US", value: 100 }] };
    mockInterestByRegion.mockResolvedValue(JSON.stringify(expected));

    const result = await gateway.interestByRegion({ keyword: "pizza" });

    expect(result).toEqual(expected);
  });

  it("relatedQueries parses JSON result", async () => {
    const expected = { related_queries: { rising: [], top: [] } };
    mockRelatedQueries.mockResolvedValue(JSON.stringify(expected));

    const result = await gateway.relatedQueries({
      keyword: "machine learning",
    });

    expect(result).toEqual(expected);
  });

  it("relatedTopics parses JSON result", async () => {
    const expected = { related_topics: { rising: [], top: [] } };
    mockRelatedTopics.mockResolvedValue(JSON.stringify(expected));

    const result = await gateway.relatedTopics({ keyword: "chatgpt" });

    expect(result).toEqual(expected);
  });

  it("realTimeTrends parses JSON result", async () => {
    const expected = { storySummaries: { trendingStories: [] } };
    mockRealTimeTrends.mockResolvedValue(JSON.stringify(expected));

    const result = await gateway.realTimeTrends({ geo: "US", category: "all" });

    expect(result).toEqual(expected);
  });

  it("dailyTrends parses JSON result", async () => {
    const expected = { default: { trendingSearchesDays: [] } };
    mockDailyTrends.mockResolvedValue(JSON.stringify(expected));

    const result = await gateway.dailyTrends({ geo: "US" });

    expect(result).toEqual(expected);
  });

  it("throws on invalid JSON", async () => {
    mockAutoComplete.mockResolvedValue("not valid json{{{");

    expect(gateway.autoComplete({ keyword: "test" })).rejects.toThrow();
  });
});
