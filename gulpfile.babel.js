'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import runSequence from 'gulp-run-sequence'
import rename from 'gulp-rename'

import yarn from 'gulp-yarn'
import ngConstant from 'gulp-ng-constant'
import sass from 'gulp-sass'
import htmlToJs from 'gulp-angular-html2js'
import concat from 'gulp-concat'
import minify from 'gulp-babel-minify'
import clean from 'gulp-clean'
import nodemon from 'gulp-nodemon'
import karma from 'karma'

import config from './public/config/env.js'

const karmaServer = karma.Server

gulp.task('yarn', () => {
  return gulp.src(['./package.json'])
    .pipe(yarn())
})

gulp.task('constants:dev', () => {
  const envConf = config['development']
  return ngConstant({
    name: 'dashboard',
    constants: envConf,
    stream: true,
    deps: false,
    wrap: true
  })
  .pipe(rename({
    basename: 'config'
  }))
  .pipe(gulp.dest('public/dist'))
})

gulp.task('constants:sand', () => {
  const envConf = config['sandbox']
  return ngConstant({
    name: 'dashboard',
    constants: envConf,
    stream: true,
    deps: false,
    wrap: true
  })
  .pipe(rename({
    basename: 'config'
  }))
  .pipe(gulp.dest('public/dist'))
})

gulp.task('constants', () => {
  const envConf = config['production']
  return ngConstant({
    name: 'dashboard',
    constants: envConf,
    stream: true,
    deps: false,
    wrap: true
  })
  .pipe(rename({
    basename: 'config'
  }))
  .pipe(gulp.dest('public/dist'))
})

gulp.task('copyJs', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-br-filters/release/angular-br-filters.min.js',
    'node_modules/angular-chart.js/dist/angular-chart.min.js',
    'node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js',
    'node_modules/angular-loaders/dist/angular-loaders.min.js',
    'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
    'node_modules/angular-locale-pt-br/angular-locale_pt-br.js',
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'node_modules/angular-modal-service/dst/angular-modal-service.min.js',
    'node_modules/angular-moment/angular-moment.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/angular-table/dist/angular-table.min.js',
    'node_modules/angular-validation-match/dist/angular-validation-match.min.js',
    'node_modules/zxcvbn/dist/zxcvbn.js',
    'node_modules/angular-zxcvbn/dist/angular-zxcvbn.min.js',
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/daemonite-material/js/material.min.js',
    'node_modules/chart.js/dist/Chart.min.js',
    'node_modules/string-mask/src/string-mask.js',
    'node_modules/ngstorage/ngStorage.min.js',
    'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
    'node_modules/bootstrap-layout/dist/bootstrap-layout.js',
    'node_modules/moment/min/moment.min.js',
    'node_modules/socket.io-client/dist/socket.io.js',
    'node_modules/moment/locale/pt-br.js',
    'node_modules/@cgross/angular-notify/dist/angular-notify.min.js',
    'node_modules/cloudinary-core/cloudinary-core-shrinkwrap.min.js',
    'node_modules/cloudinary_ng/js/angular.cloudinary.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/angular-slick-carousel/dist/angular-slick.min.js'
  ])
    .pipe(gulp.dest('public/vendors/js'))
})

