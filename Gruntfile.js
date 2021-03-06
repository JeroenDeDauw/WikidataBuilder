'use strict';

var appConfig = require('./appConfig')();

module.exports = function(grunt) {

	grunt.option('stack', true);

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['integrate']);

	grunt.initConfig({
		nodeunit: {
			quick: {
				src: ['test/quick/**/*Test.js']
			},
			slow: {
				src: ['test/slow/**/*Test.js']
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			projectBase: {
				src: ['*.js', '*.json']
			},
			all: {
				src: [
					'src/**/*.js',
					'test/**/*.js',
					'*.json'
				]
			}
		},

		watch: {
			all: {
				files: '<%= jshint.all.src %>',
				tasks: ['quick']
			},
			projectBase: {
				files: '<%= jshint.projectBase.src %>',
				tasks: ['jshint:projectBase']
			}
		}
	});

	grunt.task.registerTask(
		'test',
		['jshint', 'nodeunit']
	);

	grunt.task.registerTask(
		'integrate',
		['test']
	);

	grunt.task.registerTask(
		'quick',
		['jshint', 'nodeunit:quick']
	);

	grunt.task.registerTask(
		'build',
		'Create a new build',
		function(buildName, packageName, packageVersion) {
			var BuildTask = require('./src/task/BuildTask');
			var task = new BuildTask(appConfig);

			task.run(
				{
					'buildName': buildName,
					'packageName': packageName,
					'packageVersion': packageVersion
				},
				grunt.log.writeln,
				this.async()
			);
		}
	);

	grunt.task.registerTask(
		'mkconf',
		'Create default new configuration',
		function(configName) {
			if ( !configName ) {
				grunt.fail.fatal('Need to provide a config name');
			}

			var MakeConfigTask = require('./src/task/MakeConfigTask');
			var task = new MakeConfigTask(appConfig);

			task.run(
				{
					'configName': configName
				},
				this.async()
			);
		}
	);

	grunt.task.registerTask(
		'clean',
		'Remove all resources generated by this app, including builds',
		function() {
			var CleanTask = require('./src/task/CleanTask');
			var task = new CleanTask(appConfig);

			task.run(
				grunt.log.writeln,
				this.async()
			);
		}
	);

	grunt.task.registerTask(
		'rebuild',
		'Run clean followed by build with the provided arguments',
		function() {
			grunt.task.run([
				'clean',
				['build'].concat(Array.prototype.slice.call(arguments)).join(":")
			]);
		}
	);

};
