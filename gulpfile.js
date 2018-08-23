var gulp = require("gulp"),
    utils = require("./utils"),
    argv = require('yargs').argv,
    mocha = require("gulp-mocha"),
    grep = require('gulp-grep');

gulp.task("run-test", function(){

    utils.initDriver();

    var filesPath =  "e2e/*.js";
    if(argv.file){
        filesPath = filesPath.replace(/\*\.js$/, argv.file + ".js");
    }

    gulp.src( filesPath, {read:false})
        .pipe(mocha({

            reporter: argv.reporter, //'xunit-file',

            timeout:5 * 60 * 1000,

            grep: new RegExp(argv.grep||'')
        }))
        .once('end', function(){

            utils.killDriver();
        })

});
