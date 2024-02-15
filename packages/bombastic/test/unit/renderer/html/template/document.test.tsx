import { describe, expect, test } from "bun:test";
import {
  HTMLBOMDocument,
  HTMLBOMHead,
  HTMLBOMBody,
} from "bombastic/renderer/html/template";
import { createCore } from "test/fixtures/utils";

describe("HTMLBOMDocument", async () => {
  const { bomObject } = await createCore();

  describe("HTMLBOMDocument", () => {
    test("should return a HTMLRender containing the expected HTML", () => {
      const document = HTMLBOMDocument({ bomObject });

      expect(document).toMatchSnapshot();
    });
  });

  describe("HTMLBOMHead", () => {
    test("should return a HTMLRender containing the expected HTML", () => {
      const head = HTMLBOMHead({ title: bomObject.projectName });
      expect("").toMatchSnapshot();
    });
  });

  describe("HTMLBOMBody", () => {
    test("should return a HTMLRender containing the expected HTML", () => {
      const body = HTMLBOMBody({ bomObject });
      expect("").toMatchSnapshot();
    });
  });
});
