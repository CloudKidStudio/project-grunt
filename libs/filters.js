module.exports = {
	// Filter an array of files and only return the javascript files
	isJS: function(file){ return /\.js$/.test(file); },

	// Filter an array of files and only return CSS and LESS files
	isCSS: function(file){ return /\.(less|css)$/.test(file); }
};	