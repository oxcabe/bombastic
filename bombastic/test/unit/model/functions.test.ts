import { beforeEach, describe, expect, spyOn, test } from "bun:test";
import { IfcAPI } from "web-ifc";
import { getProjectName, getObjects } from "bombastic/model/functions";
import { loadIfcFromFile } from "bombastic/utils";

describe("functions", async () => {
  const ifcFilePath = Bun.resolveSync(
    "test/fixtures/example.ifc",
    process.cwd(),
  );

  const ifcApi = new IfcAPI();
  await ifcApi.Init();

  const modelId = await loadIfcFromFile(ifcFilePath, ifcApi);

  describe("getProjectName", () => {
    test("should return the expected project name", () => {
      const projectName = getProjectName(modelId, ifcApi);

      expect(projectName).toStrictEqual("Nombre de proyecto");
    });

    test("should return an empty string if the modelId is invalid", () => {
      const projectName = getProjectName(-1, ifcApi);

      expect(projectName).toStrictEqual("");
    });

    describe("getObjects", async () => {
      // Load fixture getObjects expected result
      const fixtureObject = await Bun.file(
        Bun.resolveSync("test/fixtures/exampleObjects.json", process.cwd()),
      ).json();

      test("should return a structure that contains expected objects", () => {
        const objects = getObjects(modelId, ifcApi);

        expect(objects).toStrictEqual(fixtureObject);
      });
    });
  });
});
