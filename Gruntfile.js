module.exports = function (grunt) {
    'use strict';

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: '.',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/*'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            dist: [
                'Gruntfile.js',
                '<%= config.app %>/src/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                verbose: true
            }
        },

        jscs: {
            dist: [
                'Gruntfile.js',
                '<%= config.app %>/src/**/*.js'
            ],
            options: {
                config: '.jscsrc',
                verbose: true
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/jquery.showLoading.min.js': ['src/jquery.showLoading.js']
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'assets/*'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('build', [
        'clean',
        'default',
        'uglify',
        'copy'
    ]);
};
