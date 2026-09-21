import type {
  AutocompleteRequest,
  AutocompleteUseCase,
} from "../use-cases/autocomplete.use-case";

export class AutocompleteController {
  constructor(private readonly useCase: AutocompleteUseCase) {}

  async handle(query: AutocompleteRequest) {
    return this.useCase.execute(query);
  }
}
