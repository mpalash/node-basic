var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var base64 = require('gulp-base64');
var cssmin = require('gulp-cssmin');
var sketch = require('gulp-sketch');

var spawn = require('child_process').spawn;
var node;

gulp.task('sass', function() {
   return sass('scss/styles.scss', {
         sourcemap: true
      }).on('error', function(err) {
         console.error('Error!', err.message);
      })
      .pipe(autoprefixer({
         browsers: ['last 2 versions', 'ie 8', 'ie 9'],
         map: {
            inline: false
         }
      }))
      .pipe(base64({
        extensions: ['woff2','woff','svg']
      }))
      .pipe(cssmin({
         sourceMap: true
      }))
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('public/css/'))
});

gulp.task('icons', function() {
   return gulp.src('sketch/icons.sketch')
      .pipe(sketch({
         export: 'artboards',
         formats: 'svg'
      }))
      .pipe(gulp.dest('scss/svg/'));
});

gulp.task('server', function() {
   if (node) node.kill()
   node = spawn('node', ['app.js'], {
      stdio: 'inherit'
   })
   node.on('close', function(code) {
      if (code === 8) {
         gulp.log('Error detected, waiting for changes...');
      }
   });
});

gulp.task('scripts', function() {
   gulp.src([
         "bower_components/jquery/dist/jquery.min.js",
         "bower_components/jquery-ui/ui/minified/core.min.js",
         "bower_components/jquery-ui/ui/minified/widget.min.js",
         "bower_components/jquery-ui/ui/minified/mouse.min.js",
         "bower_components/jquery-ui/ui/minified/position.min.js",
         "bower_components/jquery-ui/ui/minified/draggable.min.js",
         "bower_components/jquery-ui/ui/minified/slider.min.js",
         "bower_components/fabric.js/dist/fabric.min.js",
         "public/js/remix-widget.js",
         "public/js/remix-db.js"
      ])
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest("public/js/"))
});
gulp.task('css-depends', function() {
   gulp.src([
      ])
      .pipe(concat('css-depends.min.css'))
      .pipe(gulp.dest("public/css/"))
});

gulp.task('start', function() {
   runSequence('sass', function() {
      runSequence('server')
      gulp.watch(['scss/*.scss'], function() {
         runSequence('sass')
      });
   });
});

gulp.task('watch', function() {
  gulp.watch(['scss/*.scss','sketch/*.sketch','public/js/*.js','gulpfile.js'], function() {
     runSequence('icons','sass','scripts')
  });
});
