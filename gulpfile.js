const { src, dest, watch } = require('gulp');
const compileSass = require('gulp-sass');
const minifyCss = require('gulp-clean-css');

compileSass.compiler = require('node-sass');

function bundleSass(callbackFunction) {
    src('scss/*.scss')
            .pipe(compileSass().on('error', compileSass.logError))
            .pipe(minifyCss())
            .pipe(dest('css/'));
    callbackFunction();
  }

  //this task is for development mode - DONNOT FORGET TO CHANGE THE PACKAGE SCRIPT
function devWatch(){
    console.log('watching')
    watch('scss/*.scss', bundleSass);
}

exports.default = bundleSass
exports.devWatch = devWatch
