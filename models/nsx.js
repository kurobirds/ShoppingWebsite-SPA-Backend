var mongoose = require("mongoose");

var schema = mongoose.Schema({
	NameNSX: String,
});

module.exports = mongoose.model("nsx", schema, "nsx");
