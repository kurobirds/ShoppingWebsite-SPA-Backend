const express = require("express");
const router = express.Router();

const userModel = require("../models/users");

router.get("/", (req, res) => {
	res.status(405).json({ message: "Method not allowed" });
});

router.post("/", async function(req, res) {
	let Username, Password;
	if (req.body.Username && req.body.Password) {
		Username = req.body.Username;
		Password = req.body.Password;
	}

	let [err, user] = await to(userModel.findOne({ Username: Username }));

	if (!user) {
		res.status(400).json({ message: "Username not Found" });
		return;
	}

	let [, valid] = await to(user.comparePassword(Password));

	if (!valid) {
		return res.status(400).json({
			message: "Password is Wrong",
		});
	}

	let token = generateToken(user);

	res.json({
		user: user,
		token: token,
	});
});

module.exports = router;
