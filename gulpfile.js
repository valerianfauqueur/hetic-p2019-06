var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sync = require('browser-sync').create(),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel'),
  nodemon = require('gulp-nodemon'),
  runSequence = require('run-sequence'),
  imageOptimizer = require('gulp-image'),
  eslint = require('gulp-eslint'),
  sasslint = require('gulp-sass-lint');

var processors = [
  autoprefixer,
];

var dirs = {
  src: 'public/',
  dist: 'dist/',
};

gulp.task('scss', function() {
  return gulp.src(dirs.src + '/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest(dirs.dist + 'css'))
    .pipe(sync.stream());
});

gulp.task('ES6', function() {
  return gulp.src(dirs.src + '/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(dirs.dist + 'js'));
});

gulp.task('imgOptimiz', function() {
  return gulp.src(dirs.src + 'img/**/*')
    .pipe(imageOptimizer())
    .pipe(gulp.dest(dirs.dist + 'img'));
});

gulp.task('eslint', function() {
  return gulp.src([dirs.src + 'js/**/*.js', './server.js', 'app/**/*.js', '!views/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scsslint', function() {
  return gulp.src(dirs.src + 'scss/**/*.scss')
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

gulp.task('sync', ['ES6', 'scss', 'imgOptimiz', 'eslint', 'scsslint'], function() {
  sync.init(null, {
    proxy: 'http://localhost:3300',
  });
  gulp.watch(dirs.src + '/scss/**/*.scss', ['scss', 'scsslint']);
  gulp.watch(dirs.src + '/js/**/*.js', ['ES6', 'eslint']).on('change', sync.reload);
  gulp.watch('app/views/**/*.ejs').on('change', sync.reload);
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

gulp.task('default', ['sync'], function() {
  console.log('Starting...');
  runSequence('nodemon');
});
