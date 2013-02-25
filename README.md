<h1>Lazy Line Painter</h1>
=================

A Jquery plugin for path animation using the Raphaël Library. 
<br><br>
For more on lazy-line-painter go to;<br>
http://lazylinepainter.info/
<br><br>
Author : Cam O'Connell<br>
http://camoconnell.com/ <br>
camoconnell@gmail.com<br>

 
<h2> Usage </h2> 
Implementing this plugin is broken into two parts.<br>
Preparing your web-friendly data & Configuring lazy-line-painter.js<br>

 
<b>Preparing your SVG data </b><br>
Create your Line art in Illustrator; <br>
	~  Ensure there are no fills.<br>
	~  No closed paths. i.e - Line needs a start and end.<br>
	~  Crop Artboard nice & tight!<br>
Export as .SVG (Default export options are fine)<br>
Drop your .SVG into 'SVG to Lazy Line Convertor' on http://lazylinepainter.info/ <br>
Copy lazy line code and paste into your DOM ready function.
 
<b>Configuring lazy-line-painter</b><br>
A number of attributes can be setup before the line art is Painted,
these include;
<pre><code>   
	'strokeWidth'    // Adjust width of stroke
	'strokeColor'    // Adjust stroke color 
	'strokeCap'      // Adjust stroke cap  - butt  | round | square 
	'strokeJoin'     // Adjust stroke join - miter | round | bevel 
	'strokeDash'     // Adjust stroke dash - ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
	'strokeOpacity'  // Adjust stroke opacity 0 - 1 
	'onComplete'     // Callback fired after animation
	'delay'          // Delay before animation starts
	'overrideKey'    // Set this property if you selector id doesn't match the key referencing your path data value within svgData. 
</code> </pre>
<br><br>
To apply these options to your element before Painting, <br>
pass lazylinepainter an object as an argument containing the attritubes you wish to alter; 
<pre><code> 
$('#demo').lazylinepainter({    
    	'svgData' : svgData, // the object containing the SVG path info 
		'strokeWidth':7,  	
		'strokeColor':'#de8f8f'
	}
) 
</code> </pre>
<b>Note :</b> The only required is the svgData object (which contains your path info).<br>
The svgData object should be structured like so for the plugin to be able to read;
<pre><code>
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
</code> </pre>
<br/><br/>
Functions;<br/>
<b>Paint</b> - <i>Illustrate path</i> <br>
<code> $('#demo').lazylinepainter('paint');</code>

<b>Stamp</b> - <i>Stamp path instantly, no illustration. Good for smart devices</i><br>
<code> $('#demo').lazylinepainter('stamp'); </code>

<b>Erase</b> - <i>Clear path</i>, Paint can still be called on the element after erased<br>
<code> $('#demo').lazylinepainter('erase'); </code>

<b>Destroy</b> - <i>Remove path</i> and element from DOM<br>
<code> $('#demo').lazylinepainter('destroy'); </code>


<h2> Change Log </h2><br>

  - <b>Lazylinepainter 1.4</b><br>
	- Addition of 'strokeOpacity' attr<br>
	- Addition of 'strokeDash' attr, for Dashed / Dotted Strokes!<br>
	- Addition of 'Stamp' function, which stamps illustration to canvas instead of drawing it on<br>
    - Reverted back to setInterval from RequestAnimationframe while issues resolved<br>
    - Ability to specify remaining stroke attributes on a per-path basis. strokeOpacity, strokeDash, strokeCap, strokeJoin<br><br>

  - <b>Lazylinepainter 1.3</b><br>
  	- Code optimization<br>
    - Addition of RequestAnimationframe Polyfill with setInterval fallback<br><br>

  - <b>Lazylinepainter 1.2</b> <br>
    - Ability to specify strokeWidth and strokeColor on a per-path basis. [Matt Kemp]<br><br>

  - <b>Lazylinepainter 1.1</b><br>
    - Addition of 'Destroy' line.<br>
	- Addition of 'Erase' line.<br><br>

  - <b>Lazylinepainter 1.0</b> <br>
    - Initial commit <br><br>

<br/>
<h2>Dependencies</h2>

  - Jquery 
    http://jquery.com/

  - Raphaël
    http://raphaeljs.com/ 

<br/>
<h2>Contributors</h2>

  - Matt Kemp <br>
    specify strokeWidth and strokeColor on a per-path basis.
 
<br/>
<h2>Credits</h2>
<br> 
Priit Pirita (http://bkp.ee/atirip)<br>
SVGtoRaphaelparser.php script used in the SVG converter. 
