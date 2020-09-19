# WebCV
HTML and JavaScript CV website template using Material-UI with scrolling navigation and prefab sections

__Note:__ I highly recommend against making your personal information public on the internet. Most modern browsers opening a HTML file will automatically load <script>, <img> etc. tags from the folder that the HTML file is in, and so if you choose to make your CV in this unconventional way, it is recommended that you put the output `index.html`, `main.js` and any other private assets in a folder, test from your computer that everything loads in properly, and then send the zipped folder alongside instructions.  

## Install

```bash
$ git clone https://github.com/JR-Mitchell/WebCV.git
$ npm install
```

## Run development webserver

```bash
$ npm run dev
```

## Build

```bash
$ npm run build
```

## Using the template

The structure, style and text and image content of the CV may all be customised by editing the files in `src/setup`.

The one exception to this is the title of the html document, which should be changed by modifying the `<title>` element in `src/index.html`.

### `src/setup/app.json`

- Change `drawerWidth` to change the width of the side contents drawer
- Change `cvTitle` to change the title displayed at the top of the page

### `src/setup/structure.json`

This file is a list of pages, in the order they will be shown.
You may add or remove pages as you please.

Each page has the properties:

- `pageTitle`: the title of the page
- `sections`: a list of the sections in this page, in the order they will be shown

Each section has the properties:

- `sectionTitle`: the title of the section
- `element`: the name of the element making up the section. Can be anything in src/components. If excluded, will just be a normal <div>.
- `props`: the props to pass to the created element. Each set of props is documented with comments in its relevant `.tsx` file.
- `children`: a list of children elements to render in the element. Each may be either a string, in which case it will become formatted text, or an object like a section but without the sectionTitle (i.e `{element, props `and/or `children}` 

### `src/setup/style.json`

Currently, this object only has one (optional) property: `MUITheme`.
This overrides the base Material UI theme.
For more information on the values this can take, see [the Material UI page on theming](https://material-ui.com/customization/theming/).
Note that, as this is a JSON, colours from the `@material-ui` library, such as `red[500]` cannot be used.
