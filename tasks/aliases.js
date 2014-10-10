module.exports = function(grunt)
{
	var hasAssets = grunt.config.get('hasAssets');

	grunt.registerTask(
		'default',
		'Default task to build all the project code in release mode', 
		['build']
	);

	grunt.registerTask(
		'build', 
		'compile all elements (pass :dev for dev mode)', 
		function(n)
		{
			if (n == 'dev')
			{
				//dev mode
				grunt.task.run(hasAssets ? [
					'clean:main',
					'jshint:main',
					'concat_sourcemap:main',
					'replace:main',
					'clean:css',
					'less:development',
					'libs-debug',
					'clean:assets',
					'assets-debug',
				] : [
					'clean:main',
					'jshint:main',
					'concat_sourcemap:main',
					'replace:main',
					'clean:css',
					'less:development',
					'libs-debug',
				]);
			}
			else 
			{
				//release mode
				grunt.task.run(hasAssets ? [
					'clean:main',
					'jshint:main',
					'uglify:main',
					'clean:css',
					'less:release',
					'libs',
					'assets',
					'sync-version',
					'replace:html'
				] : [
					'clean:main',
					'jshint:main',
					'uglify:main',
					'clean:css',
					'less:release',
					'libs',
					'sync-version',
					'replace:html'
				]);
			}
		}
	);

	grunt.registerTask(
		'version',
		'Change the current project version',
		function(n)
		{
			if (!n)
			{
				grunt.fail.fatal("Attempting to change the version number, needs " + 
					"to be the semantic versioning number (e.g. 1.0.0) or either " +
					"major, minor or patch.");
			}

			var path = require('path');
			var semver = require('semver');

			// Valid types of preleases
			var types = ['major', 'minor', 'patch'];

			var buildPath = path.join(process.cwd(), 'build.json');
			var build = grunt.file.readJSON(buildPath);
			var version;

			// For semver format, replace the version
			if (semver.valid(n))
			{
				if (n == build.version)
				{
					grunt.fail.fatal("Supplied version the same as the current version");
				}
				version = n;
			}
			else if (types.indexOf(n) > -1)
			{
				version = semver.inc(build.version, n);
			}
			else
			{
				grunt.fail.fatal("Argument on version task is not valid");
			}

			if (!semver.lt(build.version, version))
			{
				grunt.fail.warn("Attempting to revert to a lesser version (from "
				 + build.version + " to " + version + ")");
			}

			grunt.log.ok("Version updated to " + version);

			build.version = version;

			// Update the build file
			grunt.file.write(buildPath, JSON.stringify(build, null, "\t"));

			// Update bower version number
			grunt.task.run('sync-version');
		}
	);

	grunt.registerTask(
		'dev',
		'Development mode to build the project main, css and assets', 
		['watch']
	);

	grunt.registerTask(
		'dev-main',
		'Development mode to build the project - faster, only watches main source (no assets or css)', 
		['watch:main']
	);

	// Only register the asset tasks if we have assets
	if (hasAssets)
	{
		grunt.registerTask(
			'assets-debug',
			'Combine, map all asset JS files uncompressed', 
			['concat_sourcemap:assets']
		);

		grunt.registerTask(
			'assets',
			'Minify all asset JS files uncompressed', [
				'clean:assets',
				'uglify:assets'
			]
		);
	}

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
			'concat_sourcemap:libraries',
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

	grunt.registerTask(
		'sync-version',
		'Update the bower file version and name from the build file',
		function()
		{
			// Get the paths and files
			var path = require('path');
			var bowerPath = path.join(process.cwd(), 'bower.json'),
			bower = grunt.file.readJSON(bowerPath),
			build = grunt.file.readJSON(path.join(process.cwd(), 'build.json'));

			// Update the bower version
			bower.version = build.version;
			bower.name = build.name;

			// Write the bower file
			grunt.file.write(bowerPath, JSON.stringify(bower, null, "\t"));
		}
	);
};