import { describe, expect, it, mock } from "bun:test";
import { InterestOverTimeController } from "../../src/controllers/interest-over-time.controller";

describe("InterestOverTimeController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { interest_over_time: {} } }),
    };
    const controller = new InterestOverTimeController(mockUseCase as any);

    const result = await controller.handle({ keyword: "bitcoin", geo: "US" });

    expect(result).toEqual({ data: { interest_over_time: {} } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({
      keyword: "bitcoin",
      geo: "US",
    });
  });

  it("passes all optional params through", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: {} }),
    };
    const controller = new InterestOverTimeController(mockUseCase as any);

    await controller.handle({
      keyword: "bitcoin",
      startTime: "2024-01-01",
      endTime: "2024-12-31",
      granularTimeResolution: "true",
      property: "youtube",
    });

    expect(mockUseCase.execute).toHaveBeenCalledWith({
      keyword: "bitcoin",
      startTime: "2024-01-01",
      endTime: "2024-12-31",
      granularTimeResolution: "true",
      property: "youtube",
    });
  });
});
