Lazy Line Painter
=================

A Jquery plugin for path animation using the CSS.

For more on lazy-line-painter go to:
http://lazylinepainter.info/

Author: Cam O'Connell
http://camoconnell.com/
camoconnell@gmail.com


## Usage
Implementing this plugin is broken into two parts.
Preparing your web-friendly data & Configuring lazy-line-painter.js


**Preparing your SVG data**
Create your Line art in your vector editor of choice
- Ensure there are no fills.
- No closed paths. i.e - Line needs a start and end.
- Crop Artboard nice & tight!
Export as .SVG (Default export options are fine)
Drop your .SVG into 'SVG to Lazy Line Convertor' on http://lazylinepainter.info/
Copy lazy line code and paste into your DOM ready function.

**Configuring lazy-line-painter**
A number of attributes can be setup before the line art is Painted,
these include;
```js
'strokeWidth'    // Adjust width of stroke
'strokeColor'    // Adjust stroke color
'strokeCap'      // Adjust stroke cap  - butt  | round | square
'strokeJoin'     // Adjust stroke join - miter | round | bevel
'strokeDash'     // Adjust stroke dash - ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
'strokeOpacity'  // Adjust stroke opacity 0 - 1
'onComplete'     // Callback fired after animation
'delay'          // Delay before animation starts
'overrideKey'    // Set this property if you selector id doesn't match the key referencing your path data value
within svgData.
// *new*
'speedMultiplier' // slow down or speed up the animation
'drawSequential'  // true: draw each path sequentially, false, draw all at once
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
**Note:** The only required is the svgData object (which contains your path info).
The svgData object should be structured like so for the plugin to be able to read.

```js
var svgData = {
	'demo' : // name of your lazy line
	{
		'strokepath' : // this contains all your SVG path info
		[
			{   'path': "M144.869,199c0....",     // path string ,
			    'duration':300,                   // time taken to animate that path
			    'strokeColor':'#000000',                // stroke color can be set individually
			    'strokeWidth':3                   // stroke width can be set individually
			    },
			{   'path': "M155.85,29c0...."
			    'duration':1000
			    },
			etc ...
		],
		'dimensions' : { 'width': 270, 'height':266 } // dimensions of element
	}
}
```

Functions:
**Paint** - *Illustrate path*
`$('#demo').lazylinepainter('paint');`

**Stamp** - *Stamp path instantly, no illustration. Good for smart devices*
`$('#demo').lazylinepainter('stamp');`

**Erase** - *Clear path*, Paint can still be called on the element after erased
`$('#demo').lazylinepainter('erase');`

**Destroy** - *Remove path* and element from DOM
`$('#demo').lazylinepainter('destroy');`


## Changelog

**Lazylinepainter 1.5.0**
- Remove Raphaël as dependency
- refactored to use `requestAnimationFrame()` [Jamie Perkins]
- added `pauseResume` [Jamie Perkins]
- added speed multiplier option [Jamie Perkins]
- added draw sequentially or all-at-once option [Jamie Perkins]

**Lazylinepainter 1.4.1**
- Minor fixes

**Lazylinepainter 1.4**
- Addition of 'strokeOpacity' attr
- Addition of 'strokeDash' attr, for Dashed / Dotted Strokes!
- Addition of 'Stamp' function, which stamps illustration to canvas instead of drawing it on
- Reverted back to setInterval from RequestAnimationframe while issues resolved
- Ability to specify remaining stroke attributes on a per-path basis. strokeOpacity, strokeDash, strokeCap, strokeJoin

**Lazylinepainter 1.3**
- Code optimization
- Addition of RequestAnimationframe Polyfill with setInterval fallback

**Lazylinepainter 1.2**
- Ability to specify strokeWidth and strokeColor on a per-path basis. [Matt Kemp]

**Lazylinepainter 1.1**
- Addition of 'Destroy' line.
- Addition of 'Erase' line.

**Lazylinepainter 1.0**
- Initial commit


## Dependencies
- [Jquery](http://jquery.com/)

## Contributors

- [Jamie Perkins](http://inorganik.github.io)
  * 1.5.0 additions

- Matt Kemp
  * specify strokeWidth and strokeColor on a per-path basis.

- [Priit Pirita](http://bkp.ee/atirip)
  * SVGtoRaphaelparser.php script used in the SVG converter.
