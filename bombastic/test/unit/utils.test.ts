import { describe, expect, test } from "bun:test";
import { loadIfcFromFile } from "bombastic/utils";
import { IfcAPI } from "web-ifc";

describe("utils", () => {
  describe("loadIfcFromFile", () => {
    test("should return the modelId from IfcAPI.OpenModel", async () => {
      const ifcFilePath = Bun.resolveSync(
        "test/fixtures/example.ifc",
        process.cwd(),
      );
      const ifcApi = new IfcAPI();
      await ifcApi.Init();

      const modelId = await loadIfcFromFile(ifcFilePath, ifcApi);

      expect(modelId).toBeGreaterThanOrEqual(0);
    });
  });
});
