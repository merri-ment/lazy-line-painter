/* 
* Lazy Line Painter 1.0
* SVG Stroke animation.
*
* https://github.com/camoconnell/lazy-line-painter
*
* Copyright 2013 
* Cam O'Connell - http://www.camoconnell.com  http://www.behance.net/camoconnell 
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*  
*/  
 
(function( $ ){  
	  
	var svgData = { 
		'demo' :
		{ 
			'strokepath' :
			[ 
				{   'path': "M144.869,199c0,7.659-5.479,13.139-13.14,13.139 c-7.659,0-14.598-5.479-14.598-13.139s6.209-13.139,13.869-13.139S144.869,191.341,144.869,199z",
					'duration':300 
					},
				{   'path': "M90,151.422 c0,0-3.468-10.875-12.407-10.875c-8.939-0.001-12.409,10.321-12.409,10.321",
					'duration':300
					},
				{   'path': "M175.231,22.624 c8.642,5.501-14.038-9.456-47.143-8.643c-98.328,0-120.214,87.644-121.785,116.715c0,0-6.286,67.069,64.428,112.642 c58.143,37.714,131.143,4.286,156.285-24c0,0,56.643-61.143,31.5-120.071C233.373,40.339,186.23-1.732,124.946,6.125",
					'duration':1200
					},
				{   'path': "M199,151.422 c0,0-3.468-10.875-12.407-10.875c-8.939-0.001-12.409,10.321-12.409,10.321",
					'duration':300
					}
			],  
			'dimensions' : { 'width': 270, 'height':266 }
		}
	}
	 
	$(document).ready(function(){
		 
		$('#demo').lazylinepainter({
				'svgData' : svgData,
				'strokeWidth':7,  
				'strokeColor':'#de8f8f' 	
			}
		) 
				
		$('#demo').lazylinepainter('paint');
	})
	 
	  
})( jQuery );