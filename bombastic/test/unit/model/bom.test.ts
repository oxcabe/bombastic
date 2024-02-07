import { beforeEach, describe, expect, test } from "bun:test";
import { IfcAPI } from "web-ifc";
import { BOMObject } from "bombastic/model/bom";
import { loadIfcFromFile } from "bombastic/utils";

describe("BOMObject", async () => {
  const ifcFilePath = Bun.resolveSync(
    "test/fixtures/example.ifc",
    process.cwd(),
  );

  const ifcApi = new IfcAPI();
  await ifcApi.Init();

  const modelId = await loadIfcFromFile(ifcFilePath, ifcApi);
  let bomObject: BOMObject;

  describe("constructor", () => {
    beforeEach(() => {
      bomObject = new BOMObject(modelId, ifcApi);
    });

    test("should call getProjectName", () => {
      expect(bomObject.projectName).toBeDefined();
    });

    test("should call getObjects", () => {
      expect(bomObject.objects).toBeDefined();
    });
  });
});
