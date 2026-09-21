import { describe, expect, it, mock } from "bun:test";
import { InterestByRegionController } from "../../src/controllers/interest-by-region.controller";

describe("InterestByRegionController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { interest_by_region: [] } }),
    };
    const controller = new InterestByRegionController(mockUseCase as any);

    const result = await controller.handle({ keyword: "pizza", geo: "US" });

    expect(result).toEqual({ data: { interest_by_region: [] } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({
      keyword: "pizza",
      geo: "US",
    });
  });

  it("returns error when keyword is missing", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ error: "keyword is required" }),
    };
    const controller = new InterestByRegionController(mockUseCase as any);

    const result = await controller.handle({});

    expect(result).toEqual({ error: "keyword is required" });
  });
});
