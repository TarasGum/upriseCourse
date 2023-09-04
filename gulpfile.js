const { 
src, 
dest, 
parallel, 
series, 
watch
} = require('gulp');

// Load plugins

const cssnano = require('gulp-cssnano');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create()
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');


function clear() {
return src('./build/*',{
 read: false
})
.pipe(clean());
}

//css

function css() {
const source = './src/styles/styles.css';
 return src(source)
.pipe(changed(source)) 
.pipe(cssnano())
.pipe(dest('./build/styles/'))
.pipe(browsersync.stream());
}

// image optimize

function img() {
return src('./src/img/*') 
//.pipe(imagemin())
.pipe(dest('./build/img'))
}

// html
function html() {
return src('./src/*.html') 
.pipe(dest('./build/'))
.pipe(browsersync.stream());
}

// Watch files
function watchFiles() { 
watch('./src/styles/*.css', css);
watch('./src/*.html', html);
watch('./src/img/*', img);
}

// BrowserSync
function browserSync() { 
    browsersync.init(
        {
            server: {
                baseDir:'./build'
            }, port:3000
        }
    )

}


exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(html, css, img));