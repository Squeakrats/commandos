var System = require('systemjs');

var express = require("express"),
	app = express(),
	http = require("http").Server(app);
	io = require("socket.io")(http)

app.use(express.static(__dirname));
http.listen(1337);


System.import('./public/scripts/server').then(function(m) {
	m.main(io);
});