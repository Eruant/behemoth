var browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  to5ify = require('6to5ify'),
  uglify = require('gulp-uglify');

gulp.task('scripts', function () {

  return browserify('./src/js/main.js', {
    debug: true
  })
    .transform(to5ify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));

});

gulp.task('markup', function () {

  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'));

});

gulp.task('data', function () {

    return gulp.src('src/data/**/*.json')
        .pipe(gulp.dest('build/data'));
});

gulp.task('images', function () {

    return gulp.src('src/img/*.png')
        .pipe(gulp.dest('build/img'));

});

gulp.task('watch', ['build'], function () {

  gulp.watch('src/**/*.html', ['markup']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/data/**/*.json', ['data']);

});

gulp.task('build', ['scripts', 'markup', 'data', 'images']);

gulp.task('default', ['build']);
