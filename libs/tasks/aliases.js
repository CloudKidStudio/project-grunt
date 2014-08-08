module.exports = function(grunt)
{
	grunt.registerTask(
		'default', 
		'Default task to build all the game code', [
			'clean:js',
			'jshint',
			'uglify:release',
			'clean:css',
			'less:release',
			'libs'
		]
	);

	grunt.registerTask(
		'dev',
		'Development mode to build the game',
		['watch']
	);

	grunt.registerTask(
		'clean-all',
		'Remove all build files and components',
		['clean']
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
			'bower:install', 
			'uglify:libraries-debug', 
			'less:libraries-debug'
		]
	);	
};