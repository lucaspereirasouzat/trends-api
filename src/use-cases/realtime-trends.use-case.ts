import type { GoogleTrendsGateway } from "../gateway/google-trends.gateway";

export interface RealtimeTrendsRequest {
  geo?: string;
  category?: string;
}

export class RealtimeTrendsUseCase {
  constructor(private readonly gateway: GoogleTrendsGateway) {}

  async execute(request: RealtimeTrendsRequest): Promise<{ data: unknown } | { error: string }> {
    const { geo = "US", category = "all" } = request;

    const data = await this.gateway.realTimeTrends({ geo, category });
    return { data };
  }
}
