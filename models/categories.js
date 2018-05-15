var mongoose = require("mongoose");

var schema = mongoose.Schema({
	CatName: String,
});

module.exports = mongoose.model("categories", schema, "categories");
