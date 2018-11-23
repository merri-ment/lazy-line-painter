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
   * @public
   * @param  {object} opts user defined options
   */

  constructor(el, config) {

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
    Object.assign(this, Events, {});

    this.__raf = null;

    let paths = this.el.querySelectorAll('[data-llp-id]');
    let i;

    for (i = 0; i < paths.length; i++) {
      this.config.paths.push({
        el: paths[i]
      });
    }

    this.className = 'lazy-line-painter';
    this.el.classList.add(this.className);
    this._parseDataAttrs();
    let totalDuration = this.config.delay + this._getTotalDuration(this.config.paths);
    let longestDuration = this.config.delay + this._getLongestDuration(this.config.paths);

    this.config.totalDuration = this.config.drawSequential ? totalDuration : longestDuration;
    this.config.totalDuration *= this.config.speedMultiplier;
    this._setupPaths();

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
    this.__raf = requestAnimationFrame((timestamp) => {
      this._paint(timestamp);
    });

    // fire onStart callback
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
  pause() {
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
  resume() {
    if (this.config.paused) {
      requestAnimationFrame((timestamp) => {
        this.adjustStartTime(timestamp);
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
  erase() {

    // reset / cancel rAF
    this.config.startTime = null;
    this.config.elapsedTime = null;
    cancelAnimationFrame(this.__raf);

    // reset callback
    this.config.onStrokeCompleteDone = false;

    // reset paused
    this.config.paused = false;

    // empty contents of svg
    for (let i = 0; i < this.config.paths.length; i++) {
      let path = this.config.paths[i];

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
    this.config = null;

    // // empty container element
    // while (this.el.firstChild) {
    //   this.el.removeChild(this.el.firstChild);
    // }

    // remove class
    this.el.classList.remove(this.className);
  }

  /**
   * set
   * @public
   */
  set(progress) {
    // set elapsedTime
    this.config.progress = progress;
    this._updatePaths();
  }

  /**
   * get
   * @public
   */
  get() {
    return this.config;
  }

  /**
   * resize
   * @public
   */
  resize() {

    this.config.offset = this.el.getBoundingClientRect();
    // this.config.scale = this.config.offset.width / this.config.width;

    for (let i = 0; i < this.config.paths.length; i++) {
      let path = this.config.paths[i];

      path.el.getBoundingClientRect();
      path.positions = this._getPathPoints(path.el, path.length);
      this._updatePosition(path);
    }
  }

  _parseDataAttrs() {
    for (let i = 0; i < this.config.paths.length; i++) {
      let path = this.config.paths[i];

      path.id = path.el.dataset.llpId;
      path.delay = Number(path.el.dataset.llpDelay) || 0;
      path.duration = Number(path.el.dataset.llpDuration) || 0;
      path.reverse = Number(path.el.dataset.llpReverse) || false;
      path.ease = Number(path.el.dataset.llpEase) || null;
      path.strokeDash = path.el.dataset.llpStrokeDash || null;
      this._setStyleAttrs(path);
    }
  }

  _setStyleAttrs(path) {
    path.strokeColor = (path.el.dataset.llpStrokeColor || this.config.strokeColor);
    if (path.strokeColor) {
      path.el.setAttributeNS(null, 'stroke', path.strokeColor);
    }

    path.strokeOpacity = (path.el.dataset.llpStrokeOpacity || this.config.strokeOpacity);
    if (path.strokeOpacity) {
      path.el.setAttributeNS(null, 'stroke-opacity', path.strokeOpacity);
    }

    path.strokeWidth = (path.el.dataset.llpStrokeWidth || this.config.strokeWidth);
    if (path.strokeWidth) {
      path.el.setAttributeNS(null, 'stroke-width', path.strokeWidth);
    }

    path.strokeCap = (path.el.dataset.llpStrokeCap || this.config.strokeCap);
    if (path.strokeCap) {
      path.el.setAttributeNS(null, 'stroke-linecap', path.strokeCap);
    }

    path.strokeJoin = (path.el.dataset.llpStrokeJoin || this.config.strokeJoin);
    if (path.strokeJoin) {
      path.el.setAttributeNS(null, 'stroke-linejoin', path.strokeJoin);
    }
  }

  _setupPaths() {

    let startTime = this.config.reverse ? this.config.totalDuration : 0;

    for (let i = 0; i < this.config.paths.length; i++) {

      let path = this.config.paths[i];

      path.progress = 0;
      path.index = i;
      path.length = this._getPathLength(path.el);
      path.positions = this._getPathPoints(path.el, path.length);

      path.el.style.strokeDasharray = this._getStrokeDashArray(path, path.length);
      path.el.style.strokeDashoffset = path.length;
      path.el.getBoundingClientRect();

      path.onStrokeStartDone = false;
      path.onStrokeCompleteDone = false;

      let startProgress;
      let durationProgress = path.duration / this.config.totalDuration;

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
      this.config.playhead += (path.duration + path.delay);
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
    this.config.startTime = timestamp - this.config.elapsedTime;
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

    if (!this.config) {
      return;
    }

    // set startTime
    if (!this.config.startTime) {
      this.config.startTime = timestamp;
    }

    this.emit('update');

    // set elapsedTime
    this.config.elapsedTime = (timestamp - this.config.startTime);
    this.config.progress = this._getProgress(
      this.config.totalDuration,
      this.config.startTime,
      this.config.elapsedTime,
      this.config.ease
    );

    this._updatePaths();

    if (this.config.progress < 1) {
      this.__raf = requestAnimationFrame((timestamp) => {
        this._paint(timestamp);
      });
    } else {
      this.emit('complete');
    }
  }

  _updatePaths() {
    for (let i = 0; i < this.config.paths.length; i++) {
      let path = this.config.paths[i];
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
      this.config.progress > path.startProgress &&
      this.config.progress < (path.startProgress + path.durationProgress)
    ) {
      elapsedProgress = (this.config.progress - path.startProgress) / path.durationProgress;
    } else if (this.config.progress >= (path.startProgress + path.durationProgress)) {
      elapsedProgress = 1;
    } else if (this.config.progress <= path.startProgress) {
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

    if (this.config.reverse || path.reverse) {
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
      x: this.config.offset.left + position.x,
      y: this.config.offset.top + position.y
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
    } else if (this.config.strokeDash) {
      strokeDash = this._getStrokeDashString(this.config.strokeDash, length);
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
