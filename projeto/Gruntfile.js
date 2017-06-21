module.exports = function (grunt) {

    grunt.initConfig({

        clean: {
            dist: 'dist',
            distCssMin: ['dist/css/*.css', '!dist/css/*.min.css'],
            distJsMin: ['dist/js/*.js', '!dist/js/*.min.js'],
            distCoffeeMin: 'dist/coffee',
            distLessMin: 'dist/less',
            publicCoffee: 'public/js/*.coffee.js',
            publicLess: 'public/css/*.less.css'
        },

        copy: {
            public: {
                expand: true,
                cwd: 'public',
                src: '**',
                dest: 'dist'
            },

            less : {
                expand: true,
                cwd: 'public/less',
                src: '**',
                dest: 'dist/less'
            },

            coffee: {
                expand: true,
                cwd: 'public/coffee',
                src: '**',
                dest: 'dist/coffee'
            }
        },

        useminPrepare: {
            html: 'dist/**/*.html'
        },

        usemin: {
            html: 'dist/**/*.html'
        },

        imagemin: {
            public: {
                expand: true,
                cwd: 'dist/img',
                src: '**/*.{png,jpg,gif}',
                dest: 'dist/img'
            }
        },

        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            imagens: {
                src: ['dist/img/**/*.{png,jpg,gif}']
            },
            minificados: {
                src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
            }

        },

        coffee: {
            compilarDist: {
                expand: true,
                cwd: 'dist/coffee',
                src: ['**/*.coffee'],
                dest: 'dist/js',
                ext: '.coffee.js'
            },

            compilar: {
                expand: true,
                cwd: 'public/coffee',
                src: ['**/*.coffee'],
                dest: 'public/js',
                ext: '.coffee.js'
            }
        },

        less: {
            compilarDist: {
                expand: true,
                cwd: 'dist/less',
                src: ['**/*.less'],
                dest: 'dist/css',
                ext: '.less.css'
            },

            compilar: {
                expand: true,
                cwd: 'public/less',
                src: ['**/*.less'],
                dest: 'public/css',
                ext: '.less.css'
            }
        },

        //
        // watch
        //
        watch: {
            coffee: {
                options : {
                    event: ['added', 'changed']
                },
                files: 'public/coffee/**/*.coffee',
                tasks: ['dist', 'compile', 'min', 'cleanDistMin']
            },

            less: {
                options : {
                    event: ['added', 'changed']
                },
                files: 'public/less/**/*.less',
                tasks: ['dist', 'compile', 'min', 'cleanDistMin']
            }
        }
    })

    grunt.registerTask('prepareDist', ['clean:dist', 'copy'])

    grunt.registerTask('cleanDistMin', ['clean:distCssMin', 'clean:distJsMin', 'clean:distLessMin', 'clean:distCoffeeMin'])

    grunt.registerTask('compile', ['less:compilarDist', 'coffee:compilarDist'])
    grunt.registerTask('compileLocal', ['less:compilar', 'coffee:compilar'])

    grunt.registerTask('min', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'rev:imagens', 'rev:minificados', 'usemin', 'imagemin'])

    //
    // DEFAULT
    //
    grunt.registerTask('default', ['prepareDist', 'compile', 'min', 'cleanDistMin'])

    //
    // LOCAL
    //
    grunt.registerTask('local', ['compileLocal'])
    grunt.registerTask('cleanLocal', ['clean:publicCoffee', 'clean:publicLess'])

    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-imagemin')
    grunt.loadNpmTasks('grunt-contrib-coffee')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-usemin')
    grunt.loadNpmTasks('grunt-rev')

}