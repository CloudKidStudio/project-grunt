# Project Grunt [![Dependency Status](https://david-dm.org/CloudKidStudio/project-grunt.svg)](https://david-dm.org/CloudKidStudio/project-grunt) [![Build Status](https://travis-ci.org/CloudKidStudio/project-grunt.svg)](https://travis-ci.org/CloudKidStudio/project-grunt) [![npm version](https://badge.fury.io/js/project-grunt.svg)](http://badge.fury.io/js/project-grunt)

Project Grunt is a Node plugin which provides initial project scaffolding and common build tasks for creating HTML projects. The plugin requires both [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) to be installed on the local system in order to build.

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

The installation of the plugin requires installing Grunt first and then the plugin.

```shell
npm install grunt project-grunt
```

### 3. Scaffolding Project

Create a barebones scaffolding for a project.

```shell
cd node_modules/project-grunt
npm run scaffold
```

### 4. Developing

To run the project in development mode (watches for any changes in files and re-builds) and launch a web-browser to preview your project, run this:

```shell
grunt dev & grunt run
```

## Adding Dependencies

Project Grunt is designed to easily include external dependencies into your project.

Modify the **bower.json** file to include additional libraries into your project. For more information about using Bower please visit the [website](http://bower.io). For instance, if you wanted to include [CreateJS](http://createjs.com), **bower.json** might look like this. Note that the _version_ and _name_ field is automatically updated from the **project.json** file.

```js
{
	"name": "MyApp",
	"version":"0.0.1",
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

Then, update **project.json** to list the files you'd like to include from the libraries.

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
**build** | Build the project and libraries in release mode.
**build-debug** | Build the project and libraries in debug mode.
**default** | Alias for **build** task.
**debug** | Alias for **build-debug** task.
**dev** | Development mode to build the project, this watches source files and auto-rebuilds whenever there's a change in CSS, JavaScript.
**libs** | Import and rebuild the external dependencies
**libs-debug** | Import and concat the external dependencies including building source maps for better debugging
**clean-all** | Delete all generated build files and delete components directory
**clean-libs** | Delete all downloaded Bower components and library build files
**qa** | Build the project in debug mode and run in the web browser by running a NodeJS server
**run** | Preview the deploy index.html file in a web browser by running a NodeJS server
**version** | Control the project versioning, and update the version number in **project.json** and **bower.json**. This task requires a single argument, for instance, **version:1.0.0** (uses the [Semantic Version](http://semver.org/) format) or increment the version using **version:major**, **version:minor** or **version:patch**. Change the version _before_ doing a build.

## Project File

The **project.json** file contains the list of all required JavaScript and CSS files in order to build the project. Below describes the different fields of this file.

Property | Type | Description
---|---|---
**name** | string | The name of the project
**version** | string | The [semantic versioning](http://semver.org/) number
**main** | array | The list of files to use to build the project, this can be a mix of JavaScript and CSS/LESS files. Note: the order of the files is how the output is built.
**libraries** | array | The list of external file dependencies imported by Bower. Note: the order of the files is how the output is built.
**mainDebug** _(optional)_ | array | The same as `main` except that this file list is only used when building in `dev` task.
**librariesDebug** _(optional)_ | array | The same as `libraries` except that this file list is only used when building in `dev` task.
**modules** _(optional)_ | object | Seperate source code list of files of either JavaScript, CSS/LESS or both.

## Conditional Compiling

The main JavaScript source building supports conditional compiling with global constants. These constants can be use to specify an inline block of code that should be use for development or release builds of the project. The booleans `DEBUG` and `RELEASE` are supported.

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
**./deploy/** | Contains all the assets needed to play a deployable version of the project
**./deploy/assets/** | The assets used by the project, such as images, CSS, JSON
**./deploy/assets/js** | The project logic and required dependency logic
**./deploy/assets/css** | The project built CSS
**./deploy/index.html** | The main HTML file needed to run the project
**./node_modules/** | The Node plugins required for the build process; this directory should be ignored by the versioning system
**./src/** | The source JavaScript or CSS/LESS files needed to build the project
**./bower.json** | The list of Bower dependencies
**./project.json** | See above, the list of source files and libraries to build
**./Gruntfile.js** | Contains the Grunt automation tasks
**./package.json** | The list of Node dependencies
**./README.md** | The readme markdown file describing the project

## Plugin Options

The Project Grunt plugin can accept additional options. Here's an example to add additional arguments:

```js
module.exports = function(grunt)
{
	require('project-grunt')(grunt, {
		jsFolder : "deploy/js",
		cssFolder : "deploy/css"
	});
};
```

### options.autoInit

A _boolean_ defaults to true. If grunt.initConfig() is automatically called.

### options.projectFile

A _string_ defaults to "project.json". The name of the JSON file which contains the JavaScript, CSS files to build. See the Build File above for more information about what this does.

### options.distFolder

A _string_ defaults to "deploy". The base output folder where to save the compiled project files.

### options.jsFolder

A _string_ defaults to "deploy/assets/js". The base output folder for JavaScript files (libraries.js and main.js).

### options.cssFolder

A _string_ defaults to "deploy/assets/css". The base output folder for CSS files (libraries.css and main.css).

### options.data

A _object_ defaults to `{}`. The data to set which can be accessible by all Grunt tasks, for instance `{ "name": "MyApp"}` would allow a substitution `<%= name %>` which would resolve to _MyApp_.
