require("xunit-file");

module.exports = function (grunt) {
  grunt.initConfig({
    simplemocha: {
      options: {
        globals: ["should"],
        timeout: 30000,
        ignoreLeaks: false,
        ui: "bdd",
        reporter: "xunit-file"
      },
      all: { src: ["./test.js"] }
    }
  });
  grunt.loadNpmTasks("grunt-express-server");
  grunt.loadNpmTasks("grunt-simple-mocha");
  grunt.registerTask("default", ["simplemocha:all"]);
};
