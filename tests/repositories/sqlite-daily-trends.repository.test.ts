import { describe, expect, it } from "bun:test";
import { SqliteDailyTrendsRepository } from "../../src/repositories/sqlite-daily-trends.repository";

describe("SqliteDailyTrendsRepository", () => {
  it("stores and retrieves a snapshot", () => {
    const repository = new SqliteDailyTrendsRepository(":memory:");
    const record = {
      geo: "BR",
      trendDate: "2026-09-20",
      data: { default: { trendingSearchesDays: [] } },
      fetchedAt: "2026-09-20T06:15:00.000Z",
    };

    repository.save(record);

    expect(repository.findByGeoAndDate("BR", "2026-09-20")).toEqual(record);
  });

  it("updates the existing geo/date snapshot instead of duplicating it", () => {
    const repository = new SqliteDailyTrendsRepository(":memory:");
    repository.save({
      geo: "US",
      trendDate: "2026-09-20",
      data: { version: 1 },
      fetchedAt: "first",
    });
    repository.save({
      geo: "US",
      trendDate: "2026-09-20",
      data: { version: 2 },
      fetchedAt: "second",
    });

    expect(repository.findByGeoAndDate("US", "2026-09-20")).toEqual({
      geo: "US",
      trendDate: "2026-09-20",
      data: { version: 2 },
      fetchedAt: "second",
    });
  });
});
