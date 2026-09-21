import type {
  RelatedQueriesRequest,
  RelatedQueriesUseCase,
} from "../use-cases/related-queries.use-case";

export class RelatedQueriesController {
  constructor(private readonly useCase: RelatedQueriesUseCase) {}

  async handle(query: RelatedQueriesRequest) {
    return this.useCase.execute(query);
  }
}
