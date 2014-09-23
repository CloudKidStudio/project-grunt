module.exports = {
	server : {
		options: {
			open: true,
			keepalive: true,
			port: 8080,
			hostname: 'localhost',
			base: '<%= distFolder %>',
			index: 'index.html'
		}
	}
};