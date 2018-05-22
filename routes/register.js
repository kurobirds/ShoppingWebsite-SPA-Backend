const express = require("express");
const router = express.Router();

var userModel = require("../models/users");

router.get("/:username", async (req, res) => {
	let [err, user] = await to(
		userModel.findOne({ username: req.params.username })
	);
	if (user) {
		return res
			.status(400)
			.json({ message: "Account already exists", ok: false });
	} else {
		return res
			.status(200)
			.json({ message: "You can use this username", ok: true });
	}
});

router.post("/", async (req, res) => {
	let username, password, confirm;
	if (req.body.username && req.body.password && req.body.confirm) {
		username = req.body.username;
		password = req.body.password;
		confirm = req.body.confirm;

		if (confirm !== password) {
			return res.status(400).json({
				message: "Password & Confirm Password not math",
				ok: false
			});
		}

		let [err, user] = await to(userModel.findOne({ username: username }));

		if (user) {
			return res
				.status(400)
				.json({ message: "Account already exists", ok: false });
		}

		let newUser = new userModel({
			username,
			password
		});

		newUser.save((err, docs) => {
			if (err) {
				console.log(err);
				return res
					.status(500)
					.json({ message: "Error when creating!", ok: false });
			} else {
				return res
					.status(201)
					.json({ message: "Sign up successfully", ok: true });
			}
		});
	} else {
		return res.status(400).json({ message: "Missing params", ok: false });
	}
});

module.exports = router;
