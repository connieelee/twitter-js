var express = require( 'express' );
var app = express(); // creates an instance of an express application

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.use(function(req, res, next) {
	if (req.url === '/special') {
		console.log('you reached the special place');
	}
	next();
})

app.get('/', function(req, res) {
	res.send("Welcome to twitter (rip-off)")
})

app.listen(3000);