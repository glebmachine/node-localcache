

# Node LocalCache [![Build Status][ci-img]][ci]
[ci-img]:  https://travis-ci.org/glebmachine/node-localcache.svg
[ci]:      https://travis-ci.org/glebmachine/node-localcache

Module, allows to save application data between launches (like LocalStorage in browser).

## Usage

```js
var LocalCache = require('node-localcache');

cache = new LocalCache('.cache/filetocache.json');
cache.setItem('key', 'value');
cache.getItem('key'); // value
```

## Options
```js
new LocalCache(fileName, skipFileCaching);
```
- `fileName` - (optional) Path to cache file, also used as store `id`
- `skipFileCaching` - (optional) disable file cache, default `false`

## Perfomance
All FS manipulation agregating and applying 1 time per second.

