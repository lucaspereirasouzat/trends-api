import type { RelatedTopicsUseCase } from "../use-cases/related-topics.use-case";
import type { RelatedTopicsRequest } from "../use-cases/related-topics.use-case";

export class RelatedTopicsController {
  constructor(private readonly useCase: RelatedTopicsUseCase) {}

  async handle(query: RelatedTopicsRequest) {
    return this.useCase.execute(query);
  }
}
