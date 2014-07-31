module.exports = function(grunt)
{
	// The root plugin directory
	var root = __dirname + "/..";

	// Load the local modules
	var cwd = process.cwd();
	process.chdir(root);
	require('load-grunt-tasks')(grunt);
	process.chdir(cwd);

	// Get the components folder if it's custom
	var components = 'bower_components';
	if (grunt.file.exists('.bowerrc'))
	{
		components = grunt.file.readJSON('.bowerrc').directory || components;
	}

	// Load the build configuration
	grunt.initConfig({

		// The build json file
		build: require(root + '/libs/build-file.js')(grunt),

		// The deploy folder is the content that actually is for distribution
		distFolder: 'deploy',

		// Build folder contains lists and configuration files for building
		buildFolder: 'build',

		// The output folders
		jsFolder: '<%= distFolder %>/logic',
		cssFolder: '<%= distFolder %>/assets/css',
		
		// Minify the JavaScript files
		uglify: {
			libraries: {
				files: {
					'<%= jsFolder %>/libraries.js': '<%= build.js.libraries %>'
				}
			},
			"libraries-debug": {
				files: {
					'<%= jsFolder %>/libraries.js': '<%= build.js.librariesDebug %>'
				},
				options: {
					sourceMap:true
				}
			},
			release: {
				files: {
					'<%= jsFolder %>/main.js': '<%= build.js.main %>'
				},
				options: {
					compress: {
						global_defs: {
							"DEBUG": false,
							"RELEASE": true
						},
						dead_code: true,
						drop_console: true
					}
				}
			},
			development: {
				files: {
					'<%= jsFolder %>/main.js': '<%= build.js.mainDebug %>'
				},
				options: {
					compress: {
						global_defs: {
							"DEBUG": true,
							"RELEASE": false
						},
						dead_code: true
					},
					banner: '/*! <%= build.name %> <%= build.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					sourceMap: true
				}
			}
		},

		// Provide hinting errors
		jshint: {
			all: [
				'Gruntfile.js',
				'<%= build.js.main %>'
			]
		},

		// Process the css
		less: {
			libraries: {
				files: {
					'<%= cssFolder %>/libraries.css': '<%= build.css.libraries %>',
				},
				options: {
					compress: true
				}
			},
			"libraries-debug": {
				files: {
					'<%= cssFolder %>/libraries.css': '<%= build.css.librariesDebug %>',
				},
				options: {
					compress: true,
					sourceMap: true,
					sourceMapFilename: '<%= cssFolder %>/libraries.css.map',
					sourceMapURL: 'libraries.css.map',
					sourceMapBasepath: '<%= cssFolder %>'
				}
			},
			release: {
				files: {
					'<%= cssFolder %>/main.min.css': '<%= build.css.main %>',
				},
				options: {
					compress: true
				}
			},
			development: {
				files: {
					'<%= cssFolder %>/main.min.css': '<%= build.css.mainDebug %>',
				},
				options: {
					compress: true,
					sourceMap: true,
					sourceMapFilename: '<%= cssFolder %>/main.min.css.map',
					sourceMapURL: 'main.min.css.map',
					sourceMapBasepath: '<%= cssFolder %>'
				}
			}
		},

		// Watch changes in files and update
		watch: {
			// global watch options
			options: {
				reload: true,
				atBegin: true
			},
			js: {
				files: [
					'Gruntfile.js',
					'<%= build.js.main %>',
					'<%= build.file %>'
				],
				tasks: [
					'jshint', 
					'uglify:development'
				]
			},
			css: {
				files: [
					'<%= build.css.main %>',
					'<%= build.file %>'
				],
				tasks: [
					'less:development'
				]
			},
			libraries: {
				files: [
					'<%= build.js.librariesDebug %>',
					'<%= build.file %>'
				],
				tasks: [
					'uglify:libraries-debug', 
					'less:libraries-debug'
				]
			}
		},

		// Bower install
		bower: {
			install: {
				options : {
					copy: false,
					verbose: true,
					bowerOptions : {
						production : true
					}
				}
			}
		},

		// Clean all of the build files
		clean: {
			js: [
				'<%= jsFolder %>/main.js.map',
				'<%= jsFolder %>/main.js'
			],
			css: [
				'<%= cssFolder %>/*.min.css',
				'<%= cssFolder %>/*.map'
			],
			libraries: [
				'<%= cssFolder %>/libraries.css',
				'<%= cssFolder %>/libraries.css.map',
				'<%= jsFolder %>/libraries.js.map',
				'<%= jsFolder %>/libraries.js'
			],
			components: [components]
		}
	});

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