(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("LazyLinePainter", [], factory);
	else if(typeof exports === 'object')
		exports["LazyLinePainter"] = factory();
	else
		root["LazyLinePainter"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Lazy Line Painter
 * SVG Stroke animation.
 *
 * https://github.com/camoconnell/lazy-line-painter
 * http://www.camoconnell.com
 *
 * Copyright 2013-2018 Cam O'Connell
 * All rights reserved.
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
 */
var LazyLinePainter =
/*#__PURE__*/
function () {
  /**
   * init
   * Responsible for caching user options,
   * creating svg element and setting dimensions.
   * @public
   * @param  {object} opts user defined options
   */
  function LazyLinePainter(config) {
    _classCallCheck(this, LazyLinePainter);

    this.easing = {
      easeLinear: function easeLinear(t, b, c, d) {
        return c * t / d + b;
      },
      easeInQuad: function easeInQuad(t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOutQuad: function easeOutQuad(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOutQuad: function easeInOutQuad(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
      },
      easeInCubic: function easeInCubic(t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOutCubic: function easeOutCubic(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOutCubic: function easeInOutCubic(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      },
      easeInQuart: function easeInQuart(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOutQuart: function easeOutQuart(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOutQuart: function easeInOutQuart(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      },
      easeInQuint: function easeInQuint(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOutQuint: function easeOutQuint(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOutQuint: function easeInOutQuint(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      },
      easeInSine: function easeInSine(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOutSine: function easeOutSine(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOutSine: function easeInOutSine(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      },
      easeInExpo: function easeInExpo(t, b, c, d) {
        return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOutExpo: function easeOutExpo(t, b, c, d) {
        return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOutExpo: function easeInOutExpo(t, b, c, d) {
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      },
      easeInCirc: function easeInCirc(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOutCirc: function easeOutCirc(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOutCirc: function easeInOutCirc(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      },
      easeInBack: function easeInBack(t, b, c, d, s) {
        if (s === undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOutBack: function easeOutBack(t, b, c, d, s) {
        if (s === undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOutBack: function easeInOutBack(t, b, c, d, s) {
        if (s === undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      },
      easeInBounce: function easeInBounce(t, b, c, d) {
        return c - this.easing.easeOutBounce(d - t, 0, c, d) + b;
      },
      easeOutBounce: function easeOutBounce(t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }

        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      },
      easeInOutBounce: function easeInOutBounce(t, b, c, d) {
        if (t < d / 2) return this.easing.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
        return this.easing.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
      }
    };
    this.className = 'lazylinepainter';
    this.rAF = null;
    this.$el = document.getElementById(config.id);
    this.$el.classList.add(this.className);
    this.options = this._getOptions(config);

    var totalDuration = this.options.delay + this._getTotalDuration(this.options.paths);

    var longestDuration = this.options.delay + this._getLongestDuration(this.options.paths);

    this.options.totalDuration = this.options.drawSequential ? totalDuration : longestDuration;

    this._setupPaths();

    this.options.totalDuration *= this.options.speedMultiplier;
    this.$el.append(this.options.svg);
    this.resize();
  }
  /**
   * paint
   * Responsible for drawing path.
   * @public
   */


  _createClass(LazyLinePainter, [{
    key: "paint",
    value: function paint() {
      var _this = this;

      this.erase(); // begin animation

      this.rAF = requestAnimationFrame(function (timestamp) {
        _this._paint(timestamp);
      }); // fire onStart callback

      if (this.options.onStart !== null) {
        this.options.onStart();
      }
    }
    /**
     * pause
     * Responsible for pausing path animation.
     * @public
     */

  }, {
    key: "pause",
    value: function pause() {
      if (!this.options.paused) {
        this.options.paused = true;
        cancelAnimationFrame(this.rAF);
      }
    }
    /**
     * resume
     * Responsible for resuming path animation.
     * @public
     */

  }, {
    key: "resume",
    value: function resume() {
      var _this2 = this;

      if (this.options.paused) {
        requestAnimationFrame(function (timestamp) {
          _this2.adjustStartTime(timestamp);
        });
        this.options.paused = false;
      }
    }
    /**
     * erase
     * Responsible for clearing path,
     * paint can still be called on the element after it has been erased.
     * @public
     */

  }, {
    key: "erase",
    value: function erase() {
      // reset / cancel rAF
      this.options.startTime = null;
      this.options.elapsedTime = null;
      cancelAnimationFrame(this.rAF); // reset callback

      this.options.onStrokeCompleteDone = false; // reset paused

      this.options.paused = false; // empty contents of svg

      for (var i = 0; i < this.options.paths.length; i++) {
        var path = this.options.paths[i];
        path.el.style.strokeDashoffset = path.length;
        path.onStrokeCompleteDone = false;
        path.onStrokeStartDone = false;
      }
    }
    /**
     * destroy
     * Responsible for removing lazyline data and element from DOM
     * @public
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // retrieve / remove data object
      this.options = null; // empty container element

      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      } // remove class


      this.$el.classList.remove(this.className);
    }
    /**
     * set
     * @public
     */

  }, {
    key: "set",
    value: function set(progress) {
      // set elapsedTime
      this.options.progress = progress;

      this._updatePaths();
    }
    /**
     * get
     * @public
     */

  }, {
    key: "get",
    value: function get() {
      return this.options;
    }
    /**
     * resize
     * @public
     */

  }, {
    key: "resize",
    value: function resize() {
      this.options.offset = {
        left: this.$el.offsetLeft,
        top: this.$el.offsetTop
      };

      for (var i = 0; i < this.options.paths.length; i++) {
        this._updatePosition(this.options.paths[i]);
      }
    }
  }, {
    key: "_getOptions",
    value: function _getOptions(config) {
      var defaultConfig = {
        'strokeWidth': 2,
        'strokeDash': null,
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
        'ease': null,
        'overrideKey': null,
        'drawSequential': true,
        'speedMultiplier': 1,
        'reverse': false,
        'paused': false,
        'progress': 0,
        'longestDuration': 0,
        'playhead': 0
      };
      var options = Object.assign(defaultConfig, config); // TODO - remove overrideKey, user should organise svgData before init
      // Set up path information
      // if overrideKey has been defined - use overrideKey as key within the svgData object.
      // else - use the elements id as key within the svgData object.

      var target = options.overrideKey ? options.overrideKey : config.id;
      options.width = options.svgData[target].dimensions.width;
      options.height = options.svgData[target].dimensions.height;
      options.paths = options.svgData[target].strokepath;
      options.svg = this._getSVGElement('0 0 ' + options.width + ' ' + options.height);
      return options;
    }
  }, {
    key: "_setupPaths",
    value: function _setupPaths() {
      var startTime = this.options.reverse ? this.options.totalDuration : 0;

      for (var i = 0; i < this.options.paths.length; i++) {
        var path = this.options.paths[i];
        path.progress = 0;
        path.index = i;
        path.el = this._getPath(i);
        path.length = this._getPathLength(path.el);
        path.delay = path.delay || 0;
        path.duration = path.duration;
        path.positions = this._getPathPoints(path.el, path.length);
        path.ease = path.ease || null;
        path.el.style.strokeDasharray = this._getStrokeDashArray(path, path.length);
        path.el.style.strokeDashoffset = path.length;
        path.el.style.display = 'block';
        path.el.getBoundingClientRect();
        path.onStrokeStart = path.onStrokeStart || null;
        path.onStrokeComplete = path.onStrokeComplete || null;
        path.onStrokeStartDone = false;
        path.onStrokeCompleteDone = false;
        path.onStrokeUpdate = path.onStrokeUpdate || null;
        var startProgress = void 0;
        var durationProgress = path.duration / this.options.totalDuration;

        if (this.options.reverse) {
          startTime -= path.duration;
          startProgress = startTime / this.options.totalDuration;
        } else {
          if (this.options.drawSequential) {
            startTime = this.options.playhead + this.options.delay;
          } else {
            startTime = path.delay + this.options.delay;
          }

          startProgress = startTime / this.options.totalDuration;
        }

        path.startTime = startTime;
        path.startProgress = startProgress;
        path.durationProgress = durationProgress;
        this.options.playhead += path.duration + path.delay;
      }
    }
    /**
     * adjustStartTime
     * Responsible for managing time.
     * @private
     * @param  {number} timestamp identifies current time
     * @param  {object} data      contains options set on init() and paint()
     */

  }, {
    key: "adjustStartTime",
    value: function adjustStartTime(timestamp) {
      var _this3 = this;

      this.options.startTime = timestamp - this.options.elapsedTime;
      requestAnimationFrame(function (timestamp) {
        _this3._paint(timestamp);
      });
    }
    /**
     * _paint
     * Responsible for animating paths.
     * Path incrementation is performed using requestAnimationFrame.
     * @private
     * @param  {number} timestamp   identifies current time
     * @param  {object} data        contains options set on init() and paint()
     */

  }, {
    key: "_paint",
    value: function _paint(timestamp) {
      var _this4 = this;

      if (!this.options) {
        return;
      } // set startTime


      if (!this.options.startTime) {
        this.options.startTime = timestamp;
      }

      if (this.options.onUpdate !== null) {
        this.options.onUpdate();
      } // set elapsedTime


      this.options.elapsedTime = timestamp - this.options.startTime;
      this.options.progress = this._getProgress(this.options.totalDuration, this.options.startTime, this.options.elapsedTime, this.options.ease);

      this._updatePaths();

      if (this.options.progress < 1) {
        this.rAF = requestAnimationFrame(function (timestamp) {
          _this4._paint(timestamp);
        });
      } else {
        if (this.options.onComplete !== null) {
          this.options.onComplete();
        }
      }
    }
  }, {
    key: "_updatePaths",
    value: function _updatePaths() {
      for (var i = 0; i < this.options.paths.length; i++) {
        var path = this.options.paths[i];

        var elapsedProgress = this._getElapsedProgress(path);

        path.progress = this._getProgress(1, 0, elapsedProgress, path.ease);

        this._setLine(path);

        this._updatePosition(path);

        this._updateStrokeCallbacks(path);
      }
    }
  }, {
    key: "_getElapsedProgress",
    value: function _getElapsedProgress(path) {
      var elapsedProgress;

      if (this.options.progress > path.startProgress && this.options.progress < path.startProgress + path.durationProgress) {
        elapsedProgress = (this.options.progress - path.startProgress) / path.durationProgress;
      } else if (this.options.progress >= path.startProgress + path.durationProgress) {
        elapsedProgress = 1;
      } else if (this.options.progress <= path.startProgress) {
        elapsedProgress = 0;
      }

      return elapsedProgress;
    }
  }, {
    key: "_getProgress",
    value: function _getProgress(duration, start, elapsed, ease) {
      var progress;

      if (elapsed > 0 && elapsed < duration) {
        if (ease) {
          progress = this.easing[ease](elapsed, 0, 1, duration);
        } else {
          progress = elapsed / duration;
        }
      } else if (elapsed >= duration) {
        progress = 1;
      } else if (elapsed <= start) {
        progress = 0;
      }

      return progress;
    }
  }, {
    key: "_setLine",
    value: function _setLine(path) {
      var el = path.el;
      var length = path.progress * path.length;

      if (this.options.reverse || path.reverse) {
        el.style.strokeDashoffset = -path.length + length;
      } else {
        el.style.strokeDashoffset = path.length - length;
      }
    }
  }, {
    key: "_updateStrokeCallbacks",
    value: function _updateStrokeCallbacks(path) {
      if (path.progress === 1) {
        // fire onStrokeComplete callback
        if (this.options.onStrokeComplete && !path.onStrokeCompleteDone) {
          this.options.onStrokeComplete(path);

          if (!path.onStrokeComplete) {
            path.onStrokeCompleteDone = true;
          }
        } // fire onStrokeComplete callback of each line


        if (path.onStrokeComplete && !path.onStrokeCompleteDone) {
          path.onStrokeComplete(path);
          path.onStrokeCompleteDone = true;
        }
      } else if (path.progress > 0.00001) {
        // fire onStrokeStart callback
        if (this.options.onStrokeStart && !path.onStrokeStartDone) {
          this.options.onStrokeStart(path);

          if (!path.onStrokeStart) {
            path.onStrokeStartDone = true;
          }
        } // fire onStrokeStart callback of each line


        if (path.onStrokeStart && !path.onStrokeStartDone) {
          path.onStrokeStart(path);
          path.onStrokeStartDone = true;
        }

        if (path.onStrokeUpdate) {
          path.onStrokeUpdate(path);
        }
      }
    }
    /**
     * _updatePosition
     * Responsible for updating the paths x / y position.
     * @private
     */

  }, {
    key: "_updatePosition",
    value: function _updatePosition(path) {
      var index = Math.round(path.progress * (path.length - 1));
      var position = path.positions[index];
      path.position = {
        x: this.options.offset.left + position.x,
        y: this.options.offset.top + position.y
      };
    }
  }, {
    key: "_getTotalDuration",
    value: function _getTotalDuration(paths) {
      var totalDuration = 0;

      for (var i = 0; i < paths.length; i++) {
        var pathDelay = paths[i].delay || 0;
        totalDuration += paths[i].duration + pathDelay;
      }

      return totalDuration;
    }
  }, {
    key: "_getLongestDuration",
    value: function _getLongestDuration(paths) {
      var longestDuration = 0;

      for (var i = 0; i < paths.length; i++) {
        var pathDelay = paths[i].delay || 0;

        if (paths[i].duration + pathDelay > longestDuration) {
          longestDuration = paths[i].duration + pathDelay;
        }
      }

      return longestDuration;
    }
  }, {
    key: "_getPath",

    /**
     * _getPath
     * Responsible for creating a svg path element, and setting attributes on path.
     * @private
     * @param  {object} data contains options set on init
     * @param  {number} i    path index
     * @return {object} path svg path element
     */
    value: function _getPath(i) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this.options.svg.appendChild(path);

      this._setAttributes(path, this.options.paths[i]);

      return path;
    }
  }, {
    key: "_getPathLength",

    /**
     * _getPathLength
     * Responsible for returning a svg path length.
     * @return {number} path length
     */
    value: function _getPathLength(el) {
      return Math.ceil(el.getTotalLength());
    }
    /**
     * _getPathPoints
     * Responsible for returning a svg path coords.
     * @return {array} path coords
     */

  }, {
    key: "_getPathPoints",
    value: function _getPathPoints(el, length) {
      var arr = [];

      for (var i = 0; i < length; i++) {
        var position = el.getPointAtLength(i);
        arr.push({
          x: position.x,
          y: position.y
        });
      }

      ;
      return arr;
    }
    /**
     * _getAttributes
     * Returns an object of path attributes,
     * selects either global options set on init or specific path option
     * @private
     * @param  {object} data  contains options set on init()
     * @param  {object} value contains specific path options
     * @return {object}       obj of path attributes
     */

  }, {
    key: "_setAttributes",
    value: function _setAttributes(path, data) {
      path.setAttributeNS(null, 'd', data.path);
      path.setAttributeNS(null, 'stroke', !data.strokeColor ? this.options.strokeColor : data.strokeColor);
      path.setAttributeNS(null, 'fill', 'none');
      path.setAttributeNS(null, 'stroke-opacity', !data.strokeOpacity ? this.options.strokeOpacity : data.strokeOpacity);
      path.setAttributeNS(null, 'stroke-width', !data.strokeWidth ? this.options.strokeWidth : data.strokeWidth);
      path.setAttributeNS(null, 'stroke-linecap', !data.strokeCap ? this.options.strokeCap : data.strokeCap);
      path.setAttributeNS(null, 'stroke-linejoin', !data.strokeJoin ? this.options.strokeJoin : data.strokeJoin);
    }
    /**
     * _getSVGElement
     * Returns empty svg element with specified viewBox aspect ratio.
     * @private
     * @param  {string} viewBox
     * @return {obj}    jquery wrapped svg el
     */

  }, {
    key: "_getSVGElement",
    value: function _getSVGElement(viewBox) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttributeNS(null, 'viewBox', viewBox);
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      return svg;
    }
  }, {
    key: "_getStrokeDashArray",

    /**
     * _getStrokeDashArray
     * @private
     */
    value: function _getStrokeDashArray(path, length) {
      var strokeDash;

      if (path.strokeDash) {
        strokeDash = this._getStrokeDashString(path.strokeDash, length);
      } else if (this.options.strokeDash) {
        strokeDash = this._getStrokeDashString(this.options.strokeDash, length);
      } else {
        strokeDash = length + ' ' + length;
      }

      ;
      return strokeDash;
    }
    /**
     * _getStrokeDashString
     * @private
     */

  }, {
    key: "_getStrokeDashString",
    value: function _getStrokeDashString(dashArray, length) {
      var strokeDashString = '';
      var strokeDashArray = dashArray.split(',');
      var strokeDashTotal = 0;
      var strokeDashNum;
      var strokeDashRemainder;

      for (var i = strokeDashArray.length - 1; i >= 0; i--) {
        strokeDashTotal += Number(strokeDashArray[i]);
      }

      ;
      strokeDashNum = Math.floor(length / strokeDashTotal);
      strokeDashRemainder = length - strokeDashNum * strokeDashTotal;

      for (var _i = strokeDashNum - 1; _i >= 0; _i--) {
        strokeDashString += dashArray + ', ';
      }

      ;
      var preArray = strokeDashString + strokeDashRemainder + ', ' + length;
      return preArray.split(',').join('px,') + 'px';
    }
  }]);

  return LazyLinePainter;
}();

window.LazyLinePainter = LazyLinePainter;
exports.LazyLinePainter = LazyLinePainter;
var _default = LazyLinePainter;
exports.default = _default;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=lazylinepainter-1.8.0.js.map