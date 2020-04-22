![Logo of Seastack](./img/logo.png)

# Seastack.js
A JavaScript library for generating web documents based on data. The final goal of the project is to quickly generate web documents by associating HTML code with JSON-formatted data files without additional JavaScript coding. Using this library, you can conveniently update the website without updating the HTML code by simply updating the JSON file.


# How to use?

Do reference sample project is this. The path of the script file can be different.

## Preparing in HTML code

Add the following code to the head area on your HTML file.

```html
<script type="text/javascript" src="seastack.js"></script>
<script type="text/javascript" src="seastack-onload.js"></script>
```

Or add the following code in the head and body area to manually control the onload event.

```html
<script type="text/javascript" src="seastack.js"></script>
```

```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        let seastack = new Seastack.Core();
        seastack.getElements(document.body).fillElements();
    }, false);
</script>
```

If you want, you can specify a specific Element instead of document.body in the code above.


## Data

You can freely specify data at a one-dimensional level in the form of an array in a property named seadata. The data may be one or more.

```json
{
    "seadata": [
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

Make the HTML fragment to which data will be applied as a separate file. We call this a component. In the component, you can connect the data by specifying the attributes prefixed with sea to the following target tags.

```html
<div class="div_title" sea-value="title"></div>
<div sea-value="description"></div>
<div class="div_linkbox">
    <a sea-attribute-name="href" sea-attribute-value="link" target="_blank">
        <span sea-value="title"></span> 웹사이트
    </a>
</div>
```

Attribute | Value
------------ | -------------
sea-att | attribute name
sea-att-val | attribute value
sea-val | value


## Apply

Connect the path of the HTML file that becomes the component and the data path to the first HTML file with the attribute prefixed with sea. The contents of the component are duplicated as many as the number of items defined in the data to replace the contents of the specified HTML element. You may not specify the data path. In this way, the contents of the component are statically imported and applied.

```html
<div class="div_description" sea-source="../html/about_educations.html" sea-data="../data/about_educations.json"></div>
```

Attribute | Value
------------ | -------------
sea-src | Path of HTML as component
sea-data | Path of Json data

## Result

If you apply as above, you will get the following result.

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

## tags

The attributes prefixed with sea mentioned above can be applied only to the following tags.

* title
* header
* nav
* footer
* article
* section
* ul
* li
* h1
* h2
* div
* span
* p
* svg
* a
* img
* video
* audio
* iframe
* ul
* li



# License

Copyright (c) Neuro Associates. All rights reserved.

Licensed under the [MIT](LICENSE.txt) License.