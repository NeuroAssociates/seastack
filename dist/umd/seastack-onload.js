(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('./seastack')) :
    typeof define === 'function' && define.amd ? define(['./seastack'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Seastack));
})(this, (function (seastack) { 'use strict';

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const seastack$1 = new seastack.Core();
            seastack$1.getElements(document.body);
            await seastack$1.fillElements();
        }
        catch (err) {
            console.error('Seastack initialization error:', err);
        }
    }, false);

}));
//# sourceMappingURL=seastack-onload.js.map
