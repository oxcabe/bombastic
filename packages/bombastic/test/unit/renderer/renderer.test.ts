import { describe, expect, test } from "bun:test";
import { createRenderer } from "bombastic/renderer";

describe("Renderer", () => {
  describe("createRenderer", () => {
    test('should create a HTMLRenderer if exportType is "html"', () => {
      const renderer = createRenderer("html");

      expect(renderer.type).toStrictEqual("html");
    });
  });
});
