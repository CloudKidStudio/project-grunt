module.exports = {
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
};