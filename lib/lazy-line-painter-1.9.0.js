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
    this.el.classList.add('lazy-line-painter');
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
      longestDuration: 0,
      log: true,
      offset: this.el.getBoundingClientRect()
    }, config, {});
    Object.assign(this, _events.default, {});
    this.__raf = null;
    this.__paths = [];

    this._generatePaths();

    this._parseDataAttrs();

    this._updateDuration();

    this._setupPaths();
  }

  _createClass(LazyLinePainter, [{
    key: "_generatePaths",
    value: function _generatePaths() {
      var paths;
      var composed = Boolean(this.el.dataset.llpComposed);

      if (composed) {
        paths = this.el.querySelectorAll('[data-llp-id]');
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
      var paths = this.el.querySelectorAll('path, polygon, circle, ellipse, polyline, line, rect');
      var i;

      for (i = 0; i < paths.length; i++) {
        var id = this.el.id.replace(/ /g, '');
        id = id.replace('.', '');
        id = id.replace('-', '');
        paths[i].dataset.llpId = id + '-' + i;
        paths[i].dataset.llpDuration = 5000;
        paths[i].dataset.llpDelay = 0;
      }

      if (this.config.log) {
        console.log('This lazy line is uncomposed! Visit http://lazylinepainter.info to compose your masterpiece!');
      }

      return paths;
    }
    /**
     * init
     */
    // init() {
    //   return new Promise((resolve, reject) => {
    //     this._init();
    //     console.log('__initialised');
    //     resolve();
    //   });
    // }

    /**
     * paint
     * Responsible for drawing path.
     * @public
     */

  }, {
    key: "paint",
    value: function paint() {
      console.log('__paint');
      this.erase(); // begin animation

      this._paint(); // fire start callback


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
      var _this = this;

      if (this.config.paused) {
        requestAnimationFrame(function () {
          _this.adjustStartTime();
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

      for (var i = 0; i < this.__paths.length; i++) {
        var path = this.__paths[i];
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
      this.config = null; // empty container element

      this.el.remove();
      this.el = null;
    }
    /**
     * set
     * @public
     */

  }, {
    key: "set",
    value: function set(prop, value) {
      switch (prop) {
        case 'progress':
          this._setProgress(value);

          break;

        case 'delay':
          this._setDelay(value);

          break;

        default:
          if (this.config.log) {
            console.log('property ' + prop + ' can not be set');
          }

      }
    }
  }, {
    key: "_setProgress",
    value: function _setProgress(progress) {
      this.config.progress = progress;

      this._updatePaths();
    }
  }, {
    key: "_setDelay",
    value: function _setDelay(delay) {
      this.config.delay = delay;

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
            startTime = this.config.totalDuration;
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
      this.config.offset = this.el.getBoundingClientRect(); // this.config.scale = this.config.offset.width / this.config.width;

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
        path.ease = Number(path.el.dataset.llpEase) || null; // path.strokeDash = path.el.dataset.llpStrokeDash || null;

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
      for (var i = 0; i < this.__paths.length; i++) {
        var path = this.__paths[i];
        path.index = i;
        path.length = this._getPathLength(path.el);
        path.positions = this._getPathPoints(path.el, path.length);
        path.el.style.strokeDashoffset = path.length;
        path.el.style.strokeDasharray = path.length;
        path.onStrokeStartDone = false;
        path.onStrokeCompleteDone = false;
      }
    }
  }, {
    key: "adjustStartTime",

    /**
     * adjustStartTime
     * Responsible for managing time.
     * @private
     * @param  {number} timestamp identifies current time
     * @param  {object} data      contains options set on init() and paint()
     */
    value: function adjustStartTime() {
      var _this2 = this;

      var timestamp = performance.now();
      this.config.startTime = timestamp - this.config.elapsedTime;
      requestAnimationFrame(function () {
        _this2._paint();
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
    value: function _paint() {
      var _this3 = this;

      if (!this.config) {
        return;
      } // set startTime


      if (!this.config.startTime) {
        this.config.startTime = performance.now(); // new Date()
      }

      this.emit('update'); // set elapsedTime

      var timestamp = performance.now();
      this.config.elapsedTime = timestamp - this.config.startTime;
      var progress;
      /* if (this.config.reverse) {
        progress = (1 - (this.config.elapsedTime / this.config.totalDuration));
      } else {*/

      progress = this.config.elapsedTime / this.config.totalDuration; // }

      this.config.progress = this._getProgress(progress, this.config.ease);

      this._updatePaths();

      if (progress >= 0 && progress <= 1) {
        this.__raf = requestAnimationFrame(function () {
          _this3._paint();
        });
      } else {
        this.emit('complete');
      }
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
        progress = _easing.default[ease](linearProgress);
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
var _default = LazyLinePainter;
exports.default = _default;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=lazy-line-painter-1.9.0.js.map