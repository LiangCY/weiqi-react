var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var rename = require('gulp-rename');

gulp.task('babel', function () {
    gulp.src('weiqi/src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('weiqi/dist'));
});

gulp.task('jsx', ['babel'], function () {
    gulp.src('src/app.jsx', {read: false})
        .pipe(browserify({
            transform: ['reactify'],
            extensions: ['.jsx']
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*'], ['jsx']);
    gulp.watch(['weiqi/src/**/*'], ['babel','jsx']);
});

gulp.task('default', ['watch', 'babel', 'jsx']);