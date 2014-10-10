module.exports = {
	libraries: {
		files: {
			'<%= jsFolder %>/libraries.js': '<%= build.js.libraries %>'
		}
	},
	main: {
		files: {
			'<%= jsFolder %>/main.js': '<%= build.js.main %>'
		},
		options: {
			compress: {
				global_defs: {
					"DEBUG": false,
					"RELEASE": true,
					"VERSION": "<%= build.version %>"
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