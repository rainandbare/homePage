var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


gulp.task('styles', function () {
    // Endless stream mode
    return watch('./app/sass/*.scss', { ignoreInitial: false })
    	.pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sourcemaps.init())
    	.pipe(sass())
    	.pipe(cleanCSS())
		.pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});


gulp.task('js', function () {
	return watch('./app/js/*.js', { ignoreInitial: false })
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('html', function () {
	return watch('./app/*.html', { ignoreInitial: false })
	.pipe(gulp.dest('./dist'));
});

gulp.task('bs', function () {
	browserSync.init({
		server: "./dist"
	});
	gulp.watch("./dist/*.html").on("change", reload);
});

gulp.task('default', ['styles', 'js', 'html', 'bs']);