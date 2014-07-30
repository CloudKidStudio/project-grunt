#!/usr/bin/env node

var exec = require('child_process').exec;

// Install grunt in the project
exec('grunt', 
	{ cwd : "../../" }, 
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