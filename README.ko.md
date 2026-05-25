[![GitHub version](https://img.shields.io/badge/version-2.0.0-blue)](https://github.com/NeuroAssociates/seastack/releases/tag/Release)
[![GitHub issues](https://img.shields.io/github/issues/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/issues)
[![GitHub forks](https://img.shields.io/github/forks/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/network)
[![GitHub stars](https://img.shields.io/github/stars/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/stargazers)
[![GitHub license](https://img.shields.io/github/license/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/blob/master/LICENSE)
*다른 언어로 읽기: [English](README.md), [한국어](README.ko.md)*

![Logo of Seastack](./img/logo.png)

# Seastack.js v2.0.0
*데이터를 기반으로 웹 문서를 생성하는 고성능, 무의존성(Zero-dependency) JavaScript 라이브러리*

Seastack.js는 추가적인 JavaScript 코딩 없이 HTML 템플릿과 JSON 형식의 데이터 파일을 연결하여 신속하게 웹 문서를 생성할 수 있도록 돕습니다. 이 라이브러리를 사용하면 HTML 코드를 매번 직접 수정할 필요 없이, 단순히 JSON 데이터 파일만 업데이트하는 방식으로 웹사이트의 정보를 간편하게 갱신할 수 있습니다.

---

## 🚀 주요 특징

*   **표준 웹 컴포넌트(Web Components) 지원:** 선언적인 커스텀 `<sea-stack>` 태그를 활용해 템플릿과 데이터를 자동으로 동적 바인딩합니다.
*   **고성능 DOM 렌더링:** `DocumentFragment`를 활용하여 메모리(오프스크린) 상에서 DOM 노드 복제 및 데이터 치환 연산을 완료한 뒤 최종 반영하여, 브라우저의 레이아웃 리플로우(Reflow) 현상을 방지하고 CPU 부하를 극적으로 줄입니다.
*   **유니버설 모듈 규격 완벽 대응 (ESM, CJS, UMD):** 현대적인 프론트엔드 모듈 번들러(Webpack, Vite, Rollup 등)뿐만 아니라, 전통적인 `<script>` 태그를 활용한 브라우저 글로벌 환경 모두와 매끄럽게 호환됩니다 (100% 하위 호환성 보장).
*   **초경량화 및 무의존성:** 의존성이 전혀 없는 TypeScript 기반의 초경량 솔루션입니다.
*   **반응형(Reactive) 속성 바인딩:** 컴포넌트의 속성(`src`, `data`)이 동적으로 변경될 때 이를 실시간으로 감지하고 자동으로 내부 화면만을 리렌더링합니다.

---

## 📦 설치 방법

### 1. CDN / 스크립트 태그 방식 (전통적인 브라우저 환경)
HTML 파일의 `<head>` 또는 `<body>` 영역에 빌드된 UMD 스크립트를 추가합니다.

```html
<script type="text/javascript" src="dist/umd/seastack.js"></script>
<script type="text/javascript" src="dist/umd/seastack-onload.js"></script>
```

### 2. NPM 방식
```bash
npm install seastack
```

---

## 🛠️ 사용 방법

Seastack은 HTML 템플릿과 데이터를 연동하는 세 가지 유연한 방식을 제공합니다.

### Method A: 선언형 웹 컴포넌트 방식 (가장 권장됨)
HTML에 표준 커스텀 엘리먼트인 `<sea-stack>`을 선언합니다. 별도의 JavaScript onload 연동 코드를 한 줄도 작성할 필요가 없습니다!

```html
<!-- 컴포넌트 템플릿과 JSON 데이터를 자동으로 가져와 화면에 부드럽게 렌더링합니다 -->
<sea-stack src="./html/tel-codes.html" data="./data/tel-codes.json"></sea-stack>
```

### Method B: HTML5 속성 바인딩 방식 (하위 호환성 전용)
템플릿을 끼워 넣을 자리표시자(Placeholder) 태그에 `sea-src` 및 `sea-data` 커스텀 속성을 선언합니다:

```html
<div sea-src="./html/component.html" sea-data="./data/data.json"></div>
```
이 방식을 사용할 때는 스크립트에 `seastack-onload.js`를 포함하거나, 아래와 같이 수동으로 구동 명령을 작성해야 합니다:
```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        let seastack = new Seastack.Core();
        seastack.getElements(document.body).fillElements();
    }, false);
</script>
```

### Method C: 프로그래밍 방식 모듈 임포트 (ESM 및 CommonJS)
Webpack, Vite, Next.js, Node.js 등의 개발 환경 내부에서 모듈을 직접 로드하여 기동할 수 있습니다.

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

## 📊 데이터 포맷
JSON 데이터 파일 내부의 `seadata` (또는 `seaData`, `data`)라는 이름의 일차원 배열 속성 아래에 객체 형태로 렌더링할 데이터를 정의합니다.

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

## 🧩 HTML 컴포넌트 (템플릿 파일)
데이터가 적용될 HTML 프래그먼트(템플릿)를 별도의 파일로 작성합니다. 템플릿 태그 내부에 `sea-` 로 시작하는 속성을 명시하여 데이터와 매핑합니다.

```html
<div>
    <span sea-val="number"></span>
    <a sea-att="href" sea-att-val="link">
        <span sea-val="name"></span>
    </a>
</div>
```

### 바인딩 속성 레퍼런스

| 속성명 | 설명 |
| :--- | :--- |
| `sea-val` | 엘리먼트의 내부 HTML(`innerHTML`)을 지정한 JSON 속성 값으로 대체합니다. |
| `sea-att` | 바인딩할 HTML 태그의 속성명(예: `href`, `src` 등)을 선언합니다. |
| `sea-att-val` | `sea-att`에서 지정한 속성에 주입될 JSON 속성 키를 매핑합니다. |
| `sea-atts` | 쉼표로 연결하여 여러 속성 매핑을 동시에 선언합니다 (예: `href:link,target:target`). |
| `sea-valueless-hidden` | 지정한 데이터 값이 없거나 비어 있는 경우, 엘리먼트에 자동으로 `hidden` 속성을 추가해 화면에서 숨겨줍니다. |
| `sea-att-valueless-hidden` | 매핑할 속성 값이 존재하지 않는 경우, 엘리먼트에 자동으로 `hidden` 속성을 추가해 숨겨줍니다. |

---

## 💻 로컬 개발 환경 및 기여 가이드 (Contributions)

Seastack.js 프로젝트에 관심을 가져주셔서 감사합니다! 본 라이브러리는 TypeScript, Rollup.js, Vitest 기반의 모던 빌드 체인 및 고도의 개발자 경험(DX) 인프라로 구성되어 있습니다.

### 1. 개발 환경 세팅
프로젝트 저장소를 클론한 후 의존성 패키지들을 완벽하게 설치합니다:
```bash
npm install
```

### 2. 빌드 파이프라인 구동
ESM, CommonJS, UMD 포맷 번들을 빌드하고 타입 정의 파일들을 추출합니다:
```bash
# 프로덕션 번들 빌드
npm run build

# 실시간 변경 감지 빌드 (Watch Mode)
npm run watch

# 이전 빌드 산출물 초기화 (Clean)
npm run clean
```

### 3. 코드 스타일 린팅 및 자동 정렬
일관된 코딩 컨벤션을 준수하기 위해 코드 린터 및 자동 서식 교정기를 적극 사용합니다:
```bash
# 코드 품질 검사 (ESLint)
npm run lint

# 전체 코드 서식 일체 자동 정렬 (Prettier)
npm run format
```

### 4. 자동화 단위 테스트 실행
가상 브라우저(Happy DOM) 에뮬레이션 환경 상에서 고속 단위 테스트를 구동하여 작동 신뢰성을 검증합니다:
```bash
npm run test
```

---

## 📄 라이선스
Copyright (c) Neuro Associates. All rights reserved.

Licensed under the [MIT](LICENSE) License.
