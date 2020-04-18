![Logo of Seastack](./img/logo.png)

# Seastack
A JavaScript library for generating web documents based on data


# How to use?

Do reference sample project

## Importing

```html
<script type="text/javascript" src="seastack-onload.js"></script>
```

OR

```html
<script type="text/javascript" src="seastack.js"></script>
```

```javascript
document.addEventListener('DOMContentLoaded', function () {
    Waikiki.init();
}, false);
```

## Data

```json
{
    "seaData": [
        {
            "title": "데잇걸즈",
            "link": "http://dataitgirls.com",
            "description": "데잇걸즈는 소프트웨어 여성인재 사회진출 활성화를 위해 과학기술정보통신부와 한국정보화진흥원이 주관하여 운영하는 소프트웨어 여성인재 전문 교육 및 취업지원 프로그램입니다."
        },
        {
            "title": "꿈꾸는 데이터 디자이너",
            "link": "http://datadesigner.org",
            "description": "데이터 디자이너는 데이터를 아우르는 작업(Data Works)의 전영역을 다루며, 이를 통해 새로운 의미의 기획을 해내는 인재를 의미합니다."
        }
    ]
}
```



## HTML as component

```html
<div class="div_title" sea-value="title"></div>
<div sea-value="description"></div>
<div class="div_linkbox">
    <a sea-attribute-name="href" sea-attribute-value="link" target="_blank">
        <span sea-value="title"></span> 웹사이트
    </a>
</div>
```

target tags
* div
* a

Attribute | Value
------------ | -------------
sea-attribute-name | attribute name
sea-attribute-value | value
sea-value | value


## Apply

```html
<div class="div_description" sea-source="../html/about_educations.html" sea-data="../data/about_educations.json"></div>
```


target tags
* div
* a

Attribute | Value
------------ | -------------
sea-source | Path of HTML as component
sea-data | Path of Json data


## Result

```html
<div class="div_description" sea-source="../html/about_educations.html" sea-data="../data/about_educations.json">
    <div class="div_title" sea-value="title"></div>
    <div sea-value="description"></div>
    <div class="div_linkbox">
        <a sea-attribute-name="href" sea-attribute-value="link" target="_blank">
            <span sea-value="title"></span> 웹사이트
        </a>
    </div>
    <div class="div_title" sea-value="title"></div>
    <div sea-value="description"></div>
    <div class="div_linkbox">
        <a sea-attribute-name="href" sea-attribute-value="link" target="_blank">
            <span sea-value="title"></span> 웹사이트
        </a>
    </div>
</div>
```


# License

Copyright (c) Neuro Associates. All rights reserved.

Licensed under the [MIT](LICENSE.txt) License.