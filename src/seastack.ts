namespace Seastack {

    export let tagNames = {
        "source": "sea-src",
        "dataPath": "sea-data",
        "value": "sea-val",
        "valuelessHidden": "sea-valueless-hidden",
        "attributeName": "sea-att",
        "attributeValue": "sea-att-val",
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

        element: Element;
        seaSource: string;
        seaDataPath: string;
        seaData: Array<any>;
        seaAttributes: Array<SeaAttribute>;

        constructor(targetElement: Element) {

            if (!(targetElement instanceof Element)) return null;
            
            let seaSource = targetElement.getAttribute(tagNames.source);
            let seaDataPath = targetElement.getAttribute(tagNames.dataPath);

            if (seaSource !== null && seaSource !== undefined && seaSource.length > 0) {
                this.element = targetElement;
                this.seaSource = seaSource;
                this.seaDataPath = seaDataPath; // none => null
            }

            return this;
        }

        isValid(): boolean {
            return (this.seaSource !== null && this.seaSource !== undefined && this.seaSource.length > 0);
        }
        
        async fill() {

            if (this.isValid() === false) return;

            await this.getData();
            await this.fillHTML();
            
            return;
        }

        getData(): Promise<SeaElement> {

            return new Promise((resolve: Function) => {

                if (this.isValid() === false || this.seaDataPath === null) {
                    return resolve(this);
                }
    
                fetch(this.seaDataPath, { mode: 'cors' })
                .then((response) => {                
                    if (response.status !== 200) {
                        console.log('Status Code: ' + response.status + ' while fetching ' + this.seaDataPath);
                        return;
                    }
    
                    return response.json();
                })
                .then((json) => {                
                    if (json.seadata !== null) {
                        this.seaData = json.seadata;
                    }
    
                    return resolve(this);
                })
                .catch(function(err) {
                    console.log('Fetch Error: ' + err);
                    return resolve(this);
                });
    
            });

        }

        fillHTML(): Promise<SeaElement> {

            return new Promise((resolve: Function) => {

                if (this.isValid() === false) return this;

                // console.log(this);
    
                if (this.seaSource === "#") {
                    let html = this.element.innerHTML;
                    this.element.innerHTML = this.HTMLwithData(html);
                    
                    return resolve(this);
                }
                
                fetch(this.seaSource, { mode: 'cors' })
                .then((response) => {                
                    if (response.status !== 200) {
                        console.log('Status Code: ' + response.status + ' while fetching ' + this.seaSource);
                        return;
                    }
    
                    return response.text();
                })
                .then((html) => {
                    this.element.innerHTML = this.element.innerHTML + this.HTMLwithData(html);
                    return resolve(this);
                })
                .catch(function(err) {
                    console.log('Fetch Error:' + err);
                    return resolve(this);
                });

            });

        }

        HTMLwithData(html: string): string {

            if (this.seaData === undefined) {
                return html;
            }

            let rootElement = document.createElement("seaDataSet");

            this.seaData.forEach(data => {

                let itemElement = document.createElement("seaData");
                itemElement.innerHTML = html;
                rootElement.innerHTML = rootElement.innerHTML + this.HTMLElementWithData(itemElement, data).innerHTML;
            });

            return rootElement.innerHTML;
        }

        HTMLElementWithData(element: Element, data: any): Element {
            
            [...element.children].forEach(childElement => {
                
                this.seaAttributes = new Array();
                
                let seaAttributeName = childElement.getAttribute(tagNames.attributeName);
                let seaAttributeValue = childElement.getAttribute(tagNames.attributeValue);
                
                
                if (seaAttributeName !== null && seaAttributeName.length > 0
                    && seaAttributeValue !== null && seaAttributeValue.length > 0
                    && data[seaAttributeValue] !== null && data[seaAttributeValue].length > 0) {
                        
                    let seaAttribute = new SeaAttribute(seaAttributeName, seaAttributeValue);
                    this.seaAttributes.push(seaAttribute);
                    // childElement.setAttribute(seaAttributeName, data[seaAttributeValue]);
                    // isValueless = false;
                    
                    // console.log(seaAttributeName);
                    // console.log(seaAttributeValue);
                }
                    
                let seaAttributeSet = childElement.getAttribute(tagNames.attributeSet);

                if (seaAttributeSet !== null) {
                    let attributes = seaAttributeSet.split(",");

                    attributes.forEach(attribute => {
                        
                        let items = attribute.split(":");

                        if (items.length > 1) {
                            let name = items[0].trim();
                            let value = items[1].trim();
                            let seaAttribute = new SeaAttribute(name, value);
                            this.seaAttributes.push(seaAttribute);
                        }
                    });
                }
                    
                    
                    
                // console.log(this.seaAttributes);

                this.seaAttributes.forEach(attribute => {
                    // console.log(attribute);
                    childElement.setAttribute(attribute.name, data[attribute.value]);
                });


                
                let seaValue = childElement.getAttribute(tagNames.value);
                let seaValuelessHidden = childElement.getAttribute(tagNames.valuelessHidden);
                // console.log(seaValuelessHidden);

                if (seaValue === null || seaValue.length < 1) {
                    this.HTMLElementWithData(childElement, data);
                }
                else if (data[seaValue] !== undefined && data[seaValue].length > 0) {
                    childElement.innerHTML = data[seaValue];
                }
                else if (seaValuelessHidden !== null) { //} && seaValuelessHidden.toUpperCase() === "TRUE") {
                    childElement.setAttribute("hidden", "");
                    
                    console.log(element);
                }

                element.appendChild(childElement);
            });

            return element;
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
            
            [...rootElement.children].forEach(childElement => {

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

        fillElements(): Core {

            this.seaElements.forEach(element => {
                element.fill();
            });

            return this;
        }
    }
}
