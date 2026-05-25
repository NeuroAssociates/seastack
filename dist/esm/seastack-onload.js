import { Core } from './seastack';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const seastack = new Core();
        seastack.getElements(document.body);
        await seastack.fillElements();
    }
    catch (err) {
        console.error('Seastack initialization error:', err);
    }
}, false);
//# sourceMappingURL=seastack-onload.js.map
