import type { IfcAPI } from "web-ifc";
import { getProjectName, getObjects } from "bombastic/model/functions";
import type { Object } from "bombastic/model/properties";

/**
 * Subset of IFC properties that are related to materials and BoM content.
 */
export class BOMObject {
  /**
   * Name of the project.
   */
  public readonly projectName: string;
  /**
   * List of objects to display in the BoM.
   */
  public readonly objects: { [index: number]: Object };

  /**
   * Creates a BOMObject and its properties.
   * @param modelId Numeric ID of the IFC model.
   * @param ifcApi  web-ifc IfcAPI object.
   */
  constructor(modelId: number, ifcApi: IfcAPI) {
    this.projectName = getProjectName(modelId, ifcApi);
    this.objects = getObjects(modelId, ifcApi);
  }
}
