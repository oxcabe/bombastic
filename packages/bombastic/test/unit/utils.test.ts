import { describe, expect, test } from "bun:test";
import { createCore } from "test/fixtures/utils";

describe("utils", () => {
  describe("loadIfcFromFile", () => {
    test("should return the modelId from IfcAPI.OpenModel", async () => {
      const { modelId } = await createCore();

      expect(modelId).toBeGreaterThanOrEqual(0);
    });
  });
});
