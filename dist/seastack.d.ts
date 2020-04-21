export declare namespace Seastack {
    let tagNames: {
        "source": string;
        "dataPath": string;
        "value": string;
        "attributeName": string;
        "attributeValue": string;
        "attributeMap": string;
    };
    let entryElements: string[];
    interface SeaData {
        seaData: Array<any>;
    }
    class SeaElement {
        element: Element;
        seaSource: string;
        seaDataPath: string;
        seaData: SeaData;
        constructor(targetElement: Element);
        fillData(): SeaElement;
        fillHTML(): SeaElement;
        fill(): SeaElement;
    }
    class Core {
        seaElements: Array<SeaElement>;
        constructor();
        getElements(rootElement: HTMLElement): Core;
        fillElements(): Core;
    }
}
