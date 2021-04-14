const { src, dest, watch } = require('gulp');
const compileSass = require('gulp-sass');
const minifyCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');

var plugins = [cssnext, autoprefixer];

compileSass.compiler = require('node-sass');

function bundleSass(callbackFunction) {
    src('scss/*.scss')
            .pipe(compileSass().on('error', compileSass.logError))
            .pipe(postcss(plugins))
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
