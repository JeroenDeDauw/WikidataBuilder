'use strict';

var WikidataBuilder = require('./../../src/WikidataBuilder');
var grunt = require('grunt');
var path = require('path');
var config = require('./../../config');

var BUILD_DIR = '/tmp/wdb-build/';

exports.testCase = {

	'run the build': function(test) {
		var buildName = Math.round((new Date()).getTime() / 1000).toString();

		var builder = new WikidataBuilder(
			grunt,
			{
				'buildDir': BUILD_DIR,
				'buildName': buildName,
				'resourceDir': config.RESOURCE_DIR,
				'composerCommand': config.COMPOSER_COMMAND
			}
		);

		test.expect(1);

		builder.once(
			'done',
			function() {
				var vendorPath = path.resolve(BUILD_DIR, buildName, 'vendor');

				test.ok(
					grunt.file.exists(vendorPath),
					'The vendor path should exist: ' + vendorPath
				);
				test.done();
			}
		);

		builder.build();
	}

};