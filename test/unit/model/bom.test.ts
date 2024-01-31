import path from "path";
import { beforeEach, describe, expect, test } from "bun:test";
import { IfcAPI } from "web-ifc";
import { BOMObject } from "bombastic/model/bom";
import { loadIfcFromFile } from "bombastic/utils";

describe("BOMObject", async () => {
  const ifcFilePath = path.resolve(
    process.cwd(),
    "./test/fixtures/example.ifc",
  );

  let bomObject: BOMObject;

  const ifcApi = new IfcAPI();
  await ifcApi.Init();

  const modelId = await loadIfcFromFile(ifcFilePath, ifcApi);

  beforeEach(() => {
    bomObject = new BOMObject(modelId, ifcApi);
  });

  describe("constructor", () => {
    test("should populate projectName property with the correct value", () => {
      expect(bomObject.projectName).toStrictEqual("Nombre de proyecto");
    });
  });
});
