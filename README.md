![Lazy Line Painter](http://lazylinepainter.info/banner.png)

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
	<a href="http://lazylinepainter.info" target="_blank">lazylinepainter.info</a>
</h3>
<p align="center">
A Modern JS library for SVG path animation
</p>

<p align="center">
  <a href="#getting-started">Getting Started</a>&nbsp;|&nbsp;<a href="#documentation">Documentation</a>&nbsp;|&nbsp;<a href="#examples">Examples</a>
</p>
 
<br><br>

# Getting Started
 
Lazy Line Painter can be setup with minimal effort as per the Quick Start instructions. <br>
However if a GUI is more your thing, be sure to use the [Lazy Line Composer](http://lazylinepainter.info/#composer). <br>
A free Online Editor developed specifically for SVG path animation.

<br>

## Install

#### NPM <br>
```js
npm i lazy-line-painter
```

#### CDN <br>
```html
<script src="https://cdn.jsdelivr.net/npm/lazy-line-painter@1.9.4/lib/lazy-line-painter-1.9.4.min.js"></script>
```

#### [DOWNLOAD](https://github.com/camoconnell/lazy-line-painter/releases)   <br>
```html
<script src="./libs/lazylinepainter-1.9.4.js"></script>
```
<br><br>

## Quick Start
The most basic, no-frills implementation can be setup like so;

```js

// import LazyLinePainter
import LazyLinePainter from 'lazy-line-painter'

// select your svg
let el = document.querySelector('#my-svg')

// initialise & configure LazyLinePainter
let myAnimation = new LazyLinePainter(el, { strokeWidth : 10 })

// paint! :)
myAnimation.paint()

``` 
<br><br>

# Documentation

<br>

## Configuration

### Initialisation Config
On initialise, pass lazylinepainter a config object as an argument containing the attritubes you wish to alter across the entire svg;

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
	'reverse'         // reverse drawSequence
	'ease'            // penner easing - easeExpoOut / easeExpoInOut / easeExpoIn etc
}

let svg = document.querySelector('#my-svg') 
let myAnimation = new LazyLinePainter(svg, config)

```
<br>

All config properties are optional. <br>
Style attributes set in the config will override css styles

### Configure Data Attributes

Data attributes can be set on individual shapes in the SVG. <br>
Data attributes will override both css styles & initialisation config style attributes

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
	data-llp-delay (ms) // delay offset from start of timeline
	data-llp-reverse (default = false)
	data-llp-ease (default = 'easeLinear')
/>
```
<br><br>

## API Reference

### Methods

**Paint**<br>
accepts playback arguments - reverse, ease, delay
```js
myAnimation.paint( { reverse : true, ease : 'easeExpoOut' });
```

**Erase**<br>
paint can still be called on the element after it has been erased;
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

**Set**<br>
set options after initialisation 
```js
// progress - sets path position, second param accepts a number between 0 - 1
myAnimation.set('progress', value);
```

**Get**<br>
returns all lazylinepainter data;
```js
myAnimation.get();
```

**Destroy**<br>
destroys svg & lazyline instance
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


# [Examples](https://codepen.io/collection/DLLeRb/)

* [Hello World Example](https://codepen.io/camoconnell/pen/vvKWzP)
* [Event Example](https://codepen.io/camoconnell/pen/vvKWzP)
* [Set Example](https://codepen.io/camoconnell/pen/GPYGvd)
* [Playback Options](https://codepen.io/camoconnell/pen/wRYELj)


<br><br>
## Changelog

*Refer to [Release notes](https://github.com/camoconnell/lazy-line-painter/releases) for entire Changelog*

<br><br>

## Author
Cam O'Connell @ [http://merriment.info/](http://merriment.info/) <br>
Email - camoconnell@gmail.com