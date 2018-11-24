(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("lazy-line-painter", [], factory);
	else if(typeof exports === 'object')
		exports["lazy-line-painter"] = factory();
	else
		root["lazy-line-painter"] = factory();
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

/***/ "./src/easing.js":
/*!***********************!*\
  !*** ./src/easing.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
var Easing = {
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
    return c - this.easeOutBounce(d - t, 0, c, d) + b;
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
    if (t < d / 2) return this.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
    return this.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
  }
};
var _default = Easing;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var EventEmitter = {};

EventEmitter.on = function (name, callback) {
  this._eventEmitterCallbacks = this._eventEmitterCallbacks || {};
  this._eventEmitterCallbacks[name] = this._eventEmitterCallbacks[name] || [];

  this._eventEmitterCallbacks[name].push(callback);
};

EventEmitter.addListener = EventEmitter.on;

EventEmitter.off = function (name, callback) {
  this._eventEmitterCallbacks = this._eventEmitterCallbacks || {};
  if (!(name in this._eventEmitterCallbacks)) return;

  var i = this._eventEmitterCallbacks[name].indexOf(callback);

  if (i < 0) return;

  this._eventEmitterCallbacks[name].splice(i, 1);
};

EventEmitter.removeListener = EventEmitter.off;

EventEmitter.emit = function (name, evt) {
  this._eventEmitterCallbacks = this._eventEmitterCallbacks || {};
  if (!(name in this._eventEmitterCallbacks)) return;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = this._eventEmitterCallbacks[name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var callback = _step.value;
      if (typeof callback !== 'function') return;
      callback(evt);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

EventEmitter.trigger = EventEmitter.emit;
var _default = EventEmitter;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

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

var _events = _interopRequireDefault(__webpack_require__(/*! ./events */ "./src/events.js"));

