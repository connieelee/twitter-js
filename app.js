var express = require( 'express' );
var socketio = require('socket.io');
var swig = require('swig');
var routes = require('./routes/');
var app = express(); // creates an instance of an express application
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded( { extended: false });
var server = app.listen(5000);
var io = socketio.listen(server);

//SWIG STUFF
swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// MIDDLEWARE
//logger
app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.use(jsonParser);
app.use(urlParser);

app.use(function(req, res, next) {
	if (req.url === '/special') {
		console.log('you reached the special place');
	}
	next();
})


app.use(express.static('public'));
app.use('/', routes(io));




