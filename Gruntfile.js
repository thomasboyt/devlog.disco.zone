module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    secret: grunt.file.readJSON('secret.json'),

    // TODO: This won't rm removed resources automatically!
    sftp: {
      options: {
        path: '<%= secret.path %>',
        host: '<%= secret.host %>',
        username: '<%= secret.username %>',
        agent: process.env.SSH_AUTH_SOCK,
        showProgress: true,
        srcBasePath: '_site/',
        createDirectories: true
      },

      all: {
        files: {
          './': ['_site/**']
        }
      }
    },

    exec: {
      build: 'jekyll b'
    }

  });

  grunt.registerTask('deploy', ['exec:build', 'sftp']);
};
