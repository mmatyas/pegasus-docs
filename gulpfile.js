'use strict';

const { src, dest, parallel, series, watch } = require('gulp'),
    cleancss = require('gulp-clean-css'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    terser = require('gulp-terser');


const DEST_PATH = 'build';
const htmlmin_config = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: false,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
};
const terser_config = {
    warnings: true,
    toplevel: true,
};


function html() {
    return src('site/**/*.html')
        .pipe(htmlmin(htmlmin_config))
        .pipe(dest(DEST_PATH))
}

function css() {
    return src('site/**/*.css')
        .pipe(cleancss())
        .pipe(dest(DEST_PATH))
}

function js() {
    return src('site/**/*.js')
        .pipe(terser(terser_config))
        .pipe(dest(DEST_PATH))
}

function img() {
    return src('site/**/*.{jpg,png}')
        .pipe(imagemin({ verbose: true }))
        .pipe(dest(DEST_PATH))
}

function data() {
    return src('site/**/*.{json,xml,eot,svg,ttf,woff,mustache,ico,webm}')
        .pipe(dest(DEST_PATH))
}


function clean(done) {
    del(DESTDIR);
    done();
}


exports.clean = clean;
exports.default = parallel(html, css, js, img, data);
exports.build = exports.default;
