const { src, dest, watch, series } = require('gulp');
const compileSass = require('gulp-sass'); 
const minifyCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const webp = require('gulp-webp');
const image = require('gulp-image');
const cssnext = require('postcss-cssnext');
const browserSync = require('browser-sync').create();
// gulp-terser minifies javascript 

var plugins = [cssnext, autoprefixer];

compileSass.compiler = require('node-sass');

const sassTask = callbackFunction => {
    src('scss/*.scss')
      .pipe(compileSass().on('error', compileSass.logError))
      .pipe(postcss(plugins))
      /*.pipe(minifyCss()) writes all CSS on one line*/
      .pipe(dest('css/'))
    callbackFunction()
}

const imagesTask = callbackFunction => {
  src('images/**')
    .pipe(image())
    .pipe(webp())
    .pipe(dest('images/'))
  callbackFunction()

}

  //creates live server
const browsersyncServe = cb => {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  })
  cb()
}

const browsersyncReload = cb => {
  browserSync.reload()
  cb()
}



  //this task is for development mode - DONOT FORGET TO CHANGE THE PACKAGE SCRIPT
function devWatch(){
    console.log('watching')
    watch('*.html', browsersyncReload);
    watch('scss/*.scss', series(sassTask, browsersyncReload));

}

exports.default = series(imagesTask, sassTask)
exports.serve = series(
  browsersyncServe,
  devWatch
)