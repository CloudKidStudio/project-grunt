#!/usr/bin/env node

// The root project folder
var base = "../../";

var fs = require('fs'); /*,
	spawn = require('child_process').spawn,
	npm = spawn('npm', 
		['install', 'grunt', "--color", "always"],
		{ cwd: base }
	);

npm.stdout.on('data', function (data) {
	process.stdout.write(data);
});

npm.stderr.on('data', function (data) {
	process.stdout.write(data);
});*/

/**
*  Create a directory if it doesn't exist
*  @method scaffoldDir
*  @param {String} dir The directory path to create
*/
function scaffoldDir(dir)
{
	fs.exists(base + dir, function(exists){
		if (!exists)
		{
			fs.mkdir(base + dir, function(){
				console.log("  " + dir + " ... added");
			});
		}
	});
}

/**
*  Create a file if it doesn't exist
*  @method create
*  @param {String} file The file path
*  @param {String|Object} content The default content for file
*/
function scaffold(file, content)
{
	fs.exists(base + file, function(exists){
		if (!exists)
		{
			if (!content && !fs.existsSync("scaffold/" + file))
			{
				throw "File doesn't exist " + "'scaffold/" + file + "'";
			}
			fs.writeFile(base + file, content || fs.readFileSync("scaffold/" + file), function(){
				console.log("  " + file + " ... added");
			});
		}
	});
}

console.log("Creating project scaffolding...\n");

// Create the required folders
scaffoldDir("src"); 
scaffoldDir("deploy"); 
scaffoldDir("deploy/assets"); 
scaffoldDir("deploy/assets/css"); 
scaffoldDir("deploy/logic");

// Copy the required files
scaffold("Gruntfile.js");
scaffold("deploy/index.html");
scaffold(".bowerrc");
scaffold("package.json");
scaffold("bower.json");
scaffold("build.json");
scaffold("src/main.js");
scaffold("src/main.less");
scaffold(".gitignore", "node_modules\ncomponents");
