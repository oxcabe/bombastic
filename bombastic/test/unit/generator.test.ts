import { beforeEach, describe, expect, test } from "bun:test";
import { BOMGenerator } from "bombastic/generator";

describe("BOMGenerator", () => {
  let bomGenerator: BOMGenerator;
  const ifcFilePath = Bun.resolveSync(
    "test/fixtures/example.ifc",
    process.cwd(),
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
      await bomGenerator.generate(ifcFilePath, "html", "/tmp/bom.html");
      const wasmModule = (bomGenerator as any).ifcApi.wasmModule;

      expect(wasmModule).toBeDefined();
    });
  });
});
