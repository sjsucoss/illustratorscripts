module.exports = function (grunt) {
  "use strict";

  var directory = "/Users/mtw/Projects/sjsucoss/illustratorscripts/";

  grunt.initConfig({

    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: 'jsx/',
            src: '*',
            dest: "/Applications/Adobe Illustrator CC/Startup Scripts/",
            filter: "isFile"
          }
        ],
      },
    },

    // git add .
    gitadd: {
      task: {
        options: {
          all: true,
          cwd: directory
        }
      }
    },

    // git commit -m "Repository updated on <current date time>"
    gitcommit: {
      task: {
        options: {
          message: "Repository updated on <%= grunt.template.today() %>",
          allowEmpty: true,
          cwd: directory
        }
      }
    },

    // git push origin master
    gitpush: {
      task: {
        options: {
          remote: "origin",
          branch: "master",
          cwd: directory
        }
      }
    },

    jshint: {
      files: {
        src: ["gruntfile.js", "jsx/*.jsx", "js/*.js"]
      }
    },

    watch: {
      js: {
        files: ["jsx/*.jsx", "js/*.js"],
        tasks: ["jshint", "copy"]
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-git");

  grunt.registerTask("git", ["gitadd", "gitcommit", "gitpush"]);
  grunt.registerTask("default", ["watch"]);
};

