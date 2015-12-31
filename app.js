var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000; 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var pollRouter = express.Router();
var db = mongoose.connect("mongodb://localhost/PollsDB");
var Polls = require('./models/pollsModel');

pollRouter.route('/aboutus')
	.get(function(req, res) {
		var respObj = {hello: "response obj"};
		res.json(respObj);
	});


pollRouter.route('/polls')
	.post(function(req, res) {
		console.log("in polls post route");
		var poll = new Polls(req.body);
		console.log(poll);
		poll.save();
		res.status(201).send(poll);
	})
	.get(function(req, res) {
		Polls.find(function(err, polls) {
			if(err) {
				console.log(err);
				res.status(500).send(err);
			}
			else {
				console.log(polls);
				res.json(polls);
			}
		});
	});

/*var db = mongoose.connect("mongodb://localhost/Books");
var Book = require("./models/bookModel");

pollRouter.route('/books')
.post(function(req, res) {
	console.log("in books post route");
	var book = new Book(req.body);
	console.log(book);
	book.save();
	res.status(201).send(book);
})
.get(function(req, res) {
	var query = {};
	if(req.query.genre)
		query.genre = req.query.genre;
	Book.find(query, function(err, books) {
		if(err) {
			console.log(err);
			res.status(500).send(err);
		}
		else {
			res.json(books);
		}
	});
});

pollRouter.route('/books/:bookId').get(function(req, res) {
	Book.findById(req.params.bookId, function(err, books) {
		if(err) {
			console.log(err);
		}
		else {
			res.json(books);
		}
	});
});*/

app.use('/api', pollRouter);

app.get('/', function(req, res) {
	res.send("Welcome to the poll site");
});

app.listen(port, function(req, res) {
	console.log('Running on port' + port);
});

