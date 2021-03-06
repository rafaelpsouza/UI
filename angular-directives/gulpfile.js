// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');

var htmlFiles = ['./src/**/**/*.html', '!./src/index.html'];
var jsFiles = ['./src/**/**/*.js', '!./src/**/*.test.js'];
var cssFiles = './src/**/**/**/*.css';

// tasks
gulp.task('lint', function() {
  gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
    gulp.src('./dist')
      .pipe(clean({force: true}));
});

gulp.task('copy-bower-components', function () {
  gulp.src('bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('dist:html', function () {
  gulp.src(htmlFiles)
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist:js', function () {
  gulp.src(jsFiles)
    .pipe(angularFilesort())
    .pipe(uglify({}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist:css', function () {
  gulp.src(cssFiles)
    .pipe(minifyCSS({comments:true,spare:true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist', function () {
  var htmlStream = gulp.src(htmlFiles)
    .pipe(gulp.dest('dist/'));

  var cssStream = gulp.src(cssFiles)
    .pipe(minifyCSS({comments:true,spare:true}))
    .pipe(gulp.dest('dist/'));

  var jsStream = gulp.src(jsFiles)
    .pipe(angularFilesort())
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));

  gulp.src('./src/index.html')
    .pipe(inject(es.merge(cssStream, jsStream), { ignorePath: 'dist/', addRootSlash: false }))
    .pipe(gulp.dest('./dist'));

});

gulp.task('watch', function() {
  gulp.watch(htmlFiles, function() {
    runSequence(
      ['dist:html']
    );
  });
  gulp.watch(jsFiles, function() {
    runSequence(
      ['dist:js']
    );
  });
  gulp.watch(cssFiles, function() {
    runSequence(
      ['dist:css']
    );
  });
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

gulp.task('serve', ['lint', 'dist', 'copy-bower-components', 'connectDist', 'watch']);