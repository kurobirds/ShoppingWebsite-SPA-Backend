const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	OrderDate: Number,
	UserDetail: {
		type: Schema.Types.ObjectId,
		ref: "users",
		autopopulate: true,
	},
	ListProduct: [
		{
			type: Schema.Types.ObjectId,
			ref: "products",
			autopopulate: true,
		},
	],
	Price: Number,
	Status: Number,
});

orderSchema.plugin(autopopulate);

module.exports = mongoose.model("orders", orderSchema, "orders");
