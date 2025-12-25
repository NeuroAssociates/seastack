namespace Seastack {

    export let tagNames = {
        "source": "sea-src",
        "dataPath": "sea-data",
        "value": "sea-val",
        "valuelessHidden": "sea-valueless-hidden",
        "attributeName": "sea-att",
        "attributeValue": "sea-att-val",
        "attributeValuelessHidden": "sea-att-valueless-hidden",
        "attributeSet": "sea-atts"
    }

    export class SeaAttribute {
        name: string;
        value: string;

        constructor(name: string, value: string) {
            
            this.name = name;
            this.value = value;

            return;
        }
    }

    export class SeaElement {

        element!: Element;
        seaSource: string | null = null;
        seaDataPath: string | null = null;
        seaData?: Array<any>;
        seaAttributes: Array<SeaAttribute> = [];

        constructor(targetElement: Element) {

            if (!(targetElement instanceof Element)) throw new Error('SeaElement requires an Element');

            this.element = targetElement;
            this.seaSource = targetElement.getAttribute(tagNames.source);
            this.seaDataPath = targetElement.getAttribute(tagNames.dataPath);
            this.seaAttributes = [];
        }

        isValid(): boolean {
            return (this.seaSource !== null && this.seaSource !== undefined && this.seaSource.length > 0);
        }
        
        async fill() {
            if (!this.isValid()) return this;
            await this.getData();
            await this.fillHTML();
            return this;
        }

        async getData(): Promise<SeaElement> {
            if (!this.isValid() || !this.seaDataPath) return this;

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

        async fillHTML(): Promise<SeaElement> {
            if (!this.isValid()) return this;

            if (this.seaSource === "#") {
                const html = this.element.innerHTML;
                this.element.innerHTML = this.HTMLwithData(html);
                return this;
            }

            if (!this.seaSource) return this;

            try {
                const response = await fetch(this.seaSource, { mode: 'cors' });
                if (!response.ok) {
                    console.log('Status Code: ' + response.status + ' while fetching ' + this.seaSource);
                    return this;
                }

                const html = await response.text();
                this.element.innerHTML = this.element.innerHTML + this.HTMLwithData(html);
                return this;
            }
            catch (err) {
                console.log('Fetch Error:' + err);
                return this;
            }
        }

        HTMLwithData(html: string): string {
            if (!this.seaData || this.seaData.length === 0) return html;

            const root = document.createElement('div');

            // create a temporary container for the template HTML
            const templateContainer = document.createElement('div');
            templateContainer.innerHTML = html;

            this.seaData.forEach(dataItem => {
                // clone each top-level node from the template container
                Array.from(templateContainer.children).forEach(node => {
                    const clone = node.cloneNode(true) as Element;
                    this.applyDataToElement(clone, dataItem);
                    root.appendChild(clone);
                });
            });

            return root.innerHTML;
        }

        // Walk node tree and apply attribute/value bindings for a single data item
        applyDataToElement(el: Element, data: any): void {
            // process this element
            const attrs: Array<SeaAttribute> = [];

            const seaAttributeName = el.getAttribute(tagNames.attributeName);
            const seaAttributeValue = el.getAttribute(tagNames.attributeValue);
            const seaAttributeValuelessHidden = el.getAttribute(tagNames.attributeValuelessHidden);

            if (seaAttributeName && seaAttributeName.length > 0 && seaAttributeValue && seaAttributeValue.length > 0) {
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
                attributes.forEach(attribute => {
                    const items = attribute.split(':');
                    if (items.length > 1) {
                        const name = items[0].trim();
                        const value = items[1].trim();
                        attrs.push(new SeaAttribute(name, value));
                    }
                });
            }

            attrs.forEach(attribute => {
                const value = data[attribute.value];
                if (value != null) el.setAttribute(attribute.name, String(value));
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
            Array.from(el.children).forEach(child => this.applyDataToElement(child as Element, data));
        }
    }



    export class Core {

        seaElements: Array<SeaElement>;

        constructor() {

            this.seaElements = new Array();
        }

        getElements(rootElement: Element): Core {
            
            this.seaElements = new Array();
            this.getElementsFromChildren(rootElement);
            return this;
        }

        getElementsFromChildren(rootElement: Element) {
            
            if (!(rootElement instanceof Element)) return;
            
            Array.from(rootElement.children).forEach(childElement => {

                var seaElement = new SeaElement(childElement);
                
                if (seaElement.isValid() === true) {
                    this.seaElements.push(seaElement);
                } 
                else {
                    this.getElementsFromChildren(childElement);
                }
            });
            
            return;
        }

        // fillElements now awaits each element.fill() to ensure data/template
        // processing completes before returning.
        async fillElements(): Promise<Core> {
            for (const element of this.seaElements) {
                await element.fill();
            }
            return this;
        }
    }
}
