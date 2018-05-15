var categories = require("../models/categories");

exports.create = function(req, res) {
	console.log(req.body);

	var celebrities = new categories({
		CatName: req.body.CatName || "null",
	});

	celebrities.save((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when creating!" });
		} else {
			res.send(docs);
		}
	});
};

exports.findAll = function(req, res) {
	categories.find((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when finding celebrities" });
		} else {
			res.send(docs);
		}
	});
};

exports.findOne = function(req, res) {
	categories
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
	categories
	.findByIdAndUpdate(
		req.params.id,
		{
			CatName: req.body.CatName || "Null",
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
	categories
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
