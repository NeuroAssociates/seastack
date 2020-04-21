var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Seastack;
(function (Seastack) {
    Seastack.tagNames = {
        "source": "sea-src",
        "dataPath": "sea-data",
        "value": "sea-val",
        "attributeName": "sea-att",
        "attributeValue": "sea-att-val",
        "attributeMap": "sea-atts"
    };
    Seastack.entryElements = [
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
    function http(request, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(request);
            try {
                switch (type) {
                    case "json":
                        response.parsedBody = yield response.json();
                        break;
                    case "html":
                        //response.parsedBody = response;
                        break;
                    default:
                        break;
                }
            }
            catch (exception) { }
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response;
        });
    }
    Seastack.http = http;
    class SeaElement {
        constructor(targetElement) {
            if (!(targetElement instanceof Element))
                return null;
            let seaSource = targetElement.getAttribute(Seastack.tagNames.source);
            let seaDataPath = targetElement.getAttribute(Seastack.tagNames.dataPath);
            if (seaSource !== null && seaSource.length > 0) {
                this.element = targetElement;
                this.seaSource = seaSource;
                this.seaDataPath = seaDataPath;
            }
            else {
                return null;
            }
            return this;
        }
        fillData() {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(this);
                const response = yield http(this.seaDataPath, "json");
                // this.seaData = response;
                return;
            });
        }
        fillHTML() {
            return;
        }
        fill() {
            this.fillData();
            this.fillHTML();
            return this;
        }
    }
    Seastack.SeaElement = SeaElement;
    class Core {
        constructor() {
            this.seaElements = new Array();
        }
        getElements(rootElement) {
            this.seaElements = new Array();
            if (!(rootElement instanceof HTMLElement))
                return this;
            Seastack.entryElements.forEach(entryElement => {
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
        fillElements() {
            this.seaElements.forEach(element => {
                element.fill();
            });
            return this;
        }
    }
    Seastack.Core = Core;
})(Seastack || (Seastack = {}));
//# sourceMappingURL=seastack.js.map