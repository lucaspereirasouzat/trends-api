import { Elysia } from "elysia";
import { AutocompleteController } from "./controllers/autocomplete.controller";
import { DailyTrendsController } from "./controllers/daily-trends.controller";
import { InterestByRegionController } from "./controllers/interest-by-region.controller";
import { InterestOverTimeController } from "./controllers/interest-over-time.controller";
import { RealtimeTrendsController } from "./controllers/realtime-trends.controller";
import { RelatedQueriesController } from "./controllers/related-queries.controller";
import { RelatedTopicsController } from "./controllers/related-topics.controller";
import { StoredDailyTrendsController } from "./controllers/stored-daily-trends.controller";
import { GoogleTrendsGatewayImpl } from "./gateway/google-trends.gateway";
import { SqliteDailyTrendsRepository } from "./repositories/sqlite-daily-trends.repository";
import { autocompleteRoute } from "./routes/autocomplete.route";
import { dailyTrendsRoute } from "./routes/daily-trends.route";
import { interestByRegionRoute } from "./routes/interest-by-region.route";
import { interestOverTimeRoute } from "./routes/interest-over-time.route";
import { realtimeTrendsRoute } from "./routes/realtime-trends.route";
import { relatedQueriesRoute } from "./routes/related-queries.route";
import { relatedTopicsRoute } from "./routes/related-topics.route";
import { storedDailyTrendsRoute } from "./routes/stored-daily-trends.route";
import { DailyTrendsScheduler } from "./schedulers/daily-trends.scheduler";
import { AutocompleteUseCase } from "./use-cases/autocomplete.use-case";
import { DailyTrendsUseCase } from "./use-cases/daily-trends.use-case";
import { GetStoredDailyTrendsUseCase } from "./use-cases/get-stored-daily-trends.use-case";
import { InterestByRegionUseCase } from "./use-cases/interest-by-region.use-case";
import { InterestOverTimeUseCase } from "./use-cases/interest-over-time.use-case";
import { RealtimeTrendsUseCase } from "./use-cases/realtime-trends.use-case";
import { RelatedQueriesUseCase } from "./use-cases/related-queries.use-case";
import { RelatedTopicsUseCase } from "./use-cases/related-topics.use-case";
import { SyncDailyTrendsUseCase } from "./use-cases/sync-daily-trends.use-case";

const gateway = new GoogleTrendsGatewayImpl();

const autocompleteUseCase = new AutocompleteUseCase(gateway);
const interestOverTimeUseCase = new InterestOverTimeUseCase(gateway);
const interestByRegionUseCase = new InterestByRegionUseCase(gateway);
const relatedQueriesUseCase = new RelatedQueriesUseCase(gateway);
const relatedTopicsUseCase = new RelatedTopicsUseCase(gateway);
const realtimeTrendsUseCase = new RealtimeTrendsUseCase(gateway);
const dailyTrendsUseCase = new DailyTrendsUseCase(gateway);
const dailyTrendsRepository = new SqliteDailyTrendsRepository();
const syncDailyTrendsUseCase = new SyncDailyTrendsUseCase(
  gateway,
  dailyTrendsRepository,
);
const getStoredDailyTrendsUseCase = new GetStoredDailyTrendsUseCase(
  dailyTrendsRepository,
);

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
const storedDailyTrendsController = new StoredDailyTrendsController(
  getStoredDailyTrendsUseCase,
);

const geos = (process.env.DAILY_TRENDS_GEOS ?? "US")
  .split(",")
  .map((geo) => geo.trim())
  .filter(Boolean);

export const dailyTrendsScheduler = new DailyTrendsScheduler(
  syncDailyTrendsUseCase,
  {
    geos,
    time: process.env.DAILY_TRENDS_CRON_TIME ?? "06:15",
    timeZone: process.env.DAILY_TRENDS_TIME_ZONE ?? "UTC",
  },
);

export const app = new Elysia()
  .use(autocompleteRoute(autocompleteController))
  .use(interestOverTimeRoute(interestOverTimeController))
  .use(interestByRegionRoute(interestByRegionController))
  .use(relatedQueriesRoute(relatedQueriesController))
  .use(relatedTopicsRoute(relatedTopicsController))
  .use(realtimeTrendsRoute(realtimeTrendsController))
  .use(dailyTrendsRoute(dailyTrendsController))
  .use(storedDailyTrendsRoute(storedDailyTrendsController))
  .get("/", () => ({
    message: "Google Trends API",
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
      "/daily-trends/stored":
        "GET - Persisted daily snapshot (query: trendDate, geo?)",
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