var _easing = _interopRequireDefault(__webpack_require__(/*! ./easing */ "./src/easing.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LazyLinePainter =
/*#__PURE__*/
function () {
  /**
   * init
   * Responsible for caching user options,
   * @public
   * @param  {object} opts user defined options
   */
  function LazyLinePainter(el, config) {
    _classCallCheck(this, LazyLinePainter);

    this.el = el;
    this.config = Object.assign({
      'paths': [],
      'strokeWidth': null,
      'strokeDash': null,
      'strokeColor': null,
      'strokeOverColor': null,
      'strokeCap': null,
      'strokeJoin': null,
      'strokeOpacity': null,
      'delay': 0,
      'ease': null,
      'drawSequential': false,
      'speedMultiplier': 1,
      'reverse': false,
      'paused': false,
      'progress': 0,
      'longestDuration': 0,
      'playhead': 0
    }, config, {});
    Object.assign(this, _events.default, {});
    this.__raf = null;
    var paths;
    var composed = Boolean(this.el.dataset.composed);

    if (composed) {
      paths = this.el.querySelectorAll('[data-llp-id]');
    } else {
      paths = this.el.querySelectorAll('path, polygon, circle, ellipse, polyline, line, rect');

      for (i = 0; i < paths.length; i++) {
        var id = this.el.id.replace(/ /g, '');
        id = id.replace('.', '');
        id = id.replace('-', '');
        paths[i].dataset.llpId = id + '-' + i;
        paths[i].dataset.llpDuration = 5000;
        paths[i].dataset.llpDelay = 0;
      }
    }

    var i;

    for (i = 0; i < paths.length; i++) {
      this.config.paths.push({
        el: paths[i]
      });
    }

    console.log(this.config);
    this.className = 'lazy-line-painter';
    this.el.classList.add(this.className);

    this._parseDataAttrs();

    var totalDuration = this.config.delay + this._getTotalDuration(this.config.paths);

    var longestDuration = this.config.delay + this._getLongestDuration(this.config.paths);

    this.config.totalDuration = this.config.drawSequential ? totalDuration : longestDuration;
    this.config.totalDuration *= this.config.speedMultiplier;

    this._setupPaths();

    this.resize();
  }

  _createClass(LazyLinePainter, [{
    key: "getId",
    value: function getId(_name) {
      return name;
    }
    /**
     * paint
     * Responsible for drawing path.
     * @public
     */

  }, {
    key: "paint",
    value: function paint() {
      var _this = this;

      this.erase(); // begin animation

      this.__raf = requestAnimationFrame(function (timestamp) {
        _this._paint(timestamp);
      }); // fire onStart callback
      // if (this.config.onStart !== null) {
      //   this.config.onStart();
      // }

      this.emit('start');
    }
    /**
     * pause
     * Responsible for pausing path animation.
     * @public
     */

  }, {
    key: "pause",
    value: function pause() {
      if (!this.config.paused) {
        this.config.paused = true;
        cancelAnimationFrame(this.__raf);
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

      if (this.config.paused) {
        requestAnimationFrame(function (timestamp) {
          _this2.adjustStartTime(timestamp);
        });
        this.config.paused = false;
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
      this.config.startTime = null;
      this.config.elapsedTime = null;
      cancelAnimationFrame(this.__raf); // reset callback

      this.config.onStrokeCompleteDone = false; // reset paused

      this.config.paused = false; // empty contents of svg

      for (var _i = 0; _i < this.config.paths.length; _i++) {
        var path = this.config.paths[_i];
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
      this.config = null; // remove class

      this.el.classList.remove(this.className); // empty container element

      this.el.remove();
      this.el = null;
    }
    /**
     * set
     * @public
     */

  }, {
    key: "set",
    value: function set(progress) {
      // set elapsedTime
      this.config.progress = progress;

      this._updatePaths();
    }
    /**
     * get
     * @public
     */

  }, {
    key: "get",
    value: function get() {
      return this.config;
    }
    /**
     * resize
     * @public
     */

  }, {
    key: "resize",
    value: function resize() {
      this.config.offset = this.el.getBoundingClientRect(); // this.config.scale = this.config.offset.width / this.config.width;

      for (var _i2 = 0; _i2 < this.config.paths.length; _i2++) {
        var path = this.config.paths[_i2];
        path.el.getBoundingClientRect();
        path.positions = this._getPathPoints(path.el, path.length);

        this._updatePosition(path);
      }
    }
  }, {
    key: "_parseDataAttrs",
    value: function _parseDataAttrs() {
      for (var _i3 = 0; _i3 < this.config.paths.length; _i3++) {
        var path = this.config.paths[_i3];
        path.id = path.el.dataset.llpId;
        path.delay = Number(path.el.dataset.llpDelay) || 0;
        path.duration = Number(path.el.dataset.llpDuration) || 0;
        path.reverse = Number(path.el.dataset.llpReverse) || false;
        path.ease = Number(path.el.dataset.llpEase) || null;
        path.strokeDash = path.el.dataset.llpStrokeDash || null;

        this._setStyleAttrs(path);
      }
    }
  }, {
    key: "_setStyleAttrs",
    value: function _setStyleAttrs(path) {
      path.strokeColor = path.el.dataset.llpStrokeColor || this.config.strokeColor;

      if (path.strokeColor) {
        path.el.setAttributeNS(null, 'stroke', path.strokeColor);
      }

      path.strokeOpacity = path.el.dataset.llpStrokeOpacity || this.config.strokeOpacity;

      if (path.strokeOpacity) {
        path.el.setAttributeNS(null, 'stroke-opacity', path.strokeOpacity);
      }

      path.strokeWidth = path.el.dataset.llpStrokeWidth || this.config.strokeWidth;

      if (path.strokeWidth) {
        path.el.setAttributeNS(null, 'stroke-width', path.strokeWidth);
      }

      path.strokeCap = path.el.dataset.llpStrokeCap || this.config.strokeCap;

      if (path.strokeCap) {
        path.el.setAttributeNS(null, 'stroke-linecap', path.strokeCap);
      }

      path.strokeJoin = path.el.dataset.llpStrokeJoin || this.config.strokeJoin;

      if (path.strokeJoin) {
        path.el.setAttributeNS(null, 'stroke-linejoin', path.strokeJoin);
      }
    }
  }, {
    key: "_setupPaths",
    value: function _setupPaths() {
      var startTime = this.config.reverse ? this.config.totalDuration : 0;

      for (var _i4 = 0; _i4 < this.config.paths.length; _i4++) {
        var path = this.config.paths[_i4];
        path.progress = 0;
        path.index = _i4;
        path.length = this._getPathLength(path.el);
        path.positions = this._getPathPoints(path.el, path.length);
        path.el.style.strokeDasharray = this._getStrokeDashArray(path, path.length);
        path.el.style.strokeDashoffset = path.length;
        path.el.getBoundingClientRect();
        path.onStrokeStartDone = false;
        path.onStrokeCompleteDone = false;
        var startProgress = void 0;
        var durationProgress = path.duration / this.config.totalDuration;

        if (this.config.reverse) {
          startTime -= path.duration;
          startProgress = startTime / this.config.totalDuration;
        } else {
          if (this.config.drawSequential) {
            startTime = this.config.playhead + this.config.delay;
          } else {
            startTime = path.delay + this.config.delay;
          }

          startProgress = startTime / this.config.totalDuration;
        }

        path.startTime = startTime;
        path.startProgress = startProgress;
        path.durationProgress = durationProgress;
        this.config.playhead += path.duration + path.delay;
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

      this.config.startTime = timestamp - this.config.elapsedTime;
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

      if (!this.config) {
        return;
      } // set startTime


      if (!this.config.startTime) {
        this.config.startTime = timestamp;
      }

      this.emit('update'); // set elapsedTime

      this.config.elapsedTime = timestamp - this.config.startTime;
      this.config.progress = this._getProgress(this.config.totalDuration, this.config.startTime, this.config.elapsedTime, this.config.ease);

      this._updatePaths();

      if (this.config.progress < 1) {
        this.__raf = requestAnimationFrame(function (timestamp) {
          _this4._paint(timestamp);
        });
      } else {
        this.emit('complete');
      }
    }
  }, {
    key: "_updatePaths",
    value: function _updatePaths() {
      for (var _i5 = 0; _i5 < this.config.paths.length; _i5++) {
        var path = this.config.paths[_i5];

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

      if (this.config.progress > path.startProgress && this.config.progress < path.startProgress + path.durationProgress) {
        elapsedProgress = (this.config.progress - path.startProgress) / path.durationProgress;
      } else if (this.config.progress >= path.startProgress + path.durationProgress) {
        elapsedProgress = 1;
      } else if (this.config.progress <= path.startProgress) {
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
          progress = _easing.default[ease](elapsed, 0, 1, duration);
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

      if (this.config.reverse || path.reverse) {
        el.style.strokeDashoffset = -path.length + length;
      } else {
        el.style.strokeDashoffset = path.length - length;
      }
    }
  }, {
    key: "_updateStrokeCallbacks",
    value: function _updateStrokeCallbacks(path) {
      if (path.progress === 1) {
        if (!path.onStrokeCompleteDone) {
          path.onStrokeCompleteDone = true;
          this.emit('complete:' + path.id, path);
          this.emit('complete:all', path);
        }
      } else if (path.progress > 0.00001) {
        if (!path.onStrokeStartDone) {
          this.emit('start:' + path.id, path);
          this.emit('start:all', path);
          path.onStrokeStartDone = true;
        }

        this.emit('update:' + path.id, path);
        this.emit('update:all', path);
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
        x: this.config.offset.left + position.x,
        y: this.config.offset.top + position.y
      };
    }
  }, {
    key: "_getTotalDuration",
    value: function _getTotalDuration(paths) {
      var totalDuration = 0;

      for (var _i6 = 0; _i6 < paths.length; _i6++) {
        var pathDelay = paths[_i6].delay || 0;
        totalDuration += paths[_i6].duration + pathDelay;
      }

      return totalDuration;
    }
  }, {
    key: "_getLongestDuration",
    value: function _getLongestDuration(paths) {
      var longestDuration = 0;

      for (var _i7 = 0; _i7 < paths.length; _i7++) {
        var pathDelay = paths[_i7].delay || 0;

        if (paths[_i7].duration + pathDelay > longestDuration) {
          longestDuration = paths[_i7].duration + pathDelay;
        }
      }

      return longestDuration;
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

      for (var _i8 = 0; _i8 < length; _i8++) {
        var position = el.getPointAtLength(_i8);
        arr.push({
          x: position.x,
          y: position.y
        });
      }

      ;
      return arr;
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
      } else if (this.config.strokeDash) {
        strokeDash = this._getStrokeDashString(this.config.strokeDash, length);
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

      for (var _i9 = strokeDashArray.length - 1; _i9 >= 0; _i9--) {
        strokeDashTotal += Number(strokeDashArray[_i9]);
      }

      ;
      strokeDashNum = Math.floor(length / strokeDashTotal);
      strokeDashRemainder = length - strokeDashNum * strokeDashTotal;

      for (var _i10 = strokeDashNum - 1; _i10 >= 0; _i10--) {
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
var _default = LazyLinePainter;
exports.default = _default;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=lazy-line-painter-1.9.0.js.map