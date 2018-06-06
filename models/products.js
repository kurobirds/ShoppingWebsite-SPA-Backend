const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const productSchema = new Schema({
	Name: String,
	Description: String,
	Price: Number,
	Categories_Detail: {
		type: Schema.Types.ObjectId,
		ref: "categories",
		autopopulate: true,
	},
	Producer_Detail: {
		type: Schema.Types.ObjectId,
		ref: "producers",
		autopopulate: true,
	},
	Stock_Quantity: Number,
	Sold_Quantity: Number,
	View: Number,
	Images: Array,
});

productSchema.plugin(autopopulate);

module.exports = mongoose.model("products", productSchema, "products");
