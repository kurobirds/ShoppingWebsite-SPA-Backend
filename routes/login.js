const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_encryption;

const userModel = require("../models/users");

router.post("/", async function(req, res) {
	if (req.body.username && req.body.password) {
		var username = req.body.username;
		var password = req.body.password;
	}

	let [err, user] = await to(userModel.findOne({ username: username }));

	if (!user) {
		res.status(401).json({ message: "No such user found" });
	}

	if (user.password === password) {
		let payload = {
			username: user.username,
			permission: user.permission,
		};
		let token = jwt.sign(payload, jwtOptions.secretOrKey);
		res.json({ message: "ok", token: token });
	} else {
		res.status(401).json({ message: "passwords did not match" });
	}
});

module.exports = router;
