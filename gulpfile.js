const gulp = require('gulp');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const injectPartials = require('gulp-inject-partials');
const htmlmin = require('gulp-htmlmin');
const moment = require('moment');
const through2 = require('through2');
const Handlebars = require('handlebars');

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});

gulp.task('copy-css', function () {
    return gulp.src('./src/css/**/*').pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-images', function () {
    return gulp.src('./src/images/**/*').pipe(gulp.dest('./dist/images'));
});

gulp.task('inject', function () {
    return gulp
        .src([
            'src/*.html',
        ])
        .pipe(injectPartials({
            prefix: '',
        }))
        .pipe(through2.obj(function (file, enc, callback) {
            const template = Handlebars.compile(file.contents.toString());

            const result = template({
                buildTimestamp: moment().format('DD MMM YYYY HH:mm:ss'),
                year: new Date().getUTCFullYear(),
            });

            file.contents = Buffer.from(result);

            this.push(file);

            return callback()
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build', function () {
    runSequence(
        'clean',
        'copy-css',
        'copy-fonts',
        'copy-images',
        'inject',
    );
});
