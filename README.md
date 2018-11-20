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


# Getting started 


**Preparing your SVG**
Create your Line art in your vector editor of choice
- Ensure there are no fills.
- Crop Artboard nice & tight!
- Export as .SVG (Default export options are fine)
- Drop your .SVG into 'SVG to Lazy Line Convertor' on http://lazylinepainter.info/
- Download Zip!


**Configure lazy-line-painter**

Pass lazylinepainter a config object as an argument containing the attritubes you wish to alter;
```js
let myAnimation = new LazyLinePainter({
    'el': document.querySelector('#demo')  // svg element
})
```

Style attributes and other options need to be setup in the options object before the line art is painted, these include;
```js
/* REQUIRED */
'el'             // target <svg> element 

/* OPTIONAL */
'strokeWidth'     // Adjust width of stroke
'strokeColor'     // Adjust stroke color
'strokeCap'       // Adjust stroke cap  - butt  | round | square
'strokeJoin'      // Adjust stroke join - miter | round | bevel
'strokeOpacity'   // Adjust stroke opacity 0 - 1
'strokeDash'      // Adjust stroke dash - '5, 5'

'delay'           // Delay before animation starts
'speedMultiplier' // slow down or speed up the animation
'drawSequential'  // true: draw each path sequentially, false, draw all at once
'reverse'         // reverse drawSequence
'ease'            // penner easing
```



Certain attributes can be set per a shape in the DOM;

```js
<path
	data-duration="300"       // path duration (ms) - default 0
	data-delay="2000"         // path duration (ms) - default 0
	data-reverse="true"       // reverse stroke individually - default false
	data-ease="easeInOutExpo"	// ease stroke individually - default 'easeNone'
    />
```

# API Reference
refer to examples folder in the repo

### Methods

**Paint**
*Animate path*
```js
myAnimation.paint();
```

**Erase**
*Clear path* - paint can still be called on the element after it has been erased;
```js
myAnimation.erase();
```

**Pause**
*Pause path animation*
```js
myAnimation.pause();
```

**Resume**
*Resume path animation*
```js
myAnimation.resume();
```

**Set**
*set path* - sets path position, second param accepts a number between 0 - 1;
```js
myAnimation.set(num);
```

**Get**
*get data* - returns all lazylinepainter data;
```js
myAnimation.get();
```

**Destroy**
*Remove path* - removes lazyline data and removes element from DOM;
```js
myAnimation.destroy();
```

### Events

**Handle events across entire animation**
```js
myAnimation.on('start', () => {});
myAnimation.on('update', () => {});
myAnimation.on('complete', () => {});
```

**Handle all events** 
Called for each shape animated within the svg.
data argument contains shape properties.
```js
myAnimation.on('start:all', (data) => {});
myAnimation.on('update:all', (data) => { console.log(data.progress); // [0-1] });
myAnimation.on('complete:all', (data) => {});
```

**Handle targeted events.**
Listen to events on specific shapes by adding the shape-id after the colon.
data argument contains shape properties.
```js
myAnimation.on('start:your-shape-id', (data) => {});
myAnimation.on('update:your-shape-id', (data) => {});
myAnimation.on('complete:your-shape-id', (data) => {});
```

## Changelog

**Lazylinepainter 1.9.0 - Major Update**
- Removed need for svgData obj, animation properties now stored on SVG using Converter.
- Refactored Event Handling
- Added additional shape support!! 
  - polygons, circles, ellipses, polylines, lines, rects

**Lazylinepainter 1.8.0 - Major Update**
- Removed jQuery as dependency


*Refer to [Release notes](https://github.com/camoconnell/lazy-line-painter/releases) for entire Changelog*



## Author
[http://camoconnell.com/](http://camoconnell.com/)
camoconnell@gmail.com