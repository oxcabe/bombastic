import { IFCPROJECT, type IfcAPI, IFC2X3 } from "web-ifc";

export class BOMObject {
  public readonly projectName: string;

  constructor(modelId: number, ifcApi: IfcAPI) {
    this.projectName = BOMObject.getProjectName(modelId, ifcApi);
  }

  private static getProjectName = (modelId: number, ifcApi: IfcAPI): string => {
    const projectId = ifcApi.GetLineIDsWithType(modelId, IFCPROJECT).get(0);
    const project = ifcApi.GetLine(modelId, projectId) as IFC2X3.IfcProject;

    return project.LongName?.value ?? "";
  };
}
