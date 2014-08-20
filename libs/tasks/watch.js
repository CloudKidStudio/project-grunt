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
			'newer:uglify:development'
		]
	},
	css: {
		files: [
			'<%= build.css.main %>',
			'<%= build.file %>'
		],
		tasks: [
			'newer:less:development'
		]
	}
};