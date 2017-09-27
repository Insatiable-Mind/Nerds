var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

/* Static Server + watching scss/html files */
gulp.task('serve', ['build'], function() {

  browserSync.init({
    server: './'
  });

  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('scss/**/*.scss', ['build']);
});

/* Compile Sass into CSS, autoprefix, compress & auto-inject into browsers */
gulp.task('build', function() {
  gulp.watch('scss/**/*.scss').on('change', function() {
    return gulp.src('scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
      }))
      .pipe(gulp.dest('css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(csso({
        comments: false
      }))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
  });
});

gulp.task('default', ['build', 'serve']);