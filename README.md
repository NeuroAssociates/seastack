[![GitHub issues](https://img.shields.io/github/issues/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/issues)
[![GitHub forks](https://img.shields.io/github/forks/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/network)
[![GitHub stars](https://img.shields.io/github/stars/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/stargazers)
[![GitHub license](https://img.shields.io/github/license/NeuroAssociates/seastack)](https://github.com/NeuroAssociates/seastack/blob/master/LICENSE)

![Logo of Seastack](./img/logo.png)

# Seastack.js
*A JavaScript library for generating web documents based on data*

The final goal of the project is to quickly generate web documents by associating HTML code with JSON-formatted data files without additional JavaScript coding. Using this library, you can conveniently update the website without updating the HTML code by simply updating the JSON file.


# How to use?

Do reference sample project. The path of the script file can be different.

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
            "number": "+1",
            "name": "Canada",
            "link" : "https://en.wikipedia.org/wiki/Canada",
            "target": "_blank"
        },
        {
            "number": "+1",
            "name": "United States",
            "link" : "https://en.wikipedia.org/wiki/United_States",
            "target": "_blank"
        },
        {
            "number": "+20",
            "name": "Egypt",
            "link" : "https://en.wikipedia.org/wiki/Egypt",
            "target": "_blank"
        },
        {
            "number": "+30",
            "name": "Greece",
            "link" : "https://en.wikipedia.org/wiki/Greece",
            "target": "_blank"
        }
    ]
}
```

## HTML as component

Make the HTML fragment to which data will be applied as a separate file. We call this a component. In the component, you can connect the data by specifying the attributes prefixed with sea to the following target tags.

```html
<div>
    <span sea-val="number"></span>
    <a sea-att="href" sea-att-val="link">
        <span sea-val="name"></span>
    </a>
</div>
```

Attribute | Value
------------ | -------------
sea-att | attribute name
sea-att-val | attribute value
sea-val | value to replace inner HTML

If you want to apply the definition of data to multiple attributes, write as follows.

```html
<div>
    <span sea-val="number"></span>
    <a sea-atts="href:link,target:target">
        <span sea-val="name"></span>
    </a>
</div>
```

Attribute | Value
------------ | -------------
sea-atts | attribute sets like "name:value,name:value,..."

In case there is no corresponding value in data, the following attribute can be added so that the hidden attribute is automatically added to the tag.

```html
<span sea-val="name" sea-valueless-hidden></span>
```

If you want to make an element hidden when there is no data for a property other than a value, declare it as follows. (does not apply to multiple attributes)

```html
<a sea-att="href" sea-att-val="link" sea-att-valueless-hidden>Link</a>
```

Attribute | Value
------------ | -------------
sea-valueless-hidden | Just declare the name without the value of the attribute.
sea-att-valueless-hidden | Just declare the name without the value of the attribute.

## Apply

Connect the path of the HTML file that becomes the component and the data path to the first HTML file with the attribute prefixed with sea. The contents of the component are duplicated as many as the number of items defined in the data to replace the contents of the specified HTML element. You may not specify the data path. In this way, the contents of the component are statically imported and applied.

```html
<div sea-src="./html/component.html" sea-data="./data/data.json"></div>
```

Attribute | Value
------------ | -------------
sea-src | Path of HTML as component
sea-data | Path of JSON data

If you want to apply data using the contents of the tag without any separate html component, declare the source as "#" as follows:

```html
<div sea-src="#" sea-data="./data/data.json"></div>
    <div>
        <span sea-val="number"></span>
        <a sea-att="href" sea-att-val="link">
            <span sea-val="name"></span>
        </a>
    </div>
</div>
```

## Result

If you apply as above, you will get the following result. (This is an example)

```html
<div sea-src="./html/component.html" sea-data="./data/data.json">
    <div>
        <span sea-val="number">+1</span>
        <a sea-att="href" sea-att-val="link" href="https://en.wikipedia.org/wiki/Canada">
            <span sea-val="name">Canada</span>
        </a>
    </div>
    <div>
        <span sea-val="number">+1</span>
        <a sea-att="href" sea-att-val="link" href="https://en.wikipedia.org/wiki/United_States">
            <span sea-val="name">United States</span>
        </a>
    </div>
    <div>
        <span sea-val="number">+20</span>
        <a sea-att="href" sea-att-val="link" href="https://en.wikipedia.org/wiki/Egypt">
            <span sea-val="name">Egypt</span>
        </a>
    </div>
    <div>
        <span sea-val="number">+30</span>
        <a sea-att="href" sea-att-val="link" href="https://en.wikipedia.org/wiki/Greece">
            <span sea-val="name">Greece</span>
        </a>
    </div>
</div>
```

# License

Copyright (c) Neuro Associates. All rights reserved.

Licensed under the [MIT](LICENSE.txt) License.