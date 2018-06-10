const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const mexp = require("mongoose-elasticsearch-xp");

const productSchema = new Schema({
	Name: String,
	Description: String,
	Price: { type: Number, es_type: "long" },
	Categories_Detail: {
		type: Schema.Types.ObjectId,
		ref: "categories",
		autopopulate: true,
		es_type: {
			_id: {
				es_type: "keyword",
			},
			Name: {
				es_type: "keyword",
			},
		},
	},
	Producer_Detail: {
		type: Schema.Types.ObjectId,
		ref: "producers",
		autopopulate: true,
		es_type: {
			_id: {
				es_type: "keyword",
			},
			Name: {
				es_type: "keyword",
			},
		},
	},
	Stock_Quantity: { type: Number, es_type: "long" },
	Sold_Quantity: { type: Number, es_type: "long" },
	View: { type: Number, es_type: "long" },
	Images: { type: Array, es_type: "text" },
	Comments: [
		{
			author: { type: String, es_type: "keyword" },
			createdAt: { type: Number, es_type: "long" },
			comment: String,
		},
	],
});

productSchema.plugin(autopopulate);

productSchema.plugin(mexp, {
	client: getElasticInstance(),
});

var Product = mongoose.model("product", productSchema, "products");

const queryPopuldate = Product.find()
	.populate({ path: "Categories_Detail", model: "categories" })
	.populate({ path: "Producer_Detail", model: "producers" });

Product.esSynchronize(queryPopuldate, "+resume").then(function() {
	console.log("end.");
});

Product.esCreateMapping(function(err, mapping) {
	if (err) {
		console.log("error creating mapping");
		console.log(err);
	} else {
		console.log("Mapping created (Product)");
	}
});

module.exports = Product;
