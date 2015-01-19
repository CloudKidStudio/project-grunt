module.exports = function(grunt, options, undefined)
{
	// The root plugin directory
	var _ = require('lodash'),
		path = require('path'),
		loader = require('load-grunt-config'),
		pluginFolder = path.dirname(__dirname),
		projectJS = require(path.join(__dirname, 'project.js')),
		modules = require(path.join(__dirname, 'modules.js'));
	
	options = options || {};

	// Get the components folder if it's custom
	var components = 'bower_components';
	if (grunt.file.exists('.bowerrc'))
	{
		components = grunt.file.readJSON('.bowerrc').directory || components;
	}

	// We need to load the local grunt plugins
	var projectDir = process.cwd();
	process.chdir(pluginFolder);

	// Get the project file
	var project = projectJS(grunt, { 
		cwd: projectDir, 
		projectFile : options.projectFile 
	});

	// The data arguments
	var data = _.extend({

			// The name of the library from the project file
			project: project,

			// The deploy folder is the content that actually is for distribution
			distFolder: options.distFolder || 'deploy',

			// The path to the components folder
			components: components,

			// The output folders
			jsFolder: options.jsFolder || '<%= distFolder %>/assets/js',
			cssFolder: options.cssFolder || '<%= distFolder %>/assets/css',

			// Save the current working directory
			cwd: projectDir
		},
		options.data || {}
	);

	// Separate grunt config files
	var baseConfig = loader(grunt, {
		
		// Path to tasks
		configPath: path.join(pluginFolder, 'tasks'),

		// project specific overrides
		overridePath: path.join(projectDir, 'tasks', 'overrides'),

		// auto grunt.initConfig()
		init: false,

		// Load the grunt tasks
		loadGruntTasks : { pattern: [ 'grunt-*' ] },

		// Data based into config
		data: data
	});

	process.chdir(projectDir);

	// Project-specific config
	var projectConfig = loader(grunt, {

		// The path for the tasks
		configPath: path.join(projectDir, 'tasks'),

		// Get the config, don't run
		init: false, 

		// We don't want to reload builder
		loadGruntTasks: { pattern: [ 'grunt-*' ] }
	});

	// Merge the configs
	var config = _.extend(baseConfig, projectConfig);
	
	// Add the dynamic modules
	var tasks = modules(project, config);

	// Add the dynamic list of tasks
	grunt.registerTask('moduleTasks', tasks.moduleTasks);
	grunt.registerTask('moduleTasksDebug', tasks.moduleTasksDebug);

	// If we should called initConfig right away
	var autoInit = options.autoInit !== undefined ? !!options.autoInit : true;

	if (autoInit)
	{
		grunt.initConfig(config);
	}

	return config;
};