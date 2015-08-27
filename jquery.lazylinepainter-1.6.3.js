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

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

(function($) {

    'use strict';

    var dataKey = 'lazyLinePainter';
    var className = 'lazylinepainter';

    var methods = {

        /**
         * init
         * Responsible for caching user defined options,
         * creating svg element and setting dimensions.
         * @public
         * @param  {object} _options user defined options
         */
        init: function(_options) {

            return this.each(function() {

                var $this = $(this);
                var data = $this.data(dataKey);
                $this.addClass(className);

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

                        'onComplete': null,
                        'onUpdate': null,
                        'onStart': null,
                        'onStrokeStart': null,
                        'onStrokeComplete': null,

                        'delay': 0,
                        'ease': 'easeLinear',
                        'overrideKey': null,
                        'drawSequential': true,
                        'speedMultiplier': 1,
                        'reverse': false,
                        'paused': false

                    }, _options);

                    // Set up path information
                    // if overrideKey has been defined - use overrideKey as key within the svgData object.
                    // else - use the elements id as key within the svgData object.
                    var target = options.overrideKey ? options.overrideKey : $this.attr('id').replace('#', '');
                    var w = options.svgData[target].dimensions.width;
                    var h = options.svgData[target].dimensions.height;

                    // target stroke path
                    options.paths = $.extend(true, [], options.svgData[target].strokepath);

                    // Create svg element and set dimensions
                    if (options.width === null) {
                        options.width = w;
                    }
                    if (options.height === null) {
                        options.height = h;
                    }

                    // create svg
                    options.svg = getSVGElement('0 0 ' + w + ' ' + h);
                    $this.append(options.svg);

                    // Build array of path objects
                    // options.paths = [];
                    options.longestDuration = 0;
                    options.playhead = 0;

                    var duration = 0;
                    var delay = options.delay * options.speedMultiplier;
                    var totalDuration = delay;
                    var i = 0;

                    // find totalDuration,
                    // required before looping paths for setting up reverse options.
                    for (i = 0; i < options.paths.length; i++) {
                        duration = options.paths[i].duration * options.speedMultiplier;
                        totalDuration += duration;
                    }

                    // loop paths
                    // obtain path length, animation duration and animation start time.
                    for (i = 0; i < options.paths.length; i++) {

                        var el = getPath(options, i);
                        var length = Math.ceil(el.getTotalLength());
                        var path = options.paths[i];
                        path.positions = [];


                        for (var j = 0; j < length; j++) {
                            var position = el.getPointAtLength(j);
                            path.positions.push({
                                x: position.x,
                                y: position.y
                            });
                        };

                        el.style.strokeDasharray = length + ' ' + length;
                        el.style.strokeDashoffset = length;
                        el.style.display = 'block';
                        el.getBoundingClientRect();

                        duration = path.duration * options.speedMultiplier;

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

                        path.duration = duration;
                        path.drawStartTime = drawStartTime;
                        path.el = el;
                        path.index = i;
                        path.length = length;
                        path.progress = 0;
                        path.ease = path.ease || options.ease;
                        path.onStrokeStart = path.onStrokeStart || null;
                        path.onStrokeComplete = path.onStrokeComplete || null;
                        path.onStrokeStartDone = false;
                        path.onStrokeCompleteDone = false;
                        path.onStrokeUpdate = path.onStrokeUpdate || null;

                        options.playhead += duration;
                    }

                    options.totalDuration = options.drawSequential ? options.playhead : options.longestDuration;
                    options.totalDuration += delay;

                    // cache options
                    $this.data(dataKey, options);
                    $this.lazylinepainter('resize');
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

                $this.lazylinepainter('erase');

                // begin animation
                data.rAF = requestAnimationFrame(function(timestamp) {
                    draw(timestamp, data);
                });

                // fire onStart callback
                if (data.onStart !== null) {
                    data.onStart();
                }
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

                // reset callback
                data.onStrokeCompleteDone = false;

                // reset paused
                data.paused = false;

                // empty contents of svg
                for (var i = 0; i < data.paths.length; i++) {

                    var path = data.paths[i];
                    path.el.style.strokeDashoffset = path.length;
                    path.onStrokeCompleteDone = false;
                    path.onStrokeStartDone = false;
                }
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

                // empty container element
                $this.empty();

                // remove class
                $this.removeClass(className);
            });
        },


        /**
         * set
         * @public
         */
        set: function(ratio) {

            return this.each(function() {

                var $this = $(this);
                var data = $this.data(dataKey);

                // set elapsedTime
                data.elapsedTime = ratio * data.totalDuration;
                updatePaths(data);
            });
        },


        /**
         * get
         * @public
         */
        get: function() {

            var $this = $(this);
            var data = $this.data(dataKey);
            return data;
        },


        /**
         * resize
         * @public
         */
        resize: function() {

            this.each(function() {

                var $this = $(this);
                var data = $this.data(dataKey);
                data.offset = $this.offset();

                for (var i = 0; i < data.paths.length; i++) {
                    updatePosition(data, data.paths[i]);
                }
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

        updatePaths(data);

        // invoke draw function recursively if elapsedTime is less than the totalDuration
        if (data.elapsedTime < data.totalDuration) {

            data.rAF = requestAnimationFrame(function(timestamp) {
                draw(timestamp, data);
            });

        } else {

            // else invoke onComplete
            if (data.onComplete !== null) {
                data.onComplete();
            }
        }
    };

    var updatePaths = function(data) {

        if (data.onUpdate !== null) {
            data.onUpdate();
        }

        // loop paths
        for (var i = 0; i < data.paths.length; i++) {


            var path = data.paths[i];
            var elapsedTime = getElapsedTime(data, path);

            updateProgress(data, path, elapsedTime);
            setLine(data, path);
            updatePosition(data, path);
            updateStrokeCallbacks(data, path);
        }
    }


    var getElapsedTime = function(data, path) {

        var elapsedTime;
        if (data.drawSequential) {

            elapsedTime = data.elapsedTime - path.drawStartTime;

            if (elapsedTime < 0) {
                elapsedTime = 0;
            }
        } else {
            elapsedTime = data.elapsedTime;
        }

        return elapsedTime;
    }


    var updateProgress = function(data, path, elapsedTime) {

        if (elapsedTime > 0 && elapsedTime < path.duration) {
            path.progress = easing[path.ease](elapsedTime, 0, 1, path.duration);
        } else if (elapsedTime >= path.duration) {
            path.progress = 1;
        } else if (elapsedTime <= path.drawStartTime) {
            path.progress = 0;
        }
    }


    var setLine = function(data, path) {

        var el = path.el;
        var length = path.progress * path.length;

        if (data.reverse || path.reverse) {
            el.style.strokeDashoffset = -path.length + length;
        } else {
            el.style.strokeDashoffset = path.length - length;
        }
    }


    var updateStrokeCallbacks = function(data, path) {

        if (path.progress === 1) {

            // fire onStrokeComplete callback
            if (data.onStrokeComplete && data.drawSequential && !path.onStrokeCompleteDone) {
                data.onStrokeComplete(path);

                if (!path.onStrokeComplete) {
                    path.onStrokeCompleteDone = true;
                }
            }

            // fire onStrokeComplete callback of each line
            if (path.onStrokeComplete && data.drawSequential && !path.onStrokeCompleteDone) {
                path.onStrokeComplete(path);
                path.onStrokeCompleteDone = true;
            }

        } else if (path.progress > 0.00001) {

            // fire onStrokeStart callback
            if (data.onStrokeStart && data.drawSequential && !path.onStrokeStartDone) {
                data.onStrokeStart(path);

                if (!path.onStrokeStart) {
                    path.onStrokeStartDone = true;
                }
            }

            // fire onStrokeStart callback of each line
            if (path.onStrokeStart && data.drawSequential && !path.onStrokeStartDone) {
                path.onStrokeStart(path);
                path.onStrokeStartDone = true;
            }

            if (path.onStrokeUpdate) {
                path.onStrokeUpdate(path);
            }
        }
    }


    /**
     * updatePosition
     * Responsible for updating the paths x / y position.
     * @private
     */
    var updatePosition = function(data, path) {
        var index = Math.round((path.progress * (path.length - 1)));
        var position = path.positions[index];
        path.position = {
            x: data.offset.left + position.x,
            y: data.offset.top + position.y
        };
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
        $path.attr(getAttributes(data, data.paths[i]));
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
     * @return {obj}    jquery wrapped svg el
     */
    var getSVGElement = function(viewBox) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'viewBox', viewBox);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return $(svg);
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



    var easing = {

        easeLinear: function(t, b, c, d) {
            return c * t / d + b;
        },

        easeInQuad: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },

        easeOutQuad: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },

        easeInOutQuad: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },

        easeInCubic: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },

        easeOutCubic: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },

        easeInOutCubic: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },

        easeInQuart: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },

        easeOutQuart: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },

        easeInOutQuart: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },

        easeInQuint: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },

        easeOutQuint: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },

        easeInOutQuint: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },

        easeInSine: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },

        easeOutSine: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },

        easeInOutSine: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },

        easeInExpo: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },

        easeOutExpo: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },

        easeInOutExpo: function(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },

        easeInCirc: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },

        easeOutCirc: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },

        easeInOutCirc: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },

        easeInElastic: function(t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },

        easeOutElastic: function(t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },

        easeInOutElastic: function(t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },

        easeInBack: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },

        easeOutBack: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },

        easeInOutBack: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },

        easeInBounce: function(t, b, c, d) {
            return c - easing.easeOutBounce(d - t, 0, c, d) + b;
        },

        easeOutBounce: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },

        easeInOutBounce: function(t, b, c, d) {
            if (t < d / 2) return easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
            return easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }

})(jQuery);