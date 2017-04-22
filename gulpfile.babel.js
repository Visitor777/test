var gulp         = require('gulp'),
    plugins      = require('gulp-load-plugins'),
    browser      = require('browser-sync').create(),
    rimraf       = require('rimraf'),
    data         = require('gulp-data'),
    panini       = require('panini'),
    yargs        = require('yargs'),
    lazypipe     = require('lazypipe'),
    inky         = require('inky'),
    fs           = require('fs'),
    siphon       = require('siphon-media-query'),
    path         = require('path'),
    merge        = require('merge-stream'),
    colors       = require('colors');

const $ = plugins();

gulp.task('build',
    gulp.series(clean, pages, js, fonts, scss, images));

gulp.task('default',
    gulp.series('build', server, watch));

function clean(done) {
    rimraf('build', done);
}

function pages() {
    return gulp.src('src/pages/**/*.html')
        .pipe(panini({
            root: 'src/pages',
            layouts: 'src/layouts',
            partials: 'src/layouts-parts'
        }))
        .pipe(inky())
        .pipe(gulp.dest('build'));
}

function resetPages(done) {
    panini.refresh();
    done();
}

function scss() {
    return gulp.src(['src/public/css/*.scss', 'src/public/css/*.css'])
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('build/css'));
}

function images() {
    return gulp.src('src/public/img/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('./build/img'));
}
function js() {
    return gulp.src('src/public/js/**/*')
        .pipe(gulp.dest('./build/js'));
}
function fonts() {
    return gulp.src('src/public/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'));
}
function server(done) {
    browser.init({
        server: 'build'
    });
    done();
}

function watch() {
    gulp.watch('src/**/*.html').on('change', gulp.series(resetPages, pages, browser.reload));
    gulp.watch(['../css/**/*.scss', 'src/public/css/**/*.scss']).on('change', gulp.series(resetPages, scss, pages, browser.reload));
    gulp.watch('src/public/img/**/*').on('change', gulp.series(images, browser.reload));
    gulp.watch('src/public/js/**/*').on('change', gulp.series(js, browser.reload));
    gulp.watch('src/public/fonts/**/*').on('change', gulp.series(fonts, browser.reload));
}