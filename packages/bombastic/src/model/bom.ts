import type { IfcAPI } from "web-ifc";
import { getProjectName, getObjects } from "bombastic/model/functions";
import type { Object } from "bombastic/model/properties";

export class BOMObject {
  public readonly projectName: string;
  public readonly objects: { [index: number]: Object };

  constructor(modelId: number, ifcApi: IfcAPI) {
    this.projectName = getProjectName(modelId, ifcApi);
    this.objects = getObjects(modelId, ifcApi);
  }
}
