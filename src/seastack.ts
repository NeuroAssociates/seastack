namespace Seastack {

    export let tagNames = {
        "source": "sea-src",
        "dataPath": "sea-data",
        "value": "sea-val",
        "attributeName": "sea-att",
        "attributeValue": "sea-att-val",
        "attributeMap": "sea-atts"
    }

    export let entryElements = [
        "TITLE", 
        "HEADER", 
        "NAV", 
        "FOOTER", 
        "ARTICLE", 
        "SECTION", 
        "UL", 
        "LI", 
        "H1", 
        "H2", 
        "DIV", 
        "SPAN", 
        "P", 
        "SVG", 
        "A", 
        "IMG", 
        "VIDEO", 
        "AUDIO", 
        "IFRAME", 
        "UL",
        "LI"
    ];



    export class SeaElement {

        element: Element;
        seaSource: string;
        seaDataPath: string;
        seaData: Array<any>;

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
                    this.element.innerHTML = this.HTMLwithData(html);
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

                entryElements.forEach(entryElement => {

                    let targetElements = [...itemElement.getElementsByTagName(entryElement)];

                    targetElements.forEach(element => {

                        var isValueless = true;

                        let seaAttributeName = element.getAttribute(tagNames.attributeName);
                        let seaAttributeValue = element.getAttribute(tagNames.attributeValue);
                        
                        if (seaAttributeName !== null && seaAttributeName.length > 0
                            && seaAttributeValue !== null && seaAttributeValue.length > 0
                            && data[seaAttributeValue] !== null && data[seaAttributeValue].length > 0) {

                                element.setAttribute(seaAttributeName, data[seaAttributeValue]);
                                isValueless = false;
                        }
                        
                        let seaValue = element.getAttribute(tagNames.value);
                        
                        if (seaValue !== null && seaValue.length > 0
                            && data[seaValue] !== undefined && data[seaValue].length > 0) {

                            element.innerHTML = data[seaValue];
                            isValueless = false;
                        }
                            
                        let seaValuelessHidden = element.getAttribute("sea-valueless-hidden");

                        if (seaValuelessHidden !== null && seaValuelessHidden.length > 0 
                            && isValueless === true) {
                            
                            element.setAttribute("hidden", "");
                        }
                    });
                });

                rootElement.innerHTML = rootElement.innerHTML + itemElement.innerHTML;
            });

            return rootElement.innerHTML;
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
                } else {
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
