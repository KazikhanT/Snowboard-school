const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");
const imagemin     = require('gulp-imagemin');
const htmlmin      = require('gulp-htmlmin');


function server() {
    browserSync({
        server: {
            baseDir: "src"
        }
    });
}

function styles() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
}

function watch() {
    gulp.watch("src/scss/**/*.scss", gulp.parallel(styles));
    gulp.watch("src/*.html").on('change', browserSync.reload);
}

exports.dev = gulp.parallel(server, styles, watch);

//=============================================================================
//                          BUILD
//=============================================================================

function bStyles() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
}

function bHtml() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
}

function bScripts() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
}

function bFonts() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
}

function bIcons() {
    return gulp.src("src/icons/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/icons"));
}

function bImages() {
    return gulp.src("src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
}

exports.build = gulp.parallel(bStyles, bHtml, bScripts, bFonts, bIcons, bImages);