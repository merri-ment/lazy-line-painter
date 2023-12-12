(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("lazy-line-painter", [], factory);
	else if(typeof exports === 'object')
		exports["lazy-line-painter"] = factory();
	else
		root["lazy-line-painter"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CALLBACK: () => (/* binding */ CALLBACK),
/* harmony export */   PROJECT_NAME: () => (/* binding */ PROJECT_NAME),
/* harmony export */   PROP: () => (/* binding */ PROP),
/* harmony export */   WARNING: () => (/* binding */ WARNING)
/* harmony export */ });
var PROJECT_NAME = "lazy-line-painter";
var PROP = {
  EASE: "ease",
  PROGRESS: "progress",
  DELAY: "delay",
  REVERSE: "reverse",
  REPEAT: "repeat"
};
var CALLBACK = {
  START: "start",
  PAUSE: "pause",
  RESUME: "resume",
  ERASE: "erase",
  UPDATE: "update",
  COMPLETE: "complete"
};
var WARNING = {
  DEPRECATED: {
    SET: function SET(prop) {
      return "".concat(PROJECT_NAME, " - .set() function deprecated, will be removed in future release. Please use .").concat(prop, "() instead");
    },
    SET_PROP: function SET_PROP(prop) {
      return "".concat(PROJECT_NAME, " - property ").concat(prop, " can not be set");
    }
  },
  UNCOMPOSED: "This lazy line is uncomposed! Visit https://lazylinepainter.com/#composer to compose your masterpiece!",
  PROGRESS_CLAMPED: function PROGRESS_CLAMPED(val, clamped) {
    return "".concat(PROJECT_NAME, " - progress value ").concat(val, " outside of range [0-1], clamped to ").concat(clamped);
  },
  PROGRESS: function PROGRESS(val) {
    return "".concat(PROJECT_NAME, " - progress value ").concat(val, " not type Number");
  },
  DELAY: function DELAY(val) {
    return "".concat(PROJECT_NAME, " - delay value ").concat(val, " not type Number");
  },
  REVERSE: function REVERSE(val) {
    return "".concat(PROJECT_NAME, " - reverse value ").concat(val, " not type Boolean");
  },
  EASE: function EASE(val) {
    return "".concat(PROJECT_NAME, " - ease value ").concat(val, " not type String");
  },
  REPEAT: function REPEAT(val) {
    return "".concat(PROJECT_NAME, " - repeat value ").concat(val, " not type Number");
  }
};

/***/ }),

