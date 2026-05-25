export declare let tagNames: {
    source: string;
    dataPath: string;
    value: string;
    valuelessHidden: string;
    attributeName: string;
    attributeValue: string;
    attributeValuelessHidden: string;
    attributeSet: string;
};
export declare class SeaAttribute {
    name: string;
    value: string;
    constructor(name: string, value: string);
}
export declare class SeaElement {
    element: Element;
    seaSource: string | null;
    seaDataPath: string | null;
    seaData?: Array<any>;
    seaAttributes: Array<SeaAttribute>;
    constructor(targetElement: Element);
    isValid(): boolean;
    fill(): Promise<this>;
    getData(): Promise<SeaElement>;
    fillHTML(): Promise<SeaElement>;
    HTMLwithData(html: string): string;
    applyDataToElement(el: Element, data: any): void;
}
export declare class Core {
    seaElements: Array<SeaElement>;
    constructor();
    getElements(rootElement: Element): Core;
    getElementsFromChildren(rootElement: Element): void;
    fillElements(): Promise<Core>;
}
//# sourceMappingURL=seastack.d.ts.map