module.exports = {
	libraries: {
		files: {
			'<%= cssFolder %>/libraries.css': '<%= build.css.libraries %>',
		},
		options: {
			compress: true
		}
	},
	"libraries-debug": {
		files: {
			'<%= cssFolder %>/libraries.css': '<%= build.css.librariesDebug %>',
		},
		options: {
			compress: true,
			sourceMap: true,
			sourceMapFilename: '<%= cssFolder %>/libraries.css.map',
			sourceMapURL: 'libraries.css.map',
			sourceMapBasepath: '<%= cssFolder %>'
		}
	},
	release: {
		files: {
			'<%= cssFolder %>/main.css': '<%= build.css.main %>',
		},
		options: {
			compress: true
		}
	},
	development: {
		files: {
			'<%= cssFolder %>/main.css': '<%= build.css.mainDebug %>',
		},
		options: {
			compress: true,
			sourceMap: true,
			sourceMapFilename: '<%= cssFolder %>/main.css.map',
			sourceMapURL: 'main.css.map',
			sourceMapBasepath: '<%= cssFolder %>'
		}
	}
};