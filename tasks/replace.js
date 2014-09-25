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
		}]
	}
};