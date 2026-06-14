import type { AutocompleteUseCase } from "../use-cases/autocomplete.use-case";
import type { AutocompleteRequest } from "../use-cases/autocomplete.use-case";

export class AutocompleteController {
  constructor(private readonly useCase: AutocompleteUseCase) {}

  async handle(query: AutocompleteRequest) {
    return this.useCase.execute(query);
  }
}
