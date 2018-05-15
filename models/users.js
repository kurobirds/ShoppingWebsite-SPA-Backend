var mongoose = require("mongoose");

var schema = mongoose.Schema({
	f_Username: String,
	f_Password: String,
	f_Name: String,
	f_Email: String,
	f_DOB: Date,
	f_Permission: Number,
});

module.exports = mongoose.model("users", schema, "users");
