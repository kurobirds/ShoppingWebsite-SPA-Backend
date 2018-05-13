var mongoose = require("mongoose");

var schema = mongoose.Schema({
	proname: String,
	tinyDes: String,
	fullDes: String,
	Prize: Number,
	catID: Number,
	idNSX: Number,
	Quantity: Number,
	SLBan: Number,
	View: Number,
});

module.exports = mongoose.model("products", schema, "products");
