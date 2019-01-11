![Lazy Line Painter](http://lazylinepainter.info/banner.gif)
[![](https://data.jsdelivr.com/v1/package/npm/lazy-line-painter/badge)](https://www.jsdelivr.com/package/npm/lazy-line-painter)

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
**NPM** <br>
```js
npm install lazy-line-painter
import LazyLinePainter from 'lazy-line-painter'
```

**CDN** <br>
```html
<script src="https://cdn.jsdelivr.net/npm/lazy-line-painter@1.9.3/lib/lazy-line-painter-1.9.3.min.js"></script>
```

**DOWNLOAD** - latest release - https://github.com/camoconnell/lazy-line-painter/releases <br>
```html
<script src="./libs/lazylinepainter-1.9.3.js"></script>
```
<br><br>

# Getting started


**Composing your SVG** <br>
Create Line art in your vector editor of choice
- Crop Artboard nice & tight!
- Export as .SVG (Default export options are fine)
- Drop your svg into the Lazy Line Composer - http://lazylinepainter.info/#composer
- & download your Zip!

<br>

**Configure lazy-line-painter** <br>
Pass lazylinepainter a config object as an argument containing the attritubes you wish to alter;

```js
let svg = document.querySelector('#my-svg') 
let myAnimation = new LazyLinePainter(svg, config)
```
<br>

All config properties are optional. <br>
Style attributes set in the config will override css styles

<br>

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
	'delay'          	// Delay before animation starts
	'speedMultiplier'	// slow down or speed up the animation
	'reverse'         // reverse drawSequence
	'ease'            // penner easing
}
```

<br>

The following data attributes can be set to target individual shapes in the DOM. <br>
Data attributes will override both css styles & config style attributes

```html
<path
	// style attribues
	data-llp-stroke-width
	data-llp-stroke-color
	data-llp-stroke-opacity
	data-llp-stroke-cap
	data-llp-stroke-join 
	data-llp-stroke-dash

	// animation attribues
	data-llp-duration (ms)
	data-llp-delay (ms)
	data-llp-reverse (default = true)
	data-llp-ease (default = 'easeLinear')
/>
```
<br><br>
# API Reference
refer to examples folder in the repo
<br>
### Methods

**Paint**<br>
*Animate path* - accepts playback arguments - reverse, ease, delay
```js
myAnimation.paint( { reverse : true, ease : 'easeExpoOut' });
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
*set path* - set options after initialisation 
```js
// progress - sets path position, second param accepts a number between 0 - 1
myAnimation.set('progress', value);
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
<br><br>
### Events

**Handle events across entire animation**
```js
myAnimation.on('start', () => {});
myAnimation.on('update', () => {});
myAnimation.on('complete', () => {});
```

**Handle all events** <br>
Called for each shape animated within the svg.<br>
event argument contains shape properties.
```js
myAnimation.on('start:all', (event) => {});
myAnimation.on('update:all', (event) => { console.log(event.progress); // [0-1] });
myAnimation.on('complete:all', (event) => {});
```

**Handle targeted events.**<br>
Listen to events on specific shapes by adding the shape-id after the colon.<br>
event argument contains shape properties.
```js
myAnimation.on('start:id', (event) => {});
myAnimation.on('update:id', (event) => {});
myAnimation.on('complete:id', (event) => {});
```

**Timeline playback events**<br>
```js
myAnimation.on('pause', () => {});
myAnimation.on('resume', () => {});
myAnimation.on('erase', () => {});

```
<br><br>
## Changelog

**Lazylinepainter 1.9.3**
- Fixed : safari pathLength issue
- Added : Manage tabbing away

**Lazylinepainter 1.9.2**
- Added : pause, erase & resume timeline playback events

**Lazylinepainter 1.9.1**
- Fix : data-llp-delay / data-llp-duration data attributes no longer overidden in 'uncomposed' mode
- Fix : dotted points visible on dashStroke 

**Lazylinepainter 1.9.0 - Major Update**
- Removed : svgData obj requirement, animation properties now stored on SVG.
- Added : additional shape support!! 
  - polygons, circles, ellipses, polylines, lines, rects
- Added : Paint method excepts playback arguments, myAnimation.paint({ reverse : true, ease : 'easeExpoOut' })
- Update : Refactored Event Handling
- Update : Refactored Easing / Timing

<br>

**Lazylinepainter 1.8.0 - Major Update**
- Removed jQuery as dependency


*Refer to [Release notes](https://github.com/camoconnell/lazy-line-painter/releases) for entire Changelog*

<br><br>

## Authors
Cam O'Connell @ [http://merriment.info/](http://merriment.info/) <br>
Email - camoconnell@gmail.com