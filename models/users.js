var mongoose = require("mongoose");

var schema = mongoose.Schema({
	f_username: String,
	f_password: String,
	f_name: String,
	f_email: String,
	f_DOB: Date,
	f_permission: Number,
});

module.exports = mongoose.model("users", schema, "users");
