var userModel = require("../models/users");

exports.create = function(req, res) {
	var user = new userModel({
		username: req.body.username || "null",
		password: req.body.password || "null",
		name: req.body.name || "null",
		email: req.body.email || "null",
		DOB: req.body.DOB || "01/01/1900",
		permission: req.body.permission || -1,
	});

	user.save((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when creating!" });
		} else {
			res.send(docs);
		}
	});
};

exports.findAll = function(req, res) {
	userModel.find((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when finding!" });
		} else {
			res.send(docs);
		}
	});
};

exports.findOne = function(req, res) {
	userModel
	.findById(req.params.id)
	.then(doc => {
		if (!doc) {
			return res.status(404).send({
				message: `Not found with id ${req.params.id}`,
			});
		}

		res.send(doc);
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

exports.update = function(req, res) {
	userModel
	.findByIdAndUpdate(
		req.params.id,
		{
			username: req.body.username || "null",
			password: req.body.password || "null",
			name: req.body.name || "null",
			email: req.body.email || "null",
			DOB: req.body.DOB || "01/01/1900",
			permission: req.body.permission || -1,
		},
		{ new: true }
		)
	.then(doc => {
		if (!doc) {
			return res.status(404).send({
				message: `Not found with id ${req.params.id}`,
			});
		}
		res.send(doc);
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
		res.send({ message: "Deleted successfully!" });
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
