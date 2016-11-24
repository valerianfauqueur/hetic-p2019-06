var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sync = require('browser-sync').create(),
  postcss = require('gulp-postcss'),
  pxtorem = require('postcss-pxtorem'),
  autoprefixer = require('autoprefixer'),
  nodemon = require('gulp-nodemon'),
  runSequence = require('run-sequence'),
  imageOptimizer = require('gulp-image'),
  eslint = require('gulp-eslint'),
  plumber = require('gulp-plumber'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  uglifyjs = require('gulp-uglifyjs'),
  uglifycss = require('gulp-uglifycss');

var processors = [
  autoprefixer,
  pxtorem,
];

var dirs = {
  src: 'public/',
  dist: 'dist/',
  app: 'app/',
};

dirs.clientJs = dirs.src + 'js';
dirs.jsComponents = dirs.clientJs + '/components';
dirs.jsControllers = dirs.clientJs + '/controllers';
dirs.scss = dirs.src + 'scss';
dirs.img = dirs.src + 'img';
dirs.distCss = dirs.dist + 'css';
dirs.distJs = dirs.dist + 'js';
dirs.distImg = dirs.dist + 'img';
dirs.distFonts = dirs.dist + 'fonts';
dirs.serverJs = dirs.app;
dirs.views = dirs.app + 'views';
dirs.fonts = dirs.src + 'fonts';

gulp.task('scss', function() {
  return gulp.src(dirs.scss + '/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(uglifycss())
    .pipe(gulp.dest(dirs.distCss))
    .pipe(sync.stream());
});

gulp.task('bundle', function() {
  gulp.src(dirs.clientJs + '/main.js')
    .pipe(webpackStream({
        output: {
          path: '/dist/js',
          filename: 'bundle.js'
        },
        resolve: {
          extensions: ['', '.js'],
          modulesDirectories: [
            'node_modules'
          ]
        },
        module: {
          loaders: [{
            loader: 'babel-loader',
            query: { presets: ['es2015'] },
            exclude: ['./node_modules'],
          }]
        },
        plugins: [
          new webpack.NoErrorsPlugin()
        ],
    }))
    .on('error', (err) => {
      console.log(err)
    })
    .pipe(uglifyjs())
    .pipe(gulp.dest(dirs.distJs));
});

gulp.task('moveFonts', function() {
    return gulp.src(dirs.fonts + '/**/*')
      .pipe(gulp.dest(dirs.distFonts));
});

gulp.task('imgOptimiz', function() {
  return gulp.src(dirs.img + '/**/*')
    .pipe(imageOptimizer())
    .pipe(gulp.dest(dirs.distImg));
});

gulp.task('eslint', function() {
  return gulp.src([dirs.clientJs + '/**/*.js', dirs.serverJs + '/**/*.js', '!' + dirs.views + '/**'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sync', ['bundle', 'scss', 'eslint'], function() {
  sync.init(null, {
    proxy: 'http://localhost:3300',
  });
  gulp.watch(dirs.scss + '/**/*.scss', ['scss']);
  gulp.watch(dirs.clientJs + '/**/*.js', ['bundle', 'eslint']).on('change', sync.reload);
  gulp.watch(dirs.views + '/**/*.ejs').on('change', sync.reload);
});

gulp.task('nodemon', function(cb) {
  var callbackCalled = false;
  return nodemon({ script: './server.js' }).on('start', function() {
    if (!callbackCalled) {
      callbackCalled = true;
      cb();
    }
  });
});

gulp.task('default', ['imgOptimiz', 'moveFonts', 'sync'], function() {
  runSequence('nodemon');
});
