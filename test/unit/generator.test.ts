import path from "path";
import { beforeEach, describe, expect, mock, test } from "bun:test";
import { IfcAPI } from "web-ifc";
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
    // Mock BOMObject class
    mock.module(Bun.resolveSync("bombastic/model/bom", import.meta.dir), () => {
      return {
        BOMObject: class {
          constructor(modelId: number, ifcApi: IfcAPI) {}
        },
      };
    });

    // Mock loadIfcFromFile to avoid unnecessary I/O calls
    mock.module(Bun.resolveSync("bombastic/utils", import.meta.dir), () => {
      return {
        loadIfcFromFile: async (ifcFilePath: string | URL, ifcApi: IfcAPI) => {
          return 0;
        },
      };
    });

    test("should call ifcApi.Init() on first call", async () => {
      await bomGenerator.generate(ifcFilePath);
      const wasmModule = (bomGenerator as any).ifcApi.wasmModule;

      expect(wasmModule).toBeDefined();
    });

    test("should not call ifcApi.Init() on subsequent calls", async () => {
      // Mock ifcApi.Init and define wasmModule
      (bomGenerator as any).ifcApi.Init = mock(async () => {
        (bomGenerator as any).ifcApi.wasmModule = {};
      });

      await bomGenerator.generate(ifcFilePath);
      await bomGenerator.generate(ifcFilePath);

      expect((bomGenerator as any).ifcApi.Init).toHaveBeenCalledTimes(1);
    });
  });
});
