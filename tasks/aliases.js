module.exports = function(grunt)
{
	grunt.registerTask(
		'default', 
		'Default task to build all the project code', [
			'clean:js',
			'jshint',
			'uglify:release',
			'clean:css',
			'less:release',
			'libs',
			'sync-version'
		]
	);

	grunt.registerTask(
		'dev',
		'Development mode to build the project',
		['watch']
	);

	grunt.registerTask(
		'assets',
		'Minify all asset JS files',
		['uglify:assets']
	);

	grunt.registerTask(
		'combine',
		'Build the main project in combined, uncompressed mode',[
			'concat:main', 
			'replace:main'
		]
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
			'bower:install', 
			'uglify:libraries-debug', 
			'less:libraries-debug'
		]
	);

	grunt.registerTask(
		'libs-combine',
		'Combine the debug versions of the libraries with no minifying',
		['concat:libraries']
	);

	grunt.registerTask(
		'sync-version',
		'Update the bower file verison and name from the build file',
		function()
		{	
			// Get the paths and files
			var bowerPath = process.cwd() + '/bower.json',
				bower = grunt.file.readJSON(bowerPath),
				build = grunt.file.readJSON(process.cwd() + '/build.json');

			// Update the bower version
			bower.version = build.version;
			bower.name = build.name;

			// Write the bower file
			grunt.file.write(bowerPath, JSON.stringify(bower, null, "\t"));
		}
	);
};
