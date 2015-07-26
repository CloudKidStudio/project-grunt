/**
*  Dynamically create the tasks required for processing
*  modules. 
*/
module.exports = function(project, config)
{
	var path = require('path'),
		_ = require('lodash'),
		filters = require(path.join(__dirname, 'filters.js'));

	var moduleTasks = [];
	var moduleTasksDebug = [];

	// Loop through the modules and add each one
	// to the existing list of tasks, this is more 
	// maintainable if done dynamically
	_.each(project.modules, function(mod, name){

		// Convert the list of files (shorthand)
		// into the more verbose format
		if (_.isArray(mod))
		{
			mod = {
				output: name,
				main: mod,
				mainDebug: mod
			};
		}
		else
		{
			mod.mainDebug = mod.mainDebug || mod.main;
		}

		var js = _.filter(mod.main, filters.isJS);
		var jsDebug = _.filter(mod.mainDebug, filters.isJS);
		var css = _.filter(mod.main, filters.isCSS);
		var cssDebug = _.filter(mod.mainDebug, filters.isCSS);

		var clean = [];
		var output, outputDebug;

		moduleTasks.push('clean:'+name);
		moduleTasksDebug.push('clean:'+name);

		if (js)
		{
			output = {};
			output['<%= jsFolder %>/' + mod.output + '.js'] = js;			

			// Add the build
			config.uglify[name] = {
				files: output, 
				options: '<%= uglify.main.options %>'
			};

			// Add to hinting
			config.jshint.main.push(js);

			// Add to source maps
			config.concat[name] = {
				src: jsDebug,
				dest: '<%= jsFolder %>/' + mod.output + '.js',
				nonull: true
			};

			// The replacements for web
			config.replace[name] = {
				src: '<%= jsFolder %>/' + mod.output + '.js',
				overwrite: true,
				replacements: '<%= replace.main.replacements %>'
			};

			// add files to clean
			clean.push(
				'<%= jsFolder %>/' + mod.output + '.js.map',
				'<%= jsFolder %>/' + mod.output + '.js'
			);

			config.watch.main.files.push(jsDebug);
			config.watch.main.tasks.push(
				'concat:'+name, 
				'replace:'+name
			);

			moduleTasks.push('uglify:'+name);
			moduleTasksDebug.push(
				'concat:'+name,
				'replace:'+name
			);
		}

		if (css)
		{
			output = {};
			output['<%= cssFolder %>/' + mod.output + '.css'] = css;

			outputDebug = {};
			outputDebug['<%= cssFolder %>/' + mod.output + '.css'] = cssDebug;

			// Add the Less building
			config.less[name]=  {
				files: output,
				options: '<%= less.release.options %>'
			};

			// Add LESS debug building
			config.less[name+'Debug'] = {
				files: outputDebug,
				options: {
					sourceMap: true,
					sourceMapFilename: '<%= cssFolder %>/' + mod.output + '.css.map',
					sourceMapURL:  mod.output + '.css.map',
					sourceMapBasepath: '<%= cssFolder %>'
				}
			};

			// Add the watch css task
			config.watch.css.tasks.push('less:'+name+'Debug');

			// Add files to clean
			clean.push(
				'<%= cssFolder %>/' + mod.output + '.css.map',
				'<%= cssFolder %>/' + mod.output + '.css'
			);

			moduleTasks.push('less:'+name);
			moduleTasksDebug.push('less:'+name+'Debug');
		}

		// Clean options
		config.clean[name] = clean;
	});

	return {
		moduleTasks: moduleTasks,
		moduleTasksDebug: moduleTasksDebug
	};
};