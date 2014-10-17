module.exports = {
	libraries: {
		files: {
			'<%= cssFolder %>/libraries.css': '<%= build.css.libraries %>',
		},
		options: {
			compress: true,
			cleancss: true
		}
	},
	"libraries-debug": {
		files: {
			'<%= cssFolder %>/libraries.css': '<%= build.css.librariesDebug %>',
		},
		options: {
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
			compress: true,
			cleancss: true
		}
	},
	development: {
		files: {
			'<%= cssFolder %>/main.css': '<%= build.css.mainDebug %>',
		},
		options: {
			sourceMap: true,
			sourceMapFilename: '<%= cssFolder %>/main.css.map',
			sourceMapURL: 'main.css.map',
			sourceMapBasepath: '<%= cssFolder %>'
		}
	}
};