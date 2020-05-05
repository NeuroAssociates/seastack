declare namespace Seastack {
    let tagNames: {
        source: string;
        dataPath: string;
        value: string;
        attributeName: string;
        attributeValue: string;
        attributeMap: string;
    };
    let entryElements: string[];
    class SeaElement {
        element: Element;
        seaSource: string;
        seaDataPath: string;
        seaData: Array<any>;
        constructor(targetElement: Element);
        isValid(): boolean;
        getData(): SeaElement;
        fillHTML(): SeaElement;
        HTMLwithData(html: string): string;
        fill(): SeaElement;
    }
    class Core {
        seaElements: Array<SeaElement>;
        constructor();
        getElements(rootElement: Element): Core;
        getElementsFromChildren(rootElement: Element): void;
        fillElements(): Core;
    }
}
