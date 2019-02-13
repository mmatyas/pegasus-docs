'use strict';

const gulp = require('gulp'),
    cleancss = require('gulp-clean-css'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify-es').default;


const DEST_PATH = 'build';
const htmlminConfig = {
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


gulp.task('html', () => gulp
    .src('site/**/*.html')
    .pipe(htmlmin(htmlminConfig))
    .pipe(gulp.dest(DEST_PATH))
);

gulp.task('css', () => gulp
    .src('site/**/*.css')
    .pipe(cleancss())
    .pipe(gulp.dest(DEST_PATH))
);

gulp.task('js', () => gulp
    .src('site/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(DEST_PATH))
);

gulp.task('img', () => gulp
    .src('site/**/*.{jpg,png}')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest(DEST_PATH))
);

gulp.task('data', () => gulp
    .src('site/**/*.{json,xml,eot,svg,ttf,woff,mustache,ico,webm}')
    .pipe(gulp.dest(DEST_PATH))
);


gulp.task('clean', () => del([DEST_PATH + '/*']));

gulp.task('default', ['html', 'css', 'js', 'img', 'data']);
gulp.task('build', ['default']);
