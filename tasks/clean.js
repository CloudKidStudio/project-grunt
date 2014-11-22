module.exports = {
	main: [
		'<%= jsFolder %>/main.js.map',
		'<%= jsFolder %>/main.js'
	],
	css: [
		'<%= cssFolder %>/main.css',
		'<%= cssFolder %>/main.css.map'
	],
	libraries: [
		'<%= cssFolder %>/libraries.css',
		'<%= cssFolder %>/libraries.css.map',
		'<%= jsFolder %>/libraries.js.map',
		'<%= jsFolder %>/libraries.js'
	],
	components: ['<%= components %>']
};