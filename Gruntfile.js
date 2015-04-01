'use strict';
module.exports = function(grunt){
    require('time-grunt')(grunt);
    grunt.initConfig({
        processhtml:{
            production:{
                files: {
                    'prod/public/index.html': ['dev/public/index.html']
                }
            }
        },
        requirejs: {
            production: {
                options: {
                    findNestedDependencies: true,
                    baseUrl: "dev/public/assets/js/",
                    name:"require_main",
                    mainConfigFile: "dev/public/assets/js/require_main.js",
                    out: "prod/public/app.js",
                    wrapShim: true,
                    preserveLicenseComments: false
                }
            }
        },
        copy: {
            production: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dev/public/bower_components/bootstrap/dist/fonts/*'],
                    dest: 'prod/public/fonts/',
                    filter: 'isFile'
                }]
            }
        },
        concat: {
            production: {
                    src: ['dev/public/bower_components/requirejs/require.js', 'prod/public/app.js'],
                    dest: 'prod/public/app.js'
            }
        },
        uglify: {
            production: {
                src: ['dev/public/bower_components/requirejs/require.js', 'prod/public/app.js'],
                dest: 'prod/public/app.js'
            }
        },
        cssmin:{
            production: {
                files: [{
                    src: ['dev/public/bower_components/bootstrap/dist/css/bootstrap.min.css','dev/public/assets/css/main.css'],
                    dest: 'prod/public/app.css'
                 }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['processhtml','requirejs','copy','concat','uglify','cssmin']);
};