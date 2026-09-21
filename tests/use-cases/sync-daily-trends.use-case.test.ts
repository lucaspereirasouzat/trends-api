import { describe, expect, it, mock } from "bun:test";
import type { GoogleTrendsGateway } from "../../src/gateway/google-trends.gateway";
import type { DailyTrendsRepository } from "../../src/repositories/daily-trends.repository";
import { SyncDailyTrendsUseCase } from "../../src/use-cases/sync-daily-trends.use-case";

describe("SyncDailyTrendsUseCase", () => {
  it("fetches a snapshot and saves it with its geo and date", async () => {
    const gateway = {
      dailyTrends: mock().mockResolvedValue({ trends: [] }),
    } as unknown as GoogleTrendsGateway;
    const repository = {
      save: mock(),
      findByGeoAndDate: mock(),
    } as DailyTrendsRepository;
    const useCase = new SyncDailyTrendsUseCase(gateway, repository);

    await useCase.execute({ geo: "BR", trendDate: "2026-09-20" });

    expect(gateway.dailyTrends).toHaveBeenCalledWith({ geo: "BR" });
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        geo: "BR",
        trendDate: "2026-09-20",
        data: { trends: [] },
      }),
    );
  });
});
