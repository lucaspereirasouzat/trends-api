import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";
import { AutocompleteController } from "./controllers/autocomplete.controller";
import { DailyTrendsController } from "./controllers/daily-trends.controller";
import { InterestByRegionController } from "./controllers/interest-by-region.controller";
import { InterestOverTimeController } from "./controllers/interest-over-time.controller";
import { RealtimeTrendsController } from "./controllers/realtime-trends.controller";
import { RelatedQueriesController } from "./controllers/related-queries.controller";
import { RelatedTopicsController } from "./controllers/related-topics.controller";
import { GoogleTrendsGatewayImpl } from "./gateway/google-trends.gateway";
import { autocompleteRoute } from "./routes/autocomplete.route";
import { dailyTrendsRoute } from "./routes/daily-trends.route";
import { interestByRegionRoute } from "./routes/interest-by-region.route";
import { interestOverTimeRoute } from "./routes/interest-over-time.route";
import { realtimeTrendsRoute } from "./routes/realtime-trends.route";
import { relatedQueriesRoute } from "./routes/related-queries.route";
import { relatedTopicsRoute } from "./routes/related-topics.route";
import { AutocompleteUseCase } from "./use-cases/autocomplete.use-case";
import { DailyTrendsUseCase } from "./use-cases/daily-trends.use-case";
import { InterestByRegionUseCase } from "./use-cases/interest-by-region.use-case";
import { InterestOverTimeUseCase } from "./use-cases/interest-over-time.use-case";
import { RealtimeTrendsUseCase } from "./use-cases/realtime-trends.use-case";
import { RelatedQueriesUseCase } from "./use-cases/related-queries.use-case";
import { RelatedTopicsUseCase } from "./use-cases/related-topics.use-case";

const gateway = new GoogleTrendsGatewayImpl();

const autocompleteUseCase = new AutocompleteUseCase(gateway);
const interestOverTimeUseCase = new InterestOverTimeUseCase(gateway);
const interestByRegionUseCase = new InterestByRegionUseCase(gateway);
const relatedQueriesUseCase = new RelatedQueriesUseCase(gateway);
const relatedTopicsUseCase = new RelatedTopicsUseCase(gateway);
const realtimeTrendsUseCase = new RealtimeTrendsUseCase(gateway);
const dailyTrendsUseCase = new DailyTrendsUseCase(gateway);

const autocompleteController = new AutocompleteController(autocompleteUseCase);
const interestOverTimeController = new InterestOverTimeController(
  interestOverTimeUseCase,
);
const interestByRegionController = new InterestByRegionController(
  interestByRegionUseCase,
);
const relatedQueriesController = new RelatedQueriesController(
  relatedQueriesUseCase,
);
const relatedTopicsController = new RelatedTopicsController(
  relatedTopicsUseCase,
);
const realtimeTrendsController = new RealtimeTrendsController(
  realtimeTrendsUseCase,
);
const dailyTrendsController = new DailyTrendsController(dailyTrendsUseCase);

export const app = new Elysia()
  .use(
    openapi({
      path: "/docs",
      documentation: {
        info: {
          title: "Google Trends API",
          version: "1.0.0",
          description: "API para consulta de tendências do Google Trends.",
        },
      },
    }),
  )
  .use(autocompleteRoute(autocompleteController))
  .use(interestOverTimeRoute(interestOverTimeController))
  .use(interestByRegionRoute(interestByRegionController))
  .use(relatedQueriesRoute(relatedQueriesController))
  .use(relatedTopicsRoute(relatedTopicsController))
  .use(realtimeTrendsRoute(realtimeTrendsController))
  .use(dailyTrendsRoute(dailyTrendsController))
  .get("/", () => ({
    message: "Google Trends API",
    documentation: {
      scalar: "/docs",
      openapi: "/docs/json",
    },
    endpoints: {
      "/autocomplete": "GET - Autocomplete suggestions (query: keyword)",
      "/interest-over-time":
        "GET - Interest over time (query: keyword, startTime?, endTime?, geo?, granularTimeResolution?, property?)",
      "/interest-by-region":
        "GET - Interest by region (query: keyword, startTime?, endTime?, geo?, resolution?)",
      "/related-queries":
        "GET - Related queries (query: keyword, startTime?, endTime?, geo?)",
      "/related-topics":
        "GET - Related topics (query: keyword, startTime?, endTime?, geo?)",
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
