var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

var css = [
    'css/normalize.css',
    'css/grid.css',
    'css/slick.css',
    'css/toastr.css',
    'css/dropdown.css',
    'css/popup.css',
    'css/style.css'
];

var js = [
    'js/jquery.js',
    'js/jquery.validete.min.js',
    'js/jquery.maskedinput.js',
    'js/slick.js',
    'js/toastr.min.js', //end jq plugins
    'js/dropdown.js',
    'js/popup.js', //end my plugins
    'js/header.js',
    //'js/auth.js',
    'js/search.js',
    'js/delivery-form.js',
    'js/sliders.js',
    'js/script.js'
];

gulp.task('html', function() {
  gulp.src(['templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return gulp.src('css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});

gulp.task('styles', function () {
    gulp.src(css)
        .pipe(sourcemaps.init())
        .pipe(concat("all.css"))
        .pipe(minifyCSS())
        .pipe(rename("all.min.css"))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css/builds/'));
});

gulp.task('scripts', function () {
    gulp.src(js)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename("all.min.js"))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('js/builds/'));
});

gulp.task('watch', function () {
    gulp.watch('templates/*.html', ['html']);
    gulp.watch('templates/*/*.html', ['html']);
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch(css, ['styles']);
    gulp.watch(js, ['scripts']);
});

//gulp.task('default', ['html', 'sass', 'styles', 'scripts', 'watch']);
gulp.task('default', ['html', 'styles', 'scripts', 'watch']);
