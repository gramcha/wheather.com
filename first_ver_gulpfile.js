/*
 Now in your terminal run the following commands.
 npm install --global gulp

npm install --save-dev gulp;
npm install --save-dev gulp-concat;
npm install --save-dev gulp-uglify;
npm install --save-dev gulp-react;
npm install --save-dev gulp-html-replace;
*/

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifyjs = require('uglify-es');//install uglify-es to minify the js classes. 1. npm install uglify-es -g 2. npm install uglify-es //https://github.com/mishoo/UglifyJS2/tree/harmony

var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
var gutil = require('gulp-util');


var path = {
  HTML: 'src/index.html',
  ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
  JS: ['src/js/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist'
};

gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});
//this task is going to do is take our index.html file and copy it over to our dist folder
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});
// What we want to do is create a task that will always be running so when we change either our index.html or any of the JS files,
gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform', 'copy']);
});
//default task is watch
gulp.task('default', ['watch']);
//production build
gulp.task('build', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(path.DEST_BUILD));
});
//replace html with build dir min.js
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
//will do build and replace html
gulp.task('production', ['replaceHTML', 'build']);

