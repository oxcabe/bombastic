import { beforeEach, describe, expect, test } from "bun:test";
import { BOMObject } from "bombastic/model/bom";
import { createCore } from "test/fixtures/utils";

describe("BOMObject", async () => {
  const { ifcApi, modelId } = await createCore();
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
