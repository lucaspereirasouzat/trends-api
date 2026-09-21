import type {
  DailyTrendsRequest,
  DailyTrendsUseCase,
} from "../use-cases/daily-trends.use-case";

export class DailyTrendsController {
  constructor(private readonly useCase: DailyTrendsUseCase) {}

  async handle(query: DailyTrendsRequest) {
    return this.useCase.execute(query);
  }
}
