/*
 * Lazy Line Painter
 * SVG Stroke animation.
 *
 * https://github.com/merri-ment/lazy-line-painter
 * http://www.merriment.info
 *
 * Copyright 2013-2023 Merriment
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
    this.el.classList.add('lazy-line-painter');

    this.config = Object.assign(
      {
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
      },
      config,
      {}
    );

    Object.assign(this, Events, {});

    this.__raf = null;
    this.__paths = [];

    this._generatePaths();
    this._parseDataAttrs();
    this._updateDuration();
    this._setupPaths();

    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  _generatePaths() {
    let paths;

    let composed = Boolean(this.el.dataset.llpComposed);

    if (composed) {
      paths = this.el.querySelectorAll('[data-llp-id]');
    } else {
      paths = this._uncomposed();
    }

    for (let i = 0; i < paths.length; i++) {
      let path = {
        el: paths[i]
      };

      this.__paths.push(path);
    }
  }

  _uncomposed() {
    let paths = this.el.querySelectorAll(
      'path, polygon, circle, ellipse, polyline, line, rect'
    );

    let i;

    for (i = 0; i < paths.length; i++) {
      let id = this.el.id.replace(/ /g, '');

      id = id.replace('.', '');
      id = id.replace('-', '');
      paths[i].dataset.llpId = id + '-' + i;

      if (!paths[i].dataset.llpDuration) {
        paths[i].dataset.llpDuration = 1000;
      }
      if (!paths[i].dataset.llpDuration) {
        paths[i].dataset.llpDelay = 0;
      }
    }

    if (this.config.log) {
      console.log(
        'This lazy line is uncomposed! Visit https://lazylinepainter.com to compose your masterpiece!'
      );
    }

    return paths;
  }

  /**
   * paint
   * Responsible for drawing path.
   * @public
   */

  paint(config) {
    // update playback arguments
    Object.assign(this.config, config);
    this._updateDuration();

    this.erase();

    // begin animation
    this._paint();

    // fire start callback
    this.emit('start');
  }

  /**
   * pause
   * Responsible for pausing path animation.
   * @public
   */
  pause() {
    if (this.config) {
      this.config.paused = true;
    }
    cancelAnimationFrame(this.__raf);
    this.emit('pause');
  }

  /**
   * resume
   * Responsible for resuming path animation.
   * @public
   */
  resume() {
    if (this.config && this.config.paused) {
      requestAnimationFrame(() => {
        this.adjustStartTime();
      });
      this.config.paused = false;
      this.emit('resume');
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
    for (let i = 0; i < this.__paths.length; i++) {
      let path = this.__paths[i];

      path.el.style.strokeDashoffset = path.length;
      path.onStrokeCompleteDone = false;
      path.onStrokeStartDone = false;
    }

    this.emit('erase');
  }

  /**
   * destroy
   * Responsible for removing lazyline data and element from DOM
   * @public
   */
  destroy() {
    // retrieve / remove data object
    this.config = null;

    // empty container element
    this.el.remove();
    this.el = null;
  }

  /**
   * set
   * @public
   */
  set(prop, value) {
    switch (prop) {
      case 'progress':
        this._setProgress(value);
        break;
      case 'delay':
        this._setDelay(value);
        break;
      case 'reverse':
        this._setReverse(value);
        break;
      case 'ease':
        this._setEase(value);
        break;
      case 'repeat':
        this._setRepeat(value);
        break;
      default:
        if (this.config.log) {
          console.log('property ' + prop + ' can not be set');
        }
    }
  }

  _setRepeat(repeat) {
    this.config.repeat = repeat;
  }

  _setEase(ease) {
    this.config.ease = ease;
  }

  _setProgress(progress) {
    this.pause();
    this.config.progress = this._getProgress(progress, this.config.ease);
    this._updatePaths();
    this.config.elapsedTime = this.config.progress * this.config.totalDuration;
  }

  _setDelay(delay) {
    this.config.delay = delay;
    this._updateDuration();
  }

  _setReverse(reverse) {
    this.config.reverse = reverse;
    this._updateDuration();
  }

  _updateDuration() {
    let totalDuration = this._getTotalDuration();

    let longestDuration = this._getLongestDuration();

    this.config.totalDuration = this.config.drawSequential ?
      totalDuration :
      longestDuration;
    this.config.totalDuration += this.config.delay;

    this._calcPathDurations();
  }

  _calcPathDurations() {
    for (let i = 0; i < this.__paths.length; i++) {
      let path = this.__paths[i];

      let startTime;

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

    for (let i = 0; i < this.__paths.length; i++) {
      let path = this.__paths[i];

      path.el.getBoundingClientRect();
      path.positions = this._getPathPoints(path.el, path.length);
      this._updatePosition(path);
    }
  }

  _parseDataAttrs() {
    for (let i = 0; i < this.__paths.length; i++) {
      let path = this.__paths[i];

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

  _setStyleAttrs(path) {
    path.strokeColor =
      path.el.dataset.llpStrokeColor || this.config.strokeColor;
    if (path.strokeColor) {
      path.el.style.stroke = path.strokeColor;
    }

    path.strokeOpacity =
      path.el.dataset.llpStrokeOpacity || this.config.strokeOpacity;
    if (path.strokeOpacity) {
      path.el.style.strokeOpacity = path.strokeOpacity;
    }

    path.strokeWidth =
      path.el.dataset.llpStrokeWidth || this.config.strokeWidth;
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

  _setupPaths() {
    for (let i = 0; i < this.__paths.length; i++) {
      let path = this.__paths[i];

      path.index = i;
      path.length = this._getPathLength(path.el);
      path.positions = this._getPathPoints(path.el, path.length);

      path.el.style.strokeDasharray = this._getStrokeDashArray(
        path,
        path.length
      );
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
  adjustStartTime() {
    let timestamp = performance.now();

    this.config.startTime = timestamp - this.config.elapsedTime;
    requestAnimationFrame(() => {
      this._paint();
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
  _paint() {
    if (!this.config) {
      return;
    }

    // set startTime
    if (!this.config.startTime) {
      this.config.startTime = performance.now(); // new Date()
    }

    this.emit('update');

    // set elapsedTime
    let timestamp = performance.now();

    this.config.elapsedTime = timestamp - this.config.startTime;
    this.config.linearProgress =
      this.config.elapsedTime / this.config.totalDuration;

    this.config.progress = this._getProgress(
      this.config.linearProgress,
      this.config.ease
    );
    // console.log(this.config.elapsedTime, ' ', this.config.totalDuration);

    this._updatePaths();

    if (this.config.linearProgress >= 0 && this.config.linearProgress <= 1) {
      this.__raf = requestAnimationFrame(() => {
        this._paint();
      });
    } else {
      if (this.config.repeat > 0) {
        this.config.repeat--;
        this.paint();
      } else if (this.config.repeat === -1) {
        this.paint();
      } else {
        this.emit('complete');
      }
    }
  }

  _updatePaths() {
    for (let i = 0; i < this.__paths.length; i++) {
      let path = this.__paths[i];

      let pathProgress = this._getElapsedProgress(path);

      path.progress = this._getProgress(pathProgress, path.ease);
      this._setLine(path);
      this._updatePosition(path);
      this._updateStrokeCallbacks(path);
    }
  }

  _getElapsedProgress(path) {
    let elapsedProgress;

    if (
      this.config.progress >= path.startProgress &&
      this.config.progress <= path.startProgress + path.durationProgress
    ) {
      elapsedProgress =
        (this.config.progress - path.startProgress) / path.durationProgress;
    } else if (
      this.config.progress >=
      path.startProgress + path.durationProgress
    ) {
      elapsedProgress = 1;
    } else if (this.config.progress <= path.startProgress) {
      elapsedProgress = 0;
    }

    return elapsedProgress;
  }

  _getProgress(linearProgress, ease) {
    let progress = linearProgress;

    if (ease) {
      progress = Easing[ease](linearProgress);
    }
    return progress;
  }

  _setLine(path) {
    let el = path.el;

    let length = path.progress * path.length;

    if (path.reverse) {
      el.style.strokeDashoffset = -path.length + length;
    } else if (this.config.reverse) {
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
    let index = Math.round(path.progress * (path.length - 1));

    let position = path.positions[index];

    if (position) {
      path.position = {
        x: this.config.offset.left + position.x,
        y: this.config.offset.top + position.y
      };
    }
  }

  _getTotalDuration() {
    let totalDuration = 0;

    let paths = this.__paths;

    for (let i = 0; i < paths.length; i++) {
      let pathDelay = paths[i].delay || 0;

      totalDuration += paths[i].duration + pathDelay;
    }

    return totalDuration;
  }

  _getLongestDuration() {
    let longestDuration = 0;

    let paths = this.__paths;

    for (let i = 0; i < paths.length; i++) {
      let pathTotalDuration = paths[i].delay + paths[i].duration;

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
  _getPathLength(el) {
    return this._getTotalLength(el); // el.getTotalLength());
  }

  _getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  _getCircleLength(el) {
    return Math.PI * 2 * el.getAttribute('r');
  }

  _getEllipseLength(el) {
    let rx = parseInt(el.getAttribute('rx'), 1);

    let ry = parseInt(el.getAttribute('ry'), 1);

    let h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);

    let totalLength =
      Math.PI * (rx + ry) * (1 + (3 * h) / Math.sqrt(4 - 3 * h));

    return totalLength;
  }

  _getRectLength(el) {
    return el.getAttribute('width') * 2 + el.getAttribute('height') * 2;
  }

  _getLineLength(el) {
    return this._getDistance(
      {
        x: el.getAttribute('x1'),
        y: el.getAttribute('y1')
      },
      {
        x: el.getAttribute('x2'),
        y: el.getAttribute('y2')
      }
    );
  }

  _getPolylineLength(el) {
    const points = el.points;

    let totalLength = 0;

    let previousPos;

    for (let i = 0; i < points.numberOfItems; i++) {
      const currentPos = points.getItem(i);

      if (i > 0) {
        totalLength += this._getDistance(previousPos, currentPos);
      }
      previousPos = currentPos;
    }
    return totalLength;
  }

  _getPolygonLength(el) {
    const points = el.points;

    return (
      this._getPolylineLength(el) +
      this._getDistance(
        points.getItem(points.numberOfItems - 1),
        points.getItem(0)
      )
    );
  }

  _getTotalLength(el) {
    let length;

    let tagName = el.tagName.toLowerCase();

    switch (tagName) {
      case 'circle':
        length = this._getCircleLength(el);
        break;
      case 'rect':
        length = this._getRectLength(el);
        break;
      case 'line':
        length = this._getLineLength(el);
        break;
      case 'polyline':
        length = this._getPolylineLength(el);
        break;
      case 'polygon':
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
  _getPathPoints(el, length) {
    let arr = [];

    for (let i = 0; i < length; i++) {
      let position = el.getPointAtLength(i);

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
  _getStrokeDashArray(path, length) {
    let strokeDash;

    if (path.strokeDash) {
      strokeDash = this._getStrokeDashString(path.strokeDash, length);
    } else if (this.config.strokeDash) {
      strokeDash = this._getStrokeDashString(this.config.strokeDash, length);
    } else {
      strokeDash = length + ' ' + length;
    }
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
    }
    strokeDashNum = Math.floor(length / strokeDashTotal);
    strokeDashRemainder = length - strokeDashNum * strokeDashTotal;
    for (let i = 0; i < strokeDashNum; i++) {
      strokeDashString += dashArray + ', ';
    }
    let preArray = strokeDashString + strokeDashRemainder + ', ' + (length + 2);

    return preArray.split(',').join('px,') + 'px';
  }

  _onVisibilityChange = () => {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  };
}

const win = window || {};

win.LazyLinePainter = LazyLinePainter;
export default LazyLinePainter;
