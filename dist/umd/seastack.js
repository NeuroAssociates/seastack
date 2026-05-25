(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Seastack = {}));
})(this, (function (exports) { 'use strict';

    const tagNames = {
        source: 'sea-src',
        dataPath: 'sea-data',
        value: 'sea-val',
        valuelessHidden: 'sea-valueless-hidden',
        attributeName: 'sea-att',
        attributeValue: 'sea-att-val',
        attributeValuelessHidden: 'sea-att-valueless-hidden',
        attributeSet: 'sea-atts',
    };

    class SeaAttribute {
        constructor(name, value) {
            this.name = name;
            this.value = value;
        }
    }

    class SeaElement {
        constructor(targetElement) {
            this.seaSource = null;
            this.seaDataPath = null;
            this.seaAttributes = [];
            if (!(targetElement instanceof Element))
                throw new Error('SeaElement requires an Element');
            this.element = targetElement;
            this.seaSource = targetElement.getAttribute(tagNames.source);
            this.seaDataPath = targetElement.getAttribute(tagNames.dataPath);
            this.seaAttributes = [];
        }
        isValid() {
            return this.seaSource !== null && this.seaSource !== undefined && this.seaSource.length > 0;
        }
        async fill() {
            if (!this.isValid())
                return this;
            await this.getData();
            await this.fillHTML();
            return this;
        }
        async getData() {
            if (!this.isValid() || !this.seaDataPath)
                return this;
            try {
                const response = await fetch(this.seaDataPath, { mode: 'cors' });
                if (!response.ok) {
                    console.log('Status Code: ' + response.status + ' while fetching ' + this.seaDataPath);
                    return this;
                }
                const json = await response.json();
                this.seaData = (json && (json.seadata ?? json.seaData ?? json.data)) || [];
                return this;
            }
            catch (err) {
                console.log('Fetch Error: ' + err);
                return this;
            }
        }
        async fillHTML() {
            if (!this.isValid())
                return this;
            if (this.seaSource === '#') {
                const html = this.element.innerHTML;
                this.element.innerHTML = ''; // Clear template nodes safely
                const fragment = this.HTMLwithDataFragment(html);
                this.element.appendChild(fragment);
                return this;
            }
            if (!this.seaSource)
                return this;
            try {
                const response = await fetch(this.seaSource, { mode: 'cors' });
                if (!response.ok) {
                    console.log('Status Code: ' + response.status + ' while fetching ' + this.seaSource);
                    return this;
                }
                const html = await response.text();
                const fragment = this.HTMLwithDataFragment(html);
                this.element.appendChild(fragment);
                return this;
            }
            catch (err) {
                console.log('Fetch Error:' + err);
                return this;
            }
        }
        HTMLwithDataFragment(html) {
            const fragment = document.createDocumentFragment();
            if (!this.seaData || this.seaData.length === 0) {
                const temp = document.createElement('div');
                temp.innerHTML = html;
                while (temp.firstChild) {
                    fragment.appendChild(temp.firstChild);
                }
                return fragment;
            }
            const templateContainer = document.createElement('div');
            templateContainer.innerHTML = html;
            this.seaData.forEach((dataItem) => {
                Array.from(templateContainer.children).forEach((node) => {
                    const clone = node.cloneNode(true);
                    this.applyDataToElement(clone, dataItem);
                    fragment.appendChild(clone);
                });
            });
            return fragment;
        }
        // Walk node tree and apply attribute/value bindings for a single data item
        applyDataToElement(el, data) {
            // process this element
            const attrs = [];
            const seaAttributeName = el.getAttribute(tagNames.attributeName);
            const seaAttributeValue = el.getAttribute(tagNames.attributeValue);
            const seaAttributeValuelessHidden = el.getAttribute(tagNames.attributeValuelessHidden);
            if (seaAttributeName &&
                seaAttributeName.length > 0 &&
                seaAttributeValue &&
                seaAttributeValue.length > 0) {
                const val = data[seaAttributeValue];
                if (val != null && String(val).length > 0) {
                    attrs.push(new SeaAttribute(seaAttributeName, seaAttributeValue));
                }
                else if (seaAttributeValuelessHidden != null) {
                    el.setAttribute('hidden', '');
                }
            }
            const seaAttributeSet = el.getAttribute(tagNames.attributeSet);
            if (seaAttributeSet) {
                const attributes = seaAttributeSet.split(',');
                attributes.forEach((attribute) => {
                    const items = attribute.split(':');
                    if (items.length > 1) {
                        const name = items[0].trim();
                        const value = items[1].trim();
                        attrs.push(new SeaAttribute(name, value));
                    }
                });
            }
            attrs.forEach((attribute) => {
                const value = data[attribute.value];
                if (value != null)
                    el.setAttribute(attribute.name, String(value));
            });
            const seaValue = el.getAttribute(tagNames.value);
            const seaValuelessHidden = el.getAttribute(tagNames.valuelessHidden);
            if (seaValue && seaValue.length > 0) {
                const v = data[seaValue];
                if (v != null && String(v).length > 0) {
                    el.innerHTML = String(v);
                }
                else if (seaValuelessHidden != null) {
                    el.setAttribute('hidden', '');
                }
            }
            // recurse into children
            Array.from(el.children).forEach((child) => this.applyDataToElement(child, data));
        }
    }

    class Core {
        constructor() {
            this.seaElements = [];
        }
        getElements(rootElement) {
            this.seaElements = [];
            this.getElementsFromChildren(rootElement);
            return this;
        }
        getElementsFromChildren(rootElement) {
            if (!(rootElement instanceof Element))
                return;
            Array.from(rootElement.children).forEach((childElement) => {
                const seaElement = new SeaElement(childElement);
                if (seaElement.isValid() === true) {
                    this.seaElements.push(seaElement);
                }
                else {
                    this.getElementsFromChildren(childElement);
                }
            });
            return;
        }
        async fillElements() {
            for (const element of this.seaElements) {
                await element.fill();
            }
            return this;
        }
    }

    class SeaStackComponent extends HTMLElement {
        static get observedAttributes() {
            return ['src', 'data'];
        }
        constructor() {
            super();
            this.isConnectedToDom = false;
        }
        async connectedCallback() {
            this.isConnectedToDom = true;
            await this.render();
        }
        async attributeChangedCallback(name, oldValue, newValue) {
            if (this.isConnectedToDom && oldValue !== newValue) {
                await this.render();
            }
        }
        async render() {
            const src = this.getAttribute('src');
            const data = this.getAttribute('data');
            if (!src)
                return;
            // Clear existing rendering for proper reactivity
            this.innerHTML = '';
            const seaElement = new SeaElement(this);
            seaElement.seaSource = src;
            seaElement.seaDataPath = data;
            await seaElement.fill();
        }
    }
    if (typeof window !== 'undefined' && 'customElements' in window) {
        customElements.define('sea-stack', SeaStackComponent);
    }

    exports.Core = Core;
    exports.SeaAttribute = SeaAttribute;
    exports.SeaElement = SeaElement;
    exports.SeaStackComponent = SeaStackComponent;
    exports.tagNames = tagNames;

}));
//# sourceMappingURL=seastack.js.map
