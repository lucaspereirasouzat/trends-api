import type { InterestByRegionUseCase } from "../use-cases/interest-by-region.use-case";
import type { InterestByRegionRequest } from "../use-cases/interest-by-region.use-case";

export class InterestByRegionController {
  constructor(private readonly useCase: InterestByRegionUseCase) {}

  async handle(query: InterestByRegionRequest) {
    return this.useCase.execute(query);
  }
}
