import {
  IFCPROJECT,
  IfcAPI,
  IFC2X3,
  IFCRELASSOCIATESMATERIAL,
  Handle,
  IFCMATERIAL,
  IFCMATERIALLAYERSETUSAGE,
  IFCMATERIALLIST,
} from "web-ifc";
import type { Material, Object } from "bombastic/model/properties";

/**
 * Retrieves the project name from the IFC file.
 * @param modelId Numeric ID of the IFC model.
 * @param ifcApi  web-ifc IfcAPI object.
 * @returns The name of the project represented as a string.
 */
export const getProjectName = (modelId: number, ifcApi: IfcAPI): string => {
  const [projectId] = ifcApi.GetLineIDsWithType(modelId, IFCPROJECT);

  if (projectId === undefined) {
    return "";
  }

  const project = ifcApi.GetLine(modelId, projectId) as IFC2X3.IfcProject;

  const projectName = project.LongName?.value ?? "";
  return projectName;
};

/**
 * Retrieves IFC objects related to materials from the IFC file.
 * @param modelId Numeric ID of the IFC model.
 * @param ifcApi  web-ifc IfcAPI object.
 * @returns Structure of Object entities indexed by the EXPRESS format ID.
 */
export const getObjects = (
  modelId: number,
  ifcApi: IfcAPI,
): { [index: number]: Object } => {
  // Obtain material-to-objects relations
  const relationIds = [
    ...ifcApi.GetLineIDsWithType(modelId, IFCRELASSOCIATESMATERIAL),
  ];

  const relations: Array<IFC2X3.IfcRelAssociatesMaterial> = relationIds.map(
    (id) => ifcApi.GetLine(modelId, id),
  );

  // Populate objects, associating their materials for each relation
  const objects: { [index: number]: Object } = {};

  for (const relation of relations) {
    // Get current materials
    const materials = getMaterialsFromRelation(relation, modelId, ifcApi);
    const relatedObjects = relation.RelatedObjects.map(
      (objects) =>
        getHandledEntity(objects, modelId, ifcApi) as IFC2X3.IfcObject,
    );

    // Get or create related objects and append list of materials
    for (const ifcObject of relatedObjects) {
      // Instantiate new objects
      const objectId = ifcObject.expressID;

      if (objectId in objects === false) {
        // Create new object
        objects[objectId] = {
          name: ifcObject.Name?.value ?? "unknown",
          type: ifcObject.ObjectType?.value ?? "unknown",
          ifcType: ifcApi.GetNameFromTypeCode(ifcObject.type),
          globalId: ifcObject.GlobalId.value,
          materials: [],
        };
      }

      // Append new materials to the current list
      const object = objects[objectId];
      object.materials = object.materials.concat(materials);
    }
  }

  return objects;
};

/**
 * Retrieves IFC materials from a IFC material relations entity.
 * @param relation IFC entity representing the relations of a material.
 * @param modelId Numeric ID of the IFC model.
 * @param ifcApi  web-ifc IfcAPI object.
 * @returns The list of Material objects referenced by the relation.
 */
const getMaterialsFromRelation = (
  relation: IFC2X3.IfcRelAssociatesMaterial,
  modelId: number,
  ifcApi: IfcAPI,
): Material[] => {
  let ifcMaterials: IFC2X3.IfcMaterial[] = [];
  const relatingMaterial = getHandledEntity(
    relation.RelatingMaterial,
    modelId,
    ifcApi,
  );

  switch (relatingMaterial.type) {
    case IFCMATERIAL: {
      ifcMaterials = [relatingMaterial as IFC2X3.IfcMaterial];

      break;
    }
    case IFCMATERIALLIST: {
      const materialList = relatingMaterial as IFC2X3.IfcMaterialList;
      ifcMaterials = materialList.Materials.map((material) =>
        getHandledEntity(material, modelId, ifcApi),
      );

      break;
    }
    case IFCMATERIALLAYERSETUSAGE: {
      const materialLayerSetUsage =
        relatingMaterial as IFC2X3.IfcMaterialLayerSetUsage;

      const materialLayerSet = getHandledEntity(
        materialLayerSetUsage.ForLayerSet,
        modelId,
        ifcApi,
      );

      // Get material layers
      const materialLayers = materialLayerSet.MaterialLayers.map((layer) =>
        getHandledEntity(layer, modelId, ifcApi),
      );

      // Get materials
      ifcMaterials = materialLayers.map((layer) =>
        getHandledEntity(layer.Material, modelId, ifcApi),
      );

      break;
    }
  }

  const materials: Material[] = ifcMaterials.map((material) => ({
    name: material.Name.value,
  }));

  return materials;
};

/**
 * resolves a Handler reference to an Entity.
 * @param handle Handle pointing to an Entitie
 * @param modelId IFC model ID number.
 * @param ifcApi Initialized IfcAPI instance.
 * @returns Entity pointed by the Handle.
 */
const getHandledEntity = <T>(
  handle: T | Handle<T> | null,
  modelId: number,
  ifcApi: IfcAPI,
): T => {
  const entity = ifcApi.GetLine(modelId, (handle as Handle<T>).value) as T;
  return entity;
};
