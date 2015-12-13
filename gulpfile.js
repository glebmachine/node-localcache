'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

// linting
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');

gulp.task('test', ['project:basic', 'lint'], function() {
  var mocha = require('gulp-mocha');
  return gulp.src('test/*.js', { read: false })
    .pipe(mocha());
});

gulp.task('linting', function() {
  return gulp.src('./index.js')
    .pipe(jshint())                           // hint (optional)
    .pipe(jscs())                             // enforce style guide
    .pipe(stylish.combineWithHintResults())   // combine with jshint results
    .pipe(jshint.reporter('jshint-stylish')); // use any jshint reporter to log hint
});
gulp.task('runtest', ['linting'], function() {
  var mocha = require('gulp-mocha');
  return gulp.src('test/basic.js', { read: false })
    .pipe(mocha());
});


gulp.task('watch', function() {
  gulp.watch([
    'test/basic/input.css',
  ], ['runtest']);
});

gulp.task('default', ['watch']);
gulp.task('test', ['runtest']);
