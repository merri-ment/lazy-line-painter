![Lazy Line Painter](http://lazylinepainter.info/banner.png)

Lazy Line Painter
=================
[http://lazylinepainter.info](http://lazylinepainter.info)

A Modern JS library for SVG path animation
- *Mobile friendly*
- *Responsive*
- Draws all basic shapes;
  - paths, polygons, circles, ellipses, polylines, lines, rects !!
- *& its tiny (8kb gzipped)*

<br><br>

# Installation
NPM install & require
```js
npm install lazy-line-painter
let lazylinepainter = require('lazy-line-painter');
```

or download the latest release from - https://github.com/camoconnell/lazy-line-painter/releases
and import as script tag 
```html
<script src="./libs/lazylinepainter-1.9.0.js"></script>
```
<br><br>

# Getting started 


**Preparing your SVG** <br>
Create your Line art in your vector editor of choice
- Ensure there are no fills.
- Crop Artboard nice & tight!
- Export as .SVG (Default export options are fine)
- Drop your .SVG into 'SVG to Lazy Line Convertor' on http://lazylinepainter.info/
- Download Zip!

<br>
**Configure lazy-line-painter**

Pass lazylinepainter a config object as an argument containing the attritubes you wish to alter;
```js
let el = document.querySelector('#demo')
let myAnimation = new LazyLinePainter(el, config)
```
<br>
All config properties are optional. <br>
Style attributes set in the config will override css styles
```js
let config = {

	// style properties
	'strokeWidth'     // Adjust width of stroke
	'strokeColor'     // Adjust stroke color
	'strokeCap'       // Adjust stroke cap  - butt  | round | square
	'strokeJoin'      // Adjust stroke join - miter | round | bevel
	'strokeOpacity'   // Adjust stroke opacity 0 - 1
	'strokeDash'      // Adjust stroke dash - '5, 5'

	// animation properties
	'delay'           // Delay before animation starts
	'speedMultiplier' // slow down or speed up the animation
	'drawSequential'  // true: draw each path sequentially, false, draw all at once
	'reverse'         // reverse drawSequence
	'ease'            // penner easing
}
```

<br>

The following data attributes can be set to target individual shapes in the DOM. <br>
Data attributes will override both css styles & config style attributes

```js
<path

	// style attribues
	data-llp-stroke-width
	data-llp-stroke-color
	data-llp-stroke-opacity
	data-llp-stroke-cap
	data-llp-stroke-join 
	data-llp-stroke-dash
    
	// style animation
	data-llp-duration       // path duration (ms) - default 0
	data-llp-delay         	// path duration (ms) - default 0
	data-llp-reverse       	// reverse stroke individually - default false
	data-llp-ease			// ease stroke individually - default 'easeLinear'
  />
```
<br><br>
# API Reference
refer to examples folder in the repo
<br>
### Methods

**Paint**<br>
*Animate path*
```js
myAnimation.paint();
```

**Erase**<br>
*Clear path* - paint can still be called on the element after it has been erased;
```js
myAnimation.erase();
```

**Pause**<br>
*Pause path animation*
```js
myAnimation.pause();
```

**Resume**<br>
*Resume path animation*
```js
myAnimation.resume();
```

**Set**<br>
*set path* - sets path position, second param accepts a number between 0 - 1;
```js
myAnimation.set(num);
```

**Get**<br>
*get data* - returns all lazylinepainter data;
```js
myAnimation.get();
```

**Destroy**<br>
*destroy svg & lazyline instance*;
```js
myAnimation.destroy();
```
<br>
### Events

**Handle events across entire animation**
```js
myAnimation.on('start', () => {});
myAnimation.on('update', () => {});
myAnimation.on('complete', () => {});
```

**Handle all events** <br>
Called for each shape animated within the svg.<br>
data argument contains shape properties.
```js
myAnimation.on('start:all', (data) => {});
myAnimation.on('update:all', (data) => { console.log(data.progress); // [0-1] });
myAnimation.on('complete:all', (data) => {});
```

**Handle targeted events.**<br>
Listen to events on specific shapes by adding the shape-id after the colon.<br>
data argument contains shape properties.
```js
myAnimation.on('start:id', (data) => {});
myAnimation.on('update:id', (data) => {});
myAnimation.on('complete:id', (data) => {});
```
<br><br>
## Changelog

**Lazylinepainter 1.9.0 - Major Update**
- Removed need for svgData obj, animation properties now stored on SVG using Converter.
- Refactored Event Handling
- Added additional shape support!! 
  - polygons, circles, ellipses, polylines, lines, rects

**Lazylinepainter 1.8.0 - Major Update**
- Removed jQuery as dependency


*Refer to [Release notes](https://github.com/camoconnell/lazy-line-painter/releases) for entire Changelog*

<br><br>

## Author
[http://camoconnell.com/](http://camoconnell.com/)
camoconnell@gmail.com