import type {
  RelatedTopicsRequest,
  RelatedTopicsUseCase,
} from "../use-cases/related-topics.use-case";

export class RelatedTopicsController {
  constructor(private readonly useCase: RelatedTopicsUseCase) {}

  async handle(query: RelatedTopicsRequest) {
    return this.useCase.execute(query);
  }
}
