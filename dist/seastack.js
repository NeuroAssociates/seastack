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
        getData() {
            if (this.seaSource === undefined || this.seaDataPath === null)
                return this;
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
                    // async / await is needed!!!!!!!!!!!!!!
                    console.log("getData() : then " + this.seaDataPath);
                }
            })
                .catch(function (err) {
                console.log('Fetch Error: ' + err);
            });
            // async / await is needed!!!!!!!!!!!!!!
            console.log("getData() : return " + this.seaDataPath);
            return this;
        }
        fillHTML() {
            if (this.seaSource === undefined)
                return this;
            if (this.seaSource === "#") {
                let html = this.element.innerHTML;
                this.element.innerHTML = this.HTMLwithData(html);
                return this;
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
            })
                .catch(function (err) {
                console.log('Fetch Error:' + err);
            });
            return this;
        }
        HTMLwithData(html) {
            if (this.seaData === undefined) {
                console.log(this);
                console.log(this.seaData);
                return html;
            }
            let rootElement = document.createElement("seaDataSet");
            this.seaData.forEach(data => {
                let itemElement = document.createElement("seaData");
                itemElement.innerHTML = html;
                Seastack.entryElements.forEach(entryElement => {
                    let targetElements = [...itemElement.getElementsByTagName(entryElement)];
                    targetElements.forEach(element => {
                        var isValueless = true;
                        let seaAttributeName = element.getAttribute(Seastack.tagNames.attributeName);
                        let seaAttributeValue = element.getAttribute(Seastack.tagNames.attributeValue);
                        if (seaAttributeName !== null && seaAttributeName.length > 0
                            && seaAttributeValue !== null && seaAttributeValue.length > 0
                            && data[seaAttributeValue] !== null && data[seaAttributeValue].length > 0) {
                            element.setAttribute(seaAttributeName, data[seaAttributeValue]);
                            isValueless = false;
                        }
                        let seaValue = element.getAttribute(Seastack.tagNames.value);
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
        fill() {
            this.getData().fillHTML();
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
            this.getElementsFromChildren(rootElement);
            return this;
        }
        getElementsFromChildren(rootElement) {
            if (!(rootElement instanceof Element))
                return;
            [...rootElement.children].forEach(childElement => {
                var seaElement = new SeaElement(childElement);
                if (seaElement.isValid() === true) {
                    // console.log(seaElement);
                    this.seaElements.push(seaElement);
                }
                else {
                    // console.log("DOM TOUR");
                    this.getElements(childElement);
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