/* 
* Lazy Line Painter 1.1
* SVG Stroke animation.
*
* https://github.com/camoconnell/lazy-line-painter
*
* Copyright 2013 
* Cam O'Connell - http://www.camoconnell.com  http://www.behance.net/camoconnell 
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*  
*/

(function( $, window, undefined ){ 

	var methods = {
		 
		 
		// setup lazy line data
		init : function( options ) { 
		
			return this.each(function(){
			
				var $this = $(this),
					data = $this.data('lazyLinePainter');
					
				$this.addClass('lazy-line');
				 
				// If the plugin hasn't been initialized yet
				if ( ! data ) { 
					
				 	/*
						SETUP DATA
					*/
					
					// Collect settings, define defaults
					var settings = $.extend( {
							'width'  : null,
							'height' : null,
							'strokeWidth' : 2,
							'strokeColor' : '#000',
							'strokeCap'   : 'round',
							'strokeJoin'  : 'round',
							'onComplete'  : null, 
							'delay'       : null
						},  options);  
					
					// Set up path information 	
					var target      = $this.attr('id').replace('#',''),
						$thisWidth  = settings.svgData[target].dimensions.width, 
						$thisHeight = settings.svgData[target].dimensions.height;
						
					settings.svgData  = settings.svgData[target].strokepath;
					
					// Setup dimensions
					if( settings.width  == null ){ settings.width  = $thisWidth }
				  	if( settings.height == null ){ settings.height = $thisHeight }
					
					// Setup Rapheal 
				    var paper = new Raphael($this.attr("id"), $thisWidth, $thisHeight); 
					
					
					
					
					/*
						BIND DATA TO ELEMENT
					*/
					
					$this.data('lazyLinePainter', { 
						'svgData'     : settings.svgData,
						'width'       : settings.width,
						'height'      : settings.height,
						'strokeWidth' : settings.strokeWidth,
						'strokeColor' : settings.strokeColor,
						'strokeCap'   : settings.strokeCap,
						'strokeJoin'  : settings.strokeJoin,
						'onComplete'  : settings.onComplete, 
						'delay'       : settings.delay,
						'paper'       : paper,
						'count'       : 1,
						'complete'    : false,
						'playhead'    : 0,
						'setTimeOutHandler' : []
					}); 
				}
			});
		
		},
		
		// Paint Lazy Line data
		paint : function( ) { 
		
			return this.each(function(){
			  
				var $this = $(this),
				data = $this.data('lazyLinePainter');  
				 
				var init = function(){
					
					// Set width / height of container element
					$this.css({'width' : data.width, 'height' : data.height});
					
					// Loop paths 
					$.each(data.svgData, function (i, val) {
						
						var p = data.paper.path(val.path);
					
						p.attr({
							stroke: 'none',
							"stroke-width": data.strokeWidth,
							'fill-opacity': 0
						});
					
						var sto = setTimeout(function () {
							var s = draw({
								'canvas'   : data.paper, 
								'pathstr'  : p, 
								'duration' : val.duration, 
								'attr'     : {
									 stroke: data.strokeColor,
									 "fill-opacity"    : 0,
									 "stroke-width"    : data.strokeWidth,
									 "stroke-linecap"  : data.strokeCap,
									 "stroke-linejoin" : data.strokeJoin
								 },
								'callback' : function (e) {  
									
									// remove reference to setTimeOut
									data.setTimeOutHandler.splice(data.count,1);
									
									data.count++;
								
									if (data.svgData.length == data.count){
											data.complete = true;
											if(data.onComplete != null) data.onComplete.call($this);
										}
									}
								})
							
						}, data.playhead);
						
						data.playhead += val.duration;
						
						// Keep track of setTimeOuts calls
						data.setTimeOutHandler.push(sto); 
						
					});   	
				}
				
				
				
				var draw = function( settings ) {
					
					var canvas   = settings.canvas, 
						pathstr  = settings.pathstr, 
						duration = settings.duration, 
						attr     = settings.attr, 
						callback = settings.callback;
					
					var guide_path;
					
					if ( typeof( pathstr ) == "string" )
						guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
					else
						guide_path = pathstr;
						
					var path = canvas.path( guide_path.getSubpath( 0, 1 ) ).attr( attr ),
						total_length = guide_path.getTotalLength( guide_path ),
						last_point = guide_path.getPointAtLength( 0 ),
						start_time = new Date().getTime(),
						interval_length = 25,
						result = path;        
				
					var interval_id = setInterval( function()
					{
						var elapsed_time = new Date().getTime() - start_time,
							this_length = elapsed_time / duration * total_length,
							subpathstr = guide_path.getSubpath( 0, this_length );  
								  
						attr.path = subpathstr;
				
						console.log(elapsed_time);
				
						path.animate( attr, interval_length, "ease-out" );
						if ( elapsed_time >= duration )
						{
							 clearInterval( interval_id );
							 if ( callback != undefined ) callback();
							 guide_path.remove();
						}                                       
					}, interval_length );  
					return result;
				}
				 
				
				// if delay isset
				if(data.delay == null){
					 init();
				} else { 
					setTimeout(init, data.delay);
				}
				 					 
			})
			  
			
		},
		
		// erase lazy line art but keep element and data.
		erase : function( ) { 
		
			return this.each(function(){
			
				var $this = $(this);
				$this.find('svg').empty();
				data = $this.data('lazyLinePainter'); 
				
				// reset properties
				$.each(data.setTimeOutHandler,function(){
					clearTimeout(this);
				});
				data.playhead = 0;
				data.count = 0;
				data.complete = false; 
			})
		},
		
		// destroy element and data
		destroy : function( ) { 
		
			return this.each(function(){
			
				var $this = $(this),
				data = $this.data('lazyLinePainter'); 
				$this.removeData('lazyLinePainter'); 
				$this.remove();
			})
		} 
	};


	$.fn.lazylinepainter = function(method){ 
		 
		if ( methods[method] ) { 
		
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			
		} else if ( typeof method === 'object' || ! method ) {
			 
			return methods.init.apply( this, arguments );
			
		} else {
			 // error
		}  
	}

})( jQuery, window );