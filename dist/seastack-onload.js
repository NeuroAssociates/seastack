define(["require", "exports", "./seastack"], function (require, exports, seastack_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    document.addEventListener('DOMContentLoaded', () => {
        let seastack = new seastack_1.Seastack.Core();
        seastack.getElements(document.body).fillElements();
    }, false);
});
//# sourceMappingURL=seastack-onload.js.map