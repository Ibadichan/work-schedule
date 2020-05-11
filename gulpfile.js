const gulp = require("gulp");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");

const { src, dest, watch, parallel } = gulp;

function styles() {
  const plugins = [autoprefixer(), cssnano()];

  return src("./src/styles/main.less")
    .pipe(less())
    .pipe(postcss(plugins))
    .pipe(dest("./dist"));
}

function images() {
  return src("./src/img/*").pipe(imagemin()).pipe(dest("dist/img"));
}

function start() {
  watch("./src/styles/**/*.less", { ignoreInitial: false }, styles);
  watch("./src/img/*", { ignoreInitial: false }, images);
}

const build = parallel(styles, images);

module.exports.start = start;
module.exports.build = build;
module.exports.default = build;