gulp.task('copyCss', () => {
  return gulp.src([
    'node_modules/bootstrap-layout/dist/bootstrap-layout.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/loaders.css/loaders.min.css',
    'node_modules/@cgross/angular-notify/dist/angular-notify.min.css',
    'node_modules/slick-carousel/slick/slick-theme.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/daemonite-material/css/material.min.css',
    'node_modules/slick-carousel/slick/ajax-loader.gif',
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
    .pipe(gulp.dest('public/vendors/css'))
})

gulp.task('copySlickFonts', () => {
  return gulp.src([
    'node_modules/slick-carousel/slick/fonts/slick.eot',
    'node_modules/slick-carousel/slick/fonts/slick.svg',
    'node_modules/slick-carousel/slick/fonts/slick.ttf',
    'node_modules/slick-carousel/slick/fonts/slick.woff'
  ])
    .pipe(gulp.dest('public/vendors/css/fonts'))
})

gulp.task('copyFonts', () => {
  return gulp.src([
    'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
    'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
    'node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
    'node_modules/font-awesome/fonts/FontAwesome.otf'
  ])
    .pipe(gulp.dest('public/vendors/fonts'))
})

gulp.task('sass', () => {
  return gulp.src('public/app/assets/sass/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      dirname: '/',
      basename: 'app',
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('htmlToJs', () => {
  gulp.src(["public/app/views/**/*.html","public/app/directives/**/*.html"])
      .pipe(htmlToJs({
          moduleName:function(filename,subpath){
              return subpath.replace(/^public\/app\//,'')
          },
          templateUrl: function (filename) {
              return 'templates/'+filename
          },
          rename:function(fileName){
              return fileName+'.js'
          }
      }))
      .pipe(gulp.dest('public/tmp'))
})

gulp.task('concat', () => {
  return gulp.src(['public/app/**/*.js', 'public/tmp/**/*.html.js', 'public/dist/config.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat({
      newLine: ';',
      path: 'app.js'
    }))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('minify', () => {
  return gulp.src('public/dist/app.js')
    .pipe(minify({
      mangle: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('clean', () => {
  return gulp.src(['public/tmp','public/dist/app.css','public/dist/config.js','public/dist/app.js'], {read: false})
    .pipe(clean({force: true}))
})

gulp.task('nodemon:dev', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: [
      'node_modules/',
      'public/'
    ],
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('nodemon:sand', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: [
      'node_modules/',
      'public/'
    ],
    env: { 'NODE_ENV': 'sandbox' }
  })
})

gulp.task('nodemon', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: [
      'node_modules/',
      'public/'
    ],
    env: { 'NODE_ENV': 'production' }
  })
})

gulp.task('watch:dev', () => {
  gulp.watch('gulpfile.babel.js', () => {
    runSequence('yarn',['copyJs','copyCss','copySlickFonts','copyFonts'],['constants:dev','sass','htmlToJs'],'concat','minify')
  })
  gulp.watch(['public/app/**/*.html','public/app/**/*.js'], () => {
    runSequence('htmlToJs','concat','minify')
  })
  gulp.watch('public/app/assets/sass/*.scss',['sass'])
})

gulp.task('watch:sand', () => {
  gulp.watch('gulpfile.babel.js', () => {
    runSequence('yarn',['copyJs','copyCss','copySlickFonts','copyFonts'],['constants:sand','sass','htmlToJs'],'concat','minify')
  })
  gulp.watch(['public/app/**/*.html','public/app/**/*.js'], () => {
    runSequence('htmlToJs','concat','minify')
  })
  gulp.watch('public/app/assets/sass/*.scss',['sass'])
})

gulp.task('watch', () => {
  gulp.watch('gulpfile.babel.js', () => {
    runSequence('yarn',['copyJs','copyCss','copySlickFonts','copyFonts'],['constants','sass','htmlToJs'],'concat','minify')
  })
  gulp.watch(['public/app/**/*.html','public/app/**/*.js'], () => {
    runSequence('htmlToJs','concat','minify')
  })
  gulp.watch('public/app/assets/sass/*.scss',['sass'])
})

gulp.task('test', (done) => {
  karmaServer.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, () => { done() })
})

gulp.task('dev', () => {
  runSequence('yarn',['copyJs','copyCss','copySlickFonts','copyFonts'],['constants:dev','sass','htmlToJs'],'concat','minify',['nodemon:dev','watch:dev'])
})

gulp.task('sand', () => {
  runSequence('yarn',['copyJs','copyCss','copySlickFonts','copyFonts'],['constants:sand','sass','htmlToJs'],'concat','minify','clean',['nodemon:sand','watch:sand'])
})

gulp.task('default', () => {
  runSequence('yarn',['copyJs','copyCss','copySlickFonts','copyFonts'],['constants','sass','htmlToJs'],'concat','minify','clean',['nodemon','watch'])
})
