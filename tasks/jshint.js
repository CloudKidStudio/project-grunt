module.exports = {
	js: [
		'Gruntfile.js',
		'<%= build.js.main %>',
		'<%= build.js.excludeFromHinting %>'
	],
	assets: [
		'<%= build.js.assets %>',
		'<%= build.js.excludeFromHinting %>'
	]
};