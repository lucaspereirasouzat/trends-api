import type { GoogleTrendsGateway } from "../gateway/google-trends.gateway";

export interface AutocompleteRequest {
  keyword?: string;
}

export class AutocompleteUseCase {
  constructor(private readonly gateway: GoogleTrendsGateway) {}

  async execute(request: AutocompleteRequest): Promise<{ data: unknown } | { error: string }> {
    const { keyword } = request;

    if (!keyword) {
      return { error: "keyword is required" };
    }

    const data = await this.gateway.autoComplete({ keyword });
    return { data };
  }
}
