module.exports = {
	// global watch options
	options: {
		reload: true,
		atBegin: true
	},
	main: {
		files: [
			'Gruntfile.js',
			'<%= project.js.main %>',
			'<%= project.file %>'
		],
		tasks: [
			'jshint:main', 
			'concat:main', 
			'replace:main'
		]
	},
	css: {
		files: [
			'<%= project.css.main %>',
			'<%= project.file %>'
		],
		tasks: [
			'less:development'
		]
	}
};