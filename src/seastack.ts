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

            if (seaSource !== null && seaSource.length > 0) {
                this.element = targetElement;
                this.seaSource = seaSource;
                this.seaDataPath = seaDataPath;
            } else {
                return null;
            }

            return this;
        }
        
        fillData(): SeaElement {

            if (this.seaSource === null || this.seaDataPath === null) return this;

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
            })
            .catch(function(err) {
                console.log('Fetch Error ' +  err + ' while fetching ' + this.seaDataPath);
            });

            return this;
        }

        fillHTML(): SeaElement {

            if (this.seaSource === null) return this;

            fetch(this.seaSource, { mode: 'cors' })
            .then((response) => {                
                if (response.status !== 200) {
                    console.log('Status Code: ' + response.status + ' while fetching ' + this.seaSource);
                    return;
                }

                return response.text();
            })
            .then((html) => {
                if (this.seaData !== null) {
                    this.element.innerHTML = this.HTMLwithData(html);
                } else {
                    this.element.innerHTML = html;
                }
            })
            .catch(function(err) {
                console.log('Fetch Error: ' + err + ' while fetching ' + this.seaSource);
            });

            return this;
        }

        HTMLwithData(html: string): string {

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
                            && data[seaValue] !== null && data[seaValue].length > 0) {

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
        
        fill(): SeaElement {

            this.fillData().fillHTML();

            return this;
        }
    }



    export class Core {

        seaElements: Array<SeaElement>;

        constructor() {

            this.seaElements = new Array();
        }

        getElements(rootElement: HTMLElement): Core {
            
            this.seaElements = new Array();
            
            if (!(rootElement instanceof HTMLElement)) return this;
            
            entryElements.forEach(entryElement => {
                let targetElements = [...rootElement.getElementsByTagName(entryElement)];

                targetElements.forEach(targetElement => {
                    var seaElement = new SeaElement(targetElement);
                    if (seaElement !== null) {
                        this.seaElements.push(seaElement);
                    }
                });
            });

            return this;
        }

        fillElements(): Core {

            this.seaElements.forEach(element => {
                element.fill();
            });

            return this;
        }
    }
}
