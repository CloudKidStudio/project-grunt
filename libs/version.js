module.exports = function(grunt)
{
	grunt.registerTask('version', 'Change the current project version', function(n){

		var _ = require('lodash');

		var options = this.options(),
			files = options.files;

		if (!_.isPlainObject(files))
		{
			grunt.fail.fatal('Version files option must be an array');
		}

		if (!n)
		{
			grunt.fail.fatal("Attempting to change the version number, needs " + 
				"to be the semantic versioning number (e.g. 1.0.0) or either " +
				"major, minor or patch.");
		}

		// Semantic version plugin to evaluate the version strings
		var semver = require('semver');

		// Valid types of preleases
		var types = ['major', 'minor', 'patch'];

		// The version to set to
		var version;

		// Get the current version, the build.json is the most
		// reliable place to get it
		var build = grunt.file.readJSON('build.json');

		// For semver format, replace the version
		if (semver.valid(n))
		{
			if (n == build.version)
			{
				grunt.fail.warn("Supplied version the same as the current version");
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
			grunt.fail.warn("Attempting to revert to a lesser version (from " +
				build.version + " to " + version + ")");
		}

		grunt.log.ok("Version updated to " + version);

		var isJSON = /\.json$/i;

		_.each(files, function(selection, file){

			var path = require('path');
			var fs = require('fs');
			var filePath = path.resolve(process.cwd(), file);

			if (!fs.existsSync(filePath))
			{
				grunt.file.warn("The file to version '" + file + "' doesn't exist");
				return;
			}

			// The name of the json file property
			if (_.isString(selection))
			{
				if (!isJSON.test(filePath))
				{
					grunt.fail.warn("Attempting to update a version on a non-JSON file");
					return;
				}
				var fileData = grunt.file.readJSON(filePath);
				fileData[selection] = version;
				writeJSON(filePath, fileData);
				grunt.log.writeln('Updated version in ' + file);
			}
			// Substitution plugin
			else if (_.isFunction(selection))
			{
				if (isJSON.test(file))
				{
					// function with json
					var json = selection(grunt.file.readJSON(filePath), version);
					writeJSON(filePath, data);
				}
				else
				{
					// Format a file
					var data = grunt.file.read(filePath);
					data = selection(data, version);
					grunt.file.write(filePath, data);
				}
				grunt.log.writeln('Updated version in ' + file);
			}
		});
	});

	/**
	 * Write JSON to a local project file
	 * @param  {string} file Local project file
	 * @param  {object} data The javascript object
	 */
	function writeJSON(file, data)
	{
		grunt.file.write(file, JSON.stringify(data, null, "\t"));
	}
};