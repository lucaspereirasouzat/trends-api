import googleTrends from "google-trends-api";
import type {
  AutoCompleteOptions,
  InterestOverTimeOptions,
  InterestByRegionOptions,
  RelatedQueriesOptions,
  RelatedTopicsOptions,
  RealTimeTrendsOptions,
  DailyTrendsOptions,
} from "../types/google-trends-api.d";

export interface GoogleTrendsGateway {
  autoComplete(options: AutoCompleteOptions): Promise<unknown>;
  interestOverTime(options: InterestOverTimeOptions): Promise<unknown>;
  interestByRegion(options: InterestByRegionOptions): Promise<unknown>;
  relatedQueries(options: RelatedQueriesOptions): Promise<unknown>;
  relatedTopics(options: RelatedTopicsOptions): Promise<unknown>;
  realTimeTrends(options: RealTimeTrendsOptions): Promise<unknown>;
  dailyTrends(options: DailyTrendsOptions): Promise<unknown>;
}

export class GoogleTrendsGatewayImpl implements GoogleTrendsGateway {
  async autoComplete(options: AutoCompleteOptions): Promise<unknown> {
    const raw = await googleTrends.autoComplete(options);
    return JSON.parse(raw);
  }

  async interestOverTime(options: InterestOverTimeOptions): Promise<unknown> {
    const raw = await googleTrends.interestOverTime(options);
    return JSON.parse(raw);
  }

  async interestByRegion(options: InterestByRegionOptions): Promise<unknown> {
    const raw = await googleTrends.interestByRegion(options);
    return JSON.parse(raw);
  }

  async relatedQueries(options: RelatedQueriesOptions): Promise<unknown> {
    const raw = await googleTrends.relatedQueries(options);
    return JSON.parse(raw);
  }

  async relatedTopics(options: RelatedTopicsOptions): Promise<unknown> {
    const raw = await googleTrends.relatedTopics(options);
    return JSON.parse(raw);
  }

  async realTimeTrends(options: RealTimeTrendsOptions): Promise<unknown> {
    const raw = await googleTrends.realTimeTrends(options);
    return JSON.parse(raw);
  }

  async dailyTrends(options: DailyTrendsOptions): Promise<unknown> {
    const raw = await googleTrends.dailyTrends(options);
    return JSON.parse(raw);
  }
}
