var gulp = require('gulp');
var traceur = require('gulp-traceur');

gulp.task('client', function () {
    return gulp.src('public/scripts/app.js')
        .pipe(traceur())
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
    return gulp.src('server.js')
        .pipe(traceur())
        .pipe(gulp.dest('dist'));
});