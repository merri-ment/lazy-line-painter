![Lazy Line Painter](https://lazylinepainter.com/banner.png)

<p align="center">
	<img alt="undefined" src="https://img.shields.io/bundlephobia/min/lazy-line-painter.svg?colorB=6f6f6f&style=flat-square">
	<img alt="undefined" src="https://img.shields.io/github/release/camoconnell/lazy-line-painter.svg?colorB=6f6f6f&style=flat-square">
	<img alt="undefined" src="https://img.shields.io/github/license/camoconnell/lazy-line-painter.svg?colorB=6f6f6f&style=flat-square">
	<img alt="undefined" src="https://data.jsdelivr.com/v1/package/npm/lazy-line-painter/badge">
</p>

<h1 align="center">
Lazy Line Painter
</h1>
<h3 align="center">
	<a href="https://lazylinepainter.com" target="_blank">lazylinepainter.com</a>
</h3>
<p align="center">
A Modern JS library for SVG path animation
</p>

<p align="center">
  <a href="#getting-started">Getting Started</a>&nbsp;|&nbsp;<a href="#documentation">Documentation</a>&nbsp;|&nbsp;<a href="#examples">Examples</a>&nbsp;|&nbsp;<a href="https://lazylinepainter.com/#composer">Lazy Line Composer</a>
</p>
 
<br><br>

# Getting Started

![Lazy Line Painter](https://lazylinepainter.com/drag_drop.jpg)
_Lazy Line Painter can be setup with minimal effort as per the Quick Start instructions. <br><br>
However if a GUI is more your thing, be sure to use the [Lazy Line Composer](https://lazylinepainter.com/#composer). <br>
A free Online Editor developed specifically for SVG path animation._

<br>

##### [NPM](https://www.npmjs.com/package/lazy-line-painter) <br>

```js
npm i lazy-line-painter
```

##### [CDN](https://www.jsdelivr.com/package/npm/lazy-line-painter) <br>

```html
<script src="https://cdn.jsdelivr.net/npm/lazy-line-painter@1.9.4/lib/lazy-line-painter-1.9.4.min.js"></script>
```

##### [DOWNLOAD](https://github.com/merri-ment/lazy-line-painter/releases) <br>

```html
<script src="./libs/lazylinepainter-1.9.4.js"></script>
```

<br><br>

### Quick Start

The most basic, no-frills implementation;

```js
// import LazyLinePainter
import LazyLinePainter from "lazy-line-painter";

// select your svg
let el = document.querySelector("#my-svg");

// initialise & configure LazyLinePainter
let myAnimation = new LazyLinePainter(el, { strokeWidth: 10 });

// paint! :)
myAnimation.paint();
```

<br><br>

# Documentation

<br>

### Configuration

##### Configure on initialisation

On initialise you can pass lazylinepainter a config object as an argument containing the attritubes you wish to alter across the entire svg. <br>
All config properties are optional. <br>
Style attributes set in the config will override css styles.

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
	'reverse'         // reverse playback
	'ease'            // penner easing - easeExpoOut / easeExpoInOut / easeExpoIn etc
	'repeat'          // number of additional plays, -1 for loop
}

let svg = document.querySelector('#my-svg')
let myAnimation = new LazyLinePainter(svg, config)

```

<br>

##### Configure individual paths

Data attributes can be used to configure style & animation properties on individual paths in the SVG. <br>
Data attributes will override both css styles & initialisation config style attributes. <br>

```html
<path // style attribues data-llp-stroke-width data-llp-stroke-color
data-llp-stroke-opacity data-llp-stroke-cap data-llp-stroke-join
data-llp-stroke-dash // animation attribues data-llp-duration (ms)
data-llp-delay (ms) // delay offset from start of timeline data-llp-reverse
(default = false) data-llp-ease (default = 'easeLinear') />
```

<br><br>

### API Reference

#### Methods

**Paint** - accepts optional playback arguments - reverse, ease, delay

```js
myAnimation.paint({
  reverse: true,
  ease: "easeExpoOut",
});
```

**Erase** - paint can still be called on the element after it has been erased;

```js
myAnimation.erase();
```

**Pause**

```js
myAnimation.pause();
```

**Resume**

```js
myAnimation.resume();
```

**Set** - set options after initialisation

```js
// progress - sets path position, second param accepts a number between 0 - 1
myAnimation.set("progress", value);
```

**Get** - returns all lazylinepainter data;

```js
myAnimation.get();
```

**Destroy** - destroys svg & lazyline instance

```js
myAnimation.destroy();
```

<br><br>

#### Events

##### Handle events across entire animation

```js
myAnimation.on("start", () => {});
myAnimation.on("update", () => {});
myAnimation.on("complete", () => {});
```

##### Handle all events

Called for each shape animated within the svg.<br>
event argument contains shape properties.

```js
myAnimation.on('start:all', (event) => {});
myAnimation.on('update:all', (event) => { console.log(event.progress); // [0-1] });
myAnimation.on('complete:all', (event) => {});
```

##### Handle targeted events.

Listen to events on specific shapes by adding the shape-id after the colon.<br>
event argument contains shape properties.

```js
myAnimation.on("start:id", (event) => {});
myAnimation.on("update:id", (event) => {});
myAnimation.on("complete:id", (event) => {});
```

##### Timeline playback events

```js
myAnimation.on("pause", () => {});
myAnimation.on("resume", () => {});
myAnimation.on("erase", () => {});
```

<br><br>

# [Examples](https://codepen.io/collection/DLLeRb/)

- [Hello World Example](https://codepen.io/camoconnell/pen/zeqgWB)
- [Event Example](https://codepen.io/camoconnell/pen/vvKWzP)
- [Set Example](https://codepen.io/camoconnell/pen/GPYGvd)
- [Playback Options](https://codepen.io/camoconnell/pen/wRYELj)

<br><br>

## Changelog

_Refer to [Release notes](https://github.com/merri-ment/lazy-line-painter/releases) for entire Changelog_

<br><br>

## Author

Merriment @ [http://merriment.info/](http://merriment.info/) <br>
Email - ahoi@merriment.info
