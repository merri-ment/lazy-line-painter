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

import Events from './events';
import Easing from './easing';

class LazyLinePainter {

  /**
   * init
   * Responsible for caching user options,
   * creating svg element and setting dimensions.
   * @public
   * @param  {object} opts user defined options
   */

  constructor(config) {

    Object.assign(this, Events, {});

    this.rAF = null;

    this.options = this._getOptions(config);
    this.el = config.el;

    let totalDuration = this.options.delay + this._getTotalDuration(this.options.paths);
    let longestDuration = this.options.delay + this._getLongestDuration(this.options.paths);

    this.options.totalDuration = this.options.drawSequential ? totalDuration : longestDuration;
    this._setupPaths();
    this.options.totalDuration *= this.options.speedMultiplier;

    this.resize();
  }

  /**
   * paint
   * Responsible for drawing path.
   * @public
   */
  paint() {

    this.erase();

    // begin animation
    this.rAF = requestAnimationFrame((timestamp) => {
      this._paint(timestamp);
    });

    // fire onStart callback
    // if (this.options.onStart !== null) {
    //   this.options.onStart();
    // }
    this.emit('start');
  }

  /**
   * pause
   * Responsible for pausing path animation.
   * @public
   */
  pause() {
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
  resume() {
    if (this.options.paused) {
      requestAnimationFrame((timestamp) => {
        this.adjustStartTime(timestamp);
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
  erase() {

    // reset / cancel rAF
    this.options.startTime = null;
    this.options.elapsedTime = null;
    cancelAnimationFrame(this.rAF);

    // reset callback
    this.options.onStrokeCompleteDone = false;

    // reset paused
    this.options.paused = false;

    // empty contents of svg
    for (let i = 0; i < this.options.paths.length; i++) {
      let path = this.options.paths[i];

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
  destroy() {

    // retrieve / remove data object
    this.options = null;

    // // empty container element
    // while (this.el.firstChild) {
    //   this.el.removeChild(this.el.firstChild);
    // }

    // // remove class
    // this.el.classList.remove(this.className);
  }

  /**
   * set
   * @public
   */
  set(progress) {
    // set elapsedTime
    this.options.progress = progress;
    this._updatePaths();
  }

  /**
   * get
   * @public
   */
  get() {
    return this.options;
  }

  /**
   * resize
   * @public
   */
  resize() {

    this.options.offset = this.el.getBoundingClientRect();
    this.options.scale = this.options.offset.width / this.options.width;

    for (let i = 0; i < this.options.paths.length; i++) {
      let path = this.options.paths[i];

      path.el.getBoundingClientRect();
      path.positions = this._getPathPoints(path.el, path.length);
      this._updatePosition(path);
    }
  }

  _getOptions(config) {

    let defaultConfig = {

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

    let options = Object.assign(defaultConfig, config);

    options.width = options.svgData.dimensions.width;
    options.height = options.svgData.dimensions.height;
    options.paths = options.svgData.strokepath;

    return options;
  }

  _setupPaths() {

    let startTime = this.options.reverse ? this.options.totalDuration : 0;

    for (let i = 0; i < this.options.paths.length; i++) {

      let path = this.options.paths[i];

      path.progress = 0;
      path.index = i;
      path.el = this._getPath(path);
      path.length = this._getPathLength(path.el);
      path.delay = path.delay || 0;
      path.duration = path.duration;
      path.positions = this._getPathPoints(path.el, path.length);
      path.ease = path.ease || null;

      path.el.style.strokeDasharray = this._getStrokeDashArray(path, path.length);
      path.el.style.strokeDashoffset = path.length;
      path.el.style.display = 'block';
      path.el.getBoundingClientRect();

      // path.onStrokeStart = path.onStrokeStart || null;
      // path.onStrokeComplete = path.onStrokeComplete || null;
      // path.onStrokeStartDone = false;
      // path.onStrokeCompleteDone = false;
      // path.onStrokeUpdate = path.onStrokeUpdate || null;

      let startProgress;
      let durationProgress = path.duration / this.options.totalDuration;

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
      this.options.playhead += (path.duration + path.delay);
    }
  }

  /**
   * adjustStartTime
   * Responsible for managing time.
   * @private
   * @param  {number} timestamp identifies current time
   * @param  {object} data      contains options set on init() and paint()
   */
  adjustStartTime(timestamp) {
    this.options.startTime = timestamp - this.options.elapsedTime;
    requestAnimationFrame((timestamp) => {
      this._paint(timestamp);
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
  _paint(timestamp) {

    if (!this.options) {
      return;
    }

    // set startTime
    if (!this.options.startTime) {
      this.options.startTime = timestamp;
    }

    this.emit('update');

    // set elapsedTime
    this.options.elapsedTime = (timestamp - this.options.startTime);
    this.options.progress = this._getProgress(
      this.options.totalDuration,
      this.options.startTime,
      this.options.elapsedTime,
      this.options.ease
    );

    this._updatePaths();

    if (this.options.progress < 1) {
      this.rAF = requestAnimationFrame((timestamp) => {
        this._paint(timestamp);
      });
    } else {
      this.emit('complete');
    }
  }

  _updatePaths() {
    for (let i = 0; i < this.options.paths.length; i++) {
      let path = this.options.paths[i];
      let elapsedProgress = this._getElapsedProgress(path);

      path.progress = this._getProgress(1, 0, elapsedProgress, path.ease);
      this._setLine(path);
      this._updatePosition(path);
      this._updateStrokeCallbacks(path);
    }
  }

  _getElapsedProgress(path) {

    let elapsedProgress;

    if (
      this.options.progress > path.startProgress &&
      this.options.progress < (path.startProgress + path.durationProgress)
    ) {
      elapsedProgress = (this.options.progress - path.startProgress) / path.durationProgress;
    } else if (this.options.progress >= (path.startProgress + path.durationProgress)) {
      elapsedProgress = 1;
    } else if (this.options.progress <= path.startProgress) {
      elapsedProgress = 0;
    }

    return elapsedProgress;
  }

  _getProgress(duration, start, elapsed, ease) {

    let progress;

    if (elapsed > 0 && elapsed < duration) {
      if (ease) {
        progress = Easing[ease](elapsed, 0, 1, duration);
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

  _setLine(path) {

    let el = path.el;
    let length = path.progress * path.length;

    if (this.options.reverse || path.reverse) {
      el.style.strokeDashoffset = -path.length + length;
    } else {
      el.style.strokeDashoffset = path.length - length;
    }
  }

  _updateStrokeCallbacks(path) {

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
  _updatePosition(path) {
    let index = Math.round((path.progress * (path.length - 1)));
    let position = path.positions[index];

    path.position = {
      x: this.options.offset.left + position.x,
      y: this.options.offset.top + position.y
    };
  }

  _getTotalDuration(paths) {
    let totalDuration = 0;

    for (let i = 0; i < paths.length; i++) {
      let pathDelay = paths[i].delay || 0;

      totalDuration += (paths[i].duration + pathDelay);
    }
    return totalDuration;
  }

  _getLongestDuration(paths) {
    let longestDuration = 0;

    for (let i = 0; i < paths.length; i++) {
      let pathDelay = paths[i].delay || 0;

      if ((paths[i].duration + pathDelay) > longestDuration) {
        longestDuration = (paths[i].duration + pathDelay);
      }
    }
    return longestDuration;
  };

  /**
   * _getPath
   * Responsible for creating a svg path element, and setting attributes on path.
   * @private
   * @param  {object} data contains options set on init
   * @param  {number} i    path index
   * @return {object} path svg path element
   */
  _getPath(data) {
    let path = this.el.querySelector('.' + data.id);

    this._setAttributes(path, data);
    return path;
  };

  /**
   * _getPathLength
   * Responsible for returning a svg path length.
   * @return {number} path length
   */
  _getPathLength(el) {
    return Math.ceil(el.getTotalLength());
  }

  /**
   * _getPathPoints
   * Responsible for returning a svg path coords.
   * @return {array} path coords
   */
  _getPathPoints(el, length) {

    let arr = [];

    for (let i = 0; i < length; i++) {
      let position = el.getPointAtLength(i);

      arr.push({
        x: position.x,
        y: position.y
      });
    };
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
  _setAttributes(path, data) {
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
  _getSVGElement(viewBox) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.setAttributeNS(null, 'viewBox', viewBox);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return svg;
  };

  /**
   * _getStrokeDashArray
   * @private
   */
  _getStrokeDashArray(path, length) {
    let strokeDash;

    if (path.strokeDash) {
      strokeDash = this._getStrokeDashString(path.strokeDash, length);
    } else if (this.options.strokeDash) {
      strokeDash = this._getStrokeDashString(this.options.strokeDash, length);
    } else {
      strokeDash = length + ' ' + length;
    };
    return strokeDash;
  }

  /**
   * _getStrokeDashString
   * @private
   */
  _getStrokeDashString(dashArray, length) {
    let strokeDashString = '';
    let strokeDashArray = dashArray.split(',');
    let strokeDashTotal = 0;
    let strokeDashNum;
    let strokeDashRemainder;

    for (let i = strokeDashArray.length - 1; i >= 0; i--) {
      strokeDashTotal += Number(strokeDashArray[i]);
    };
    strokeDashNum = Math.floor(length / strokeDashTotal);
    strokeDashRemainder = length - (strokeDashNum * strokeDashTotal);
    for (let i = strokeDashNum - 1; i >= 0; i--) {
      strokeDashString += (dashArray + ', ');
    };
    let preArray = strokeDashString + strokeDashRemainder + ', ' + length;

    return preArray.split(',').join('px,') + 'px';
  }

}

window.LazyLinePainter = LazyLinePainter;
exports.LazyLinePainter = LazyLinePainter;
export default LazyLinePainter;
