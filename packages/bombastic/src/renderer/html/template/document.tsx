import type { BOMObject } from "bombastic/model/bom";

/**
 * Properties required by the HTML BoM document.
 */
interface HTMLBOMDocumentProps {
  /**
   * Object containing BoM related information.
   */
  bomObject: BOMObject;
}

/**
 * Properties required by the head tag of the HTML BoM document.
 */
interface HTMLBOMHeadProps {
  /**
   * Title of the HTML document.
   */
  title: string;
}

/**
 * Properties required by the body tag of the HTML BoM document.
 */
interface HTMLBOMBodyProps extends HTMLBOMDocumentProps {}

/**
 * Represents the HTML BoM document.
 * @param bomObject Object containing BoM related information.
 * @returns JSX node representing the entire HTML document.
 */
export const HTMLBOMDocument = ({ bomObject }: HTMLBOMDocumentProps) => {
  return (
    <html>
      <HTMLBOMHead title={bomObject.projectName} />
      <HTMLBOMBody bomObject={bomObject} />
    </html>
  );
};

/**
 * Represents the head tag of the HTML BoM document.
 * @param title Title of the HTML document.
 * @returns JSX node representing the head of the HTML document.
 */
export const HTMLBOMHead = ({ title }: HTMLBOMHeadProps) => {
  return (
    <head>
      <title>{`BOM Report - ${title}`}</title>
    </head>
  );
};

/**
 * Represents the body tag of the HTML BoM document.
 * @param bomObject Object containing BoM related information.
 * @returns JSX node representing the body of the HTML document.
 */
export const HTMLBOMBody = ({ bomObject }: HTMLBOMBodyProps) => {
  const title = bomObject.projectName;
  const objects = bomObject.objects;

  return (
    <body>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        {Object.keys(objects).map((key) => {
          const object = objects[Number(key)];
          return (
            <section key={key}>
              <h3>{object.name}</h3>
              <p>Type: {object.type}</p>
              <p>IFC Type: {object.ifcType}</p>
              <p>Global ID: {object.globalId}</p>
              <section>
                <ul>
                  {object.materials.map((material, index) => {
                    return <li key={index}>{material.name}</li>;
                  })}
                </ul>
              </section>
            </section>
          );
        })}
      </main>
      <footer>End of document.</footer>
    </body>
  );
};
