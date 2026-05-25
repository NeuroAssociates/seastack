import { SeaElement } from './SeaElement';
export declare class Core {
    seaElements: Array<SeaElement>;
    constructor();
    getElements(rootElement: Element): Core;
    getElementsFromChildren(rootElement: Element): void;
    fillElements(): Promise<Core>;
}
//# sourceMappingURL=Core.d.ts.map