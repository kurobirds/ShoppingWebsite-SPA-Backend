const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producerSchema = new Schema({
	Name: String,
});

module.exports = mongoose.model("producers", producerSchema, "producers");