/***/ "./src/easing.js":
/*!***********************!*\
  !*** ./src/easing.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Easing = {
  easeLinear: function easeLinear(n) {
    return n;
  },
  easeInQuad: function easeInQuad(n) {
    return n * n;
  },
  easeOutQuad: function easeOutQuad(n) {
    return n * (2 - n);
  },
  easeInOutQuad: function easeInOutQuad(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n;
    return -0.5 * (--n * (n - 2) - 1);
  },
  easeInCubic: function easeInCubic(n) {
    return n * n * n;
  },
  easeOutCubic: function easeOutCubic(n) {
    return --n * n * n + 1;
  },
  easeInOutCubic: function easeInOutCubic(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n;
    return 0.5 * ((n -= 2) * n * n + 2);
  },
  easeInQuart: function easeInQuart(n) {
    return n * n * n * n;
  },
  easeOutQuart: function easeOutQuart(n) {
    return 1 - --n * n * n * n;
  },
  easeInOutQuart: function easeInOutQuart(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n;
    return -0.5 * ((n -= 2) * n * n * n - 2);
  },
  easeInQuint: function easeInQuint(n) {
    return n * n * n * n * n;
  },
  easeOutQuint: function easeOutQuint(n) {
    return --n * n * n * n * n + 1;
  },
  easeInOutQuint: function easeInOutQuint(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n * n;
    return 0.5 * ((n -= 2) * n * n * n * n + 2);
  },
  easeInSine: function easeInSine(n) {
    return 1 - Math.cos(n * Math.PI / 2);
  },
  easeOutSine: function easeOutSine(n) {
    return Math.sin(n * Math.PI / 2);
  },
  easeInOutSine: function easeInOutSine(n) {
    return 0.5 * (1 - Math.cos(Math.PI * n));
  },
  easeInExpo: function easeInExpo(n) {
    return n === 0 ? 0 : Math.pow(1024, n - 1);
  },
  easeOutExpo: function easeOutExpo(n) {
    return n === 1 ? n : 1 - Math.pow(2, -10 * n);
  },
  easeInOutExpo: function easeInOutExpo(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if ((n *= 2) < 1) return 0.5 * Math.pow(1024, n - 1);
    return 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  },
  easeInCirc: function easeInCirc(n) {
    return 1 - Math.sqrt(1 - n * n);
  },
  easeOutCirc: function easeOutCirc(n) {
    return Math.sqrt(1 - --n * n);
  },
  easeInOutCirc: function easeInOutCirc(n) {
    n *= 2;
    if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
    return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
  },
  easeInBounce: function easeInBounce(n) {
    return 1 - this.easeOutBounce(1 - n);
  },
  easeOutBounce: function easeOutBounce(n) {
    if (n < 1 / 2.75) {
      return 7.5625 * n * n;
    } else if (n < 2 / 2.75) {
      return 7.5625 * (n -= 1.5 / 2.75) * n + 0.75;
    } else if (n < 2.5 / 2.75) {
      return 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375;
    }
    return 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },
  easeInOutBounce: function easeInOutBounce(n) {
    if (n < 0.5) return this.easeInBounce(n * 2) * 0.5;
    return this.easeOutBounce(n * 2 - 1) * 0.5 + 0.5;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Easing);

/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
  var _iterator = _createForOfIteratorHelper(this._eventEmitterCallbacks[name]),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var callback = _step.value;
      if (typeof callback !== "function") return;
      callback(evt);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
EventEmitter.trigger = EventEmitter.emit;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventEmitter);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isString: () => (/* binding */ isString)
/* harmony export */ });
var isNumber = function isNumber(val) {
  return typeof val === "number";
};
var isBoolean = function isBoolean(val) {
  return typeof val === "boolean";
};
var isString = function isString(val) {
  return typeof val === "string";
};
var clamp = function clamp(num) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return num < min ? min : num > max ? max : num;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/events.js");
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./easing */ "./src/easing.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./consts */ "./src/consts.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * Lazy Line Painter
 * SVG Stroke animation.
 *
 * https://github.com/merri-ment/lazy-line-painter
 * https://www.lazylinepainter.com
 * https://www.merriment.info
 *
 * Copyright 2013-2023 Merriment
 * All rights reserved.
 *
 * Licensed under the MIT license.
 *
 */





