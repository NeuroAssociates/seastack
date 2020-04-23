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
            "link" : "https://en.wikipedia.org/wiki/Canada"
        },
        {
            "number": "+1",
            "name": "United States",
            "link" : "https://en.wikipedia.org/wiki/United_States"
        },
        {
            "number": "+20",
            "name": "Egypt",
            "link" : "https://en.wikipedia.org/wiki/Egypt"
        },
        {
            "number": "+30",
            "name": "Greece",
            "link" : "https://en.wikipedia.org/wiki/Greece"
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


## Apply

Connect the path of the HTML file that becomes the component and the data path to the first HTML file with the attribute prefixed with sea. The contents of the component are duplicated as many as the number of items defined in the data to replace the contents of the specified HTML element. You may not specify the data path. In this way, the contents of the component are statically imported and applied.

```html
<div sea-src="./html/component.html" sea-data="./data/data.json"></div>
```

Attribute | Value
------------ | -------------
sea-src | Path of HTML as component
sea-data | Path of JSON data

## Result

If you apply as above, you will get the following result.

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