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

(function($) {

    'use strict';

    var dataKey = 'lazyLinePainter';
    var methods = {

        /**
         * init
         * Responsible for caching user defined options, creating svg element and setting dimensions.
         * @public
         * @param  {object} _options user defined options
         */
        init: function(_options) {

            return this.each(function() {

                var $this = $(this);
                var data = $this.data(dataKey);
                $this.addClass('lazy-line');

                // If the plugin hasn't been initialized yet
                if (!data) {

                    // Collect settings, define defaults
                    var options = $.extend({
                        'width': null,
                        'height': null,
                        'strokeWidth': 2,
                        'strokeColor': '#000',
                        'strokeOverColor': null,
                        'strokeCap': 'round',
                        'strokeJoin': 'round',
                        'strokeOpacity': 1,
                        'arrowEnd': 'none',
                        'onComplete': null,
                        'onUpdate': null,
                        'onStart': null,
                        'delay': 0,
                        'overrideKey': null,
                        'drawSequential': true,
                        'speedMultiplier': 1,
                        'reverse': false,
                        'responsive': false
                    }, _options);

                    // Set up path information
                    // if overrideKey has been defined - use overrideKey as key within the svgData object.
                    // else - use the elements id as key within the svgData object.
                    var target = options.overrideKey ? options.overrideKey : $this.attr('id').replace('#', '');
                    var w = options.svgData[target].dimensions.width;
                    var h = options.svgData[target].dimensions.height;

                    // target stroke path
                    options.svgData = options.svgData[target].paths;

                    // Create svg element and set dimensions
                    if (options.width === null) {
                        options.width = w;
                    }
                    if (options.height === null) {
                        options.height = h;
                    }
                    if (!options.responsive) {
                        $this.css({
                            'width': options.width,
                            'height': options.height
                        });
                    }

                    // create svg
                    var svg = getSVGElement('0 0 ' + w + ' ' + h);
                    options.svg = $(svg);
                    $this.append(options.svg);

                    // Build array of path objects
                    options.paths = [];
                    options.longestDuration = 0;
                    options.playhead = 0;

                    var duration = 0;
                    var delay = options.delay * options.speedMultiplier;
                    var totalDuration = delay;
                    var i = 0;

                    // find totalDuration,
                    // required before looping paths for setting up reverse options.
                    for (i = 0; i < options.svgData.length; i++) {
                        duration = options.svgData[i].duration * options.speedMultiplier;
                        totalDuration += duration;
                    }

                    // loop paths
                    // obtain path length, animation duration and animation start time.
                    for (i = 0; i < options.svgData.length; i++) {

                        var path = getPath(options, i);
                        var length = path.getTotalLength();
                        path.style.strokeDasharray = length + ' ' + length;
                        path.style.strokeDashoffset = length;
                        path.style.display = 'block';
                        path.getBoundingClientRect();

                        duration = options.svgData[i].duration * options.speedMultiplier;

                        if (duration > options.longestDuration) {
                            options.longestDuration = duration;
                        }

                        var drawStartTime;
                        if (options.reverse) {
                            totalDuration -= duration;
                            drawStartTime = totalDuration;
                        } else {
                            drawStartTime = options.playhead + delay;
                        }

                        options.paths.push({
                            'duration': duration,
                            'drawStartTime': drawStartTime,
                            'path': path,
                            'length': length
                        });
                        options.playhead += duration;
                    }

                    options.totalDuration = options.drawSequential ? options.playhead : options.longestDuration;
                    options.totalDuration += delay;

                    // cache options
                    $this.data(dataKey, options);
                }
            });
        },


        /**
         * paint
         * Responsible for drawing path.
         * @public
         */
        paint: function() {

            return this.each(function() {

                // retrieve data object
                var $this = $(this);
                var data = $this.data(dataKey);

                var init = function() {

                    // begin animation
                    data.rAF = requestAnimationFrame(function(timestamp) {
                        draw(timestamp, data);
                    });

                    // fire onStart callback
                    if (data.onStart !== null) {
                        data.onStart();
                    }
                };

                setTimeout(init, data.delay);
            });
        },


        /**
         * pauseResume
         * Responsible for pausing / resuming path animation.
         * @public
         */
        pauseResume: function() {

            return this.each(function() {

                var data = $(this).data(dataKey);

                if (!data.paused) {
                    data.paused = true;

                    // cancel rAF
                    cancelAnimationFrame(data.rAF);
                } else {
                    data.paused = false;

                    // resume rAF
                    requestAnimationFrame(function(timestamp) {
                        adjustStartTime(timestamp, data);
                    });
                }
            });
        },


        /**
         * erase
         * Responsible for clearing path,
         * paint can still be called on the element after it has been erased.
         * @public
         */
        erase: function() {

            return this.each(function() {

                // retrieve data object
                var $this = $(this);
                var data = $this.data(dataKey);

                // reset / cancel rAF
                data.startTime = null;
                data.elapsedTime = null;
                cancelAnimationFrame(data.rAF);

                // empty contents of svg
                data.svg.empty();
            });
        },


        /**
         * destroy
         * Responsible for removing lazyline data and element from DOM
         * @public
         */
        destroy: function() {

            return this.each(function() {

                // retrieve / remove data object
                var $this = $(this);
                $this.removeData(dataKey);

                // remove container element
                $this.remove();
            });
        },



        set: function(ratio) {

            return this.each(function() {

                var $this = $(this);
                var data = $this.data(dataKey);

                // set elapsedTime
                data.elapsedTime = ratio * data.totalDuration;

                //
                updatePaths(data);
            });
        }
    };


    /**
     * adjustStartTime
     * Responsible for managing time.
     * @private
     * @param  {number} timestamp identifies current time
     * @param  {object} data      contains options set on init() and paint()
     */
    var adjustStartTime = function(timestamp, data) {
        data.startTime = timestamp - data.elapsedTime;
        requestAnimationFrame(function(timestamp) {
            draw(timestamp, data);
        });
    };


    /**
     * draw
     * Responsible for animating paths.
     * Path incrementation is performed using requestAnimationFrame.
     * @private
     * @param  {number} timestamp   identifies current time
     * @param  {object} data        contains options set on init() and paint()
     */
    var draw = function(timestamp, data) {

        // set startTime
        if (!data.startTime) {
            data.startTime = timestamp;
        }

        // set elapsedTime
        data.elapsedTime = timestamp - data.startTime;

        //
        updatePaths(data);

        // envoke draw function recursively if elapsedTime is less than the totalDuration
        if (data.elapsedTime < data.totalDuration) {
            data.rAF = requestAnimationFrame(function(timestamp) {
                draw(timestamp, data);
            });

            // else envoke onComplete
        } else {
            if (data.onComplete !== null) {
                data.onComplete();
            }
        }
    };


    var updatePaths = function(data) {

        // envoke onUpdate
        if (data.onUpdate !== null) {
            data.onUpdate();
        }

        // loop paths
        for (var i = 0; i < data.paths.length; i++) {

            // set pathElapsedTime
            var pathElapsedTime;
            if (data.drawSequential) {
                pathElapsedTime = data.elapsedTime - data.paths[i].drawStartTime;
                if (pathElapsedTime < 0) {
                    pathElapsedTime = 0;
                }
            } else {
                pathElapsedTime = data.elapsedTime;
            }

            // don't redraw paths that are finished or paths that aren't up yet
            if (pathElapsedTime < data.paths[i].duration && pathElapsedTime > 0) {

                var frameLength = pathElapsedTime / data.paths[i].duration * data.paths[i].length;

                // animate path in certain direction, based on data.reverse property
                if (data.reverse || data.svgData[i].reverse) {
                    data.paths[i].path.style.strokeDashoffset = -data.paths[i].length + frameLength;
                } else {
                    data.paths[i].path.style.strokeDashoffset = data.paths[i].length - frameLength;
                }
            } else if (pathElapsedTime >= data.paths[i].duration) {
                data.paths[i].path.style.strokeDashoffset = 0;
            } else if (pathElapsedTime <= data.paths[i].drawStartTime) {
                data.paths[i].path.style.strokeDashoffset = data.paths[i].length;
            }
        }
    }


    /**
     * getPath
     * Responsible for creating a svg path element, and setting attributes on path.
     * @private
     * @param  {object} data contains options set on init
     * @param  {number} i    path index
     * @return {object} path svg path element
     */
    var getPath = function(data, i) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var $path = $(path);
        data.svg.append($path);
        $path.attr(getAttributes(data, data.svgData[i]));
        return path;
    };


    /**
     * getAttributes
     * Returns an object of path attributes,
     * selects either global options set on init or specific path option
     * @private
     * @param  {object} data  contains options set on init()
     * @param  {object} value contains specific path options
     * @return {object}       obj of path attributes
     */
    var getAttributes = function(data, value) {
        return {
            'd': value.path,
            'stroke': !value.strokeColor ? data.strokeColor : value.strokeColor,
            'fill-opacity': 0,
            'stroke-opacity': !value.strokeOpacity ? data.strokeOpacity : value.strokeOpacity,
            'stroke-width': !value.strokeWidth ? data.strokeWidth : value.strokeWidth,
            'stroke-linecap': !value.strokeCap ? data.strokeCap : value.strokeCap,
            'stroke-linejoin': !value.strokeJoin ? data.strokeJoin : value.strokeJoin
        };
    };


    /**
     * getSVGElement
     * Returns empty svg element with specified viewBox aspect ratio.
     * @private
     * @param  {string} viewBox
     * @return {obj}    svg
     */
    var getSVGElement = function(viewBox) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'viewBox', viewBox);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return svg;
    };


    /**
     * lazylinepainter
     * Extends jQuery's prototype object.
     * @public
     * @param  {string}     method  Expects lazylinepainter method name as string.
     * @return {function}           Returns lazylinepainter method.
     */
    $.fn.lazylinepainter = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            console.log('opps - issue finding method');
        }
    };

})(jQuery);