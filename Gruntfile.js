module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    browserify: {
      'dist/app.js': ['javascripts/app.js']
    },
    jshint: {
      files: ['javascripts/**/*.js'],
      options: {
        predef: ["document", "console", "_"],//Ignore these even though we haven't defined them
        esnext: true, //Telling to use latest version of javascript
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
    sass: {
      dist: {
        files: {
          'css/main.css': 'sass/sass.scss'
        }
      }
    },
    watch: {
      options: {
        reload: true
      },
      javascripts: {
        files: ['javascripts/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    clean: {
      options: { force: true },
      public: ['./public']
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          src: [
            "index.html",
            "images/*",
            "css/**/*.css",
            "partials/**/*.html",
            "node_modules/**/*",
            "javascripts/**/*.js",
            "dist/app.js"
          ],
          dest: "./public/"
        }]
      }
    }
  });

  require("matchdep").filter("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", ['jshint', 'sass', 'browserify', 'watch']);//Will do by default when you excecute grunt.
  grunt.registerTask('deploy', ['sass', 'copy']);
  grunt.registerTask('cleanit', ['clean']);
}