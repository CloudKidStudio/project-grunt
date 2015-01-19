module.exports = {
	libraries: {
		files: {
			'<%= jsFolder %>/libraries.js': '<%= project.js.libraries %>'
		}
	},
	main: {
		files: {
			'<%= jsFolder %>/main.js': '<%= project.js.main %>'
		},
		options: {
			compress: {
				global_defs: {
					"DEBUG": false,
					"RELEASE": true,
					"VERSION": "<%= project.version %>"
				},
				dead_code: true,
				drop_console: true
			}
		}
	}
};