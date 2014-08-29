#!/usr/bin/env node

// The root project folder
var base = "../../";
var fs = require('fs');

/**
*  Create a directory if it doesn't exist. 
*  We use the synchronous API because async was failing after a certain # of folders
*  @method scaffoldDir
*  @param {String} dir The directory path to create
*/
function scaffoldDir(dir)
{
	if (!fs.existsSync(base + dir))
	{
		fs.mkdirSync(base + dir);
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
	fs.exists(base + file, function(exists){
		if (!exists)
		{
			if (!content && !fs.existsSync("scaffold/" + file))
			{
				throw "File doesn't exist " + "'scaffold/" + file + "'";
			}
			fs.writeFile(base + file, content || fs.readFileSync("scaffold/" + file), function(){
				console.log("  " + file + " ... added");
				if (callback) callback(base + file);
			});
		}
	});
}

// Only scaffold the project if no Gruntfile is available
scaffold("Gruntfile.js", null, function(file){
	
	// Create the required folders
	scaffoldDir("src"); 
	scaffoldDir("deploy"); 
	scaffoldDir("deploy/assets");
	scaffoldDir("deploy/assets/config");
	scaffoldDir("deploy/assets/css"); 
	scaffoldDir("deploy/assets/sound"); 
	scaffoldDir("deploy/assets/sound/vo"); 
	scaffoldDir("deploy/assets/sound/sfx"); 
	scaffoldDir("deploy/assets/sound/music"); 
	scaffoldDir("deploy/logic");

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

	// Add a build the build file to let the post
	fs.writeFileSync('.buildFile', file);
});
