var mongoose = require("mongoose");

var schema = mongoose.Schema({
	catname: String,
});

module.exports = mongoose.model("categories", schema, "categories");
