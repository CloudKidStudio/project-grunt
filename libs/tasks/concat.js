module.exports = {
	"libraries":
	{
		src: '<%= build.js.librariesDebug %>',
		dest: '<%= jsFolder %>/libraries.js',
	},
	"main":
	{
		src: '<%= build.js.mainDebug %>',
		dest: '<%= jsFolder %>/main.js',
	}
};