import { SeaAttribute } from './SeaAttribute';
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
    HTMLwithDataFragment(html: string): DocumentFragment;
    applyDataToElement(el: Element, data: any): void;
}
//# sourceMappingURL=SeaElement.d.ts.map