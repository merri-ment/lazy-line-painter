<h1>Lazy Line Painter</h1>
=================

A Jquery plugin for path animation using the Raphaël Library. 
<br><br>
For a more in depth example of jquery.lazy-line-painter.js and tutorial go to;<br>
http://lazylinepainter.info/
<br><br>
Author : Cam O'Connell<br>
http://camoconnell.com/ 

<h2> Usage </h2> 
The process of implementing this plugin is broken into two parts.<br>
Preparing your web-friendly SVG data & Configuring lazy-line-painter.js<br>

<ul>
<li>
<b>Preparing your SVG data</b><br>
Go to http://lazylinepainter.info/ for a tutorial on Preparing your SVG data from Illustrator.
</li>
<li>
<b>Configuring lazy-line-painter</b><br>
A number of options can be edited to your line art before its "painted",
these include 'strokeWidth','strokeColor', 'strokeCap', 'strokeJoin', 'onComplete' and 'delay'.
</li>
</ul>
<br>
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
Note svgData which is the object containing your SVG path information.<br>
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

Call <i>paint</i> to initialise <br>
<code> $('#demo').lazylinepainter('paint');</code>

and <i>erase</i> to destory <br>
<code> $('#demo').lazylinepainter('erase'); </code>

 

<h2>Hard dependencies</h2>

  - Jquery 
    http://jquery.com/

  - Raphaël
    http://raphaeljs.com/
