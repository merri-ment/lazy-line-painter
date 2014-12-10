/* 
* Lazy Line Painter
* SVG Stroke animation.
*
* https://github.com/camoconnell/lazy-line-painter
* http://www.camoconnell.com
*
* Licensed under the MIT license.
*  
*/ 

(function( $, window, undefined ){ 

	var $self = $(this);
	var dataKey = 'lazyLinePainter';

	$self.methods = {

		// setup lazy line data
		init : function(options) { 

			return this.each(function(){

				var $this = $(this),
					d = $this.data(dataKey);

				$this.addClass('lazy-line');

				// If the plugin hasn't been initialized yet
				if (!d) { 
					/*
						SETUP DATA
					*/
					// Collect settings, define defaults
					var o = $.extend({
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
						'overrideKey'	: null,
						'drawSequential': true,
						'speedMultiplier'	: 1,
						'useRandomColors'	: false
					}, options);  

					// Set up path information
					// if overrideKey has been defined - use overrideKey as key within the svgData object.
					// else - use the elements id as key within the svgData object.
					var target = (o.overrideKey === null) ? $this.attr('id').replace('#','') : o.overrideKey;
					
					var	$w = o.svgData[target].dimensions.width, 
						$h = o.svgData[target].dimensions.height;

					o.svgData  = o.svgData[target].strokepath;

					// Setup dimensions
					if(o.width  === null) o.width  = $w;
					if(o.height === null) o.height = $h; 

					// Setup Rapheal 
					var $s = $this.attr("id"); // Requires Id
					o.paper = new Raphael($s, $w, $h);
					
					// cache
					$this.data(dataKey, o);
				}
			});
		},
		/*
			PAINT LAZY LINE DATA
		*/
		paint : function() { 

			return this.each(function() {

				var $this = $(this),
					o = $this.data(dataKey);
			
				$this.init = function() {

					
					// Set width / height of container element
					$this.css({'width' : o.width, 'height' : o.height});

					// build array of path objects
					o.paths = [];
					o.longestDuration = 0;
					o.playhead = 0;
					$.each(o.svgData, function (i, val) {
						var duration = val.duration * o.speedMultiplier
						if (duration > o.longestDuration) o.longestDuration = duration;
						var p = o.paper.path(val.path);
						if (o.useRandomColors) o.strokeColor = randomColor();
						p.attr({ 
							'stroke': 'none',
							'fill-opacity': 0
						});
						o.paths.push({
							'pathstr': p, 
							'duration': duration,
							'attr': $this.applyStyles(val),
							'drawStartTime': o.playhead
						});
						o.playhead += duration
					});

					o.totalDuration = (o.drawSequential) ? o.playhead : o.longestDuration;
					o.rAF = requestAnimationFrame(function(timestamp) {
						draw(timestamp, o);
					});
				};

				$this.applyStyles = function(val) {
 
					var styles = {
						"stroke"		: ( !val.strokeColor ) ? o.strokeColor : val.strokeColor,
						"fill-opacity"    : 0,
						"stroke-dasharray": ( !val.strokeDash )	? o.strokeDash : val.strokeDash,
						"stroke-opacity"  : ( !val.strokeOpacity )? o.strokeOpacity : val.strokeOpacity,
						"stroke-width"    : ( !val.strokeWidth ) ? o.strokeWidth : val.strokeWidth,
						"stroke-linecap"  : ( !val.strokeCap ) ? o.strokeCap : val.strokeCap,
						"stroke-linejoin" : ( !val.strokeJoin )	? o.strokeJoin : val.strokeJoin
					};

					return styles;
				};

				// if delay isset
				if (o.delay === null) 
					$this.init();
				else 
					setTimeout($this.init, o.delay);
			});
		},
		/*
			TOGGLE PAUSE/RESUME ANIMATION
		*/
		pauseResume : function() {

			return this.each(function() {

				var o = $(this).data(dataKey);

				if (!o.paused) {
					o.paused = true;
					cancelAnimationFrame(o.rAF);
				}
				else {				
					o.paused = false;
					// resume
					requestAnimationFrame(function(timestamp) {
						adjustStartTime(timestamp, o)
					});
				}
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

	var adjustStartTime = function(timestamp, o) {
		o.startTime = timestamp - o.elapsed_time;
		requestAnimationFrame(function(timestamp) {
			draw(timestamp, o);
		});
	}

	var draw = function(timestamp, o) {
		
		if (o.startTime == null) o.startTime = timestamp;
		o.elapsed_time = timestamp - o.startTime;

		$.each(o.paths, function(i, val) {
			
			var path_elapsed_time;
			if (o.drawSequential) {
				path_elapsed_time = o.elapsed_time - val.drawStartTime;
				if (path_elapsed_time < 0) path_elapsed_time = 0;
			} else {
				path_elapsed_time = o.elapsed_time;
			}

			// don't redraw paths that are finished or paths that aren't up yet
			if (path_elapsed_time < val.duration && path_elapsed_time > 0) {
				var guide_path;
				if (typeof(val.pathstr) == 'string') {
					guide_path = o.paper.path(pathstr).attr({stroke: 'none', fill: 'none'});
				} else {
					guide_path = val.pathstr;
				}

				var path = o.paper.path( val.pathstr ).attr( val.attr );
				var total_length = guide_path.getTotalLength( guide_path );
				var frame_length = path_elapsed_time / val.duration * total_length;
				var subpathstr = guide_path.getSubpath( 0, frame_length );  

				o.paper.path(subpathstr).attr(val.attr);
			}

		}); 
		
		// whether to continue
        if (o.elapsed_time < o.totalDuration) {
        	o.rAF = requestAnimationFrame(function(timestamp) {
				draw(timestamp, o);
			});
        } else {
            if (o.onComplete != null) o.onComplete();
        }
	}

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

	var randomColor = function() {
		var hexstring = 'abcdef0123456789',
			chars = [];
		for (var i = 0; i < 6; i++) {
			var j = Math.round(Math.random() * 6);
			var c = hexstring.substr(j, 1);
			chars.push(c);
		}
		return '#'+chars.join('');
	}

	$.fn.lazylinepainter = function(method){ 

		if ( $self.methods[method] ) { 

			return $self.methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));

		} else if ( typeof method === 'object' || ! method ) {

			return $self.methods.init.apply( this, arguments );

		} else {
			 // error
		}  
	};

})( jQuery, window );