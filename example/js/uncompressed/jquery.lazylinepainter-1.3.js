/* 
* Lazy Line Painter 1.2
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
 
	/*  
    * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	* http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	* 
	* requestAnimationFrame polyfill by Erik Möller
	* fixes from Paul Irish and Tino Zijdel	
	*/ 

    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'],
        x,
        length,
        currTime,
        timeToCall;

    for (x = 0, length = vendors.length; x < length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        lastTime = currTime + timeToCall;
        return window.setTimeout(function () {
            callback(currTime + timeToCall);
        },
        timeToCall);
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };


 
    var dataKey = 'lazyLinePainter';

	var methods = {
 
		/*
			SETUP LAZY LINE DATA
		*/
		init : function( options ) { 

			return this.each(function(){

				var $this = $(this),
					data = $this.data(dataKey);

				$this.addClass('lazy-line');

				// If the plugin hasn't been initialized yet
				if ( ! data ) { 

					// Collect options, define defaults
					var o = $.extend( {
							'width'       : null,
							'height'      : null,
							'strokeWidth' : 2,
							'strokeColor' : '#000',
							'strokeCap'   : 'round',
							'strokeJoin'  : 'round',
							'onComplete'  : null, 
							'delay'       : null,
							'overrideKey' : null
						},  options);  

					// Set up path information
					// if overrideKey has been defined - use overrideKey as key within the svgData object.
					// else - use the elements id as key within the svgData object.
					var target = (o.overrideKey === null ) ? $this.attr('id').replace('#','') : o.overrideKey;
					
					var	$thisWidth  = o.svgData[target].dimensions.width, 
						$thisHeight = o.svgData[target].dimensions.height;

					o.svgData  = o.svgData[target].strokepath;

					// Setup dimensions
					if( o.width  === null ) o.width  = $thisWidth;
					if( o.height === null ) o.height = $thisHeight;

					// Setup Rapheal 
					var paper = new Raphael($this.attr("id"), $thisWidth, $thisHeight); 
 
					// Bind data to element
					$this.data(dataKey,  { 
						'svgData'     : o.svgData,
						'width'       : o.width,
						'height'      : o.height,
						'strokeWidth' : o.strokeWidth,
						'strokeColor' : o.strokeColor,
						'strokeCap'   : o.strokeCap,
						'strokeJoin'  : o.strokeJoin,
						'onComplete'  : o.onComplete, 
						'delay'             : o.delay,
						'overrideKey'       : o.overrideKey,
						'paper'             : paper,
						'count'             : 0,
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
					data = $this.data(dataKey);  

				var init = function(){

					// Set width / height of container element
					$this.css({'width' : data.width, 'height' : data.height});

					// begin requestAnimationFrame loop
                    loop();
 
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
									"stroke": (!val.strokeColor) ? data.strokeColor : val.strokeColor,
									"fill-opacity"    : 0,
									"stroke-width"    : (!val.strokeWidth) ? data.strokeWidth : val.strokeWidth,
									"stroke-linecap"  : data.strokeCap,
									"stroke-linejoin" : data.strokeJoin
								},
								'callback' : function (e) {  

									// remove reference to setTimeOut
									data.setTimeOutHandler.splice(data.count,1);

									data.count++;

									if (data.svgData.length == data.count){
											data.complete = true;
											if(data.onComplete !== null) data.onComplete.call($this);

											cancelAnimationFrame(frame);
										}
									}
								});

						}, data.playhead);

						data.playhead += val.duration;

						// Keep track of setTimeOuts calls
						data.setTimeOutHandler.push(sto); 
					});
				};


				var id = 0,
					frame,
					fps = 60,
					interval = 1000 / fps,
					animationStack = [];

				var draw = function (settings) {

					var canvas = settings.canvas,
						pathstr = settings.pathstr,
						duration = settings.duration,
						attr = settings.attr,
						callback = settings.callback;

					var guide_path = typeof (pathstr) == "string" ? canvas.path(pathstr).attr({ stroke: "none", fill: "none" }) : pathstr;

					var path = canvas.path(guide_path.getSubpath(0, 1)).attr(attr),
						total_length = guide_path.getTotalLength(guide_path),
						last_point = guide_path.getPointAtLength(0),
						start_time = new Date().getTime(),
						p_id = id;

					var render = function () {

						var elapsed_time = new Date().getTime() - start_time,
							this_length = elapsed_time / duration * total_length,
							subpathstr = guide_path.getSubpath(0, this_length);

						attr.path = subpathstr;

						path.animate(attr, interval);

						if (elapsed_time >= duration) {

							for (i = 0; i < animationStack.length; i++) {
								if (animationStack[i].id == p_id) animationStack.splice(i, 1);
							}

							callback();
							guide_path.remove();
						}
					};

					animationStack.push({ 'id': id, 'callback': render });

					id++;
				};

				function loop() {
					setTimeout(function () {

						frame = requestAnimationFrame(loop);

						for (i = 0; i < animationStack.length; i++) {
							animationStack[i].callback();
						}
					}, interval);
				}


				// if delay isset
				if( data.delay === null) init(); 
					else setTimeout(init, data.delay);
			});
		},


		/*
			ERASE LAZY LINE DATA
		*/
		erase : function( ) { 

			return this.each(function(){

				var $this = $(this);
				$this.find('svg').empty();
				data = $this.data(dataKey); 

				// reset properties
				for (i = 0; i < data.setTimeOutHandler; i++) {
                    clearTimeout(data.setTimeOutHandler[i]);
				}

				data.playhead = 0;
				data.count = 0;
				data.complete = false; 
			});
		},


		/*
			DESTROY LAZY LINE DATA & ELEMENT
		*/
		destroy : function( ) { 

			return this.each(function(){

				var $this = $(this),
				data = $this.data(dataKey); 
				$this.removeData(dataKey); 
				$this.remove();
			});
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
	};

})( jQuery, window );