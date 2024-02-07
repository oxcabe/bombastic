import { HTMLRenderer } from "./html/renderer";

export type HTMLExportFormat = "html";
export type PDFExportFormat = "pdf";
export type ExportFormat = HTMLExportFormat | PDFExportFormat;

export class Renderer {
  constructor(exportFormat: ExportFormat) {
    switch (exportFormat) {
      case "html":
        return new HTMLRenderer();
    }
  }
}
