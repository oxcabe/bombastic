import { IfcAPI } from "web-ifc";
import { BOMObject } from "bombastic/model/bom";
import { loadIfcFromFile } from "bombastic/utils";
import { type ExportFormat, createRenderer } from "bombastic/renderer";

/**
 * Represents an entity that generates BoM files.
 */
export class BOMGenerator {
  private readonly ifcApi = new IfcAPI();

  /**
   * Generates a BoM file of a given document format from an IFC file.
   * @param ifcFilePath Load path to the IFC file.
   * @param exportFormat Exported BoM document format.
   * @param reportFilePath Save path for the BoM document file.
   */
  public generate = async (
    ifcFilePath: string | URL,
    exportFormat: ExportFormat,
    reportFilePath: string,
  ) => {
    // IFC API needs to be initialized the first time `generate` is called.
    if (this.ifcApi.wasmModule === undefined) {
      await this.ifcApi.Init();
    }

    const modelId = await loadIfcFromFile(ifcFilePath, this.ifcApi);
    const bomObject = new BOMObject(modelId, this.ifcApi);
    const render = await createRenderer(exportFormat).render(bomObject);

    render.toFile(reportFilePath);
  };
}
