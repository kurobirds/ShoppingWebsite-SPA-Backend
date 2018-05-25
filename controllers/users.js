var userModel = require("../models/users");

exports.create = async (req, res) => {
	let [err, user] = await to(userModel.findOne({ Username: Username }));

	if (user) {
		return res.status(400).json({ message: "Account already exists" });
	}

	var newUser = new userModel({
		Username: req.body.Username || null,
		Password: req.body.Password || null,
		Name: req.body.Name || null,
		Email: req.body.Email || null,
		DOB: req.body.DOB || 0,
		Permission: req.body.Permission || -1,
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
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.send(user);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.status(500).send({ message: "Error when finding!" });
		});
};

exports.update = async (req, res) => {
	let [err, user] = await to(userModel.findById(req.params.id));

	if (req.body.Password !== user.Password) {
		[, user.Password] = await to(user.hashPassword(req.body.Password));
	}

	userModel
		.findByIdAndUpdate(
			req.params.id,
			{
				Username: req.body.Username,
				Password: user.Password,
				Name: req.body.Name,
				Email: req.body.Email,
				DOB: req.body.DOB,
				Permission: req.body.Permission || -1,
			},
			{ new: true }
		)
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.send(doc);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.status(500).send({
				message: "Error when finding!",
			});
		});
};

exports.delete = function(req, res) {
	userModel
		.findByIdAndRemove(req.params.id)
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.send({ message: "Deleted successfully!" });
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.status(500).send({
				message: `Error when delete with id ${req.params.id}`,
			});
		});
};
