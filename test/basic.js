'use strict';
var expect  = require('chai').expect;
var plugin = require('../');

describe('Basic read/write/delete operations', function() {
  var cache;

  it('string', function(done) {
    cache = plugin('.cache/demo1');
    cache.setItem('demo', 'basic');
    expect(cache.getItem('demo')).to.eql('basic');

    cache.setItem('demo', 'value with spaces');
    expect(cache.getItem('demo')).to.eql('value with spaces');

    cache.setItem('demo', 'value with specials/$@#$@#$@#$\\#$@#$@#$@#$@#$@#$#$');
    expect(cache.getItem('demo')).to.eql('value with specials/$@#$@#$@#$\\#$@#$@#$@#$@#$@#$#$');
    done();
  });

  it('number', function(done) {
    cache = plugin('.cache/demo1');
    cache.setItem('demo', 322);
    expect(cache.getItem('demo')).to.eql(322);
    done();
  });

  it('float number', function(done) {
    cache = plugin('.cache/demo1');
    cache.setItem('demo', 322.666);
    expect(cache.getItem('demo')).to.eql(322.666);
    done();
  });

  it('float boolean', function(done) {
    cache = plugin('.cache/demo7');
    cache.setItem('demo', true);
    expect(cache.getItem('demo')).to.eql(true);
    cache.setItem('demo', false);
    expect(cache.getItem('demo')).to.eql(false);
    done();
  });

  it('float array', function(done) {
    cache = plugin('.cache/demo6');
    var a = [1, 2, 3, 4];
    cache.setItem('demo', a);
    expect(cache.getItem('demo')).to.eql(a);
    done();
  });

  it('float object', function(done) {
    cache = plugin('.cache/demo5');
    var a = { one:1, two:2, three:3 };
    cache.setItem('demo', a);
    expect(cache.getItem('demo')).to.eql(a);
    done();
  });

  it('Complex operations', function(done) {
    cache = plugin('.cache/demo4');
    var a = { one:1, two:2, three:3 };
    cache.setItem('demo', a);
    expect(cache.getItem('demo')).to.eql(a);
    done();
  });

  it('Complex operations', function(done) {
    cache = plugin('.cache/demo3');
    var a = { one:1, two:2, three:3 };
    cache.setItem('demo', a);
    expect(cache.getItem('demo')).to.eql(a);
    done();
  });

});

describe('Operations with stored objects', function() {
  var cache = plugin('.cache/demo2');
  var array = [1, 2, 3, 4, 5];
  var object = { one:1, two:2, three:3 };

  cache.setItem('array example', array);
  cache.setItem('object example', object);

  it('Push value to array', function(done) {
    array.push(6);
    expect(cache.getItem('array example')).to.eql(array);
    cache.fileSync();
    done();
  });

  it('Push new value to object', function(done) {
    object.four = 4;
    expect(cache.getItem('object example')).to.eql(object);
    cache.fileSync();
    done();
  });

});
