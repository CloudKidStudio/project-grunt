/**
*  Encapsulate the project.json format functionality
*  this converts the project.json file into useable file lists
*  for running tasks on.
*/
module.exports = function(grunt, options)
{	
	// Use underscore utilities
	var _ = require('lodash'),
		path = require('path'),	
		filters = require(path.join(__dirname, 'filters.js'));

	// The name of the project file
	var filename = options.cwd + '/' + (options.projectFile || 'project.json');

	// Check for project file
	if (!grunt.file.exists(filename))
		grunt.fail.fatal('no ' + filename + ' file is found');

	// Load the project file which contains the list of 
	// library and project files to build
	var file = grunt.file.readJSON(filename);

	// Error checking for required fields and types
	if (!file.name || !_.isString(file.name)) 
		grunt.fail.fatal('"name" is a required field in ' + filename);

	if (!file.version || !_.isString(file.version)) 
		grunt.fail.fatal('"version" is a required field in ' + filename);

	if (!file.main || !_.isArray(file.main))
		grunt.fail.fatal('"main" is a required field in ' + filename);

	if (!file.libraries || !_.isArray(file.libraries))
		grunt.fail.fatal('"libraries" is a required field in ' + filename);

	if (!_.isUndefined(file.librariesDebug) && !_.isArray(file.librariesDebug))
		grunt.fail.fatal('"librariesDebug" must be an array of files in ' + filename);

	if (!_.isUndefined(file.mainDebug) && !_.isArray(file.mainDebug))
		grunt.fail.fatal('"mainDebug" must be an array of files in ' + filename);

	if (!_.isUndefined(file.assets) && !_.isArray(file.assets))
		grunt.fail.fatal('"assets" must be an array of files in ' + filename);

	return {
		// The name of the app
		name: file.name,

		// The semantic version of the app
		version: file.version,

		// The name of the project file
		file : filename,

		// The different modules
		modules: file.modules || null,

		js : {
			// The collection of library files
			libraries : _.filter(file.libraries, filters.isJS),

			// The collection of library files built in debug/unminified mode
			librariesDebug : _.filter(file.librariesDebug || file.libraries, filters.isJS),

			// The collection of source files
			main : _.filter(file.main, filters.isJS),

			// The collection of source files in debug mode
			mainDebug : _.filter(file.mainDebug || file.main, filters.isJS)
		},

		css : {
			// The library css files
			libraries : _.filter(file.libraries, filters.isCSS),

			// The library debug css files
			librariesDebug : _.filter(file.librariesDebug || file.libraries, filters.isCSS),

			// The project css files
			main : _.filter(file.main, filters.isCSS),

			// The project debug CSS
			mainDebug : _.filter(file.mainDebug || file.main, filters.isCSS)
		}
	};
};