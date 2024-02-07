import { describe, expect, test } from "bun:test";
import { Renderer } from "bombastic/renderer";

describe("Renderer", () => {
  describe("constructor", () => {
    test('should create a HTMLRenderer if exportType is "html"', () => {
      const renderer = new Renderer("html");

      expect(renderer.type).toStrictEqual("html");
    });
  });
});
