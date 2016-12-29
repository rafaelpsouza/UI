// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');
var less = require('gulp-less');
var concat = require('gulp-concat');

var htmlFiles = ['./src/**/**/*.html'];
var jsFiles = ['./src/**/**/*.js', '!./src/**/*.test.js', '!./src/service-worker.js'];
var lessFiles = ['src/content/less/**/*.less'];
var imageFiles = ['./src/content/images/**/*.png'];

// tasks
gulp.task('lint', function() {
  gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
  return del(['./dist']);
});

gulp.task('copy-bower-components', function () {
  return gulp.src('bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('dist:image', function () {
  return gulp.src(imageFiles)
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('dist:service-worker', function () {
  return gulp.src(['./src/service-worker.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist:js', function () {
  return gulp.src(jsFiles)
    .pipe(angularFilesort())
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist:less', function () {
  return gulp.src(lessFiles)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['dist:image', 'dist:service-worker'], function () {
  var lessStream = gulp.src(lessFiles)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/'));

  var jsStream = gulp.src(jsFiles)
    .pipe(angularFilesort())
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));

  return gulp.src('./src/index.html')
    .pipe(inject(es.merge(lessStream, jsStream), { ignorePath: 'dist/', addRootSlash: false }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch(htmlFiles, function() {
    runSequence(
      ['dist']
    );
  });
  gulp.watch(jsFiles, function() {
    runSequence(
      ['dist:js']
    );
  });
  gulp.watch(lessFiles, function() {
    runSequence(
      ['dist:less']
    );
  });
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

gulp.task('serve', function () {
  runSequence('clean', ['lint', 'dist', 'copy-bower-components', 'connectDist', 'watch']);
});