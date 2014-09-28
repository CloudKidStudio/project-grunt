module.exports = function(grunt, options, undefined)
{
	// The root plugin directory
	var path = require('path'),
		loader = require('load-grunt-config'),
		options = options || {};

	// Get the components folder if it's custom
	var components = 'bower_components';
	if (grunt.file.exists('.bowerrc'))
	{
		components = grunt.file.readJSON('.bowerrc').directory || components;
	}

	// We need to load the local grunt plugins
	var cwd = process.cwd();
	process.chdir(path.dirname(__dirname));
	
	// If we should called initConfig right away
	var autoInit = options.autoInit !== undefined ? !!options.autoInit : true;

	// Separate grunt config files
	var config = loader(grunt, {
		
		// Path to tasks
		configPath: path.join(path.dirname(__dirname), 'tasks'),

		// project specific overrides
		overridePath: path.join(cwd, 'tasks/overrides'),

		// auto grunt.initConfig()
		init: false,

		// Load the grunt tasks
		loadGruntTasks : { pattern: [ 'grunt-*' ] },

		// Data based into config
		data: {

			// The name of the library from the build file
			build: require(__dirname + '/build-file.js')(grunt, { 
				cwd: cwd, 
				buildFile : options.buildFile 
			}),

			// The deploy folder is the content that actually is for distribution
			distFolder: options.distFolder || 'deploy',

			// The path to the components folder
			components: components,

			// The output folders
			jsFolder: options.jsFolder || '<%= distFolder %>/logic',
			cssFolder: options.cssFolder || '<%= distFolder %>/assets/css',

			// Save the current working directory
			cwd: cwd
		}
	});
	process.chdir(cwd);

	// If we don't have assets, remove from the tasks
	// this is determined by build-file.js
	if (!grunt.config.get('hasAssets'))
	{
		delete config.watch.assets;
		delete config.uglify.assets;
		delete config.clean.assets;
		delete config.concat_sourcemap.assets;
	}

	if (autoInit)
	{
		grunt.initConfig(config);
	}

	return config;
};