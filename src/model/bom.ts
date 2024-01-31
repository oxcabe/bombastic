import { IFCPROJECT, type IfcAPI, IFC2X3 } from "web-ifc";

export class BOMObject {
  public readonly projectName: string;

  constructor(modelId: number, ifcApi: IfcAPI) {
    const projectId = ifcApi.GetLineIDsWithType(modelId, IFCPROJECT).get(0);
    const project = ifcApi.GetLine(modelId, projectId) as IFC2X3.IfcProject;

    this.projectName = project.LongName?.value ?? "";
  }
}
