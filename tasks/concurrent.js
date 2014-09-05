module.exports = {
	options: {
		logConcurrentOutput: true
	},
	dev: {
		tasks: [
			"watch:js",
			"watch:css",
			"watch:assets"
		]
	}
};