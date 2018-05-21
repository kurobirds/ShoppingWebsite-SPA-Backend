const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_encryption;

const userModel = require("../models/users");

router.get("/", (req, res) => {
	res.status(405).json({ message: "Method not allowed" });
});

router.post("/", async function(req, res) {
	let username, password;
	if (req.body.username && req.body.password) {
		username = req.body.username;
		password = req.body.password;
	}

	let [err, user] = await to(userModel.findOne({ username: username }));

	if (!user) {
		res.status(400).json({ message: "Username not Found" });
		return;
	}

	bcrypt.compare(password, user.password, (err, valid) => {
		if (!valid) {
			return res.status(400).json({
				message: "Password is Wrong"
			});
		}

		let token = generateToken(user);

		user = getCleanUser(user);

		res.json({
			user: user,
			token: token
		});
	});
});

module.exports = router;
