/* 
* Lazy Line Painter 1.4
* SVG Stroke animation.
*
* https://github.com/camoconnell/lazy-line-painter
* http://www.camoconnell.com
*
* Copyright 2013 Cam O'Connell
* Licensed under the MIT license.
*  
*/ 

(function( $, window, undefined ){ 

	var dataKey = 'lazyLinePainter';

	var methods = {


		// setup lazy line data
		init : function( options ) { 

			return this.each(function(){

				var $this = $(this),
					d = $this.data( dataKey );

				$this.addClass('lazy-line');

				// If the plugin hasn't been initialized yet
				if ( ! d ) { 

					/*
						SETUP DATA
					*/

					// Collect settings, define defaults
					var o = $.extend( {
							'width'			: null,
							'height'		: null,
							'strokeWidth'	: 2,
							'strokeColor'	: '#000',
							'strokeCap'		: 'round',
							'strokeJoin'	: 'round',
							'strokeOpacity'	: 1,
							'strokeDash'	: null,
							'onComplete'	: null, 
							'delay'			: null,
							'overrideKey'	: null
						},  options);  

					// Set up path information
					// if overrideKey has been defined - use overrideKey as key within the svgData object.
					// else - use the elements id as key within the svgData object.
					var target = ( o.overrideKey === null ) ? $this.attr('id').replace('#','') : o.overrideKey;
					
					var	$w = o.svgData[target].dimensions.width, 
						$h = o.svgData[target].dimensions.height;

					o.svgData  = o.svgData[target].strokepath;

					// Setup dimensions
					if( o.width  === null ) o.width  = $w;
					if( o.height === null ) o.height = $h; 

					// Setup Rapheal 
					var $s = $this.attr("id"); // Requires Id
					var paper = new Raphael($s, $w, $h);
					
				 
					/*
						BIND DATA TO ELEMENT
					*/

					$this.data( dataKey , { 
						'svgData'		: o.svgData,
						'width'			: o.width,
						'height'		: o.height,
						'strokeWidth'	: o.strokeWidth,
						'strokeColor'	: o.strokeColor,
						'strokeCap'		: o.strokeCap,
						'strokeJoin'	: o.strokeJoin,
						'strokeOpacity'	: o.strokeOpacity,
						'strokeDash'	: o.strokeDash,
						'onComplete'	: o.onComplete, 
						'delay'             : o.delay,
						'overrideKey'       : o.overrideKey,
						'paper'             : paper,
						'count'             : 1,
						'complete'          : false,
						'playhead'          : 0,
						'setTimeOutHandler' : []
					}); 
				}
			});

		},


		/*
			PAINT LAZY LINE DATA
		*/
		paint : function( ) { 

			return this.each(function(){

				var $this = $(this),
				d = $this.data( dataKey );  

				var init = function(){

					// Set width / height of container element
					$this.css({'width' : d.width, 'height' : d.height});

					// Loop paths 
					$.each(d.svgData, function (i, val) {

						var p = d.paper.path(val.path);

						p.attr({ 
							"stroke" : "none",
							"stroke-width": d.strokeWidth,
							"fill-opacity": 0
						});

						var sto = setTimeout(function () {
							var s = draw({
								'count'	: d.count,
								'canvas'   : d.paper, 
								'pathstr'  : p, 
								'duration' : val.duration, 
								'attr'     : applyStyles( d, val ),
								'callback' : function (e) {  

									// remove reference to setTimeOut
									d.setTimeOutHandler.splice(d.count,1);

									d.count++;

									if (d.svgData.length == d.count){
											d.complete = true;
											if(d.onComplete !== null) d.onComplete.call($this);
										}
									}
								});

						}, d.playhead);

						d.playhead += val.duration;

						// Keep track of setTimeOuts calls
						d.setTimeOutHandler.push(sto); 

					});
				};
 

				// if delay isset
				if(d.delay === null)
					init();
				else
					setTimeout(init, d.delay);
			});
		},


		/*
			ERASE LAZY LINE DATA
		*/
		erase : function( ) { 

			return this.each(function(){

				var $this = $(this);
				$this.find('svg').empty();
				d = $this.data( dataKey ); 

				// reset properties
				for (i = 0; i < d.setTimeOutHandler.length; i++) {
					clearTimeout( d.setTimeOutHandler[i] );
				}

				d.playhead = 0;
				d.count = 0;
				d.complete = false; 
			});
		},


		/*
			DESTROY LAZY LINE DATA & ELEMENT
		*/
		destroy : function( ) { 

			return this.each(function(){

				var $this = $(this),
				d = $this.data( dataKey ); 
				$this.removeData( dataKey ); 
				$this.remove();
			});
		},


		/*
			STAMP LAZY LINE DATA 
		*/
		stamp : function( ) { 

			return this.each(function(){

				var $this = $(this),
				d = $this.data( dataKey );  
				
				var init = function(){

					// Set width / height of container element
					$this.css({'width' : d.width, 'height' : d.height});

					// Loop paths 
					//$.each(d.svgData, function (i, val) {
					for (i = 0; i < d.svgData.length; i++) {
						d.paper.path( d.svgData[i].path ).attr( applyStyles( d, d.svgData[i] ) );
					}
					 
				};
				
				// if delay isset
				if(d.delay === null)
					init();
				else
					setTimeout(init, d.delay);
			}); 
		} 
	};



	var applyStyles = function( data, value ) {
 
		var styles = {
			"stroke"		: ( !value.strokeColor ) ? data.strokeColor : value.strokeColor,
			"fill-opacity"    : 0,
			"stroke-dasharray": ( !value.strokeDash )	? data.strokeDash : value.strokeDash,
			"stroke-opacity"  : ( !value.strokeOpacity )? data.strokeOpacity : value.strokeOpacity,
			"stroke-width"    : ( !value.strokeWidth )	? data.strokeWidth : value.strokeWidth,
			"stroke-linecap"  : ( !value.strokeCap )	? data.strokeCap : value.strokeCap,
			"stroke-linejoin" : ( !value.strokeJoin )	? data.strokeJoin : value.strokeJoin
		};

		return styles;
	};
	
 

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
			interval_length = 25;        

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
				if ( callback !== undefined ) callback();
				guide_path.remove();
			}                                       
		}, interval_length );   
	};
	

	$.fn.lazylinepainter = function(method){ 

		if ( methods[method] ) { 

			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));

		} else if ( typeof method === 'object' || ! method ) {

			return methods.init.apply( this, arguments );

		} else {
			 // error
		}  
	};

})( jQuery, window );