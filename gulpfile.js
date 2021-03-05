const exec = require('child_process').exec;

const { series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync');

const server = browserSync.create();


// PRIVATE TASKS
// 

function serve(cb) {
  server.init({
    ui: false,
    server: {
      baseDir: './',
      routes: {
        '/': 'docs'
      }
    },
    ghostMode: false,
    online: false,
    open: "local"
  });

  cb();
}

function reload(cb) {
  server.reload();
  cb();
}

function compileSass() { return exec('npm run sass'); }
function compileJs() { return exec('npm run js'); }
function compileHtml() { return exec('npm run html'); }


// WATCHERS
// 

// Watch all relevant files and assign tasks to be
// completed in a series when any of them change.

watch('./_content/**/*.{md,html}', series(compileHtml, reload));
watch('./_site/templates/**/*.njk', series(compileHtml, reload));
watch('./_site/includes/scss/**/*.scss', series(compileSass, compileHtml, reload));
watch('./_site/includes/js/**/*.js', series(compileJs, compileHtml, reload));


// PUBLIC TASKS
// 

// When the following task is run: compile sass, js and html concurrently,
// then start the server, open the browser and watch all relevant files.
exports.serve = serve;
exports.watch = series(parallel(compileSass, compileJs, compileHtml), serve);
exports.default = exports.watch;
