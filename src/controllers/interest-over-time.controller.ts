import type {
  InterestOverTimeRequest,
  InterestOverTimeUseCase,
} from "../use-cases/interest-over-time.use-case";

export class InterestOverTimeController {
  constructor(private readonly useCase: InterestOverTimeUseCase) {}

  async handle(query: InterestOverTimeRequest) {
    return this.useCase.execute(query);
  }
}
