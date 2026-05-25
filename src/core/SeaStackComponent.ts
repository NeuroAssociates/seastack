import { SeaElement } from "./SeaElement";

export class SeaStackComponent extends HTMLElement {
    static get observedAttributes() {
        return ['src', 'data'];
    }

    private isConnectedToDom = false;

    constructor() {
        super();
    }

    async connectedCallback() {
        this.isConnectedToDom = true;
        await this.render();
    }

    async attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (this.isConnectedToDom && oldValue !== newValue) {
            await this.render();
        }
    }

    async render() {
        const src = this.getAttribute('src');
        const data = this.getAttribute('data');

        if (!src) return;

        // Clear existing rendering for proper reactivity
        this.innerHTML = "";

        const seaElement = new SeaElement(this);
        seaElement.seaSource = src;
        seaElement.seaDataPath = data;
        await seaElement.fill();
    }
}

if (typeof window !== 'undefined' && 'customElements' in window) {
    customElements.define('sea-stack', SeaStackComponent);
}
