import type {
  RealtimeTrendsRequest,
  RealtimeTrendsUseCase,
} from "../use-cases/realtime-trends.use-case";

export class RealtimeTrendsController {
  constructor(private readonly useCase: RealtimeTrendsUseCase) {}

  async handle(query: RealtimeTrendsRequest) {
    return this.useCase.execute(query);
  }
}
