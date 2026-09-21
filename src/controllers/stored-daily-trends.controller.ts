import type { GetStoredDailyTrendsUseCase } from "../use-cases/get-stored-daily-trends.use-case";

export interface StoredDailyTrendsRequest {
  geo?: string;
  trendDate: string;
}

export class StoredDailyTrendsController {
  constructor(private readonly useCase: GetStoredDailyTrendsUseCase) {}

  handle(query: StoredDailyTrendsRequest) {
    const record = this.useCase.execute(query.geo ?? "US", query.trendDate);
    return record
      ? { data: record }
      : { error: "Daily trends snapshot not found" };
  }
}
