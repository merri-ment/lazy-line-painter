<h1>Lazy Line Painter</h1>
=================

A Jquery plugin for path animation using the Raphaël Library. 
<br><br>
For a more on lazy-line-painter go to;<br>
http://lazylinepainter.info/
<br><br>
Author : Cam O'Connell<br>
http://camoconnell.com/ 

<h2> Usage </h2> 
Implementing this plugin is broken into two parts.<br>
Preparing your web-friendly data & Configuring lazy-line-painter.js<br>

 
<b>Preparing your SVG data </b><br>
Create your Line art in Illustrator, Crop art board to artwork size<br>
Export as .SVG (Default export options are fine)<br>
Drop your .SVG into 'SVG to Lazy Line Convertor' on http://lazylinepainter.info/ <br>
Copy lazy line code and paste into your DOM ready function.
 
<b>Configuring lazy-line-painter</b><br>
A number of attributes can be setup before the line art is "painted",
these include;
<pre><code>   
	'strokeWidth'    
	'strokeColor'    
	'strokeCap'       
	'strokeJoin'    
	'onComplete'     
	'delay'            
</code> </pre>
<br><br>
To apply these options to your element before <i>painting</i>, <br>
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
	'demo' : // name of your lazy line, this must match the id of your element
	{ 
		'strokepath' : // this contains all your SVG path info
		[ 
			{   'path': "M144.869,199c0...."     // path string , 
			    'duration':300                   // time taken to animate that path
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

<i>Paint !</i> - Illustrate path <br>
<code> $('#demo').lazylinepainter('paint');</code>

<i>Erase !</i> - Clear path, Paint can still be called on the element after erased<br>
<code> $('#demo').lazylinepainter('erase'); </code>

<i>Destroy !</i> - Remove path and element from DOM<br>
<code> $('#demo').lazylinepainter('destroy'); </code>

 

<h2>Dependencies</h2>

  - Jquery 
    http://jquery.com/

  - Raphaël
    http://raphaeljs.com/


<h2>Credits</h2>
<br>
<br>
Priit Pirita (http://bkp.ee/atirip)<br>
SVGtoRaphaelparser.php script used in the SVG converter. 