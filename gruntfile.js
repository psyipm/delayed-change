module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            all: {
                src: ['Gruntfile.js', 'karma.conf.js', 'test/**/*.js', 'src/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/delayed_change.min.js': ['src/delayed_change.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dist', ['uglify']);
};
