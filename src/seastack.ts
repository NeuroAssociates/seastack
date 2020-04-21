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

    export interface SeaData {
        seaData: Array<any>;
    }

    interface HttpResponse<T> extends Response {
        parsedBody?: T;
    }

    export async function http<T>(request: RequestInfo, type: string): Promise<HttpResponse<T>> {

        const response: HttpResponse<T> = await fetch(request);
      
        try {
            switch(type) {
            case "json":
                response.parsedBody = await response.json();
                break;
            case "html":
                //response.parsedBody = response;
                break;
            default:
                break;
            }
        } catch (exception) {}
      
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response;
    }

    export class SeaElement {

        element: Element;
        seaSource: string;
        seaDataPath: string;
        seaData: SeaData;

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
        
        async fillData() {

            console.log(this);

            const response = await http<SeaData>(this.seaDataPath, "json");
            // this.seaData = response;

            return;
        }

        fillHTML(): SeaElement {

            
            return;
        }
        
        fill(): SeaElement {

            this.fillData()
            this.fillHTML();
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
