module.exports = function (grunt) {
  "use strict";

  var directory = "/Users/mtw/Projects/sjsucoss/illustratorscripts/";

  grunt.initConfig({


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
    }

  });

  grunt.loadNpmTasks("grunt-git");

  grunt.registerTask("git", ["gitadd", "gitcommit", "gitpush"]);
};

