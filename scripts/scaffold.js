#!/usr/bin/env node

// Include modules
var fs = require('fs'),
	path = require('path'),
	prompt = require('prompt'),
	base = path.resolve(__dirname, '..', '..', '..'),
	bowerFile = path.join(base, 'bower.json'),
	packageFile = path.join(base, 'package.json'),
	buildFile = path.join(base, 'build.json');


// The root project folder
var scaffoldBase = path.join(__dirname, '..', 'scaffold');

/**
*  Create a directory if it doesn't exist. 
*  We use the synchronous API because async was failing after a certain # of folders
*  @method scaffoldDir
*  @param {String} dir The directory path to create
*/
function scaffoldDir(dir)
{
	var target = path.join(base, dir);
	if (!fs.existsSync(target))
	{
		fs.mkdirSync(target);
		console.log("  " + dir + " ... added");
	}
}

/**
*  Create a file if it doesn't exist
*  @method create
*  @param {String} file The file path
*  @param {String|Object} content The default content for file
*  @param {function} callback The callback function when done
*/
function scaffold(file, content, callback)
{
	var source = path.join(scaffoldBase, file);
	var target = path.join(base, file);

	if (!fs.existsSync(target))
	{
		if (!content && !fs.existsSync(source))
		{
			throw "Source file doesn't exist '" + source + "'";
		}
		fs.writeFileSync(target, content || fs.readFileSync(source));
		console.log("  " + file + " ... added");
		if (callback) callback(target);
	}
}

/**
*  Do a default grunt build
*  @method gruntDefault
*/
function gruntRun()
{
	var isWindows = process.platform === 'win32';
	var cwd = path.dirname(buildFile);
	var spawn = require('child_process').spawn;
	var grunt = isWindows ?
		spawn(process.env.comspec, ['/c', 'grunt'], { cwd: cwd }):
		spawn('grunt', [], { cwd: cwd });

	grunt.stdout.on('data', function (data) {
		process.stdout.write(data);
	});

	grunt.stderr.on('data', function (data) {
		process.stdout.write(data);
	});

	grunt.on('error', function(err){
		console.log("Grunt run error", err);
	});
}

// Only scaffold the project if no Gruntfile is available
scaffold("Gruntfile.js", null, function(file){
	
	// Create the required folders
	scaffoldDir("src"); 
	scaffoldDir("deploy"); 
	scaffoldDir("deploy/assets");
	scaffoldDir("deploy/assets/css"); 
	scaffoldDir("deploy/assets/js");

	// Copy the required files
	scaffold("build.json");
	scaffold("deploy/index.html");
	scaffold("README.md");
	scaffold(".bowerrc");
	scaffold("package.json");
	scaffold("bower.json");
	scaffold("src/main.js");
	scaffold("src/main.less");
	scaffold(".gitignore", "node_modules\ncomponents");

	prompt.start();
	prompt.get([{
			name : 'name',
			description: 'The human-readable name of the project',
			pattern: /^[a-zA-Z\-0-9]+?$/,
			message: "Name can only contain letters, numbers and hyphens",
			required: true
		}, {
			name : 'version',
			description: 'The starting version of the project',
			default: '0.0.1',
			pattern: /^\d+\.\d+(\.\d+)?$/,
			message: "Version must be in the format #.#.#",
			required: true
		}
	], function(err, result){
		if (!err)
		{
			// Get the build file as an object
			var build = JSON.parse(fs.readFileSync(buildFile));
			build.name = result.name;
			build.version = result.version;

			// Update the build file with the new name
			fs.writeFileSync(buildFile, JSON.stringify(build, null, "\t"));

			// Get the build file as an object
			var bower = JSON.parse(fs.readFileSync(bowerFile));
			bower.name = result.name;
			bower.version = result.version;

			// Update the build file with the new name
			fs.writeFileSync(bowerFile, JSON.stringify(bower, null, "\t"));

			var pack = JSON.parse(fs.readFileSync(packageFile));
			pack.version = result.version;

			// Update the build file with the new name
			fs.writeFileSync(packageFile, JSON.stringify(pack, null, "\t"));
		}
		gruntRun();
	});
});