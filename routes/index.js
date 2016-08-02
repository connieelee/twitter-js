var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');


router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', {tweets: tweets, showForm: true, name: ""});
});

router.get('/users/:name', function(req,res) {
	var name = req.params.name;
	console.log(name);
	var tweets = tweetBank.find(function(tweetObj) {
		return tweetObj.name === name;
	});
	res.render('index', {tweets: tweets, showForm: true, name: name});
});

router.get('/tweets/:id', function(req, res) {
	var id = req.params.id;
	var tweets = tweetBank.find({id: +id});
	res.render('index', {tweets: tweets})
});

router.post('/tweets', function(req, res) {
	var name = req.body.name;
	var text = req.body.text;
	tweetBank.add(name, text);
	res.redirect('/');
});

// router.get('/stylesheets/style.css', function(req, res) {
// 	res.sendFile(process.cwd() + '/public/stylesheets/style.css');
// })

module.exports = router;