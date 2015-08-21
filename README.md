Lazy Line Painter
=================

A jQuery plugin for path animation using the CSS.
- *mobile friendly*
- *responsive*
- *and tiny (4kb)*

[http://lazylinepainter.info](http://lazylinepainter.info) <br>

## Getting started
Implementing this plugin is broken into two parts.
Preparing your web-friendly data & Configuring lazy-line-painter.js


**Preparing your SVG data** <br>
Create your Line art in your vector editor of choice
- Ensure there are no fills.
- No closed paths. i.e - Line needs a start and end.
- Crop Artboard nice & tight!
Export as .SVG (Default export options are fine)
Drop your .SVG into 'SVG to Lazy Line Convertor' on http://lazylinepainter.info/
Copy lazy line code and paste into your DOM ready function.


**Configuring lazy-line-painter options** <br>
A number of attributes can be setup before the line art is Painted,
these include;
```js
'strokeWidth'    // Adjust width of stroke
'strokeColor'    // Adjust stroke color
'strokeCap'      // Adjust stroke cap  - butt  | round | square
'strokeJoin'     // Adjust stroke join - miter | round | bevel
'strokeOpacity'  // Adjust stroke opacity 0 - 1
'onComplete'     // Callback fired after animation finishes
'onUpdate'		 // Callback fired on animation update
'onStart'        // Callback fired before animation starts
'onStrokeStart'		// Callback fires after each stroke animation starts
'onStrokeComplete'	// Callback fires after each stroke animation completes
'delay'          // Delay before animation starts
'overrideKey'    // Set this property if you selector id doesn't match the key referencing your path data value within svgData.
'speedMultiplier' // slow down or speed up the animation
'drawSequential'  // true: draw each path sequentially, false, draw all at once
'reverse' // reverse drawSequence
'responsive' // true: responsive width and height
```

To apply these options to your element before Painting, pass lazylinepainter an object as an argument containing the attritubes you wish to alter;
```js
$('#demo').lazylinepainter({
    	'svgData' : svgData, // the object containing the SVG path info
		'strokeWidth':7,
		'strokeColor':'#de8f8f'
	}
)
```
**Note:** The only requirement is the svgData object (which contains your path info).
The svgData object should be structured like so for the plugin to be able to read.
Certain attributes and callbacks can be set per a path;

```js
var svgData = {
	'demo' : // name of your lazy line
	{
		'paths' : // this contains all your SVG path info
		[
			{
				'path': "M144.869,199c0....", // path string ,
			    'duration':300, // time taken to animate that path
			    'strokeColor':'#000000', // stroke color can be set individually
			    'strokeWidth':3 // stroke width can be set individually
			    'reverse': true	// reverse stroke individually
			    'onStrokeStart': function(){console.log("Stroke started")}	// Callback fires after the stroke animation starts
			    'onStrokeComplete':  function(){console.log("Stroke completed")}	// Callback fires after the stroke animation completes
			}, {
				'path': "M155.85,29c0...."
			    'duration':1000
			}, {
				etc ...
		],
		'dimensions' : // dimensions of element
		{
			'width': 270,
			'height':266
		}
	}
}
```

## API Reference

**Paint** <br>
*Animate path* <br>
```js
$('#demo').lazylinepainter('paint');
```

**Set** <br>
*set path* - sets path position, second param accepts a number between 0 - 1; <br>
```js
$('#demo').lazylinepainter('set', 0.5);
```

**Erase** <br>
*Clear path* - paint can still be called on the element after it has been erased; <br>
```js
$('#demo').lazylinepainter('erase');
```

**Pause / Resume** <br>
*pauseResume path animation* <br>
```js
$('#demo').lazylinepainter('pauseResume');
```

**Destroy** <br>
*Remove path* - removes lazyline data and element from DOM; <br>
```js
$('#demo').lazylinepainter('destroy');
```


## Changelog

**Lazylinepainter 1.6.1**
- fix for Firefox dots - [issue #36](https://github.com/camoconnell/lazy-line-painter/issues/36)
- added onStrokeStart callback - saeedseyfi / 0lumide
- added onStrokeComplete callback - saeedseyfi / 0lumide

**Lazylinepainter 1.6.0**
- added `set` function
- added `paint`, `set` examples
- added basic callback's example
- added onUpdate callback
- added comments to unminified code

*Refer to [Release notes](https://github.com/camoconnell/lazy-line-painter/releases) for entire Changelog*


## Dependencies
- [Jquery](http://jquery.com/)


## Author
[http://camoconnell.com/](http://camoconnell.com/) <br>
camoconnell@gmail.com



## Contributors
Many thats to; <br>

- saeedseyfi / 0lumide
  * 1.6.1 additions

- [Jamie Perkins](http://inorganik.github.io)
  * 1.5.0 additions

- Matt Kemp
  * specify strokeWidth and strokeColor on a per-path basis.