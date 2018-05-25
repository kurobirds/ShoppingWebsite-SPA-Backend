const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	Name: String,
});

module.exports = mongoose.model("categories", categorySchema, "categories");
