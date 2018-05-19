var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");

var UserSchema = mongoose.Schema({
	username: String,
	password: String,
	name: String,
	email: String,
	DOB: Number,
	permission: Number,
});

module.exports = mongoose.model("users", UserSchema);
