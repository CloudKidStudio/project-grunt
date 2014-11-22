module.exports = {
	// global watch options
	options: {
		reload: true,
		atBegin: true
	},
	main: {
		files: [
			'Gruntfile.js',
			'<%= build.js.main %>',
			'<%= build.file %>'
		],
		tasks: [
			'jshint:main', 
			'concat:main', 
			'replace:main'
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