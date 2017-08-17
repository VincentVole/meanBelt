var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = mongoose.Schema({
	title: {type: String, required: [true, "Title is required"], minlength: [5, "Title must be at least 5 characters."]},
	description: {type: String, required: [true, "Description is required"], minlength: [10, "Description must be at least 10 characters."]},
	complete: {type: Boolean, default: false},
	creator: {type: String},
	_creator: {type: Schema.Types.ObjectId, ref: 'User'}

}, {timestamps: true});
mongoose.model('Item', ItemSchema);