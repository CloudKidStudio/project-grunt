#!/usr/bin/env node

var spawn = require('child_process').spawn,
	grunt = spawn('grunt', { cwd: '../../' });

grunt.stdout.on('data', function (data) {
	process.stdout.write(data);
});

grunt.stderr.on('data', function (data) {
	process.stdout.write(data);
});