var mongoose = require("mongoose");

var schema = mongoose.Schema({
	namensx: String,
});

module.exports = mongoose.model("nsx", schema, "nsx");
