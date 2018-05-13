var users = require("../models/users");

exports.create = function(req, res) {
	console.log(req.body);

	var users = new users({
		f_username: req.body.f_username || "null",
		f_password: req.body.f_password || "null",
		f_name: req.body.f_name || "null",
		f_email: req.body.f_email || "null",
		f_DOB: req.body.f_DOB || "01/01/1900",
		f_permission: req.body.f_permission || -1,
	});

	users.save((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when creating!" });
		} else {
			res.send(docs);
		}
	});
};

exports.findAll = function(req, res) {
	users.find((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when finding!" });
		} else {
			res.send(docs);
		}
	});
};

exports.findOne = function(req, res) {
	users
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
	users
		.findByIdAndUpdate(
			req.params.id,
			{
				f_username: req.body.f_username || "null",
				f_password: req.body.f_password || "null",
				f_name: req.body.f_name || "null",
				f_email: req.body.f_email || "null",
				f_DOB: req.body.f_DOB || "01/01/1900",
				f_permission: req.body.f_permission || -1,
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
	users
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
