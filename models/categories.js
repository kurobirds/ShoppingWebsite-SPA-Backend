const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mexp = require("mongoose-elasticsearch-xp");

const categorySchema = new Schema({
	Name: String,
});

const Category = mongoose.model("categories", categorySchema, "categories");

module.exports = Category;
