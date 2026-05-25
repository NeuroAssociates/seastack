import { SeaElement } from './SeaElement';

export class Core {
  seaElements: Array<SeaElement>;

  constructor() {
    this.seaElements = [];
  }

  getElements(rootElement: Element): Core {
    this.seaElements = [];
    this.getElementsFromChildren(rootElement);
    return this;
  }

  getElementsFromChildren(rootElement: Element) {
    if (!(rootElement instanceof Element)) return;

    Array.from(rootElement.children).forEach((childElement) => {
      const seaElement = new SeaElement(childElement);

      if (seaElement.isValid() === true) {
        this.seaElements.push(seaElement);
      } else {
        this.getElementsFromChildren(childElement);
      }
    });

    return;
  }

  async fillElements(): Promise<Core> {
    for (const element of this.seaElements) {
      await element.fill();
    }
    return this;
  }
}
