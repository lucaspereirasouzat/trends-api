import type { GoogleTrendsGateway } from "../gateway/google-trends.gateway";

export interface DailyTrendsRequest {
  geo?: string;
  trendDate?: string;
}

export class DailyTrendsUseCase {
  constructor(private readonly gateway: GoogleTrendsGateway) {}

  async execute(
    request: DailyTrendsRequest,
  ): Promise<{ data: unknown } | { error: string }> {
    const { geo = "US", trendDate } = request;

    const options: Record<string, unknown> = { geo };

    if (trendDate) options.trendDate = new Date(trendDate);

    const data = await this.gateway.dailyTrends(
      options as unknown as Parameters<GoogleTrendsGateway["dailyTrends"]>[0],
    );
    return { data };
  }
}
