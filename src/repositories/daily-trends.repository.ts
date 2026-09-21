export interface StoredDailyTrends {
  geo: string;
  trendDate: string;
  data: unknown;
  fetchedAt: string;
}

export interface DailyTrendsRepository {
  save(record: StoredDailyTrends): void;
  findByGeoAndDate(geo: string, trendDate: string): StoredDailyTrends | null;
}
