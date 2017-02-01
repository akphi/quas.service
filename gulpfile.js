let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let eslint = require('gulp-eslint');
let runSequence = require('run-sequence');

gulp.task('lint', () => {
  return gulp.src(['./**/*.js', '!node_modules/**'])
    .pipe(eslint()).pipe(eslint.format());
})

gulp.task('watch', () => {
  nodemon({
    script: 'app.js',
    "restartable": "rs",
    "ignore": [
      ".git",
      "node_modules/**/node_modules",
      "*.log*",
      "**/*.log*",
      "*.rdb"
    ],
    "verbose": false,
    "execMap": {},
    "events": {},
    "watch": [
      ".",
      ".env"
    ],
    "env": {
      "DEBUGER": "worker"
    },
    "ext": "js json"
  })
    .on('restart', ['lint']);
});

gulp.task('develop', (done) => {
  runSequence(['lint', 'watch'], done);
});