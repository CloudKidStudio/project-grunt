module.exports = function(grunt)
{
	grunt.registerTask(
		'default',
		'Default task to build all the project code in release mode', 
		['build']
	);

	grunt.registerTask(
		'build-dev', 
		'compile all elements in debug mode', [
			'clean:main',
			'jshint:main',
			'concat:main',
			'replace:main',
			'clean:css',
			'less:development',
			'moduleTasksDebug',
			'libs-debug'
		]
	);

	grunt.registerTask(
		'build',
		'compile all elements in release mode', [
			'clean:main',
			'jshint:main',
			'uglify:main',
			'clean:css',
			'less:release',
			'moduleTasks',
			'libs'
		]
	);


	grunt.registerTask(
		'dev',
		'Development mode to build the project main, css and assets', 
		['watch']
	);

	grunt.registerTask(
		'clean-all',
		'Remove all build files and bower components', 
		['clean']
	);

	grunt.registerTask(
		'clean-libs',
		'Remove all the bower components and library build files', [
			'clean:libraries',
			'clean:components'
		]
	);

	grunt.registerTask(
		'libs',
		'Import external client-side dependencies using Bower', [
			'clean:libraries',
			'bower:install',
			'uglify:libraries',
			'less:libraries'
		]
	);

	grunt.registerTask(
		'libs-debug',
		'Import using Bower and build debug versions of libraries', [
			'clean:libraries',
			'bower:install',
			'concat:libraries',
			'less:libraries-debug'
		]
	);

	grunt.registerTask(
		'qa',
		'Do QA on the games generate and run', [
			'build:dev',
			'run'
		]
	);

	grunt.registerTask(
		'run',
		'Preview the game by running a node server and opening it in the web browser', 
		['connect:server']
	);
};