'use strict'

/**
 * Represents a group of disposable resources that are disposed together.
 * @constructor
 */
function CompositeDisposable () {
  var args = [], i, len;
  if (Array.isArray(arguments[0])) {
    args = arguments[0];
    len = args.length;
  } else {
    len = arguments.length;
    args = new Array(len);
    for(i = 0; i < len; i++) { args[i] = arguments[i]; }
  }
  this.disposables = args;
  this.isDisposed = false;
  this.length = args.length;
}

/**
 * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
 * @param {Mixed} item Disposable to add.
 */
CompositeDisposable.prototype.add = function (item) {
  if (this.isDisposed) {
    item.dispose();
  } else {
    this.disposables.push(item);
    this.length++;
  }
};

/**
 * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
 * @param {Mixed} item Disposable to remove.
 * @returns {Boolean} true if found; false otherwise.
 */
CompositeDisposable.prototype.remove = function (item) {
  var shouldDispose = false;
  if (!this.isDisposed) {
    var idx = this.disposables.indexOf(item);
    if (idx !== -1) {
      shouldDispose = true;
      this.disposables.splice(idx, 1);
      this.length--;
      item.dispose();
    }
  }
  return shouldDispose;
};

/**
 *  Disposes all disposables in the group and removes them from the group.
 */
CompositeDisposable.prototype.dispose = function () {
  if (!this.isDisposed) {
    this.isDisposed = true;
    var len = this.disposables.length, currentDisposables = new Array(len);
    for(var i = 0; i < len; i++) { currentDisposables[i] = this.disposables[i]; }
    this.disposables = [];
    this.length = 0;

    for (i = 0; i < len; i++) {
      currentDisposables[i].dispose();
    }
  }
};

module.exports = CompositeDisposable;
