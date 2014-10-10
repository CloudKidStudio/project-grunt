module.exports = {
	main: {
		src: '<%= jsFolder %>/main.js',
		overwrite: true,
		replacements: [{
			from: /\bDEBUG\b/g,
			to: "true"
		},{
			from: /\bRELEASE\b/g,
			to: "false"
		},{ 
			from: "VERSION", 
			to: "\"<%= build.version %>\""
		}]
	},
	html: {
		src: '<%= distFolder %>/*.html',
		overwrite: true,
		replacements: [{
			from: /src\=(\"|\')([^\?\n\r]+)(\?v\=[a-z0-9\.]*)?(\"|\')/ig,
			to: 'src="$2?v=<%= build.version %>"'
		},{
			from: /href\=(\"|\')([^\?\n\r]+\.css)(\?v\=[a-z0-9\.]*)?(\"|\')/ig,
			to: 'href="$2?v=<%= build.version %>"'
		}]
	}
};