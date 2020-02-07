const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		proxy('/api', {
			target: 'http://h5.maocanhua.cn/',
			// "pathRewrite": {
			//   "^/api": "/"
			// },
			secure: false,
			changeOrigin: true
		}),
		proxy('/parse', {
			target: 'http://h5.maocanhua.cn/',
			// "pathRewrite": {
			//   "^/api": "/"
			// },
			secure: false,
			changeOrigin: true
		}),
	);
};
