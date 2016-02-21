'use strict';

var fs = require('fs');

var babelrc = fs.readFileSync(__dirname + '/../.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-core/register')(config);

var gulp    = require('gulp');
var path    = require('path');
var fs      = require('fs');
var helpers = require(path.resolve(__dirname, 'helpers'));

require('gulp-help')(gulp, {
  aliases: ['h'],
  afterPrintCallback: helpers.gulp.printManuals
});

fs
  .readdirSync(path.resolve(__dirname, 'tasks'))
  .filter(function (file) {
    return (file.indexOf('.') !== 0);
  })
  .map(function (file) {
    return require(path.resolve(__dirname, 'tasks', file));
  })
  .forEach(function (tasks) {
    Object.keys(tasks).forEach(function (taskName) {
      helpers.gulp.addTask(gulp, taskName, tasks[taskName]);
      helpers.gulp.addHelp(gulp, taskName, tasks[taskName]);
    });
  });
