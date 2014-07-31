# Grunt Game Builder

Grunt Game Builder is a Node plugin which provides initial project scaffolding and common build tasks for creating HTML5 canvas games. The plugin requires both [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) to be installed on the local system in order to build. 

## Requirements

There are a couple of tools that you'll need to install before we can create our project. Please make sure the following items are available on your machine:

* Install [Node JS](http://nodejs.org/)
* Install [Grunt](http://gruntjs.com/getting-started) `npm install -g grunt-cli`
* Install [Bower](http://bower.io/#install-bower) `npm install -g bower`

## Getting Started

### 1. Create Project

Start by creating an empty project folder and changing the working directory to that folder.

```shell
mkdir MyProject && cd MyProject
```

### 2. Install Plugin

The installation of the plugin requires installing Grunt first and then the plugin. This will create an empty project template structure which you can start to customize.

```shell
npm install grunt
npm install CloudKidStudio/GruntGameBuilder
```

### 3. Change Project Name

There are a couple instance where you should manually change the name of your project. These are found:

* **build.json** : Change the "name" property, required for building JavaScript
* **bower.json** : Change the "name" property, required by Bower
* **deploy/index.html** : Change the page `<title>`

## Adding Dependencies

Grunt Game Builder is designed to easily include external dependencies into your project.

Modify the **bower.json** file to include additional libraries into your project. For more information about using Bower please visit the [website](http://bower.io). For instance, if you wanted to include [CreateJS](http://createjs.com), **bower.json** might look like this:

```js
{
	"name": "MyApp",
	"private":true,
	"dependencies": {
		"jquery" : "~1",
		"normalize-css" : "*",
		"EaselJS" : "*",
		"TweenJS" : "*",
		"PreloadJS" : "*",
		"SoundJS" : "*"
	}
}
```

Then, update **build.json** to list the files you'd like to include from the libraries.

```js
{
	"name" : "MyApp",
	"version" : "1.0.0",
	"main" : [
		"src/main.js",
		"src/main.less"
	],
	"libraries" : [
		"components/normalize-css/normalize.css",
		"components/jquery/dist/jquery.min.js",
		"components/EaselJS/lib/easeljs-*.*.*.min.js",
		"components/EaselJS/lib/movieclip-*.*.*.min.js",
		"components/PreloadJS/lib/preloadjs-*.*.*.min.js",
		"components/SoundJS/lib/soundjs-*.*.*.min.js",
		"components/TweenJS/lib/tweenjs-*.*.*.min.js"
	]
}
```

After adding these libraries, run `grunt libs` from the commandline to import new libraries into your project. 

## Grunt Tasks

These are the list of grunt tasks for building the project.

Task | Description
---|---
**default** | Does a release build of the game and libraries
**dev** | Development mode to build the game, this watches source files and auto-rebuilds whenever there's a change
**libs** | Import and rebuild the external dependencies
**libs-debug** | Import and rebuild the external dependencies including building source maps for better debugging
**clean-all** | Delete all generated build files and delete components directory

## Build File

The **build.json** file contains the list of all required JavaScript and CSS files in order to build the project. Below describes the different fields of this file.

Property | Type | Description
---|---|---
**name** | string | The name of the project or game 
**version** | string | The [semantic versioning](http://semver.org/) number
**main** | array | The list of files to use to build the game, this can be a mix of JavaScript and CSS/LESS files. Note: the order of the files is how the output is built.
**libraries** | array | The list of external file dependencies imported by Bower. Note: the order of the files is how the output is built.
**mainDebug** _(optional)_ | array | The same as `main` except that this file list is only used when building in `dev` task.
**librariesDebug** _(optional)_ | array | The same as `libraries` except that this file list is only used when building in `dev` task.

## Conditional Compiling

The main JavaScript source building supports conditional compiling with global constants. These constants can be use to specify an inline block of code that should be use for development or release builds of the game. The booleans `DEBUG` and `RELEASE` are supported. 

### Example

```js
if (DEBUG)
{
	// This code is only visible when built using the 'dev' task
	alert('Debug code here!');
}

if (RELEASE)
{
	// This code is only visible when built using the 'default' task
}
```

## Project Structure

Structure | Description
--- | ---
**./components/** | The directory which contains all the dependencies from Bower; this directory should be ignored by the versioning system
**./deploy/** | Contains all the assets needed to play a deployable version of the game
**./deploy/assets/** | The non-logic assets used by the game, such as images, CSS, JSON
**./deploy/logic/** | The game logic and required dependency logic
**./deploy/index.html** | The main HTML file needed to run the game
**./node_modules/** | The Node plugins required for the build process; this directory should be ignored by the versioning system
**./src/** | The source JavaScript or CSS/LESS files needed to build the project
**./bower.json** | The list of Bower dependencies
**./build.json** | See above, the list of source files and libraries to build
**./Gruntfile.js** | Contains the Grunt automation tasks
**./package.json** | The list of Node dependencies
