import { describe, it, expect, beforeEach, vi } from 'vitest';
import { tagNames } from '../src/constants/tagNames';
import { SeaAttribute } from '../src/core/SeaAttribute';
import { SeaElement } from '../src/core/SeaElement';
import { SeaStackComponent } from '../src/core/SeaStackComponent';

// fetch API 글로벌 모킹
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('Seastack.js v2.0.0 Unit Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        mockFetch.mockReset();
    });

    describe('Constants and Models', () => {
        it('should possess correct tagNames mapping', () => {
            expect(tagNames.source).toBe('sea-src');
            expect(tagNames.dataPath).toBe('sea-data');
            expect(tagNames.value).toBe('sea-val');
        });

        it('should construct SeaAttribute instance correctly', () => {
            const attr = new SeaAttribute('href', 'link');
            expect(attr.name).toBe('href');
            expect(attr.value).toBe('link');
        });
    });

    describe('SeaElement Class', () => {
        it('should evaluate isValid correctly based on sea-src attribute', () => {
            const validDiv = document.createElement('div');
            validDiv.setAttribute('sea-src', './html/component.html');

            const invalidDiv = document.createElement('div');

            const validSeaEl = new SeaElement(validDiv);
            const invalidSeaEl = new SeaElement(invalidDiv);

            expect(validSeaEl.isValid()).toBe(true);
            expect(invalidSeaEl.isValid()).toBe(false);
        });

        it('should fetch JSON data and populate seaData array', async () => {
            const div = document.createElement('div');
            div.setAttribute('sea-src', './html/component.html');
            div.setAttribute('sea-data', './data.json');

            // Mock fetch response for JSON data
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => ({
                    seadata: [
                        { name: 'Canada', value: '+1' },
                        { name: 'Egypt', value: '+20' }
                    ]
                })
            });

            const seaEl = new SeaElement(div);
            await seaEl.getData();

            expect(mockFetch).toHaveBeenCalledWith('./data.json', expect.any(Object));
            expect(seaEl.seaData).toBeDefined();
            expect(seaEl.seaData?.length).toBe(2);
            expect(seaEl.seaData?.[0].name).toBe('Canada');
        });
    });

    describe('W3C Custom Element (<sea-stack>)', () => {
        it('should define and instantiate <sea-stack> custom element correctly', () => {
            expect(customElements.get('sea-stack')).toBeDefined();

            const component = document.createElement('sea-stack');
            expect(component instanceof SeaStackComponent).toBe(true);
        });
    });
});
