module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-watch");
    var jsSrc = 'src/js/*.js';
    var jsDist = 'build/js/name_of_the_script.js';
    var jsDistMin = 'build/js/name_of_the_script.min.js';
    grunt.initConfig({
      /*sass: {
        dist: {
          options: {
            style: "expanded"
          },
          files: [
            {
              expand: true,
              cwd: "src/css/",
              src: ["*.scss"],
              dest: "build/css/",
              ext: ".css"
            }
          ]
        },
        dev: {} // À vous de le faire ! vous verrez que certaines options Sass sont plus intéressantes en mode dev que d'autres.
      },*/
      concat: {
        options: {
          separator: ";"
        },
        compile: {
          // On renomme vu qu'on n'a pas de mode dev/dist. Dist étant une autre tâche : uglify
          src: jsSrc, // Vu qu'on doit l'utiliser deux fois, autant en faire une variable.
          dest: jsDist // Il existe des hacks plus intéressants mais ce n'est pas le sujet du post.
        }
      },
      uglify: {
        options: {
          separator: ";"
        },
        compile: {
          src: jsDist,
          dest: jsDistMin
        }
      },
      watch: {
        js: {
          files: "**/*.js",
          tasks: ["js:dev"]
        }
      }
    });
  
    //grunt.registerTask("default", ["dev", "watch"]);
    grunt.registerTask('default', ['concat','uglify']);
    //grunt.registerTask('default', ['concat']);
    
    grunt.registerTask("dev", "js:dev");
    grunt.registerTask("dist", ["css:dist", "js:dist"]);
  
    // J'aime bien avoir des noms génériques
    grunt.registerTask("js:dev", ["concat:compile"]);
    grunt.registerTask("js:dist", ["uglify:compile"]);
  
    //grunt.registerTask("css:dev", ["sass:dev"]);
    //grunt.registerTask("css:dist", ["sass:dist"]);
  };