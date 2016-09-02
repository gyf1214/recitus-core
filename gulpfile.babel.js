import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

const js = 'src/**/*.js';

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('build', () => {
  return gulp.src(js)
             .pipe(sourcemaps.init({loadMaps: true}))
             .pipe(babel({presets: ['es2015-node4']}))
             .on('error', handleError)
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('.'));
});

gulp.task('watch', () => {
  gulp.watch(js, ['build']);
});
