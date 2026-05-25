[![GitHub version](https://img.shields.io/badge/version-2.0.0-blue)](https://github.com/NeuroAssociates/seastack/releases/tag/Release)
[![GitHub issues](https://img.shields.io/github/issues/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/issues)
[![GitHub forks](https://img.shields.io/github/forks/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/network)
[![GitHub stars](https://img.shields.io/github/stars/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/stargazers)
[![GitHub license](https://img.shields.io/github/license/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/blob/master/LICENSE)
*Read this in other languages: [English](README.md), [한국어](README.ko.md)*

![Logo of Seastack](./img/logo.png)

# Seastack.js v2.0.0
*A high-performance, zero-dependency JavaScript library for generating web documents based on data*

Seastack.js enables you to quickly generate web documents by associating HTML templates with JSON-formatted data files without additional JavaScript coding. With this library, you can update your website simply by modifying the JSON file—no HTML updates required.

---

## 🚀 Key Features

*   **Standard Web Components Support:** Declare custom `<sea-stack>` tags to dynamically bind templates and data.
*   **High-Performance DOM Rendering:** Leverages `DocumentFragment` to aggregate DOM nodes offscreen, eliminating layout reflows and reducing CPU overhead.
*   **Universal Module Support (ESM, CJS, UMD):** Seamlessly integrates with modern bundlers (Webpack, Vite, Rollup) and traditional `<script>` tags (100% backward compatibility).
*   **Lightweight & Zero Dependencies:** Extremely small footprint, written in TypeScript.
*   **Reactive Attribute Binding:** Automatically monitors and re-renders components when attributes (`src`, `data`) change dynamically.

---

## 📦 Installation

### 1. Via CDN / Script Tag (Traditional)
Add the built UMD scripts in the `<head>` or `<body>` area of your HTML file:

```html
<script type="text/javascript" src="dist/umd/seastack.js"></script>
<script type="text/javascript" src="dist/umd/seastack-onload.js"></script>
```

### 2. Via NPM
```bash
npm install seastack
```

---

## 🛠️ How to Use

Seastack provides three convenient ways to connect your HTML templates with data.

### Method A: Declarative Web Component (Recommended)
Simply declare a custom `<sea-stack>` element in your HTML. No additional JavaScript onload handler required!

```html
<!-- Automatically fetches component template and JSON data and renders seamlessly -->
<sea-stack src="./html/tel-codes.html" data="./data/tel-codes.json"></sea-stack>
```

### Method B: HTML5 Attribute Bindings (Backward Compatible)
Add the custom `sea-src` and `sea-data` attributes to a placeholder element:

```html
<div sea-src="./html/component.html" sea-data="./data/data.json"></div>
```
Ensure `seastack-onload.js` is included in your script imports, or initialize manually:
```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        let seastack = new Seastack.Core();
        seastack.getElements(document.body).fillElements();
    }, false);
</script>
```

### Method C: Programmatic Module Imports (ESM & CommonJS)
Import Seastack inside Webpack, Vite, Next.js, or Node.js environments:

#### ES Modules (ESM)
```javascript
import { Core } from 'seastack';

const seastack = new Core();
seastack.getElements(document.body);
await seastack.fillElements();
```

#### CommonJS (CJS)
```javascript
const { Core } = require('seastack');

const seastack = new Core();
seastack.getElements(document.body);
seastack.fillElements();
```

---

## 📊 Data Format
You can freely specify data in the form of an array under the property `seadata` (or `seaData`, `data`).

```json
{
    "seadata": [
        {
            "number": "+1",
            "name": "Canada",
            "link" : "https://en.wikipedia.org/wiki/Canada",
            "target": "_blank"
        },
        {
            "number": "+20",
            "name": "Egypt",
            "link" : "https://en.wikipedia.org/wiki/Egypt",
            "target": "_blank"
        }
    ]
}
```

---

## 🧩 HTML Components (Template)
Create your HTML fragments (components) separately. You can map JSON properties by using `sea-` attributes:

```html
<div>
    <span sea-val="number"></span>
    <a sea-att="href" sea-att-val="link">
        <span sea-val="name"></span>
    </a>
</div>
```

### Attribute Mapping Reference

| Attribute | Value Description |
| :--- | :--- |
| `sea-val` | Replaces the element's `innerHTML` with the JSON property value |
| `sea-att` | Binds a single attribute name (e.g., `href`, `src`) |
| `sea-att-val` | Maps the JSON property key for the attribute specified in `sea-att` |
| `sea-atts` | Maps multiple attributes in a comma-separated key-value pairs (e.g., `href:link,target:target`) |
| `sea-valueless-hidden` | Automatically adds `hidden` attribute if the `sea-val` value is empty |
| `sea-att-valueless-hidden` | Automatically adds `hidden` attribute if the attribute value is empty |

---

## 💻 Local Development & Contributions

Contributions are highly welcome! Seastack is powered by **TypeScript**, **Rollup.js**, and **Vitest** to guarantee a modern development experience (DX).

### 1. Setup
Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Build Pipeline
Generate production bundles for ESM, CJS, and UMD formats:
```bash
# Production compile
npm run build

# Development watch mode
npm run watch

# Clean previous build artifacts
npm run clean
```

### 3. Linting & Formatting
Enforce code formatting and quality:
```bash
# Check code style and typescript errors
npm run lint

# Auto-format codebase with Prettier
npm run format
```

### 4. Running Automated Tests
Run high-speed automated unit tests using Vitest in a simulated browser (Happy DOM) environment:
```bash
npm run test
```

---

## 📄 License
Copyright (c) Neuro Associates. All rights reserved.

Licensed under the [MIT](LICENSE) License.
