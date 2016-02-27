module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			output: 'test/output'
		},
		jsfox: {
			test: {
				options: {
					concurrency: 2,
					stringsEncoding: 'escape-chars-x',
					replaceProperties: true,
					detachStrings: true,
					compact: true
				},
				files: {
					'test/output/test.js': [
						'test/testfile.js',
						'test/bind.js',
						'test/reduce.js'
					]
				}
			},
			fail: {
				files: {
					'test/output/fail.js': 'test/fail.js'
				}
			},
			bin: {
				files: {
					'test/output/bin.js': 'bin/jsfox'
				}
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', [
		'clean', 'jsfox'
	]);

};