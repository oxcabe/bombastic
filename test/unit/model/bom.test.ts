import { describe, expect, spyOn, test } from "bun:test";
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

  describe("constructor", () => {
    test("should call getProjectName", () => {
      const bomObject = new BOMObject(modelId, ifcApi);

      expect(bomObject.projectName).toBeDefined();
    });
  });

  describe("getProjectName", () => {
    test("should return the correct project name", () => {
      const projectName = (BOMObject as any).getProjectName(modelId, ifcApi);

      expect(projectName).toStrictEqual("Nombre de proyecto");
    });
  });
});
