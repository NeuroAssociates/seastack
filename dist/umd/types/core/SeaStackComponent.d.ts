export declare class SeaStackComponent extends HTMLElement {
    static get observedAttributes(): string[];
    private isConnectedToDom;
    constructor();
    connectedCallback(): Promise<void>;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): Promise<void>;
    render(): Promise<void>;
}
//# sourceMappingURL=SeaStackComponent.d.ts.map