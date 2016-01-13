/* DEPENDENCIES */

// var gulp = require('gulp'),
//     browserSync = require('browser-sync');

// var plugins = require('gulp-load-plugins')(); 
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import assign from 'lodash.assign';
import path from 'path';
import watchify from 'watchify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins({
    rename: {
        'gulp-util': 'gutil'
    }
});
const reload = browserSync.reload;


/* FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER) */
var PATHS = {
    root: '/',
    app: 'app',
    app_html: '',
    app_assets: '',
    app_htmlTemplates: '',
    app_styles: '',
    app_images: '',
    app_scripts: '',
    app_fonts: '',
    dist: 'dist',
    dist_html: '',
    dist_assets: '',
    dist_htmlTemplates: '',
    dist_styles: '',
    dist_images: '',
    dist_scripts: '',
    dist_fonts: ''
   
};

// PATHS.app = path.join(PATHS.root, 'app');
// PATHS.dist = path.join(PATHS.root, 'dist');

PATHS.app_html = path.join(PATHS.app);
PATHS.app_assets = path.join(PATHS.app, 'assets');
PATHS.app_htmlTemplates = path.join(PATHS.app, 'html-templates');
PATHS.app_styles = path.join(PATHS.app_assets, 'styles');
PATHS.app_images = path.join(PATHS.app_assets, 'images');
PATHS.app_scripts = path.join(PATHS.app_assets, 'scripts');
PATHS.app_fonts = path.join(PATHS.app_assets, 'fonts');

PATHS.dist_html = path.join(PATHS.dist);
PATHS.dist_assets = path.join(PATHS.dist, 'assets');
PATHS.dist_htmlTemplates = path.join(PATHS.dist, 'html-templates');
PATHS.dist_styles = path.join(PATHS.dist_assets, 'styles');
PATHS.dist_images = path.join(PATHS.dist_assets, 'images');
PATHS.dist_scripts = path.join(PATHS.dist_assets, 'scripts');
PATHS.dist_fonts = path.join(PATHS.dist_assets, 'fonts');

gulp.task('styles', () => {
    return gulp.src( path.join(PATHS.app_styles, '**/*.scss') )
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe($.sourcemaps.write('maps'))
        .pipe(gulp.dest( PATHS.dist_styles ))
        .pipe(reload({
            stream: true
        }));
});

// add custom browserify options here
var customOpts = {
    entries: [path.join( PATHS.app_scripts, 'main.js' )],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify));

gulp.task('js-bundle', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
// b.on('log', $.gutil.log); // output build logs to terminal
b.on('log', function(message){
    $.gutil.log($.gutil.colors.green('Browserify'), message);
});


function bundle() {
    return b.bundle()
    // log errors if they happen
    // .on('error', $.gutil.log.bind($.gutil, 'Browserify Error'))
    .on('error', function(err){
        $.gutil.log($.gutil.colors.red('Browserify'), err.toString());
        $.gutil.beep();
    })
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe($.sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe($.sourcemaps.write('maps')) // writes .map file
    .pipe(gulp.dest(PATHS.dist_scripts));
}

gulp.task('fileinclude', function() {
  gulp.src([path.join(PATHS.app, '*.html'), path.join(PATHS.app_htmlTemplates, '**/*.html')])
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: PATHS.app_htmlTemplates
    }))
    .pipe(gulp.dest(PATHS.dist_html));
});

/* BROWSER SYNC */

gulp.task('browser-sync', function() {
    browserSync.init({ 
        server: {
            baseDir: 'dist',
            routes: {
                '/bower_components': 'bower_components',
                '/node_modules' : 'node_modules'
            }
        }
    });
});


/* GULP TASKS */
gulp.task('watch', function (){
    gulp.watch([
        'app/images/**/*',
        'dist/*.html',
        'dist/assets/scripts/bundle.js'
    ]).on('change', reload);
    gulp.watch(path.join(PATHS.app_html, '*.html'), ['fileinclude'])
    gulp.watch([path.join(PATHS.app_styles, '**/*.scss') ], ['styles']);
    gulp.watch([path.join(PATHS.app_scripts, '**/*.js')], ['js-bundle']);
});



gulp.task('default', ['watch', 'fileinclude', 'js-bundle', 'styles', 'browser-sync']);
