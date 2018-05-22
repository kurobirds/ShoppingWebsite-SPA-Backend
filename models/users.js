var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");

var UserSchema = mongoose.Schema({
	username: String,
	password: String,
	name: String,
	email: String,
	DOB: Number,
	permission: Number
});

UserSchema.pre("save", async function(next) {
	if (this.isModified("password") || this.isNew) {
		let err, salt, hash;
		[err, salt] = await to(bcrypt.genSalt(10));
		if (err) TE(err.message, true);

		[err, hash] = await to(bcrypt.hash(this.password, salt));
		if (err) TE(err.message, true);

		this.password = hash;
	} else {
		return next();
	}
});

UserSchema.pre("findOneAndUpdate", async function(next) {
	let err, salt, hash;
	[err, salt] = await to(bcrypt.genSalt(10));
	if (err) TE(err.message, true);

	[err, hash] = await to(bcrypt.hash(this._update.password, salt));
	if (err) TE(err.message, true);

	this._update.password = hash;
});

UserSchema.methods.comparePassword = async function(pw) {
	let err, pass;
	if (!this.password) TE("password not set");

	[err, pass] = await to(bcrypt_p.compare(pw, this.password));
	if (err) TE(err);

	if (!pass) TE("invalid password");

	return this;
};

module.exports = mongoose.model("user", UserSchema);
