var fcgi = require('node-fastcgi'),
	jade = require('jade'),
	stylus = require('stylus'),
	path = require('path'),
	fs = require('fs');

var jadeRegex = /\.jade$/;
var stylusRegex = /\.styl(us)?$/;

fcgi.createServer(function(req, res) {
	if (req.method === 'GET') {
		if (jadeRegex.exec(req.url)) {
			try {
				var name = req.cgiParams.SCRIPT_NAME;
				var p = path.join(req.cgiParams.DOCUMENT_ROOT, req.cgiParams.SCRIPT_NAME);
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(jade.renderFile(p, {req: req}));
			} catch (e) {
				if (e.code == 'ENOENT') {
					res.writeHead(404);
					res.end();
				} else {
					console.error(e);
					res.writeHead(500);
					res.end();
				}
			}
		} else if (stylusRegex.exec(req.url)) {
			try {
				var name = req.cgiParams.SCRIPT_NAME;
				var p = path.join(req.cgiParams.DOCUMENT_ROOT, req.cgiParams.SCRIPT_NAME);
				res.writeHead(200, { 'Content-Type': 'text/css' });
				stylus(fs.readFileSync(p).toString())
					.set('filename', p)
					.render(function(err, css) {
						if (err) {
							throw err;
						} else {
							res.end(css);
						}
					});
			} catch (e) {
				if (e.code == 'ENOENT') {
					res.writeHead(404);
					res.end();
				} else {
					console.error(e);
					res.writeHead(500);
					res.end();
				}
			}
		}
	} else {
		res.writeHead(501);
		res.end();
	}
}).listen(9001, "localhost");