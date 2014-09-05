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
	assets: {
		files: [
			'Gruntfile.js',
			'<%= build.js.assets %>',
			'<%= build.file %>'
		],
		tasks: [
			'uglify:assets'
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