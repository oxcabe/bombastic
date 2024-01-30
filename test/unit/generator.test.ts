import path from "path";
import { beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import { BOMGenerator } from "bombastic/generator";

describe("BOMGenerator", () => {
  let bomGenerator: BOMGenerator;
  const ifcFilePath = path.resolve(
    process.cwd(),
    "./test/fixtures/example.ifc",
  );

  beforeEach(() => {
    bomGenerator = new BOMGenerator();
  });

  describe("constructor", () => {
    test("should not have ifcApi initialized on construction", () => {
      const wasmModule = (bomGenerator as any).ifcApi.wasmModule;

      expect(wasmModule).toBeUndefined();
    });
  });

  describe("generate", () => {
    test("should call ifcApi.Init() on first call", async () => {
      // Mock loadIfcFromFile to avoid unnecessary I/O calls
      (bomGenerator as any).loadIfcFromFile = mock(async () => {
        return 0;
      });

      await bomGenerator.generate(ifcFilePath);
      const wasmModule = (bomGenerator as any).ifcApi.wasmModule;

      expect(wasmModule).toBeDefined();
    });

    test("should not call ifcApi.Init() on subsequent calls", async () => {
      // Mock loadIfcFromFile to avoid unnecessary I/O calls
      (bomGenerator as any).loadIfcFromFile = mock(async () => {
        return 0;
      });
      // Mock ifcApi.Init and define wasmModule
      (bomGenerator as any).ifcApi.Init = mock(async () => {
        (bomGenerator as any).ifcApi.wasmModule = {};
      });

      await bomGenerator.generate(ifcFilePath);
      await bomGenerator.generate(ifcFilePath);

      expect((bomGenerator as any).ifcApi.Init).toHaveBeenCalledTimes(1);
    });
  });

  describe("loadIfcFromFile", () => {
    beforeEach(async () => {
      await (bomGenerator as any).ifcApi.Init();
    });

    test("should return the modelId from IfcAPI.OpenModel", async () => {
      const modelId = await (bomGenerator as any).loadIfcFromFile(ifcFilePath);

      expect(modelId).toBe(0);
    });
  });
});
