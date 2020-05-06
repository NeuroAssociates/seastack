var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Seastack;
(function (Seastack) {
    Seastack.tagNames = {
        "source": "sea-src",
        "dataPath": "sea-data",
        "value": "sea-val",
        "valuelessHidden": "sea-valueless-hidden",
        "attributeName": "sea-att",
        "attributeValue": "sea-att-val",
        "attributeValuelessHidden": "sea-att-valueless-hidden",
        "attributeSet": "sea-atts"
    };
    class SeaAttribute {
        constructor(name, value) {
            this.name = name;
            this.value = value;
            return;
        }
    }
    Seastack.SeaAttribute = SeaAttribute;
    class SeaElement {
        constructor(targetElement) {
            if (!(targetElement instanceof Element))
                return null;
            let seaSource = targetElement.getAttribute(Seastack.tagNames.source);
            let seaDataPath = targetElement.getAttribute(Seastack.tagNames.dataPath);
            if (seaSource !== null && seaSource !== undefined && seaSource.length > 0) {
                this.element = targetElement;
                this.seaSource = seaSource;
                this.seaDataPath = seaDataPath;
            }
            return this;
        }
        isValid() {
            return (this.seaSource !== null && this.seaSource !== undefined && this.seaSource.length > 0);
        }
        fill() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.isValid() === false)
                    return;
                yield this.getData();
                yield this.fillHTML();
                return;
            });
        }
        getData() {
            return new Promise((resolve) => {
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
                    .catch(function (err) {
                    console.log('Fetch Error: ' + err);
                    return resolve(this);
                });
            });
        }
        fillHTML() {
            return new Promise((resolve) => {
                if (this.isValid() === false)
                    return this;
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
                    .catch(function (err) {
                    console.log('Fetch Error:' + err);
                    return resolve(this);
                });
            });
        }
        HTMLwithData(html) {
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
        HTMLElementWithData(element, data) {
            [...element.children].forEach(childElement => {
                this.seaAttributes = new Array();
                let seaAttributeName = childElement.getAttribute(Seastack.tagNames.attributeName);
                let seaAttributeValue = childElement.getAttribute(Seastack.tagNames.attributeValue);
                let seaAttributeValuelessHidden = childElement.getAttribute(Seastack.tagNames.attributeValuelessHidden);
                if (seaAttributeName !== null && seaAttributeName.length > 0
                    && seaAttributeValue !== null && seaAttributeValue.length > 0) {
                    if (data[seaAttributeValue] !== null && data[seaAttributeValue].length > 0) {
                        let seaAttribute = new SeaAttribute(seaAttributeName, seaAttributeValue);
                        this.seaAttributes.push(seaAttribute);
                    }
                    else if (seaAttributeValuelessHidden !== null) {
                        childElement.setAttribute("hidden", "");
                    }
                }
                let seaAttributeSet = childElement.getAttribute(Seastack.tagNames.attributeSet);
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
                this.seaAttributes.forEach(attribute => {
                    childElement.setAttribute(attribute.name, data[attribute.value]);
                });
                let seaValue = childElement.getAttribute(Seastack.tagNames.value);
                let seaValuelessHidden = childElement.getAttribute(Seastack.tagNames.valuelessHidden);
                if (seaValue === null || seaValue.length < 1) {
                    this.HTMLElementWithData(childElement, data);
                }
                else if (data[seaValue] !== undefined && data[seaValue].length > 0) {
                    childElement.innerHTML = data[seaValue];
                }
                else if (seaValuelessHidden !== null) {
                    childElement.setAttribute("hidden", "");
                }
                element.appendChild(childElement);
            });
            return element;
        }
    }
    Seastack.SeaElement = SeaElement;
    class Core {
        constructor() {
            this.seaElements = new Array();
        }
        getElements(rootElement) {
            this.seaElements = new Array();
            this.getElementsFromChildren(rootElement);
            return this;
        }
        getElementsFromChildren(rootElement) {
            if (!(rootElement instanceof Element))
                return;
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