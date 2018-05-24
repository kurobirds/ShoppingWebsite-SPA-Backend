var mongoose = require("mongoose");

var schema = mongoose.Schema({
	ProName: String,
	FullDes: String,
	Prize: Number,
	CatID: Number,
	IDProducer: Number,
	Quantity: Number,
	SellQuantity: Number,
	View: Number,
});

dbo
	.collection("products")
	.aggregate([
		{
			$lookup: {
				from: "categories",
				localField: "CatID",
				foreignField: "CatID",
				as: "categoriesDetail",
			},
		},
	])
	.toArray(function(err, res) {
		if (err) throw err;
		console.log(JSON.stringify(res));
	});

dbo
	.collection("products")
	.aggregate([
		{
			$lookup: {
				from: "nsx",
				localField: "IDProducer",
				foreignField: "IDProducer",
				as: "producerDetail",
			},
		},
	])
	.toArray(function(err, res) {
		if (err) throw err;
		console.log(JSON.stringify(res));
	});

module.exports = mongoose.model("products", schema, "products");
