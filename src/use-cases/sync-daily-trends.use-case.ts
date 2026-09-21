import type { GoogleTrendsGateway } from "../gateway/google-trends.gateway";
import type { DailyTrendsRepository } from "../repositories/daily-trends.repository";

export interface SyncDailyTrendsRequest {
  geo: string;
  trendDate: string;
}

/** Fetches a daily snapshot and makes the operation idempotent for geo/date. */
export class SyncDailyTrendsUseCase {
  constructor(
    private readonly gateway: GoogleTrendsGateway,
    private readonly repository: DailyTrendsRepository,
  ) {}

  async execute(request: SyncDailyTrendsRequest): Promise<void> {
    const data = await this.gateway.dailyTrends({ geo: request.geo });

    this.repository.save({
      geo: request.geo,
      trendDate: request.trendDate,
      data,
      fetchedAt: new Date().toISOString(),
    });
  }
}
