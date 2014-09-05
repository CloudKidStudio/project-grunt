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
	},
	"dev-main": {
		tasks: [
			"watch:js",
			"watch:css"
		]
	}
};