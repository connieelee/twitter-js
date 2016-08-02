var express = require( 'express' );
var swig = require('swig');
var routes = require('./routes/');
var app = express(); // creates an instance of an express application
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded();

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
app.use('/', routes);

//ROUTING


//---------old routes--------
// var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// app.get('/views', function(req, res) {
// 	res.render( 'index', {title: 'Hall of Fame', people: people} );
// })


// app.get('/', function(req, res) {
// 	res.send("Welcome to twitter (rip-off)")
// })
// --------------------------





app.listen(3000);