var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var UserSchema = mongoose.Schema({
	Username: String,
	Password: String,
	Name: String,
	Email: String,
	DOB: Number,
	Permission: Number,
});

UserSchema.pre("save", async function(next) {
	if (this.isModified("Password") || this.isNew) {
		let err, salt, hash;
		[err, salt] = await to(bcrypt.genSalt(10));
		if (err) TE(err.message, true);

		[err, hash] = await to(bcrypt.hash(this.Password, salt));
		if (err) TE(err.message, true);

		this.Password = hash;
	} else {
		return next();
	}
});

UserSchema.methods.hashPassword = async function(pw) {
	let err, salt, hash;
	[err, salt] = await to(bcrypt.genSalt(10));
	if (err) TE(err.message, true);

	[err, hash] = await to(bcrypt.hash(pw, salt));
	if (err) TE(err.message, true);

	return hash;
};

UserSchema.methods.comparePassword = async function(pw) {
	let err, pass;
	if (!this.Password) TE("password not set");

	[err, pass] = await to(bcrypt.compare(pw, this.Password));

	if (err) TE(err);

	if (!pass) TE("invalid Password");

	return this;
};

module.exports = mongoose.model("users", UserSchema, "users");
