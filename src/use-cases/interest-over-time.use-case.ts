import type { GoogleTrendsGateway } from "../gateway/google-trends.gateway";

export interface InterestOverTimeRequest {
  keyword?: string;
  startTime?: string;
  endTime?: string;
  geo?: string;
  granularTimeResolution?: string;
  property?: string;
}

export class InterestOverTimeUseCase {
  constructor(private readonly gateway: GoogleTrendsGateway) {}

  async execute(
    request: InterestOverTimeRequest,
  ): Promise<{ data: unknown } | { error: string }> {
    const {
      keyword,
      startTime,
      endTime,
      geo,
      granularTimeResolution,
      property,
    } = request;

    if (!keyword) {
      return { error: "keyword is required" };
    }

    const options: Record<string, unknown> = {
      keyword: keyword.includes(",") ? keyword.split(",") : keyword,
    };

    if (startTime) options.startTime = new Date(startTime);
    if (endTime) options.endTime = new Date(endTime);
    if (geo) options.geo = geo;
    if (granularTimeResolution)
      options.granularTimeResolution = granularTimeResolution === "true";
    if (property) options.property = property;

    const data = await this.gateway.interestOverTime(
      options as unknown as Parameters<
        GoogleTrendsGateway["interestOverTime"]
      >[0],
    );
    return { data };
  }
}
