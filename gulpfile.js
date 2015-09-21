var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var rename = require('gulp-rename');

gulp.task('jsx', function () {
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
});

gulp.task('default', ['watch', 'jsx']);