var LazyLinePainter = /*#__PURE__*/function () {
  /**
   * init
   * Responsible for caching user options,
   * @public
   * @param  {object} opts user defined options
   */

  function LazyLinePainter(el, config) {
    var _this = this;
    _classCallCheck(this, LazyLinePainter);
    /**
     * _paint
     * Responsible for animating paths.
     * Path incrementation is performed using requestAnimationFrame.
     * @private
     * @param  {number} timestamp   identifies current time
     * @param  {object} data        contains options set on init() and paint()
     */
    _defineProperty(this, "_paint", function () {
      if (!_this.config) {
        return;
      }

      // set startTime
      if (!_this.config.startTime) {
        _this.config.startTime = performance.now(); // new Date()
      }
      _this.emit(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.UPDATE);

      // set elapsedTime
      var timestamp = performance.now();
      _this.config.elapsedTime = timestamp - _this.config.startTime;
      _this.config.linearProgress = _this.config.elapsedTime / _this.config.totalDuration;
      _this.config.progress = _this._getProgress(_this.config.linearProgress, _this.config.ease);
      // console.log(this.config.elapsedTime, ' ', this.config.totalDuration);

      _this._updatePaths();
      if (_this.config.linearProgress >= 0 && _this.config.linearProgress <= 1) {
        _this.__raf = requestAnimationFrame(_this._paint);
      } else {
        if (_this.config.repeat > 0) {
          _this.config.repeat--;
          _this.paint();
        } else if (_this.config.repeat === -1) {
          _this.paint();
        } else {
          _this.emit(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.COMPLETE);
        }
      }
    });
    _defineProperty(this, "_onVisibilityChange", function () {
      if (document.hidden) {
        _this.pause();
      } else {
        _this.resume();
      }
    });
    this.el = el;
    this.el.classList.add(_consts__WEBPACK_IMPORTED_MODULE_3__.PROJECT_NAME);
    this.config = Object.assign({
      strokeWidth: null,
      strokeDash: null,
      strokeColor: null,
      strokeOverColor: null,
      strokeCap: null,
      strokeJoin: null,
      strokeOpacity: null,
      delay: 0,
      ease: null,
      drawSequential: false,
      speedMultiplier: 1,
      reverse: false,
      paused: false,
      progress: 0,
      repeat: 0,
      longestDuration: 0,
      log: true,
      offset: this.el.getBoundingClientRect()
    }, config, {});
    Object.assign(this, _events__WEBPACK_IMPORTED_MODULE_0__["default"], {});
    this.__raf = null;
    this.__paths = [];
    this._generatePaths();
    this._parseDataAttrs();
    this._updateDuration();
    this._setupPaths();
    document.addEventListener("visibilitychange", this._onVisibilityChange);
  }
  _createClass(LazyLinePainter, [{
    key: "_generatePaths",
    value: function _generatePaths() {
      var paths;
      var composed = Boolean(this.el.dataset.llpComposed);
      if (composed) {
        paths = this.el.querySelectorAll("[data-llp-id]");
      } else {
        paths = this._uncomposed();
      }
      for (var i = 0; i < paths.length; i++) {
        var path = {
          el: paths[i]
        };
        this.__paths.push(path);
      }
    }
  }, {
    key: "_uncomposed",
    value: function _uncomposed() {
      var paths = this.el.querySelectorAll("path, polygon, circle, ellipse, polyline, line, rect");
      var i;
      for (i = 0; i < paths.length; i++) {
        var id = this.el.id.replace(/ /g, "");
        id = id.replace(".", "");
        id = id.replace("-", "");
        paths[i].dataset.llpId = id + "-" + i;
        if (!paths[i].dataset.llpDuration) {
          paths[i].dataset.llpDuration = 1000;
        }
        if (!paths[i].dataset.llpDuration) {
          paths[i].dataset.llpDelay = 0;
        }
      }
      this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.UNCOMPOSED);
      return paths;
    }
  }, {
    key: "_warning",
    value: function _warning(message) {
      if (this.config.log) {
        console.warn(message);
      }
    }

    /**
     * paint
     * Responsible for drawing path.
     * @public
     */
  }, {
    key: "paint",
    value: function paint(config) {
      // update playback arguments
      Object.assign(this.config, config);
      this._updateDuration();
      this.erase();

      // begin animation
      this._paint();

      // fire start callback
      this.emit(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.START);
    }

    /**
     * pause
     * Responsible for pausing path animation.
     * @public
     */
  }, {
    key: "pause",
    value: function pause() {
      if (this.config) {
        this.config.paused = true;
      }
      cancelAnimationFrame(this.__raf);
      this.emit(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.PAUSE);
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
      if (this.config && this.config.paused) {
        requestAnimationFrame(function () {
          _this2.adjustStartTime();
        });
        this.config.paused = false;
        this.emit(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.RESUME);
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
      cancelAnimationFrame(this.__raf);

      // reset callback
      this.config.onStrokeCompleteDone = false;

      // reset paused
      this.config.paused = false;

      // empty contents of svg
      for (var i = 0; i < this.__paths.length; i++) {
        var path = this.__paths[i];
        path.el.style.strokeDashoffset = path.length;
        path.onStrokeCompleteDone = false;
        path.onStrokeStartDone = false;
      }
      this.emit(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.ERASE);
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
      this.config = null;

      // empty container element
      this.el.remove();
      this.el = null;
    }
  }, {
    key: "set",
    value: function set(prop, value) {
      this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.DEPRECATED.SET(prop));
      switch (prop) {
        case _consts__WEBPACK_IMPORTED_MODULE_3__.PROP.PROGRESS:
          this.progress(value);
          break;
        case _consts__WEBPACK_IMPORTED_MODULE_3__.PROP.DELAY:
          this.delay(value);
          break;
        case _consts__WEBPACK_IMPORTED_MODULE_3__.PROP.REVERSE:
          this.reverse(value);
          break;
        case _consts__WEBPACK_IMPORTED_MODULE_3__.PROP.EASE:
          this.ease(value);
          break;
        case _consts__WEBPACK_IMPORTED_MODULE_3__.PROP.REPEAT:
          this.repeat(value);
          break;
        default:
          this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.DEPRECATED.SET_PROP);
      }
    }

    /**
     * delay
     * Responsible for setting playback progress.
     * @public
     */
  }, {
    key: "progress",
    value: function progress(val) {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(val)) {
        if (val < 0 || val > 1) {
          var clamped = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.clamp)(val, 0, 1);
          this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.PROGRESS_CLAMPED(val, clamped));
          this._setProgress(clamped);
        } else {
          this._setProgress(val);
        }
      } else {
        this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.PROGRESS(val));
      }
      return this.config.progress;
    }

    /**
     * delay
     * Responsible for playback delay.
     * @public
     */
  }, {
    key: "delay",
    value: function delay(val) {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(val)) {
        this._setDelay(val);
      } else {
        this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.DELAY(val));
      }
    }

    /**
     * reverse
     * Responsible for reversing animation.
     * @public
     */
  }, {
    key: "reverse",
    value: function reverse(val) {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isBoolean)(val)) {
        this._setReverse(val);
      } else {
        this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.REVERSE(val));
      }
    }

    /**
     * ease
     * Responsible for setting animation ease.
     * @public
     */
  }, {
    key: "ease",
    value: function ease(val) {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isString)(val)) {
        this._setEase(val);
      } else {
        this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.EASE(val));
      }
    }

    /**
     * repeat
     * Responsible for repeating animation.
     * @public
     */
  }, {
    key: "repeat",
    value: function repeat(val) {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNumber)(val)) {
        this._setRepeat(val);
      } else {
        this._warning(_consts__WEBPACK_IMPORTED_MODULE_3__.WARNING.REPEAT(val));
      }
    }
  }, {
    key: "_setRepeat",
    value: function _setRepeat(repeat) {
      this.config.repeat = repeat;
    }
  }, {
    key: "_setEase",
    value: function _setEase(ease) {
      this.config.ease = ease;
    }
  }, {
    key: "_setProgress",
    value: function _setProgress(progress) {
      this.pause();
      this.config.progress = this._getProgress(progress, this.config.ease);
      this._updatePaths();
      this.config.elapsedTime = this.config.progress * this.config.totalDuration;
    }
  }, {
    key: "_setDelay",
    value: function _setDelay(delay) {
      this.config.delay = delay;
      this._updateDuration();
    }
  }, {
    key: "_setReverse",
    value: function _setReverse(reverse) {
      this.config.reverse = reverse;
      this._updateDuration();
    }
  }, {
    key: "_updateDuration",
    value: function _updateDuration() {
      var totalDuration = this._getTotalDuration();
      var longestDuration = this._getLongestDuration();
      this.config.totalDuration = this.config.drawSequential ? totalDuration : longestDuration;
      this.config.totalDuration += this.config.delay;
      this._calcPathDurations();
    }
  }, {
    key: "_calcPathDurations",
    value: function _calcPathDurations() {
      for (var i = 0; i < this.__paths.length; i++) {
        var path = this.__paths[i];
        var startTime = void 0;
        path.progress = 0;
        if (this.config.reverse) {
          if (this.config.drawSequential) {
            startTime = 0;
          } else {
            startTime = this.config.totalDuration - (path.delay + path.duration);
          }
        } else {
          if (this.config.drawSequential) {
            startTime = 0;
          } else {
            startTime = this.config.delay + path.delay;
          }
        }
        path.startTime = startTime;
        path.startProgress = path.startTime / this.config.totalDuration;
        path.durationProgress = path.duration / this.config.totalDuration;
      }
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
      this.config.offset = this.el.getBoundingClientRect();
      // this.config.scale = this.config.offset.width / this.config.width;

      for (var i = 0; i < this.__paths.length; i++) {
        var path = this.__paths[i];
        path.el.getBoundingClientRect();
        path.positions = this._getPathPoints(path.el, path.length);
        this._updatePosition(path);
      }
    }
  }, {
    key: "_parseDataAttrs",
    value: function _parseDataAttrs() {
      for (var i = 0; i < this.__paths.length; i++) {
        var path = this.__paths[i];
        path.id = path.el.dataset.llpId;
        path.delay = Number(path.el.dataset.llpDelay) || 0;
        path.duration = Number(path.el.dataset.llpDuration) || 0;
        path.reverse = Boolean(path.el.dataset.llpReverse) || false;
        path.ease = Number(path.el.dataset.llpEase) || null;
        path.strokeDash = path.el.dataset.llpStrokeDash || null;
        path.delay *= this.config.speedMultiplier;
        path.duration *= this.config.speedMultiplier;
        this._setStyleAttrs(path);
      }
    }
  }, {
    key: "_setStyleAttrs",
    value: function _setStyleAttrs(path) {
      path.strokeColor = path.el.dataset.llpStrokeColor || this.config.strokeColor;
      if (path.strokeColor) {
        path.el.style.stroke = path.strokeColor;
      }
      path.strokeOpacity = path.el.dataset.llpStrokeOpacity || this.config.strokeOpacity;
      if (path.strokeOpacity) {
        path.el.style.strokeOpacity = path.strokeOpacity;
      }
      path.strokeWidth = path.el.dataset.llpStrokeWidth || this.config.strokeWidth;
      if (path.strokeWidth) {
        path.el.style.strokeWidth = path.strokeWidth;
      }
      path.strokeCap = path.el.dataset.llpStrokeCap || this.config.strokeCap;
      if (path.strokeCap) {
        path.el.style.strokeLinecap = path.strokeCap;
      }
      path.strokeJoin = path.el.dataset.llpStrokeJoin || this.config.strokeJoin;
      if (path.strokeJoin) {
        path.el.style.strokeLinejoin = path.strokeJoin;
      }
    }
  }, {
    key: "_setupPaths",
    value: function _setupPaths() {
      for (var i = 0; i < this.__paths.length; i++) {
        var path = this.__paths[i];
        path.index = i;
        path.length = this._getPathLength(path.el);
        path.positions = this._getPathPoints(path.el, path.length);
        path.el.style.strokeDasharray = this._getStrokeDashArray(path, path.length);
        path.el.style.strokeDashoffset = path.length;
        path.onStrokeStartDone = false;
        path.onStrokeCompleteDone = false;
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
    value: function adjustStartTime() {
      var _this3 = this;
      var timestamp = performance.now();
      this.config.startTime = timestamp - this.config.elapsedTime;
      requestAnimationFrame(function () {
        _this3._paint();
      });
    }
  }, {
    key: "_updatePaths",
    value: function _updatePaths() {
      for (var i = 0; i < this.__paths.length; i++) {
        var path = this.__paths[i];
        var pathProgress = this._getElapsedProgress(path);
        path.progress = this._getProgress(pathProgress, path.ease);
        this._setLine(path);
        this._updatePosition(path);
        this._updateStrokeCallbacks(path);
      }
    }
  }, {
    key: "_getElapsedProgress",
    value: function _getElapsedProgress(path) {
      var elapsedProgress;
      if (this.config.progress >= path.startProgress && this.config.progress <= path.startProgress + path.durationProgress) {
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
    value: function _getProgress(linearProgress, ease) {
      var progress = linearProgress;
      if (ease) {
        progress = _easing__WEBPACK_IMPORTED_MODULE_1__["default"][ease](linearProgress);
      }
      return progress;
    }
  }, {
    key: "_setLine",
    value: function _setLine(path) {
      var el = path.el;
      var length = path.progress * path.length;
      if (path.reverse) {
        el.style.strokeDashoffset = -path.length + length;
      } else if (this.config.reverse) {
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
          this.emit("".concat(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.COMPLETE, ":").concat(path.id), path);
          this.emit("".concat(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.COMPLETE, ":all"), path);
        }
      } else if (path.progress > 0.00001) {
        if (!path.onStrokeStartDone) {
          this.emit("".concat(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.START, ":").concat(path.id), path);
          this.emit("".concat(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.START, ":all"), path);
          path.onStrokeStartDone = true;
        }
        this.emit("".concat(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.UPDATE, ":").concat(path.id), path);
        this.emit("".concat(_consts__WEBPACK_IMPORTED_MODULE_3__.CALLBACK.UPDATE, ":all"), path);
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
      if (position) {
        path.position = {
          x: this.config.offset.left + position.x,
          y: this.config.offset.top + position.y
        };
      }
    }
  }, {
    key: "_getTotalDuration",
    value: function _getTotalDuration() {
      var totalDuration = 0;
      var paths = this.__paths;
      for (var i = 0; i < paths.length; i++) {
        var pathDelay = paths[i].delay || 0;
        totalDuration += paths[i].duration + pathDelay;
      }
      return totalDuration;
    }
  }, {
    key: "_getLongestDuration",
    value: function _getLongestDuration() {
      var longestDuration = 0;
      var paths = this.__paths;
      for (var i = 0; i < paths.length; i++) {
        var pathTotalDuration = paths[i].delay + paths[i].duration;
        if (pathTotalDuration > longestDuration) {
          longestDuration = pathTotalDuration;
        }
      }
      return longestDuration;
    }

    /**
     * _getPathLength
     * Responsible for returning a svg path length.
     * @return {number} path length
     */
  }, {
    key: "_getPathLength",
    value: function _getPathLength(el) {
      return this._getTotalLength(el); // el.getTotalLength());
    }
  }, {
    key: "_getDistance",
    value: function _getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
  }, {
    key: "_getCircleLength",
    value: function _getCircleLength(el) {
      return Math.PI * 2 * el.getAttribute("r");
    }
  }, {
    key: "_getEllipseLength",
    value: function _getEllipseLength(el) {
      var rx = parseInt(el.getAttribute("rx"), 1);
      var ry = parseInt(el.getAttribute("ry"), 1);
      var h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);
      var totalLength = Math.PI * (rx + ry) * (1 + 3 * h / Math.sqrt(4 - 3 * h));
      return totalLength;
    }
  }, {
    key: "_getRectLength",
    value: function _getRectLength(el) {
      return el.getAttribute("width") * 2 + el.getAttribute("height") * 2;
    }
  }, {
    key: "_getLineLength",
    value: function _getLineLength(el) {
      return this._getDistance({
        x: el.getAttribute("x1"),
        y: el.getAttribute("y1")
      }, {
        x: el.getAttribute("x2"),
        y: el.getAttribute("y2")
      });
    }
  }, {
    key: "_getPolylineLength",
    value: function _getPolylineLength(el) {
      var points = el.points;
      var totalLength = 0;
      var previousPos;
      for (var i = 0; i < points.numberOfItems; i++) {
        var currentPos = points.getItem(i);
        if (i > 0) {
          totalLength += this._getDistance(previousPos, currentPos);
        }
        previousPos = currentPos;
      }
      return totalLength;
    }
  }, {
    key: "_getPolygonLength",
    value: function _getPolygonLength(el) {
      var points = el.points;
      return this._getPolylineLength(el) + this._getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
    }
  }, {
    key: "_getTotalLength",
    value: function _getTotalLength(el) {
      var length;
      var tagName = el.tagName.toLowerCase();
      switch (tagName) {
        case "circle":
          length = this._getCircleLength(el);
          break;
        case "rect":
          length = this._getRectLength(el);
          break;
        case "line":
          length = this._getLineLength(el);
          break;
        case "polyline":
          length = this._getPolylineLength(el);
          break;
        case "polygon":
          length = this._getPolygonLength(el);
          break;
        default:
          length = el.getTotalLength();
      }
      return length;
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
      return arr;
    }

    /**
     * _getStrokeDashArray
     * @private
     */
  }, {
    key: "_getStrokeDashArray",
    value: function _getStrokeDashArray(path, length) {
      var strokeDash;
      if (path.strokeDash) {
        strokeDash = this._getStrokeDashString(path.strokeDash, length);
      } else if (this.config.strokeDash) {
        strokeDash = this._getStrokeDashString(this.config.strokeDash, length);
      } else {
        strokeDash = length + " " + length;
      }
      return strokeDash;
    }

    /**
     * _getStrokeDashString
     * @private
     */
  }, {
    key: "_getStrokeDashString",
    value: function _getStrokeDashString(dashArray, length) {
      var strokeDashString = "";
      var strokeDashArray = dashArray.split(",");
      var strokeDashTotal = 0;
      var strokeDashNum;
      var strokeDashRemainder;
      for (var i = strokeDashArray.length - 1; i >= 0; i--) {
        strokeDashTotal += Number(strokeDashArray[i]);
      }
      strokeDashNum = Math.floor(length / strokeDashTotal);
      strokeDashRemainder = length - strokeDashNum * strokeDashTotal;
      for (var _i = 0; _i < strokeDashNum; _i++) {
        strokeDashString += dashArray + ", ";
      }
      var preArray = strokeDashString + strokeDashRemainder + ", " + (length + 2);
      return preArray.split(",").join("px,") + "px";
    }
  }]);
  return LazyLinePainter;
}();
var win = window || {};
win.LazyLinePainter = LazyLinePainter;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LazyLinePainter);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=lazy-line-painter-2.0.3.js.map