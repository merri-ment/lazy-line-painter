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
// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

(function( $, window, undefined ){ 

	var methods = {
		 
		 
		// setup lazy line data
		init : function( options ) { 
		
			return this.each(function(){
			
				var $this = $(this),
					data = $this.data('lazyLinePainter');
				 
				// If the plugin hasn't been initialized yet
				if ( ! data ) {
					
					var settings = $.extend( {
							'strokeWidth' : 2,
							'strokeColor' : '#fff',
							'strokeCap'   : 'round',
							'strokeJoin'  : 'round',
							'onComplete'  : null, 
							'delay'       : null
						},  options);  
				
					var target      = $this.attr('id').replace('#',''),
						$thisWidth  = settings.svgData[target].dimensions.width, 
						$thisHeight = settings.svgData[target].dimensions.height;
					
					settings.svgData  = settings.svgData[target].strokepath;
				  
				    var paper = new Raphael($this.attr("id"), $thisWidth, $thisHeight); 
					
					$(this).data('lazyLinePainter', {
						'settings'  : settings,
						'paper'     : paper,
						'count'     : 1,
						'complete'  : false,
						'playhead'  : 0,
						'setTimeOutHandler' : []
					}); 
				}
			});
		
		},
		
		// paint lazy line data
		paint : function( ) { 
		
			return this.each(function(){
			 
			
				var $this = $(this),
				data = $this.data('lazyLinePainter'); 
				 
				var init = function(){
					$.each(data.settings.svgData, function (i, val) {
						
						var p = data.paper.path(val.path);
					
						p.attr({
							stroke: 'none',
							"stroke-width": data.settings.strokeWidth,
							'fill-opacity': 0
						});
					
						var sto = setTimeout(function () {
							var s = draw({
								'canvas'   : data.paper, 
								'pathstr'  : p, 
								'duration' : val.duration, 
								'attr'     : {
									 stroke: data.settings.strokeColor,
									 "fill-opacity"    : 0,
									 "stroke-width"    : data.settings.strokeWidth,
									 "stroke-linecap"  : data.settings.strokeCap,
									 "stroke-linejoin" : data.settings.strokeJoin
								 },
								'callback' : function (e) {  
									
									// remove reference to setTimeOut
									data.setTimeOutHandler.splice(data.count,1);
									
									data.count++;
								
									if (data.settings.svgData.length == data.count){
											data.complete = true;
											if(data.settings.onComplete != null) data.settings.onComplete();
										}
									}
								})
							
						}, data.playhead);
						
						data.playhead += val.duration;
						
						// add reference to setTimeOut
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
				
						path.animate( attr, interval_length );
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
				if(data.settings.delay){
					setTimeout(init, data.settings.delay);
				} else {
					init();
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