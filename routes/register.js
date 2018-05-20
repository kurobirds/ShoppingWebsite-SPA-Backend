const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_encryption;

var userModel = require("../models/users");

router.post("/", async function(req, res) {
	if (req.body) {
		var body = req.body;
	}
	var hash = bcrypt.hashSync(body.password.trim(), 10);

	let [err, user] = await to(userModel.findOne({ username: body.username }));

	if (user) {
		res.status(401).json({ message: "Account already exists" });
	}

	var user = new userModel({
		username: body.username,
		password: hash,
		name: "No-name",
		email: "No-email",
		DOB: 0,
		permission: 0,
	});
	user.save((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when creating!" });
		} else {
			res.send(docs);
		}
	});
});

module.exports = router;
