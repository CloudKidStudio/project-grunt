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
			'jshint:js', 
			'uglify:development'
		]
	},
	jsassets: {
		files: [
			'Gruntfile.js',
			'<%= build.js.assets %>',
			'<%= build.file %>'
		],
		tasks: [
			'jshint:assets', 
			'assets'
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
	}
};