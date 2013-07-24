module.exports = function(grunt) {
  var port = 8000,
      publicDir = './public',
      jsDir = publicDir + '/modules',
      lumbarFile = './lumbar.json',
      hostname = require('os').hostname;
  
  grunt.file.mkdir(publicDir);
  grunt.file.mkdir(jsDir);

  grunt.initConfig({
    // create a static webserver
    connect: {
      server: {
        options: {
          hostname: hostname,
          base: publicDir,
          port: port
        }
      }
    },
    lumbar: {
      // performs an initial build so when tests
      // and initial open are run, code is built
      init: {
        build: lumbarFile,
        output: jsDir
      },
      // a long running process that will watch
      // for updates, to include another long
      // running task such as "watch", set
      // background: true
      watch: {
        background: false,
        watch: lumbarFile,
        output: jsDir
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'js/!(lib)/*.js', 'test/!(support)/*.js']
    },

    mocha: {
      all: ['test/**/*.html']
    },

    build_test_runner: {
      all: ['test/**/*_test.js']
    }
  });
  
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('lumbar');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerMultiTask('build_test_runner', 'Creates a test runner file.', function(){
    var tmpl = grunt.file.read('test/support/runner.html.tmpl');
    var renderingContext = {
      data: {
        files: this.filesSrc.map(function(fileSrc){
          return fileSrc.replace('test/', '');
        })
      }
    };
    grunt.file.write('test/runner.html', grunt.template.process(tmpl, renderingContext));
  });

  grunt.registerTask('test', ['jshint', 'build_test_runner', 'mocha']);
  grunt.registerTask('default', [
    'lumbar:init',
    'connect:server',
    'lumbar:watch'
  ]);
};
