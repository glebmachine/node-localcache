'use strict';
var fs = require('fs');
var mkpath = require('mkpath');
var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var idIncrement = 0;
var index = {};
var logging = false;

function log() {
  var data = ['LocalCache: '].concat(Array.prototype.slice.call(arguments));
  if (logging) {
    console.log.apply(false, data);
  }
}

var LocalCache;
module.exports = LocalCache = function LocalCache(fileName, skipFileCaching) {
  if (index[fileName]) {
    return index[fileName];
  }

  index[fileName] = this;

  if (fileName === undefined) {
    if (!skipFileCaching) {
      return new Error('fileName should be defined with enabled file cache');
    } else {
      module.id = ++idIncrement;
    }
  }

  if (!(this instanceof LocalCache)) {
    return new LocalCache(fileName, skipFileCaching);
  }

  this.id = typeof fileName === 'string' ? fileName : fileName.toString();

  // handler for exit fo nodejs process
  function ejectionHandler() {
    process.stdin.resume();
    log(chalk.yellow('Ejection, swooooooooo-oooopphhhf!'));
    _this.fileSynceInstantly(function ejectionComplete() {
      log(chalk.green('Everything saved, for god sake'));
      log('shittung down, see you next life');
      process.exit();
    });
  }

  if (!skipFileCaching) {
    this.fileName = this.id;

    // debounce write file to 1 sec;
    this.fileSync = _.debounce(this.fileSynceInstantly, 1000);

    // check file exists
    if (!fs.existsSync(this.fileName)) {
      mkpath.sync(path.dirname(this.fileName));
      this.storage = {};
      this.fileSync();
    }  else {
      this.storage = JSON.parse(fs.readFileSync(this.fileName, 'utf8'));
    }

    // ensure changes will be applied to file on nodejs exit
    var _this = this;
    process.on('exit', ejectionHandler);
    process.on('SIGINT', ejectionHandler);
    process.on('uncaughtException', ejectionHandler);
  }
};

LocalCache.prototype.setItem = function setItem(key, value) {
  if (!key) { throw new Error('key should be defined'); }

  if (value === undefined) { throw new Error('value also should be defined as well'); }

  key = key.toString();
  this.storage[key] = value;
  this.fileSync();
  return true;
};

LocalCache.prototype.getItem = function setItem(key) {
  if (!key) { throw new Error('key should be defined'); }

  key = key.toString();
  return this.storage[key];
};

LocalCache.prototype.fileSynceInstantly = function fileSync(callback) {
  if (!this.fileName) {
    return;
  }

  fs.writeFileSync(this.fileName, JSON.stringify(this.storage, null, 2));
  if (callback && typeof callback === 'function') {
    callback();
  }
};
