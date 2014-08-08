module.exports = {
	libraries: {
		files: {
			'<%= jsFolder %>/libraries.js': '<%= build.js.libraries %>'
		}
	},
	"libraries-debug": {
		files: {
			'<%= jsFolder %>/libraries.js': '<%= build.js.librariesDebug %>'
		},
		options: {
			sourceMap:true
		}
	},
	release: {
		files: {
			'<%= jsFolder %>/main.js': '<%= build.js.main %>'
		},
		options: {
			compress: {
				global_defs: {
					"DEBUG": false,
					"RELEASE": true
				},
				dead_code: true,
				drop_console: true
			}
		}
	},
	development: {
		files: {
			'<%= jsFolder %>/main.js': '<%= build.js.mainDebug %>'
		},
		options: {
			compress: {
				global_defs: {
					"DEBUG": true,
					"RELEASE": false
				},
				dead_code: true
			},
			banner: '/*! <%= build.name %> <%= build.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			sourceMap: true
		}
	}
};