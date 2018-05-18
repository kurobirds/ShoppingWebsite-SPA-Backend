var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_encryption;

var userModel = require("../models/users");

router.post("/", async function(req, res) {
	if (req.body.username && req.body.password) {
		var username = req.body.username;
		var password = req.body.password;
	}

	let [err, user] = await to(userModel.findOne({ f_Username: username }));

	if (!user) {
		res.status(401).json({ message: "no such user found" });
	}

	if (user.f_Password === password) {
		var payload = {
			username: user.f_Username,
			permission: user.f_Permission,
		};
		var token = jwt.sign(payload, jwtOptions.secretOrKey);
		res.json({ message: "ok", token: token });
	} else {
		res.status(401).json({ message: "passwords did not match" });
	}
});

module.exports = router;
