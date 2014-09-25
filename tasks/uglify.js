module.exports = {
	libraries: {
		files: {
			'<%= jsFolder %>/libraries.js': '<%= build.js.libraries %>'
		}
	},
	main: {
		files: {
			'<%= jsFolder %>/main.js': '<%= build.js.main %>',
			'<%= jsFolder %>/assets.js': '<%= build.js.assets %>'
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
	assets: {
		files: {
			'<%= jsFolder %>/assets.js': '<%= build.js.assets %>'
		}
	}
};