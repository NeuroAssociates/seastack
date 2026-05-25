'use strict';

var seastack = require('./seastack');

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
//# sourceMappingURL=seastack-onload.js.map
