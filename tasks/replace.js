module.exports = {
	main: {
		src: '<%= jsFolder %>/main.js',
	    overwrite: true,
	    replacements: [{
			from: /\( ?DEBUG ?\)/g,
			to: "( true )"
		},{
			from: /\( ?RELEASE ?\)/g,
			to: "( false )"
		}]
	}
};