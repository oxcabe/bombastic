import type { BOMObject } from "bombastic/model/bom";
import { HTMLRenderer } from "bombastic/renderer/html";
import type { MaybePromise } from "bombastic/utils";

/**
 * Defines the "HTML" document export format.
 */
export type HTMLExportFormat = "html";
// export type PDFExportFormat = "pdf";

/**
 * Defines all export formats.
 */
export type ExportFormat = HTMLExportFormat; // | PDFExportFormat;

/**
 * Represents the base of a BoM document renderer.
 */
export interface Renderer {
  /**
   * Renderer export format.
   */
  readonly type: ExportFormat;
  /**
   * Renders a BoM object with BoM data, returning the render.
   * @param bomObject Object containing BoM related information.
   * @returns The resulting render, possibly as a Promises.
   */
  render: (bomObject: BOMObject) => MaybePromise<Render>;
}

/**
 * Abstract representation of BoM information rendered into a document.
 * Includes functionality related to exporting a document.
 */
export interface Render {
  /**
   * Converts the render to its string representation.
   * @returns the string representation of the Render, possibly as a Promise.
   */
  toString: () => MaybePromise<string>;
  /**
   * Saves the rendered document into a file.
   * @param filePath Save path of the rendered document.
   * @returns Either nothing or an empty promise.
   */
  toFile: (filePath: string) => MaybePromise<void>;
}

/**
 * Factory method to create objects from Renderer implementations.
 * @param exportFormat Export format used by the renderer.
 * @returns The instantiated Renderer object.
 */
export const createRenderer = (exportFormat: ExportFormat): HTMLRenderer => {
  switch (exportFormat) {
    case "html":
      return new HTMLRenderer();
  }
};
