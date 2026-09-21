import type {
  DailyTrendsRepository,
  StoredDailyTrends,
} from "../repositories/daily-trends.repository";

export class GetStoredDailyTrendsUseCase {
  constructor(private readonly repository: DailyTrendsRepository) {}

  execute(geo: string, trendDate: string): StoredDailyTrends | null {
    return this.repository.findByGeoAndDate(geo, trendDate);
  }
}
