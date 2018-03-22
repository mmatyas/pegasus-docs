'use strict';

// Creates an optimized release from the mkdocs build


let del = require('del');
let gulp = require('gulp');
let gulpLoadPlugins = require('gulp-load-plugins');
var pump = require('pump');
let runSequence = require('run-sequence');

const $ = gulpLoadPlugins();


let DEST_PATH = 'build-dist';

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


gulp.task('html', callback => {
  pump([
      gulp.src('site/**/*.html'),
      $.htmlmin(htmlminConfig),
      $.size({title: 'html', showFiles: true}),
      gulp.dest(DEST_PATH),
    ],
    callback
  );
});

gulp.task('css', callback => {
  pump([
      gulp.src('site/**/*.css'),
      $.cleanCss(),
      $.size({title: 'css'}),
      gulp.dest(DEST_PATH),
    ],
    callback
  );
});

gulp.task('js', callback => {
  pump([
      gulp.src('site/**/*.js'),
      $.uglifyEs.default(),
      $.size({title: 'js'}),
      gulp.dest(DEST_PATH)
    ],
    callback
  );
});

gulp.task('images', callback => {
  pump([
      gulp.src('site/**/*.{jpg,png}'),
      $.imagemin({verbose: true}),
      $.size({title: 'images'}),
      gulp.dest(DEST_PATH),
    ],
    callback
  );
});

gulp.task('data', callback => {
  pump([
      gulp.src('site/**/*.{json,xml,eot,svg,ttf,woff,mustache,ico,webm}'),
      $.size({title: 'data'}),
      gulp.dest(DEST_PATH),
    ],
    callback
  );
});

gulp.task('clean', () => del([DEST_PATH + '/*']));


function do_build(callback) {
  runSequence(
    'clean',
    ['html', 'css', 'js', 'images', 'data'],
    callback
  );
}

gulp.task('default', callback => do_build(callback));
gulp.task('build', callback => do_build(callback));
