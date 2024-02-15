import type { BunFile } from "bun";
import type { BOMObject } from "bombastic/model/bom";
import { HTMLRenderer } from "bombastic/renderer/html";
import type { MaybePromise } from "bombastic/utils";

export type HTMLExportFormat = "html";
// export type PDFExportFormat = "pdf";
export type ExportFormat = HTMLExportFormat; // | PDFExportFormat;

export interface Renderer {
  readonly type: ExportFormat;
  render: (bomObject: BOMObject) => MaybePromise<Render>;
}

export interface Render {
  toString: () => MaybePromise<string>;
  toFile: (filePath: string) => MaybePromise<void>;
}

export const createRenderer = (exportFormat: ExportFormat): HTMLRenderer => {
  switch (exportFormat) {
    case "html":
      return new HTMLRenderer();
  }
};
