const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	Order_Date: Number,
	User_Detail: {
		type: Schema.Types.ObjectId,
		ref: "users",
		autopopulate: true,
	},
	List_Product: [
		{
			Product_Info: {
				type: Schema.Types.ObjectId,
				ref: "products",
				autopopulate: true,
			},

			Select_Quantity: {
				type: Schema.Types.Number,
			},
		},
	],
	Price: Number,
	Status: Number,
});

orderSchema.plugin(autopopulate);

module.exports = mongoose.model("orders", orderSchema, "orders");
