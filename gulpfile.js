var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano')
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('browserSync', function() {
   browserSync.init({
       server: {
           baseDir: 'application'
       }
   }) 
});

gulp.task('sass', function() {
    return gulp.src('application/resources/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('application/resources/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('application/resources/scss/**/*.scss', ['sass']);
    // Reloads browser
    gulp.watch('application/**/*.html', browserSync.reload);
    gulp.watch('application/**/*.js', browserSync.reload);
    gulp.watch('application/**/*.json', browserSync.reload);
});

gulp.task('useref', function() {
    return gulp.src('application/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-css', function() {
    return gulp.src('application/resources/css/**/*')
    .pipe(gulpIf('main.css', cssnano()))
    .pipe(gulpIf('application.css', cssnano()))
    .pipe(gulp.dest('dist/resources/css'));
});

gulp.task('copy-images', function() {
    return gulp.src('application/resources/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/resources/img'));
});

gulp.task('copy-fonts', function() {
    console.log('Copiying fonts...');
    return gulp.src('application/resources/fonts/**/*')
    .pipe(gulp.dest('dist/resources/fonts'));
});

gulp.task('copy-icon', function() {
    return gulp.src('application/resources/icon/**/*')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/resources/icon'));
});

gulp.task('copy-app', function() {
    return gulp.src('application/app/**/*')
    .pipe(gulp.dest('dist/app'));
});

gulp.task('copy-i18n', function() {
    return gulp.src('application/i18n/**/*')
    .pipe(gulp.dest('dist/i18n'));
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('clean:java', function() {
    return del(['../webapp/app', '../webapp/i18n', '../webapp/resources', '../webapp/index.html'], {force: true});
});

gulp.task('copy-java', function() {
    return gulp.src('dist/**/*')
    .pipe(gulp.dest('../webapp'));
});

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass'], ['useref', 'copy-css', 'copy-images', 'copy-fonts', 'copy-icon', 'copy-app', 'copy-i18n'], callback);
});

gulp.task('build-java', function(callback) {
    runSequence('build', 'clean:java', 'copy-java', callback);
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'], callback);
});