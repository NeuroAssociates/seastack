declare namespace Seastack {
    let tagNames: {
        source: string;
        dataPath: string;
        value: string;
        valuelessHidden: string;
        attributeName: string;
        attributeValue: string;
        attributeValuelessHidden: string;
        attributeSet: string;
    };
    class SeaAttribute {
        name: string;
        value: string;
        constructor(name: string, value: string);
    }
    class SeaElement {
        element: Element;
        seaSource: string;
        seaDataPath: string;
        seaData: Array<any>;
        seaAttributes: Array<SeaAttribute>;
        constructor(targetElement: Element);
        isValid(): boolean;
        fill(): Promise<void>;
        getData(): Promise<SeaElement>;
        fillHTML(): Promise<SeaElement>;
        HTMLwithData(html: string): string;
        HTMLElementWithData(element: Element, data: any): Element;
    }
    class Core {
        seaElements: Array<SeaElement>;
        constructor();
        getElements(rootElement: Element): Core;
        getElementsFromChildren(rootElement: Element): void;
        fillElements(): Core;
    }
}
