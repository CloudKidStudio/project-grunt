#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;

var base = "../../";

// Create the required folders
var folders = [
	"src", 
	"deploy", 
	"deploy/assets", 
	"deploy/assets/css", 
	"deploy/logic"
];

// Make the folder structure
for (var i = 0; i < folders.length; i++)
{
	var folder = base + folders[i];
	if (!fs.existsSync(folder))
	{
		fs.mkdirSync(folder);
	}
}

// Install grunt in the project
exec('npm install grunt', 
	{ cwd : base }, 
	function (error, stdout, stderr) {
		if (stderr !== null) {
			console.log('' + stderr);
		}
		if (stdout !== null) {
			console.log('' + stdout);
		}
		if (error !== null) {
			console.log('' + error);
		}
	}
);

/**
*  Create a file if it doesn't exist
*  @method create
*  @param {String} file The file path
*  @param {String|Object} content The default content for file
*/
function scaffold(file, content)
{
	// Create the grunt file
	if (!fs.existsSync(base + file))
	{
		if (!content && !fs.existsSync("scaffold/" + file))
		{
			throw "File doesn't exist " + "'scaffold/" + file + "'";
		}
		fs.writeFileSync(base + file, content || fs.readFileSync("scaffold/" + file));
	}
}

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