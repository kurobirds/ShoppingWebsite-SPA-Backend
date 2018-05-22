var userModel = require("../models/users");

exports.create = async (req, res) => {
	let [err, user] = await to(userModel.findOne({ username: username }));

	if (user) {
		return res.status(400).json({ message: "Account already exists" });
	}

	var newUser = new userModel({
		username: req.body.username || "null",
		password: req.body.password || "null",
		name: req.body.name || "null",
		email: req.body.email || "null",
		DOB: req.body.DOB || "0",
		permission: req.body.permission || -1
	});

	newUser
		.save()
		.then(user => {
			return res.send(user);
		})
		.catch(err => {
			console.log(err);
			return res.status(500).send({ message: "Error when creating!" });
		});
};

exports.findAll = function(req, res) {
	userModel
		.find()
		.then(users => {
			return res.send(users);
		})
		.catch(err => {
			console.log(err);
			return res.status(500).send({ message: "Error when finding!" });
		});
};

exports.findOne = function(req, res) {
	userModel
		.findById(req.params.id)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`
				});
			}
			return res.send(user);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`
				});
			}
			return res.status(500).send({ message: "Error when finding!" });
		});
};

exports.update = async (req, res) => {
	userModel
		.findByIdAndUpdate(
			req.params.id,
			{
				username: req.body.username || "null",
				password: req.body.password || "null",
				name: req.body.name || "null",
				email: req.body.email || "null",
				DOB: req.body.DOB || "0",
				permission: req.body.permission || -1
			},
			{ new: true }
		)
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`
				});
			}
			return res.send(doc);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`
				});
			}
			return res.status(500).send({
				message: "Error when finding!"
			});
		});
};

exports.delete = function(req, res) {
	userModel
		.findByIdAndRemove(req.params.id)
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`
				});
			}
			return res.send({ message: "Deleted successfully!" });
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`
				});
			}
			return res.status(500).send({
				message: `Error when delete with id ${req.params.id}`
			});
		});
};
