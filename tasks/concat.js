module.exports = {
	options: {
		sourceMap: true
	},
	libraries: {
		dest: '<%= jsFolder %>/libraries.js',
		src: ['<%= project.js.librariesDebug %>']
	},
	main: {
		dest: '<%= jsFolder %>/main.js',
		src: ['<%= project.js.mainDebug %>']
	}
};