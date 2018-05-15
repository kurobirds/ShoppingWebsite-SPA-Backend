var mongoose = require("mongoose");

var schema = mongoose.Schema({
	ProName: String,
	TinyDes: String,
	FullDes: String,
	Prize: Number,
	CatID: Number,
	IDNSX: Number,
	Quantity: Number,
	SLB: Number,
	LX: Number,
	XX: String,
	SLAnh: String
});

module.exports = mongoose.model("products", schema, "products");
