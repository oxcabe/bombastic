/**
 * Represents materials by their material name.
 */
export interface Material {
  /**
   * Name of the material.
   */
  name: string;
}

/**
 * Represents a designed object, its metadata and associated materials.
 */
export interface Object {
  /**
   * Name of the object.
   */
  name: string;
  /**
   * Type of the object.
   */
  type: string;
  /**
   * IFC type of the object.
   */
  ifcType: string;
  /**
   * Global ID of the object.
   */
  globalId: string;
  /**
   * List of materials associated to the object.
   */
  materials: Material[];
}
