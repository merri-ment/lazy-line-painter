let EventEmitter = {};

EventEmitter.on = function (name, callback) {
  this._eventEmitterCallbacks = this._eventEmitterCallbacks || {};
  this._eventEmitterCallbacks[name] = this._eventEmitterCallbacks[name] || [];
  this._eventEmitterCallbacks[name].push(callback);
};
EventEmitter.addListener = EventEmitter.on;

EventEmitter.off = function (name, callback) {
  this._eventEmitterCallbacks = this._eventEmitterCallbacks || {};
  if (!(name in this._eventEmitterCallbacks)) return;
  const i = this._eventEmitterCallbacks[name].indexOf(callback);

  if (i < 0) return;
  this._eventEmitterCallbacks[name].splice(i, 1);
};
EventEmitter.removeListener = EventEmitter.off;

EventEmitter.emit = function (name, evt) {
  this._eventEmitterCallbacks = this._eventEmitterCallbacks || {};
  if (!(name in this._eventEmitterCallbacks)) return;
  for (let callback of this._eventEmitterCallbacks[name]) {
    if (typeof callback !== "function") return;
    callback(evt);
  }
};
EventEmitter.trigger = EventEmitter.emit;

export default EventEmitter;
