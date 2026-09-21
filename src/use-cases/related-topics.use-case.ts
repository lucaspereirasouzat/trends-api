import type { GoogleTrendsGateway } from "../gateway/google-trends.gateway";

export interface RelatedTopicsRequest {
  keyword?: string;
  startTime?: string;
  endTime?: string;
  geo?: string;
}

export class RelatedTopicsUseCase {
  constructor(private readonly gateway: GoogleTrendsGateway) {}

  async execute(
    request: RelatedTopicsRequest,
  ): Promise<{ data: unknown } | { error: string }> {
    const { keyword, startTime, endTime, geo } = request;

    if (!keyword) {
      return { error: "keyword is required" };
    }

    const options: Record<string, unknown> = { keyword };

    if (startTime) options.startTime = new Date(startTime);
    if (endTime) options.endTime = new Date(endTime);
    if (geo) options.geo = geo;

    const data = await this.gateway.relatedTopics(
      options as unknown as Parameters<GoogleTrendsGateway["relatedTopics"]>[0],
    );
    return { data };
  }
}
