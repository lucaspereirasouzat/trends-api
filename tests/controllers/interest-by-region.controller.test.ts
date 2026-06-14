import { describe, it, expect, mock } from "bun:test";
import { createInterestByRegionController } from "../../src/controllers/interest-by-region.controller";

describe("InterestByRegionController", () => {
  it("delegates query to use-case", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ data: { interest_by_region: [] } }),
    };
    const app = createInterestByRegionController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/interest-by-region?keyword=pizza&geo=US")
    );
    const body = await response.json();

    expect(body).toEqual({ data: { interest_by_region: [] } });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ keyword: "pizza", geo: "US" });
  });

  it("returns error when keyword is missing", async () => {
    const mockUseCase = {
      execute: mock().mockResolvedValue({ error: "keyword is required" }),
    };
    const app = createInterestByRegionController(mockUseCase as any);

    const response = await app.handle(
      new Request("http://localhost/interest-by-region")
    );
    const body = await response.json();

    expect(body).toEqual({ error: "keyword is required" });
  });
});
