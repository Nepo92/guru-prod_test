const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const path = {
  prod: {
    sass: 'app/static/css',
    js: 'app/static/js',
    img: 'app/static/img',
    fonts: 'app/static/fonts',
    html: 'app/templates',
  },
  dist: {
    css: '../alpha/src/main/resources/static/css',
    html: '../alpha/src/main/resources/templates',
    js: '../alpha/src/main/resources/static/js',
    img: '../alpha/src/main/resources/static/img',
    fonts: '../alpha/src/main/resources/static/fonts',
  },
};

function copyCss() {
  return gulp.src([`${path.prod.sass}/**/*.css`])
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest(`${path.dist.css}`));
}

function createCss() {
  return gulp.src([`${path.prod.sass}/**/*.scss`, `!${path.prod.sass}/**/_*.scss`])
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest(`${path.dist.css}`));
}

function createHtml() {
  return gulp.src(`${path.prod.html}/**/*.html`)
    .pipe(gulp.dest(`${path.dist.html}`));
}

function createFonts() {
  return gulp.src(`${path.prod.fonts}/**/*.+(ttf||woff||woff2)`)
    .pipe(gulp.dest(`${path.dist.fonts}`));
}

function createImg() {
  return gulp.src(`${path.prod.img}/**/*.+(svg||webp||png||jpg||jpeg||gif)`)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 10 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(gulp.dest(`${path.dist.img}`));
}

function createJs() {
  return gulp.src(`${path.prod.js}/**/*.js`)
    .pipe(gulp.dest(`${path.dist.js}`));
}

// function createSprite() {
//   return gulp.src('app/img/**/*.svg')
//     .pipe(svgmin({
//       js2svg: {
//         pretty: true,
//       },
//     }))
//     .pipe(cheerio({
//       run: function ($) {
//         $('[fill]').removeAttr('fill');
//         $('[stroke]').removeAttr('stroke');
//         $('[style]').removeAttr('style');
//       },
//       parserOptions: { xmlMode: true },
//     }))
//     .pipe(replace('&gt;', '>'))
//     .pipe(svgSprite({
//       mode: {
//         stack: {
//           sprite: '../sprite.svg',
//         },
//       },
//     }))
//     .pipe(gulp.dest('guru-prod'))
//     .pipe(browserSync.reload({ stream: true }));
// }

function observer() {
  gulp.watch('app/templates/**/*.html', gulp.parallel('html'));
  gulp.watch('app/static/css/**/*.scss', gulp.parallel('sass'));
  gulp.watch('app/static/js/**/*.js', gulp.parallel('js'));
}

gulp.task('watch', observer);

gulp.task('html', createHtml);

gulp.task('fonts', createFonts);

gulp.task('sass', createCss);

gulp.task('img', createImg);

gulp.task('js', createJs);

// gulp.task('spriteSVG', createSprite);

gulp.task('css', copyCss);

gulp.task('default', gulp.parallel('watch', 'sass', 'css', 'js', 'img', 'fonts', 'html'));
