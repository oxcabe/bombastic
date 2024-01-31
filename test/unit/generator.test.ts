import path from "path";
import { beforeEach, describe, expect, test } from "bun:test";
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
      await bomGenerator.generate(ifcFilePath);
      const wasmModule = (bomGenerator as any).ifcApi.wasmModule;

      expect(wasmModule).toBeDefined();
    });
  });
});
