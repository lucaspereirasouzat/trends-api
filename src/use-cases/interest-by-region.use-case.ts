import type { GoogleTrendsGateway } from "../gateway/google-trends.gateway";

export interface InterestByRegionRequest {
  keyword?: string;
  startTime?: string;
  endTime?: string;
  geo?: string;
  resolution?: string;
}

export class InterestByRegionUseCase {
  constructor(private readonly gateway: GoogleTrendsGateway) {}

  async execute(request: InterestByRegionRequest): Promise<{ data: unknown } | { error: string }> {
    const { keyword, startTime, endTime, geo, resolution } = request;

    if (!keyword) {
      return { error: "keyword is required" };
    }

    const options: Record<string, unknown> = { keyword };

    if (startTime) options.startTime = new Date(startTime);
    if (endTime) options.endTime = new Date(endTime);
    if (geo) options.geo = geo;
    if (resolution) options.resolution = resolution;

    const data = await this.gateway.interestByRegion(options as Parameters<GoogleTrendsGateway["interestByRegion"]>[0]);
    return { data };
  }
}
