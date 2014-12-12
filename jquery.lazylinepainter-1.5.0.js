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

(function($, window, undefined) {

    "use strict";

    var dataKey = 'lazyLinePainter';
    var methods = {

        /*
            PUBLIC : SETUP LAZY LINE DATA
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
                        'strokeDash': null,
                        'onComplete': null,
                        'delay': 1000,
                        'overrideKey': null,
                        'drawSequential': true,
                        'speedMultiplier': 1,
                        'reverse': false
                    }, _options);

                    // Set up path information
                    // if overrideKey has been defined - use overrideKey as key within the svgData object.
                    // else - use the elements id as key within the svgData object.
                    var target = options.overrideKey ? options.overrideKey : $this.attr('id').replace('#', '');
                    var w = options.svgData[target].dimensions.width;
                    var h = options.svgData[target].dimensions.height;

                    // target stroke path
                    options.svgData = options.svgData[target].strokepath;

                    // Create svg element and set dimensions
                    if (options.width === null) {
                        options.width = w;
                    }
                    if (options.height === null) {
                        options.height = h;
                    }
                    // Set width / height of container element
                    $this.css({
                        'width': options.width,
                        'height': options.height
                    });


                    var svg = getSVGElement({
                        viewBox: '0 0 ' + w + ' ' + h,
                        preserveAspectRatio: 'xMidYMid'
                    });
                    options.svg = $(svg);
                    $this.append(options.svg);
                    $this.data(dataKey, options);
                }
            });
        },

        /*
            PUBLIC : PAINT LAZY LINE DATA
        */
        paint: function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data(dataKey);
                var init = function() {

                    // Build array of path objects
                    data.paths = [];
                    data.longestDuration = 0;
                    data.playhead = 0;

                    var totalDuration = 0;
                    for (var i = 0; i < data.svgData.length; i++) {
                        var duration = data.svgData[i].duration * data.speedMultiplier;
                        totalDuration += duration;
                    }

                    // Loop paths
                    for (var i = 0; i < data.svgData.length; i++) {

                        var path = getPath(data, i);
                        var length = path.getTotalLength();
                        path.style.strokeDasharray = length + ' ' + length;
                        path.style.strokeDashoffset = length;
                        path.style.display = 'block';
                        path.getBoundingClientRect();

                        var duration = data.svgData[i].duration * data.speedMultiplier;
                        if (duration > data.longestDuration) {
                            data.longestDuration = duration;
                        }

                        var drawStartTime;
                        if (data.reverse) {
                            totalDuration -= duration;
                            drawStartTime = totalDuration;
                        } else {
                            drawStartTime = data.playhead;
                        }

                        data.paths.push({
                            'duration': duration,
                            'drawStartTime': drawStartTime,
                            'path': path,
                            'length': length
                        });
                        data.playhead += duration;
                    }

                    data.totalDuration = (data.drawSequential) ? data.playhead : data.longestDuration;
                    data.rAF = requestAnimationFrame(function(timestamp) {
                        draw(timestamp, data);
                    });
                };

                // if delay isset
                if (data.delay === null) {
                    init();
                } else {
                    setTimeout(init, data.delay);
                }
            });
        },

        /*
            TOGGLE PAUSE/RESUME ANIMATION
        */
        pauseResume: function() {

            return this.each(function() {

                var data = $(this).data(dataKey);

                if (!data.paused) {
                    data.paused = true;
                    cancelAnimationFrame(data.rAF);
                } else {
                    data.paused = false;
                    // resume
                    requestAnimationFrame(function(timestamp) {
                        adjustStartTime(timestamp, data)
                    });
                }
            });
        },
        /*
            ERASE LAZY LINE DATA
        */
        erase: function() {

            return this.each(function() {
                var $this = $(this);
                $this.removeData(dataKey);
                $this.find('svg').empty();

            });
        },

        /*
            DESTROY LAZY LINE DATA & ELEMENT
        */
        destroy: function() {

            return this.each(function() {

                var $this = $(this);
                $this.removeData(dataKey);
                $this.remove();
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

        if (o.startTime == null) {
            o.startTime = timestamp;
        }
        o.elapsed_time = timestamp - o.startTime;

        for (var i = 0; i < o.paths.length; i++) {

            var path_elapsed_time;
            if (o.drawSequential) {
                path_elapsed_time = o.elapsed_time - o.paths[i].drawStartTime;
                if (path_elapsed_time < 0) path_elapsed_time = 0;
            } else {
                path_elapsed_time = o.elapsed_time;
            }

            // don't redraw paths that are finished or paths that aren't up yet
            if (path_elapsed_time < o.paths[i].duration && path_elapsed_time > 0) {

                var frame_length = path_elapsed_time / o.paths[i].duration * o.paths[i].length;

                if (o.reverse || o.svgData[i].reverse) {
                    o.paths[i].path.style.strokeDashoffset = -o.paths[i].length + frame_length;
                } else {
                    o.paths[i].path.style.strokeDashoffset = o.paths[i].length - frame_length;
                }
            } else if (path_elapsed_time > o.paths[i].duration) {
                o.paths[i].path.style.strokeDashoffset = 0;
            }
        }

        // whether to continue
        if (o.elapsed_time < o.totalDuration) {
            o.rAF = requestAnimationFrame(function(timestamp) {
                draw(timestamp, o);
            });
        } else {
            if (o.onComplete != null) o.onComplete();
        }
    }

    var applyStyles = function(data, value) {

        var styles = {
            "stroke": (!value.strokeColor) ? data.strokeColor : value.strokeColor,
            "fill-opacity": 0,
            "stroke-dasharray": (!value.strokeDash) ? data.strokeDash : value.strokeDash,
            "stroke-opacity": (!value.strokeOpacity) ? data.strokeOpacity : value.strokeOpacity,
            "stroke-width": (!value.strokeWidth) ? data.strokeWidth : value.strokeWidth,
            "stroke-linecap": (!value.strokeCap) ? data.strokeCap : value.strokeCap,
            "stroke-linejoin": (!value.strokeJoin) ? data.strokeJoin : value.strokeJoin
        };

        return styles;
    };

    /*
        PRIVATE : SET PATH DATA
    */
    var getPath = function(data, i) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var $path = $(path);
        data.svg.append($path);
        $path.attr(getAttributes(data, data.svgData[i]));
        return path;
    };

    /*
        PRIVATE : GET STYLE DATA
    */
    var getAttributes = function(data, value) {
        var attributes = {
            "d": value.path,
            "stroke": (!value.strokeColor) ? data.strokeColor : value.strokeColor,
            "fill-opacity": 0,
            "stroke-dasharray": (!value.strokeDash) ? data.strokeDash : value.strokeDash,
            "stroke-opacity": (!value.strokeOpacity) ? data.strokeOpacity : value.strokeOpacity,
            "stroke-width": (!value.strokeWidth) ? data.strokeWidth : value.strokeWidth,
            "stroke-linecap": (!value.strokeCap) ? data.strokeCap : value.strokeCap,
            "stroke-linejoin": (!value.strokeJoin) ? data.strokeJoin : value.strokeJoin,
            "arrow-end": (!value.arrowEnd) ? data.arrowEnd : value.arrowEnd,
            "markerWidth": "4",
            "markerHeight": "3",
            "orient": "auto"
        };
        return attributes;
    };

    /*
        PRIVATE : GET STYLE DATA
    */
    var getSVGElement = function(attr) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, 'viewBox', attr.viewBox);
        svg.setAttributeNS(null, 'preserveAspectRatio', attr.preserveAspectRatio);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return svg;
    };

    $.fn.lazylinepainter = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            // error
        }
    };

})(jQuery, window);