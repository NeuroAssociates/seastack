(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('./core/Core')) :
    typeof define === 'function' && define.amd ? define(['./core/Core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Seastack));
})(this, (function (Core) { 'use strict';

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const seastack = new Core.Core();
            seastack.getElements(document.body);
            await seastack.fillElements();
        }
        catch (err) {
            console.error('Seastack initialization error:', err);
        }
    }, false);

}));
//# sourceMappingURL=seastack-onload.js.map
