"usestrict";

let gulp = require("gulp");
let util = require("gulp-util");
let nodemon = require("gulp-nodemon");
let eslint = require("gulp-eslint");
let runSequence = require("run-sequence");

let APP_SRC = __dirname;

gulp.task("eslint", () => {
  return gulp.src(["./src/**/*.js", "!node_modules/**", "!deployment/**"])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("move", () => {
  return gulp.src(["./src/**", "!./src/**/*.js"])
    .pipe(gulp.dest("./build"));
});


gulp.task("develop.start", () => {
  nodemon({
    script: "src/app.js",
    quiet: true,
    restartable: "rs",
    ignore: [
      ".git",
      "node_modules/**/node_modules",
      "./deployment",
      "*.log*",
      "**/*.log*",
      "*.rdb"
    ],
    execMap: {},
    events: {},
    watch: [
      ".",
      ".env"
    ],
    env: {
      "DEBUGER": "worker"
      // For debug module to load
    },
    tasks: (changedFiles) => {
      let tasks = [];
      if (changedFiles) {
        tasks = ["eslint"]
        changedFiles.forEach((file) => {
          util.log("File changed", util.colors.magenta(file));
        });
      }
      return tasks;
    }
  })
});

gulp.task("develop", (done) => {
  runSequence("eslint", "develop.start", done);
});