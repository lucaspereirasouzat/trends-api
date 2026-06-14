import { Elysia } from "elysia";
import { GoogleTrendsGatewayImpl } from "./gateway/google-trends.gateway";
import { AutocompleteUseCase } from "./use-cases/autocomplete.use-case";
import { InterestOverTimeUseCase } from "./use-cases/interest-over-time.use-case";
import { InterestByRegionUseCase } from "./use-cases/interest-by-region.use-case";
import { RelatedQueriesUseCase } from "./use-cases/related-queries.use-case";
import { RelatedTopicsUseCase } from "./use-cases/related-topics.use-case";
import { RealtimeTrendsUseCase } from "./use-cases/realtime-trends.use-case";
import { DailyTrendsUseCase } from "./use-cases/daily-trends.use-case";
import { createAutocompleteController } from "./controllers/autocomplete.controller";
import { createInterestOverTimeController } from "./controllers/interest-over-time.controller";
import { createInterestByRegionController } from "./controllers/interest-by-region.controller";
import { createRelatedQueriesController } from "./controllers/related-queries.controller";
import { createRelatedTopicsController } from "./controllers/related-topics.controller";
import { createRealtimeTrendsController } from "./controllers/realtime-trends.controller";
import { createDailyTrendsController } from "./controllers/daily-trends.controller";

const gateway = new GoogleTrendsGatewayImpl();

const autocompleteUseCase = new AutocompleteUseCase(gateway);
const interestOverTimeUseCase = new InterestOverTimeUseCase(gateway);
const interestByRegionUseCase = new InterestByRegionUseCase(gateway);
const relatedQueriesUseCase = new RelatedQueriesUseCase(gateway);
const relatedTopicsUseCase = new RelatedTopicsUseCase(gateway);
const realtimeTrendsUseCase = new RealtimeTrendsUseCase(gateway);
const dailyTrendsUseCase = new DailyTrendsUseCase(gateway);

export const app = new Elysia()
  .use(createAutocompleteController(autocompleteUseCase))
  .use(createInterestOverTimeController(interestOverTimeUseCase))
  .use(createInterestByRegionController(interestByRegionUseCase))
  .use(createRelatedQueriesController(relatedQueriesUseCase))
  .use(createRelatedTopicsController(relatedTopicsUseCase))
  .use(createRealtimeTrendsController(realtimeTrendsUseCase))
  .use(createDailyTrendsController(dailyTrendsUseCase))
  .get("/", () => ({
    message: "Google Trends API",
    endpoints: {
      "/autocomplete": "GET - Autocomplete suggestions (query: keyword)",
      "/interest-over-time": "GET - Interest over time (query: keyword, startTime?, endTime?, geo?, granularTimeResolution?)",
      "/interest-by-region": "GET - Interest by region (query: keyword, startTime?, endTime?, geo?, resolution?)",
      "/related-queries": "GET - Related queries (query: keyword, startTime?, endTime?, geo?)",
      "/related-topics": "GET - Related topics (query: keyword, startTime?, endTime?, geo?)",
      "/realtime-trends": "GET - Real-time trends (query: geo?, category?)",
      "/daily-trends": "GET - Daily trends (query: geo?, trendDate?)",
    },
    examples: {
      autocomplete: "/autocomplete?keyword=artificial intelligence",
      interestOverTime: "/interest-over-time?keyword=bitcoin",
      interestByRegion: "/interest-by-region?keyword=pizza&geo=US",
      relatedQueries: "/related-queries?keyword=machine learning",
      relatedTopics: "/related-topics?keyword=chatgpt",
      realtimeTrends: "/realtime-trends?geo=BR",
      dailyTrends: "/daily-trends?geo=US",
    },
  }));
