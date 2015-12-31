var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/*var optionsModel = new Schema({
			optionText: { type: String },
			votes: { type: Number }
		});*/

var pollsModel = new Schema({
	title: { type: String },
	options: {
		type: [{
			optionText: { type: String },
			votes: { type: Number }
		}]
	}
});

module.exports = mongoose.model('PollsDB', pollsModel);

