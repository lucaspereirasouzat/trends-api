declare module "google-trends-api" {
  interface AutoCompleteOptions {
    keyword: string;
  }

  interface InterestOverTimeOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    granularTimeResolution?: boolean;
  }

  interface InterestByRegionOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    resolution?: string;
  }

  interface RelatedQueriesOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
  }

  interface RelatedTopicsOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
  }

  interface RealTimeTrendsOptions {
    geo: string;
    category: string;
  }

  interface DailyTrendsOptions {
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
