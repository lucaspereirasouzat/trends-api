import { describe, it, expect, mock } from "bun:test";
import { createInterestOverTimeController } from "../../src/controllers/interest-over-time.controller";

describe("InterestOverTimeController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { interest_over_time: {} } }),
    };
    const app = createInterestOverTimeController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/interest-over-time?keyword=bitcoin&geo=US")
    );
    const body = await response.json();

    expect(body).toEqual({ data: { interest_over_time: {} } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ keyword: "bitcoin", geo: "US" });
  });

  it("passes all optional params through", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: {} }),
    };
    const app = createInterestOverTimeController(mockUseCase as any);

    await app.handle(
      new Request(
        "http://localhost/interest-over-time?keyword=bitcoin&startTime=2024-01-01&endTime=2024-12-31&granularTimeResolution=true"
      )
    );

    expect(mockUseCase.execute).toHaveBeenCalledWith({
      keyword: "bitcoin",
      startTime: "2024-01-01",
      endTime: "2024-12-31",
      granularTimeResolution: "true",
    });
  });
});
