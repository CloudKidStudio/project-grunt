module.exports = {
	options: {
		sourcesContent: true
	},
	libraries: {
		files: {
			'<%= jsFolder %>/libraries.js' : '<%= build.js.librariesDebug %>'
		}
	},
	main: {
		files: {
			'<%= jsFolder %>/main.js' : '<%= build.js.mainDebug %>'
		}
	},
	assets: {
		files: {
			'<%= jsFolder %>/assets.js': '<%= build.js.assets %>'
		}
	}
};