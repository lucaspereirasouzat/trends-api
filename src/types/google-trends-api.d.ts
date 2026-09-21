declare module "google-trends-api" {
  export interface AutoCompleteOptions {
    keyword: string;
  }

  export interface InterestOverTimeOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    granularTimeResolution?: boolean;
    property?: string;
  }

  export interface InterestByRegionOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    resolution?: string;
  }

  export interface RelatedQueriesOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
  }

  export interface RelatedTopicsOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
  }

  export interface RealTimeTrendsOptions {
    geo: string;
    category: string;
  }

  export interface DailyTrendsOptions {
    geo: string;
    trendDate?: Date;
  }

  const googleTrends: {
    autoComplete(options: AutoCompleteOptions): Promise<string>;
    interestOverTime(options: InterestOverTimeOptions): Promise<string>;
    interestByRegion(options: InterestByRegionOptions): Promise<string>;
    relatedQueries(options: RelatedQueriesOptions): Promise<string>;
    relatedTopics(options: RelatedTopicsOptions): Promise<string>;
    realTimeTrends(options: RealTimeTrendsOptions): Promise<string>;
    dailyTrends(options: DailyTrendsOptions): Promise<string>;
  };

  export default googleTrends;
}
