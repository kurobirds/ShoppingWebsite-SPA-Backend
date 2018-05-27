const express = require("express");
const router = express.Router();

var userModel = require("../models/users");

router.get("/:Username", async (req, res) => {
	let [err, user] = await to(
		userModel.findOne({ Username: req.params.Username }, "Username")
	);
	if (user) {
		return res
			.status(400)
			.json({ message: "Account already exists", ok: false });
	} else {
		return res
			.status(200)
			.json({ message: "You can use this Username", ok: true });
	}
});

router.post("/", async (req, res) => {
	let Username, Password, confirm;
	if (req.body.Username && req.body.Password && req.body.confirm) {
		Username = req.body.Username;
		Password = req.body.Password;
		confirm = req.body.confirm;

		if (confirm !== Password) {
			return res.status(400).json({
				message: "Password & Confirm Password not math",
				ok: false
			});
		}

		let [err, user] = await to(userModel.findOne({ Username: Username }));

		if (user) {
			return res
				.status(400)
				.json({ message: "Account already exists", ok: false });
		}

		let newUser = new userModel({
			Username,
			Password
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
